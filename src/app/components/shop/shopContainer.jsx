import React from 'react';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

const shops = require('./../../../../data/shop.json');

const styles = {
  container: {
    margin: 10
  },
  paper: {
    padding: 0,
    paddingBottom: 8
  },
  distance: {
    fontSize: '0.8em'
  }
};

const ShopContainer = React.createClass({

  getInitialState() {
    return {
      innerHeight: window.innerHeight
    };
  },

  handleResize: function(e) {
    this.setState({innerHeight: window.innerHeight});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  getListColStyle() {
    return {
      borderRight: 'solid 1px #e0e0e0',
      overflow: 'auto',
      height: this.state.innerHeight - 60,
      paddingBottom: 30
    };
  },

  getRenderItems() {
    return shops.map((shop, i) => {
      var item = (
          <ListItem
              primaryText={shop.name}
              secondaryText={
                 <p>
                   {shop.address}<br/>
                   <span style={styles.distance}>1km</span>
                 </p>
              }
              secondaryTextLines={2} />
      );
      if(i == shops.length - 1) {
        return (
          <div key={i}>
            {item}
          </div>
        );
      } else {
        return (
          <div key={i}>
            {item}
            <Divider />
          </div>
        );
      }
    });
  },

  render() {
    return (
      <div className="container" style={styles.container}>
      <div className="row">
      <div className="col-md-4" style={this.getListColStyle()}>
        <List subheader="しずまえ鮮魚取扱店">
          {this.getRenderItems()}
        </List>
      </div>
      </div>
      </div>
    );
  }
});

export default ShopContainer;
