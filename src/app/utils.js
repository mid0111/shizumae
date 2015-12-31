import moment from 'moment';

module.exports = {
  getDate(date) {
    moment.locale('ja', {
      weekdaysShort: ["日","月","火","水","木","金","土"]
    });
    var m = moment(date);
    return m.format("MM/DD (ddd)");
  }
};
