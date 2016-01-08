import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import ShopDetail from './shopDetail.jsx';
import utils from './../../utils.js';
import ShopService from './shopService.js';

const styles = {
  container: {
    margin: 0,
    padding: 0,
    width: '100%'
  },
  paper: {
    padding: 0,
    paddingBottom: 8
  },
  secText: {
    paddingRight: 0,
    fontSize: '0.8em'
  },
  distance: {
    fontSize: '0.9em'
  },
  shopIcon: {
    width: '1em'
  }
};

const ShopContainer = React.createClass({

  getInitialState() {

    return {
      innerHeight: window.innerHeight,
      detail: {},
      detailMode: false,
      shops: []
    };
  },

  contextTypes: {
    focus: React.PropTypes.bool
  },

  childContextTypes: {
    focus: React.PropTypes.bool
  },

  getChildContext() {
    return {focus: this.props.focus};
  },

  handleResize(e) {
    this.setState({innerHeight: window.innerHeight});
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    ShopService.query().then((shops) => {
      this.setState({
        shops: shops
      });
    });
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  componentWillUpdate(nextProps) {
    if(nextProps.focus != this.props.focus && nextProps.focus == false) {
      this.handleOnUnSelect();
    }
  },

  handleOnSelect(i) {
    this.setState({
      detailMode: true
    });
    var request = {
      placeId: this.state.shops[i].placeId
    };
    var detail = this.state.shops[i];
    var location = {
      lat: detail.location.lat,
      lng: detail.location.lon || detail.location.lng
    }
    detail.location = location;

    this.setState({
      detail: detail
    });
    var service = new google.maps.places.PlacesService(window.document.getElementById('map'));
    service.getDetails(request, function (place, status) {
      detail.photos = place.photos;
      detail.website = place.website;
      detail.mapUrl = place.url;
      this.setState({
        detail: detail
      });
    }.bind(this));
  },

  handleOnUnSelect() {
    this.initDetail();
  },

  getListColStyle() {
    var style = {
      overflow: 'auto',
      height: this.state.innerHeight - 48,
      paddingLeft: 16,
      paddingBottom: 30,
      zIndex: 10,
      transition: 'all 450ms',
      transform: 'translate3d(0px, 0px, 0px)'
    };
    if(!utils.isExSmallDev(window)) {
      style.borderRight = 'solid 1px ' + Colors.grey300;
      style.width = '33.3%';
      style.float = 'left';
    } else {
      style.zIndex = 10;
      if(this.state.detailMode) {
        style.transform = 'translate3d(-' + (window.innerWidth * 1.5) + 'px, 0px, 10px)';
      } else {
        style.transform = 'translate3d(0px, 0px, 0px)';
      }
    }
    return style;
  },

  getIcon(shopType) {
    var url = 'images/';
    switch(shopType) {
      case '居酒屋':
        url += 'shrimp.png';
        break;
      case '和食':
        url += 'japanese.png';
        break;
      case 'レストラン':
        url += 'restaurant.png';
        break;
      case '寿司':
        url += 'sushi.png';
        break;
      case '中華':
        url += 'chinese.png';
        break;
    }
    return url;
  },

  getRenderItems() {
    return this.state.shops.map((shop, i) => {
      var item = (
          <ListItem
              primaryText={shop.name}
              secondaryText={
                 <p style={styles.secText}>
                   {shop.address}<br/>
                   <span style={styles.distance}><img src={this.getIcon(shop.type)} style={styles.shopIcon} /> {shop.type}　</span>
                   <span style={styles.distance}>{shop.distance.toFixed(1)} km</span>
                 </p>
              }
              secondaryTextLines={2}
              />
      );
      if(i == this.state.shops.length - 1) {
        return (
          <div key={i}  onClick={this.handleOnSelect.bind(this,i)}>
            {item}
          </div>
        );
      } else {
        return (
          <div key={i} onClick={this.handleOnSelect.bind(this,i)} >
            {item}
            <Divider />
          </div>
        );
      }
    });
  },

  render() {
    if(!this.props.focus) {
      return null;
    }

    var lists = null;
    var detail = null;
    if(this.state.detailMode) {
      detail = (
        <ShopDetail name={this.state.detail.name}
                    type={this.state.detail.type}
                    address={this.state.detail.address}
                    tel={this.state.detail.tel}
                    mapUrl={this.state.detail.mapUrl}
                    location={this.state.detail.location}
                    photos={this.state.detail.photos}
                    website={this.state.detail.website}
                    _handleOnClose={this.handleOnUnSelect}
                    hidden = {!this.state.detailMode}
        />
      );
    }
    return (
      <div className="container" style={styles.container}>
        <div className="row">
          <div style={this.getListColStyle()}>
            <List subheader="しずまえ鮮魚取扱店">
              {this.getRenderItems()}
            </List>
          </div>
          <div id="map" />
          {detail}
        </div>
      </div>
    );
  },

  initDetail() {
    this.setState({
      detailMode: false,
      detail: {}
    });
  }
});

export default ShopContainer;
