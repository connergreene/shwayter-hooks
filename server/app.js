var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app;

var browserPath = path.join(__dirname, '../browser');
var bowerPath = path.join(__dirname, '../bower_components');
var indexHtmlPath = path.join(__dirname, '../index.html');

app.use(express.static(browserPath));
app.use(express.static(bowerPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/*', function (req, res) {
    res.sendFile(indexHtmlPath);
});