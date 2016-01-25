import React, { PropTypes, Component } from 'react';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

const styles = {
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

class ShopSummary extends Component {

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

  render() {
    const { shop, onClick } = this.props;

    var secondaryText = (
      <p style={styles.secText}>
        {shop.address}<br/>
        <span style={styles.distance}>
          <img src={this.getIcon(shop.type)} style={styles.shopIcon} /> {shop.type} {shop.distance.toFixed(1)} km
        </span>
      </p>
    );

    return (
      <ListItem
          primaryText={shop.name}
          secondaryText={secondaryText}
          secondaryTextLines={2}
          onClick={onClick}
      />
    );
  }
}

ShopSummary.propTypes = {
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func
}

export default ShopSummary;
