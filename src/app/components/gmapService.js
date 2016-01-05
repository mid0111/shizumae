class GoogleMap {

  static getMarker(dom, location) {
    var map = new google.maps.Map(dom, {
      center: location,
      draggable: false,
      scrollwheel: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      zoom: 14
    });

    var marker = new google.maps.Marker({
      map: map,
      position: location
    });
  }
}

export default GoogleMap;
