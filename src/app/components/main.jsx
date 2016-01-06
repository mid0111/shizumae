import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import CustomTheme from './theme.jsx';
import history from './../history.js';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

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

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      value: '/'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(CustomTheme),
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.location.pathname
    });
  }

  handleChange(value) {
    this.setState({
      value: value
    });
    history.replaceState(null, value);
  }

  render() {
    return (
      <div style={styles.container}>
        <Tabs value={this.state.value}
              onChange={this.handleChange}>
          <Tab label="ニュース" style={styles.tab} value="/" />
          <Tab label="お店一覧" style={styles.tab} value="/shops" />
        </Tabs>
        {this.props.children}
      </div>
    );
  }
};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
};

Main.contextTypes = {
  router: React.PropTypes.object
};

module.exports = Main;
