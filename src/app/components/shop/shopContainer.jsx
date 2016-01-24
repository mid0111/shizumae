import React, { PropTypes, Component } from 'react';
import Colors from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

import ShopSummary from './shopSummary.jsx';
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

  getRenderItems() {
    const { shop } = this.props;
    return shop.items.map((item, i) => {
      var listItem = (
        <ShopSummary shop={item} />
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
