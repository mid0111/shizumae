/*
 * ES 関連のタスク.
 *   es:init    ES Indexを削除後、空の Index を作成する
 *   es:regist  ES Index 再作成後、data 配下のファイルを登録する
 * data 配下の構造
 *   data/{type名}.json
 * json ファイルの構造
 *   [{
 *     "{key}": "{value}",
 *     "location": {
 *       "lat": {double 型},
 *       "lon": {double 型}
 *      }
 *   }]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var AWS = require('aws-sdk');
var through = require('through2');
var awsConf = {};

// AWS 接続情報の設定
awsConf.es = {
  endpoint:  'search-shizumae-thoetrt57uxmjg5hnt7iakpv5m.ap-northeast-1.es.amazonaws.com',
  index: 'shizumae',
  region: 'ap-northeast-1'
};
var creds = new AWS.EnvironmentCredentials('AWS');
creds.accessKeyId = process.env.aws_access_key_id;
creds.secretAccessKey = process.env.aws_secret_access_key;

// gulp task
gulp.task('es:init', () => {
  return deleteIndex()
    .then(createIndex);
});

gulp.task('es:regist', ['es:init'], () => {
  gulp.src([path.join('data', '*.json'), '!' + path.join('data', 'mapping.json')])
    .pipe(uploadDocument());
});

// function
function deleteIndex() {
  return new EsRequest().method('DELETE')
    .path(path.join('/', awsConf.es.index))
    .send();
}

function createIndex() {
  return new EsRequest().method('PUT')
    .path(path.join('/', awsConf.es.index))
    .body(fs.readFileSync('./data/mapping.json'))
    .send();
}

function uploadDocument() {
  return through.obj((file, enc, callback) => {
    if(file.isNull()) {
      callback(null, file);
      return;
    }
    if (file.isStream()) {
      callback(new Error('Streaming not supported'));
      return;
    }

    var filePath = file;
    if('object' === typeof filePath) {
      filePath = filePath.path;
    }
    new EsRequest().method('POST')
      .path(path.join('/', awsConf.es.index, '_bulk'))
      .body(bulk(filePath))
      .send(file)
      .then((file) => {
        callback(null, file);
      })
      .catch((err) => {
        console.log(err);
        callback(err, file);
      });
  });
}

function bulk(filePath) {
  var type = path.basename(filePath, '.json');
  var data = JSON.parse(fs.readFileSync(filePath));
  var result = '';

  for(var i = 0 ; i < data.length ; i++ ) {
    var lat = data[i].location.lat;
    var lon = data[i].location.lng;
    data[i].location = {
      lat: lat,
      lon: lon
    };
    result += '{ "index" : { "_index" : "' + awsConf.es.index + '", "_type" : "location"} }\n';
    result += JSON.stringify(data[i]) + '\n';
  }

  return result;
}

// elasticsearch client を require すると他の task 定義と競合して(?)
// TypeError: Cannot redefine property: Symbol(Symbol.iterator)
// となってしまうため、独自にリクエストを作成
class EsRequest {
  method(method) {
    this._method = method;
    return this;
  }
  path(urlPath) {
    this._path = urlPath;
    return this;
  }
  body(body){
    this._body = body;
    return this;
  }
  send(file) {
    return new Promise((onFulfilled, onRejected) => {
      var endpoint = new AWS.Endpoint(awsConf.es.endpoint);
      var req = new AWS.HttpRequest(endpoint);
      req.region = awsConf.es.region;
      req.headers['Host'] = endpoint.host;
      req.method = this._method;
      req.path = this._path;
      req.body = this._body;

      var signer = new AWS.Signers.V4(req, 'es');
      signer.addAuthorization(creds, new Date());

      var send = new AWS.NodeHttpClient();
      send.handleRequest(req, null, (httpResp) => {
        var body = '';
        httpResp.on('data', (chunk) => {
          body += chunk;
        });
        httpResp.on('end', () => {
          console.log(body);
          if(JSON.parse(body).errors || JSON.parse(body).message) {
            onRejected(body);
          }
          onFulfilled(file);
        });
      }, (err) => {
        onRejected(err);
      });
    });
  }
}
