import React from 'react';
import moment from 'moment';
import utils from './../../utils.js';

const styles = {
  container: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 50
  },
  titleFrame: {
    width: '45%',
    paddingTop: 30,
    paddingBottom: 30
  },
  title: {
    width: '100%'
  },
  picture: {
    width: '100%'
  },
  paper: {
    marginTop: 10,
    padding: 20
  }
};

const NewsHeader = React.createClass({

  getCurrentMonthImage() {
    moment.locale('ja');
    var month = moment().format('MM');
    return 'images/' + (month) + '.png';
  },

  getTitleFrameStyle() {
    var style = styles.titleFrame;
    if(utils.isExSmallDev(window)) {
      style.width = '100%';
    }
    return style;
  },

  getImageFrameStyle() {
    var style = {
      paddingBottom: 50
    }
    if(!utils.isExSmallDev(window)) {
      style.paddingTop = 100;
    }
    return style;
  },

  render() {
    return (
      <div style={styles.container}>
        <div style={this.getTitleFrameStyle()}>
          <img style={styles.title} src="images/title.png" />
        </div>
        <p>しずまえに関する情報をお届けしています。</p>
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
    );
  }
});

export default NewsHeader;

