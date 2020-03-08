var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3();
var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
    s3.listBuckets(function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     res.send(data);           // successful response
    });
});

module.exports = router;