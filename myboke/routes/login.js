var express = require("express");
var router = express.Router();
var response = require("../common/response");
var User = require("../module/User");
//注册
router.post("/signup", (req, res, next) => {
  const params = req.body;
  const account = params.account;
  const password = params.password;
  const repassword = params.repassword;
  const gender = params.gender;
  const userImg = params.userImg;
  const Introduction = params.Introduction;

  //注册校检
  if (!account) {
    res.send(response.error("请输入账号"));
  } else if (!password) {
    res.send(response.error("请输入密码"));
  } else if (password !== repassword) {
    res.send("2次输入密码不一致");
  } else {
    User.findOne({account}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //数据库中没有才允许注册
        if (!result) {
          let user = new User({
            account,
            password,
            gender,
            userImg,
            Introduction
          });
          user.save((err, mres) => {
            if (!err) {
              res.send(response.success("注册成功"));
            } else {
              res.send(response.error("注册失败"));
            }
          });
        } else {
          res.send(response.error("该用户已经存在"));
        }
      }
    });
  }
});

//登录
router.post("/signin", (req, res, next) => {
  
  const params = req.body;
  
  const account = params.account;
  const password = params.password;
  const mquery = {
    account
  }
  User.findOne(mquery,(err, result) => {
    if(!result){
      res.send(response.error("该用户不存在"));
    }else{
      if(result.password !== password){
        res.send(response.error("密码错误")); 
      }else{
        req.session.user = req.body.account; 
        req.session.id = req.sessionID;
        console.log(req.sessionID);
        res.send(response.success("登录成功"));
      }
    }
  })
});

//登出
router.post("/signout", (req, res, next) => {
  //删除session后返回
  req.session.user = null;
  req.session.id = null;
  res.send(response.success("退出成功"));
});

module.exports = router;
