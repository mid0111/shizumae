import React from 'react';
import NewsFeeds from './newsFeeds.jsx';
import NewsHeader from './newsHeader.jsx';
import utils from './../../utils.js';

const styles = {
  login: {
    padding: 20
  },
  footer: {
    paddingTop: 50,
    paddingRight: 15,
    fontColor: '#3f3f3f'
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
      this.setState({
        fbLogin: true,
        initializing: false
      });
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
    var style = {
      overflow: 'auto',
      height: this.state.innerHeight - 48,
      width: '100%',
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 30
    };
    if(utils.isExSmallDev(window)) {
      style.paddingLeft = 10;
      style.paddingRight = 10;
    }
    return style;
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
        <div style={styles.footer}>
          <ul>
            <li>本ページのニュースは、<a target="_blank" href="https://www.facebook.com/koho.shizuokacity">静岡市役所Facebook</a> で公開されている水産漁港課の記事を表示しています。</li>
            <li>本サイトでは、 <a target="_blank" href="http://welina.holy.jp/">手書きフォントサイト〜Welina〜</a> のフォントを利用しています。</li>
          </ul>
        </div>
      </div>
    );

  },
});

export default NewsContainer;
