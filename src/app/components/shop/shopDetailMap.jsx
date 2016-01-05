import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from '../gmapService.js';

const styles = {
  map: {
    marginBottom: 10,
    height: 300
  }
};

const ShopDetailMap = React.createClass({

  getInitialState() {
    return {
      location: {}
    };
  },

  componentDidMount() {
    GoogleMap.getMarker(ReactDOM.findDOMNode(this), this.props.location);
  },

  componentWillUpdate(nextProps) {
    if(this.props.location != nextProps.location) {
      GoogleMap.getMarker(ReactDOM.findDOMNode(this), nextProps.location);
    }
  },

  render() {
    return (
      <div id="detail-map" style={styles.map}></div>
    );
  }
});

export default ShopDetailMap;
