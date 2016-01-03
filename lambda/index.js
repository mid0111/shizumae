var AWS = require('aws-sdk');
var awsConf = {};
// AWS 接続情報の設定
awsConf = {
  endpoint:  'search-shizumae-thoetrt57uxmjg5hnt7iakpv5m.ap-northeast-1.es.amazonaws.com',
  index: 'shizumae',
  region: 'ap-northeast-1'
};
var creds = new AWS.EnvironmentCredentials('AWS');

module.exports.handler = function(event, context) {
  var endpoint = new AWS.Endpoint(awsConf.endpoint);
  var req = new AWS.HttpRequest(endpoint);
  req.region = awsConf.region;
  req.headers['Host'] = endpoint.host;
  req.method = 'POST';
  req.path = '/' + awsConf.index + '/location/_search';
  req.body = JSON.stringify({
    query: {
      match_all: {}
    },
    size: 100,
    sort: [
      {
        _geo_distance: {
          location: event.location,
          order: "asc",
          unit: "km",
          distance_type: "plane"
        }
      }
    ]
  });

  var signer = new AWS.Signers.V4(req, 'es');
  signer.addAuthorization(creds, new Date());

  var send = new AWS.NodeHttpClient();
  send.handleRequest(req, null, function(httpResp) {
    var body = '';
    httpResp.on('data', function(chunk) {
      body += chunk;
    });
    httpResp.on('end', function() {
      console.log(body);
      if(JSON.parse(body).errors || JSON.parse(body).message) {
        context.error(body);
      }
      context.succeed(JSON.parse(body).hits.hits);
    });
  }, function(err) {
    console.log(err);
    context.error(err.message);
  });
};
