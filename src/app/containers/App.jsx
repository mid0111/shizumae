import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import CustomTheme from '../components/theme.jsx';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import NewsContainer from '../components/news/newsContainer.jsx';
import ShopContainer from '../components/shop/shopContainer.jsx';

import { fetchShops, fetchShopDetail, initShopDetail } from '../actions/shops';

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%'
  },
  tab: {
    fontSize: '1.2em'
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectShop = this.handleSelectShop.bind(this);
    this.handleLeaveShopDetail = this.handleLeaveShopDetail.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchShops());
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(CustomTheme),
    };
  }

  handleSelectShop(index) {
    const { shop, dispatch } = this.props;
    dispatch(fetchShopDetail(shop.items[index]));
  }

  handleLeaveShopDetail() {
    const { dispatch } = this.props;
    dispatch(initShopDetail());
  }

  handleChange(value) {
    this.setState({
      value: value
    });
    if(value != 1) {
      this.handleLeaveShopDetail();
    }
  };

  render() {
    return (
      <div style={styles.container}>
        <Tabs value={this.state.value}
              onChange={this.handleChange}>
          <Tab label="ニュース" style={styles.tab} value={0}>
            <NewsContainer/>
          </Tab>
          <Tab label="お店一覧" style={styles.tab} value={1}>
            <ShopContainer
                shop={this.props.shop}
                onSelect={this.handleSelectShop}
                onLeaveDetail={this.handleLeaveShopDetail}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
};

App.childContextTypes = {
  muiTheme: PropTypes.object
};

App.PropTypes = {
  shop: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { shop } = state
  return {
    shop
  }
}

export default connect(mapStateToProps)(App);
