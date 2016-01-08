import React from 'react';
import NewsFeeds from './newsFeeds.jsx';
import NewsHeader from './newsHeader.jsx';
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

  handleResize(e) {
    this.setState({innerHeight: window.innerHeight});
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.ignoreLastFetch = true;
  },

  componentDidMount() {
    this.asyncInitFb();

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  asyncInitFb() {
    window.addEventListener('resize', this.handleResize);

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '197581620267071',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.5'
      });

      FB.getLoginStatus(this.onStatusChangeCallback);
      FB.Event.subscribe("auth.authResponseChange", this.onStatusChangeCallback);
    }.bind(this);
  },

  onStatusChangeCallback(response) {
    if(response.status === "connected") {
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

  getContainerStyle() {
    return {
      overflow: 'auto',
      height: this.state.innerHeight - 48,
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
            <div
                className="fb-login-button"
                data-max-rows="1"
                data-show-faces="false"
                data-auto-logout-link="false"
            >
            </div>
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
