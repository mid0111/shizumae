var request = require('request');

class ShopService {

  static query() {
    return this.getCurrentPosition()
      .then(this.queryShopsSortDistance);
  }

  static getCurrentPosition() {
    var defaultLocation = {lat: 34.97147, lon:138.389172};
    return new Promise((resolve, rejected) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({lat: position.coords.latitude, lon: position.coords.longitude});
        }, (err) => {
          resolve(defaultLocation);
        });
      } else {
        resolve(defaultLocation);
      }
    });
  }

  static queryShopsSortDistance(location) {
    return new Promise((resolve, rejected) => {
      request('https://yepjqk48dl.execute-api.ap-northeast-1.amazonaws.com/prod/location?lat=' + location.lat + '&lon=' + location.lon, function(error, response, body) {
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
