import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import CustomTheme from './theme.jsx'
import Colors from 'material-ui/lib/styles/colors';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import NewsContainer from './news/newsContainer.jsx';

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

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(CustomTheme)
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {
    return (
      <div style={styles.container}>
        <Tabs>
          <Tab label="ニュース" style={styles.tab}>
            <NewsContainer />
          </Tab>
          <Tab label="たべる" style={styles.tab}>
          </Tab>
          <Tab label="つくる" style={styles.tab} />
        </Tabs>
      </div>
    );
  }
});

export default Main;
