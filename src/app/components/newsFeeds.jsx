import React from 'react';
import Paper from 'material-ui/lib/paper';
import moment from 'moment';

const styles = {
  paper: {
    marginTop: 10,
    padding: 20,
  },
  pre: {
    fontSize: 13,
    maxHeight: 91,
    backgroundColor: '#fff',
    border: 'none',
    padding: 2,
    overflow: 'hidden'
  },
  more: {
    fontSize: '0.5em'
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

  scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = React.findDOMNOde(this);
  },

  getDate(date) {
    moment.locale('ja', {
      weekdaysShort: ["日","月","火","水","木","金","土"]
    });
    var m = moment(date);
    return m.format("MM/DD (ddd)");
  },

  render() {
    var feedNodes = this.props.feeds.map((feed) => {
      if(feed.message.indexOf('水産漁港課') < 0) {
        return;
      }
      return (
        <div className="col-md-6" key={feed.id}>
          <Paper zDepth={2} style={styles.paper}>
            <pre style={styles.pre}>{feed.message}</pre>
            <p style={styles.more}>もっと見る</p>
            <div style={styles.frame}>
              <img style={styles.picture} src={feed.full_picture} />
            </div>
            <p style={styles.createdTime}>{this.getDate(feed.created_time)}</p>
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
