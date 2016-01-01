import React from 'react';
import NewsFeeds from './newsFeeds.jsx';
import NewsHeader from './newsHeader.jsx';
import FlatButton from 'material-ui/lib/flat-button';
import utils from './../../utils.js';

const styles = {
  login: {
    padding: 20
  }
};

const NewsContainer = React.createClass({

  getInitialState() {
    return {
      fbLogin: false,
      feeds: [],
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


  componentDidMount: function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1523396571294082',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.5'
      });

      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  statusChangeCallback: function(response) {
    if (response.status === 'connected') {
      this.setState({fbLogin: true});
      this.getFbFeeds();
    }
  },

  getFbFeeds() {
    FB.api('/295132850592974/feed?fields=full_picture,message,created_time&limit=100', function(response) {
      this.setState({
        feeds: response.data
      })
    }.bind(this));
  },

  checkLoginState: function() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  },

  _handleFbLogin() {
    FB.login(this.checkLoginState());
  },

  getContainerStyle() {
    return {
      overflow: 'auto',
      height: this.state.innerHeight - 60,
      paddingBottom: 30
    };
  },

  render() {
    if(!this.state.fbLogin) {
      return (
        <div className="container" style={this.getContainerStyle()}>
          <NewsHeader />
          <div style={styles.login}>
            <p>Facebook にログインして しずまえ のニュースを購読</p>
            <FlatButton secondary={true} label="ログイン" labelPosition="after"
                        onClick={this._handleFbLogin}>
            </FlatButton>
          </div>
        </div>
      )
    }

    // ニュースフィードを表示
    return (
      <div className="container" style={this.getContainerStyle()}>
        <NewsHeader />
        <NewsFeeds feeds={this.state.feeds} />
      </div>
    );

  },
});

export default NewsContainer;
