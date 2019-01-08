const mongoose = require('mongoose');
const schema = mongoose.Schema;

//账户
let userSchema = schema({
    account:String,
    password:String,
    gender:String,
    userImg:String,
    Introduction:String,
})

const User = mongoose.model('Users', userSchema);

module.exports = User