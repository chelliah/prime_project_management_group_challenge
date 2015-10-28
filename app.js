/**
 * Created by aronthomas on 10/28/15.
 */
var express = require('express');
var path = require('path');
var generateEmployee = require('./modules/generateEmployee');

var app = express();


app.set('port', (process.env.PORT || 5000));


app.get('/employee',function(req,res){
    //console.log(generateEmployee());
    res.send(generateEmployee());
});

app.get('/*', function(req,res){
    var file = req.params[0] || "index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
    console.log("here is the file", file);

});

app.listen(app.get('port'));