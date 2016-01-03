import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  map: {
    height: 300
  }
};

const ShopDetailMap = React.createClass({

  componentDidMount() {
    var map = new google.maps.Map(ReactDOM.findDOMNode(this), {
      center: this.props.location,
      scrollwheel: false,
      mapTypeControl: false,
      streetViewControl: false,
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
