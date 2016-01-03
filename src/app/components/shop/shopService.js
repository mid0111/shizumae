var request = require('request');

class ShopService {

  query(location) {
    var lat = location.lat;
    var lon = location.lon;

    return new Promise((resolve, rejected) => {
      request('https://yepjqk48dl.execute-api.ap-northeast-1.amazonaws.com/prod/location?lat=' + lat + '&lon=' + lon, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var shops = JSON.parse(body).map(function(shop) {
            var item = shop._source;
            item.distance = shop.sort[0];
            return item;
          });
          resolve(shops);
        } else {
          resolve([]);
        }
      });
    });
  }
}

export default ShopService;
