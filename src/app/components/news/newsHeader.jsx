import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/lib/paper';

const styles = {
  container: {
    paddingLeft: 15,
    paddingRight: 15
  },
  picture: {
    width: '100%'
  },
  paper: {
    marginTop: 10,
    padding: 20
  },
};

const NewsHeader = React.createClass({

  getCurrentMonthImage() {
    moment.locale('ja');
    var month = moment().format('MM');
    return 'images/' + (month) + '.png';
  },

  render() {
    return (
      <div style={styles.container}>
        <Paper className="row" zDepth={2} style={styles.paper}>
          <div className="col-md-6">
            <ruby>
              <h2>しずまえ処</h2>
            </ruby>
            <p>「しずまえ処（しずまえどこ）」では、しずまえに関する情報をお届けしています。</p>
            <p></p>
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
          <div className="col-md-6" style={styles.frame}>
            <img style={styles.picture} src={this.getCurrentMonthImage()} />
          </div>
        </Paper>
      </div>
    );
  }
});

export default NewsHeader;

