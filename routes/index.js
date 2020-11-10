var express = require('express');
var router = express.Router();
var { articleModel } = require('../model/model')
var moment=require('moment')

/* GET home page. */
router.get('/', async function(req, res, next) {
  // 拿到文章数据
  // var datalist=articleModel.find(function(err, datalist){
  //   return datalist
  // })
  let page=req.query.page||1
  let data={
    total:"",//总页数
    currentPage:page,//当前页码
    list:[],
  }
  let pageSize=2

  var dataList=await articleModel.find()
    .limit(pageSize)
    .sort({_id:-1})
    .skip(pageSize*(data.currentPage-1))
  data.total=Math.ceil(await articleModel.find().count()/pageSize)

  dataList.map(item => {
    item['time'] = moment(item.id).format("MMM Do YY")
  })
  data.list=dataList
  // 渲染首页先从session拿到用户名
  let username=req.session.username||""
  res.render('index', {username,data:data});

  
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/richtext',async function(req, res, next) {
  let username=req.session.username||""

  var id=parseInt(req.query.id)
  var page=req.query.page
  var item={
    title:'',
    content:'',
  }
  if(id){
    item=await articleModel.findOne({id:id})
    item.page=page
    res.render('richtext',{username,item});

  }else{
    res.render('richtext',{username,item});
    
  }


  res.render('richtext');
});
router.get('/compile',async function(req, res, next) {
  let id=parseInt(req.query.id)
  var dataList=await articleModel.findOne({id:id})

  dataList['time']=moment(dataList.id).format("MMM Do YY")

  let username=req.session.username||""
  res.render('compile' ,{username,dataList});

});


module.exports = router;
