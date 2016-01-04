import React from 'react';
import ReactDOM from 'react-dom';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
import utils from './../../utils.js';
import ShopDetailMap from './shopDetailMap.jsx';

const styles = {
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
  },
  navGMap: {
    paddingBottom: 40
  }
};

const ShopDetail = React.createClass({

  getInitialState() {
    return {
      innerHeight: window.innerHeight
    };
  },

  getContainerStyle() {
    var style = {
      overflow: 'auto',
      height: this.state.innerHeight - 48,
      zIndex: 0
    };
    if(utils.isExSmallDev(window)) {
      style.width = '100%';
      style.position = 'fixed';
      style.left = 0;
      style.top = 48;
      style.padding = 0;
    } else {
      style.float = 'left';
      style.width = '66.7%';
      style.paddingLeft = 30;
    }

    if(this.props.hidden) {
      style.width = 0;
    }
    return style;
  },

  handleResize(e) {
    this.setState({innerHeight: window.innerHeight});
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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

  renderMap() {
    if(this.props.location) {
      return <ShopDetailMap location={this.props.location}/>;
    }
  },

  render() {
    var phoneNumberLink = '';
    if(this.props.tel) {
      phoneNumberLink = 'tel:' + this.props.tel.replace(/-/g, '');
    }
    return (
      <div style={this.getContainerStyle()}>
        {this.renderNavBar()}
        <div style={styles.contents}>
        <h2>{this.props.name}</h2>
        <p>{this.props.address}</p>
        <p><a href={phoneNumberLink}>{this.props.tel}</a></p>
        <p><a href={this.props.website}>{this.props.website}</a></p>
        {this.renderMap()}
        <a target="_blank" href={this.props.mapUrl} style={styles.navGMap}>Google Mapで表示</a>
        </div>
     </div>
    );
  }
});

export default ShopDetail;
