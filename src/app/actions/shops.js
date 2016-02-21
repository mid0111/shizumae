import fetch from 'isomorphic-fetch';
import * as ActionTypes from './ActionTypes';

function requestShops() {
  return {
    type: ActionTypes.REQUEST_SHOPS
  };
}

function receiveShops(json) {
  return {
    type: ActionTypes.RECEIVE_SHOPS,
    shops: json.map(res => {
      let item = res._source;
      item.distance = res.sort[0];
      let location = {
        lat: item.location.lat,
        lng: item.location.lon
      };
      item.location = location;
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

function requestShopDetail(item) {
  return {
    type: ActionTypes.REQUEST_SHOP_DETAIL,
    selected: item
  };
}

function receiveShopDetail(item, detail) {
  return {
    type: ActionTypes.RECEIVE_SHOP_DETAIL,
    selected: Object.assign({}, item, {
      photos: detail.photos,
      website: detail.website,
      mapUrl: detail.url
    })
  };
}

export function fetchShopDetail(item) {
  return dispatch => {
    dispatch(requestShopDetail(item));

    return getPlaceDetail(item.placeId)
      .then(place => dispatch(receiveShopDetail(item, place)));
  };
}

function getPlaceDetail(placeId) {
  var service = new google.maps.places.PlacesService(window.document.getElementById('map'));
  return new Promise(resolve => {
    service.getDetails({
      placeId: placeId
    }, (place, status) => {
      resolve(place);
    });
  });
}

export function initShopDetail() {
  return {
    type: ActionTypes.INIT_SHOP_DETAIL
  };
}
