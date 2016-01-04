import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  map: {
    marginBottom: 10,
    height: 300
  }
};

const ShopDetailMap = React.createClass({

  componentDidMount() {
    var map = new google.maps.Map(ReactDOM.findDOMNode(this), {
      center: this.props.location,
      draggable: false,
      scrollwheel: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      zoom: 14
    });

    var marker = new google.maps.Marker({
      map: map,
      position: this.props.location,
      title: 'Hello World!'
    });
  },

  render() {
    return (
      <div id="detail-map" style={styles.map}></div>
    );
  }
});

export default ShopDetailMap;
