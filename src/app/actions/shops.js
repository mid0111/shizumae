import fetch from 'isomorphic-fetch';

export const REQUEST_SHOPS = 'REQUEST_SHOPS';
function requestShops() {
  return {
    type: REQUEST_SHOPS
  };
}

export const RECEIVE_SHOPS = 'RECEIVE_SHOPS';
function receiveShops(json) {
  return {
    type: RECEIVE_SHOPS,
    shops: json.map(res => {
      let item = res._source;
      item.distance = res.sort[0];
      return item;
    })
  };
}

export function fetchShops() {
  return dispatch => {
    dispatch(requestShops());

    return getCurrentPosition()
      .then(location => fetch(`https://yepjqk48dl.execute-api.ap-northeast-1.amazonaws.com/prod/location?lat=${location.lat}&lon=${location.lon}`))
      .then(response => response.json())
      .then(json => dispatch(receiveShops(json)));
  };
}

function getCurrentPosition() {
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
