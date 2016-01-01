import React from 'react';
import Paper from 'material-ui/lib/paper';
import utils from './../../utils.js';

const styles = {
  paper: {
    marginTop: 10,
    padding: 20
  },
  frame: {
    height: 280,
    overflow: 'hidden'
  },
  picture: {
    width: '100%'
  },
  createdTime: {
    fontSize: '0.6em',
    marginTop: 5,
    marginBottom: 0
  }
};

const NewsFeeds = React.createClass({

  getInitialState() {
    return {
      zoom: new Array(this.props.feeds.length)
    };
  },

  getPreStyle(i) {
    var style = {
      fontSize: 13,
      maxHeight: 127.4,
      backgroundColor: '#fff',
      border: 'none',
      padding: 2,
      overflow: 'hidden'
    };
    if(this.state.zoom[i]) {
      style.maxHeight = 'none';
    }
    return style;
  },

  getMoreStyle(i) {
    var style = {
      fontSize: '0.5em',
      cursor: 'pointer'
    };
    if(this.state.zoom[i]) {
      style.hidden = true;
    }
    return style;

  },

  scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = React.findDOMNOde(this);
  },

  handleOnClick(i) {
    var zoom = this.state.zoom;
    zoom[i] = true;
    this.setState({
      zoom: zoom
    });
  },

  render() {
    var feedNodes = this.props.feeds.map((feed, i) => {
      if(feed.message.indexOf('水産漁港課') < 0) {
        return;
      }
      return (
        <div className="col-md-6" key={feed.id} onClick={this.handleOnClick.bind(this, i)}>
          <Paper zDepth={2} style={styles.paper}>
            <pre style={this.getPreStyle(i)}>{feed.message}</pre>
            <a><p style={this.getMoreStyle(i)}>...もっと見る</p></a>
            <div style={styles.frame}>
              <img style={styles.picture} src={feed.full_picture} />
            </div>
            <p style={styles.createdTime}>{utils.getDate(feed.created_time)}</p>
          </Paper>
        </div>
      );
    });

    return (
      <div className="row">
        {feedNodes}
      </div>
    );

  }
});

export default NewsFeeds;
