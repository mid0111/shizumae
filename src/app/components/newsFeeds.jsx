import React from 'react';
import Paper from 'material-ui/lib/paper';

const styles = {
  paper: {
    marginTop: 10,
    padding: 20,
  },
  pre: {
    maxHeight: 100,
    backgroundColor: '#fff',
    border: 'none',
    padding: 2,
    overflow: 'hidden'
  },
  more: {
    fontSize: '0.5em'
  },
  frame: {
    height: 300,
    overflow: 'hidden'
  },
  picture: {
    width: '100%'
  },
  createdTime: {
    fontSize: '0.5em',
    marginBottom: 0
  }
};

const NewsFeeds = React.createClass({

  scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = React.findDOMNOde(this);
  },

  render() {
    var feedNodes = this.props.feeds.map((feed) => {
      return (
        <div className="col-md-6" key={feed.id}>
          <Paper zDepth={2} style={styles.paper}>
            <pre style={styles.pre}>{feed.message}</pre>
            <p style={styles.more}>もっと見る</p>
            <div style={styles.frame}>
              <img style={styles.picture} src={feed.full_picture} />
            </div>
            <p style={styles.createdTime}>{feed.created_time}</p>
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
