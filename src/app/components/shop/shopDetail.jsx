import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import utils from './../../utils.js';

const styles = {
  photoFrame: {
    height: 270,
    overflow: 'hidden'
  },
  photo: {
    width: 400
  },
  navBar: {
    position: 'absolute',
    top: 0,
    background: Colors.grey600,
    width: '100%',
    height: 48,
    zIndex: 5
  },
  icon: {
    width: 48,
    height: 48,
    fill: '#fff'
  },
  contents: {
    position: 'relative',
    top: 48,
    paddingLeft: 30,
    paddingRight: 30
  }
};

const ShopDetail = React.createClass({

  getContainerStyle() {
    if(utils.isExSmallDev(window)) {
      return {
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 48,
        padding: 0
      };
    } else {
      return {
        paddingLeft: 30
      };
    }
  },

  renderImage() {
    if(this.props.photo) {
      return (
        <div style={styles.photoFrame}>
          <img style={styles.photo} src={this.props.photo}/>
        </div>
      );
    }
  },

  renderNavBar() {
    if(this.props.name && utils.isExSmallDev(window)) {
      return (
        <div style={styles.navBar} onClick={this.props._handleOnClose}>
          <KeyboardArrowLeft style={styles.icon}/>
        </div>
      );
    }
  },

  render() {
    var phoneNumberLink = '';
    if(this.props.tel) {
      phoneNumberLink = 'tel:' + this.props.tel.replace(/-/g, '');
    }
    return (
      <div className="col-md-8" style={this.getContainerStyle()}>
        {this.renderNavBar()}
        <div style={styles.contents}>
        <h2>{this.props.name}</h2>
        <p>{this.props.address}</p>
        <p><a href={phoneNumberLink}>{this.props.tel}</a></p>
        <p><a href={this.props.website}>{this.props.website}</a></p>
        {this.renderImage()}
        </div>
     </div>
    );
  }
});

export default ShopDetail;
