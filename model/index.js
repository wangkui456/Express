// 1、导入mongoose
var mongoose=require('mongoose');

// 2、连接数据库，并判断数据库是否连接成功
mongoose.connect('mongodb://localhost/wangkui')
.then(()=>{console.log("数据库连接成功");})
.catch((err)=>{console.log("数据库连接失败,错误原因："+err);})


module.exports =mongoose