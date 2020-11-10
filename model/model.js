var mongoose = require('./index')

var userSchema = mongoose.Schema({
    userName: String,
    password: String,
    password1: String,
})

var userSchem= mongoose.Schema({
    title: String,
    content: String,
    username:String,
    id:Number,
})
var userModel = mongoose.model('userModel', userSchema)
var articleModel = mongoose.model('articleModel', userSchem)
module.exports = {
    userModel,
    articleModel 
}