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
    paddingRight: 30,
    fontSize: '0.9em'
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

  contextTypes: {
    focus: React.PropTypes.bool
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

  getContentsStyle() {
    if(utils.isExSmallDev(window)) {
      return styles.contents;
    } else {
      var style = styles.contents;
      style.top = 10;
      return style;
    }
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

  renderMap(refresh) {
    if(this.props.location) {
      return <ShopDetailMap location={this.props.location} refresh={refresh} />;
    }
  },

  render() {
    if(!this.context.focus) {
      return null;
    }

    var phoneNumberLink = '';
    if(this.props.tel) {
      phoneNumberLink = 'tel:' + this.props.tel.replace(/-/g, '');
    }
    return (
      <div style={this.getContainerStyle()}>
        {this.renderNavBar()}
        <div style={this.getContentsStyle()}>
          <h3>{this.props.name}</h3>
          <p>{this.props.address}</p>
          <p><a href={phoneNumberLink}>{this.props.tel}</a></p>
          {this.renderMap()}
          <a target="_blank" href={this.props.mapUrl} style={styles.navGMap}>ナビを開始</a>
        </div>
      </div>
    );
  }
});

export default ShopDetail;
