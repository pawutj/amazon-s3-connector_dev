var AWS = require("aws-sdk");
AWS.config.loadFromPath("./config.json");
var s3 = new AWS.S3();
var express = require("express");
var router = express.Router();

router.get("/test", function(req, res, next) {
  s3.listBuckets(function(err, data) {
    if (err) console.log(err, err.stack);
    else res.send(data);
  });
});

router.get("/image/:key", function(req, res, next) {
  var params = {
    Bucket: "mabaguette",
    Key: req.params.key
  };
  s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else res.send(data);
  });
});

router.get("/images", function(req, res, next) {
  var params = {
    Bucket: "mabaguette"
  };
  s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else res.send(data.Contents.map(element => element.Key));
  });
});

router.post("/image", function(req, res, next) {
  console.log("AAAAAAAAAAAAAA req", req.body, "endddd");
  const type = req.body.Body.split(";")[0].split("/")[1];
  const base64Data = new Buffer.from(
    req.body.Body.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  console.log({ ...req.body, Body: base64Data, type });
  s3.putObject({ ...req.body, Body: base64Data }, function(err, data) {
    if (err) console.log(err, err.stack);
    else res.send(res.statusCode);
  });
});

router.delete("/image/:key", function(req, res, next) {
  var params = {
    Bucket: "mabaguette",
    Key: req.params.key
  };
  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else res.send(res.statusCode);
  });
});

module.exports = router;
