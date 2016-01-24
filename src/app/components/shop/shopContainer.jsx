import React, { PropTypes, Component } from 'react';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import ShopDetail from './shopDetail.jsx';
import utils from './../../utils.js';

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

export default class ShopContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      innerHeight: window.innerHeight
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleLeaveDetail = this.handleLeaveDetail.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e) {
    this.setState({innerHeight: window.innerHeight});
  }

  handleSelect(i) {
    this.props.onSelect(i);
  }

  handleLeaveDetail() {
    this.props.onLeaveDetail();
  }

  getListColStyle() {
    const { shop } = this.props;
    const isSelected = Object.keys(shop.selected).length > 0;

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
      if(isSelected) {
        style.transform = 'translate3d(-' + (window.innerWidth * 1.5) + 'px, 0px, 10px)';
      } else {
        style.transform = 'translate3d(0px, 0px, 0px)';
      }
    }
    return style;
  }

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
  }

  getRenderItems() {
    const { shop } = this.props;
    return shop.items.map((item, i) => {
      var listItem = (
          <ListItem
              primaryText={item.name}
              secondaryText={
                 <p style={styles.secText}>
                   {item.address}<br/>
                   <span style={styles.distance}><img src={this.getIcon(item.type)} style={styles.shopIcon} /> {item.type}　</span>
                   <span style={styles.distance}>{item.distance.toFixed(1)} km</span>
                 </p>
              }
              secondaryTextLines={2}
              />
      );
      if(i == shop.items.length - 1) {
        return (
          <div key={i} onClick={this.handleSelect.bind(this,i)}>
            {listItem}
          </div>
        );
      } else {
        return (
          <div key={i} onClick={this.handleSelect.bind(this,i)} >
            {listItem}
            <Divider />
          </div>
        );
      }
    });
  }

  renderShopDetail() {
    const { shop } = this.props;
    const isSelected = Object.keys(shop.selected).length > 0;
    if(!isSelected) {
      return null;
    }
    return (
      <ShopDetail shop={shop.selected} onClose={this.handleLeaveDetail} />
    );
  }

  render() {
    return (
      <div className="container" style={styles.container}>
        <div className="row">
          <div style={this.getListColStyle()}>
            <List subheader="しずまえ鮮魚取扱店">
              {this.getRenderItems()}
            </List>
          </div>
          <div id="map" />
          {this.renderShopDetail()}
        </div>
      </div>
    );
  }
}

ShopContainer.propTypes = {
  shop: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onLeaveDetail: PropTypes.func.isRequired
}
