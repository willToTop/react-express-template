const mongoose = require('mongoose');
const schema = mongoose.Schema;

//账户
let articleSchema = schema({
    user:String,
    creatTime:Date,
    updateTime:Date,
    title:String,
    id:String,
    content:String,
    comments:Array
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article