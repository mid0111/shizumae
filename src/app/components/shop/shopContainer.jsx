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
  list: {
    overflow: 'auto',
    paddingLeft: 16,
    paddingBottom: 30,
    zIndex: 10,
    transition: 'all 450ms',
    transform: 'translate3d(0px, 0px, 0px)'
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
    if(!utils.isExSmallDev(window)) {
      return Object.assign({}, styles.list, {
        height: this.state.innerHeight - 48,
        borderRight: 'solid 1px ' + Colors.grey300,
        width: '33.3%',
        float: 'left'
      });
    }

    const { shop } = this.props;
    const isSelected = Object.keys(shop.selected).length > 0;
    return Object.assign({}, styles.list, {
      height: this.state.innerHeight - 48,
      zIndex: 10,
      transform: isSelected ? 'translate3d(-' + (window.innerWidth * 1.5) + 'px, 0px, 10px)' : 'translate3d(0px, 0px, 0px)'
    });
  }

  getRenderItems() {
    const { shop } = this.props;
    return shop.items.map((item, i) => {
      let divider = i != shop.items.length -1 && <Divider />;

      return (
        <div key={i}>
        <ShopSummary shop={item} onClick={this.handleSelect.bind(this, i)} />
        {divider}
        </div>
      );
    });
  }

  renderShopDetail() {
    const { shop } = this.props;
    const isSelected = Object.keys(shop.selected).length > 0;
    if(isSelected) {
      return (
        <ShopDetail shop={shop.selected} onClose={this.handleLeaveDetail} />
      );
    }
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
