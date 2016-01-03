import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import CustomTheme from './theme.jsx';
import Colors from 'material-ui/lib/styles/colors';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import NewsContainer from './news/newsContainer.jsx';
import ShopContainer from './shop/shopContainer.jsx';

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

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(CustomTheme),
      tabSelected: 0
    };
  },

  getChildContext: function() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {
    return (
      <div style={styles.container}>
        <Tabs initialSelectedIndex={1}>
          <Tab label="ニュース" style={styles.tab}>
            <NewsContainer />
          </Tab>
          <Tab label="たべる" style={styles.tab}>
            <ShopContainer />
          </Tab>
          <Tab label="つくる" style={styles.tab} />
        </Tabs>
      </div>
    );
  }
});

export default Main;
