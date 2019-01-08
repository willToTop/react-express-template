var express = require('express');
var router = express.Router();
var Article = require('../module/Article');
var response = require('../common/response');
var check = require('../middle/checksign')
/* GET users listing. */
router.post('/list',check.checklogin, function(req, res, next) {
    let searchParams = {};
    Article.find(searchParams,(err,result) => {
        if(!err){
            res.send(response.success(result));
            
        }else{
            res.send(response.error('请求失败'));
            
        }
    })
});
router.post('/mylist',check.checklogin, function(req, res, next) {
    let searchParams = {user:req.session.user};
    Article.find(searchParams,(err,result) => {
        res.send(response.success(result));
    })
});
router.post('/detail',check.checklogin, function(req, res, next) {
    const id = req.body.id;
    let searchParams = {id};
    Article.findOne(searchParams,(err,result) => {
        res.send(response.success(result));
    })
});
router.post('/add',check.checklogin, function(req, res, next) {
    let {title,content} = req.body;
    let article = new Article({
        title,
        content,
        user:req.session.user,
        id:new Date() * Math.random(),
        comments:[]
    })
    article.save((err,mres)=>{
        res.send(response.success('ok'));
    })
});
router.post('/remove', function(req, res, next) {
    let searchParams = {id:req.body.id,user:req.session.user};
    Article.findOneAndRemove(searchParams,(err,result) => {
        res.send(response.success('ok'));
    })
});
module.exports = router;
