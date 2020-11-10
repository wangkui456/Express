var express = require('express');
var {userModel}=require('../model/model')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 创建注册接口
router.post('/register', function(req, res, next) {
  let userData ={
    userName:req.body.usname,
    password:req.body.password,
    password1:req.body.password1
  } 

  // res.render(userData)
  // 6
  var userInfo=new userModel(userData)
  console.log(userInfo);
  // 7
  userInfo.save()
  res.redirect('/login')
})

// 创建登录接口
router.post('/login', function(req, res, next) {
  let userData ={
    userName:req.body.usname,
    password:req.body.password,
  } 
  // res.render(userData)
  userModel.find(userData,function(error,docs){
    if(error){
      return(logger.error(error))
    }
    if(docs.length>0){
      req.session.username=userData.userName
      res.redirect('/')

    }else{
      res.redirect('/login')
    }
  })
})
module.exports = router;
