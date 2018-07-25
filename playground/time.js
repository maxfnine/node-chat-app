var moment = require('moment');

// var date = moment();

// console.log(date.format('MMMM Do, YYYY'));

var createdAt=1234;
var someTimestamp = moment().valueOf();
var date=moment(someTimestamp);

console.log(date.format('h:mm a'));

