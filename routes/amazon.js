var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3();
var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
    s3.listBuckets(function(err, data) {
        if (err) console.log(err, err.stack);
        else     res.send(data);
    });
});

router.get('/image/:key',function(req,res,next){
    var params = {
        Bucket: "mabaguette", 
        Key: req.params.key
       };
    s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     res.send(data);
    });
});

router.get('/images',function(req,res,next){
    var params = {
        Bucket: "mabaguette"
       };
       s3.listObjects(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     res.send(data.Contents.map(element => element.Key));
      });
});

router.post('/image',function(req,res,next){
    reader.readAsDataURL();
    s3.putObject(req.body, function(err, data) {
        if (err) console.log(err, err.stack);
        else     res.send(res.statusCode);
    });
});

module.exports = router;