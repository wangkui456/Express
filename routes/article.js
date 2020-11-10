var express = require('express');
var { articleModel } = require('../model/model')
const fs = require('fs');
var router = express.Router();
const multiparty = require('multiparty')


router.post('/richtext', async function (req, res, next) {
    var id = parseInt(req.body.id)


    if (id) {
        var page = req.body.page
        var title = req.body.title
        var content = req.body.content

        const article = await articleModel.findOne({ id })

        article.set({
            title: title,
            content: content
        })
        article.save()
        res.redirect('/?page=' + page)
    } else {

        let data1 = {
            title: req.body.title,
            content: req.body.content,
            username: req.session.username,
            id: Date.now(),
        }
        var userInfo1 = new articleModel(data1)
        userInfo1.save()
        res.redirect('/')
    }

})

router.post('/upload', function (req, res, next) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log("上传失败");
        } else {
            console.log(files)
            let file = files.upload[0]

            let rs = fs.createReadStream(file.path)

            let newRs = '/upload/' + file.originalFilename

            let ws = fs.createWriteStream('./public' + newRs)

            rs.pipe(ws)

            ws.on('close', function () {
                res.send({ uploaded: 1, url: newRs })
            })
        }
    })
})

router.get('/delete', function (req, res, next) {
    let id = parseInt(req.query.id)
    let page = req.query.page

    articleModel.deleteMany({ id }, function (err) { console.log(err); })

    res.redirect('/?page=' + page)
})
module.exports = router;
