import React from 'react';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import NewsFeeds from './newsFeeds.jsx';

const styles = {
  paper: {
    marginTop: 10,
    padding: 20
  },
  headline: {
    fontSize: '1.6em',
    marginBottom: '1em',
    fontWeight: 400,
  },
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
        appId      : '197581620267071',
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

  render() {
    var info = (
      <Paper zDepth={2} style={styles.paper}>
        <div style={styles.content}>
          <p>
            「しずまえ」とは、静岡市の前浜（駿河区石部～清水区蒲原）のことです。江戸前みたいですね！
          </p>
          <p>
            静岡市には、用宗と由比に2つの漁港があります。
          </p>
          <p>
            ここで水揚げされる魚介類を「しずまえ鮮魚」といいます。
          </p>
          <p>
            <a target="_blank" href="http://www.city.shizuoka.jp/000_006732.html">さらに詳しく</a>
          </p>
        </div>
      </Paper>
    );

    if(!this.state.fbLogin) {
      return (
        <div className="container" style={{overflow: 'auto', height: this.state.innerHeight - 60, paddingBottom: 30}}>
          {info}
          <div style={styles.login}>
            <p>Facebook にログインして しずまえ のメッセージを購読</p>
            <FlatButton secondary={true} label="ログイン" labelPosition="after"
                        onClick={this._handleFbLogin}>
            </FlatButton>
          </div>
        </div>
      )
    }

    return (
      <div className="container" style={{overflow: 'auto', height: this.state.innerHeight - 60, paddingBottom: 30}}>
        {info}
        <NewsFeeds feeds={this.state.feeds}/>
      </div>
    );
  },
});

export default NewsContainer;
