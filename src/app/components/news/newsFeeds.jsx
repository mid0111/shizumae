import React from 'react';
import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';
import utils from './../../utils.js';

const styles = {
  message: {
    fontSize: 14,
    lineHeight: 1.3
  },
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
      fontSize: styles.message.fontSize,
      lineHeight: styles.message.lineHeight,
      wordWrap: 'break-word',
      height: styles.message.fontSize * styles.message.lineHeight * 8,
      color: '#333',
      backgroundColor: '#fff',
      border: 'none',
      padding: 0,
      overflow: 'hidden'
    };
    if(this.state.zoom[i]) {
      style.maxHeight = 'none';
    }
    return style;
  },

  getMoreStyle(i) {
    var style = {
      fontSize: '0.8em',
      marginTop: 10,
      cursor: 'pointer'
    };
    if(this.state.zoom[i]) {
      style.display = 'none';
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
    if(this.props.feeds.length <= 0) {
      return (
        <div className="text-center" style={{padding: 50}}>
          <CircularProgress mode="indeterminate" />
        </div>
      );
    }

    var feedNodes = this.props.feeds.map((feed, i) => {
      if(feed.message.indexOf('水産漁港課') < 0) {
        return;
      }

      var style = {
        marginBottom: styles.message.fontSize * styles.message.lineHeight
      }

      var lines = feed.message.split('\n');
      var formattedMessage = lines.map((line, j) => {
        if(j > 5) {
          return;
        }
        return <p key={j} style={style}>{line}</p>;
      });

      return (
        <div className="col-md-6" key={feed.id} onClick={this.handleOnClick.bind(this, i)}>
          <Paper zDepth={2} style={styles.paper}>
            <div style={this.getPreStyle(i)}>
              {formattedMessage}
            </div>
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
