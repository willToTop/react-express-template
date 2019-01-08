const mongoose = require('mongoose');

var url = "mongodb://localhost:27017/User";

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('连接成功');
});

module.exports = db;