/**
 * Created by Mangotree on 2015/11/30.
 */
var express = require('../index.js');

var app = express();



app.use('/user',function(req,res,next){
    res.write('user');
    res.end();
})

app.use(function(req,res,next){
    res.write('index');
    res.end();
})
app.use('/tree',function(req,res,next){
    res.write('tree');
    res.end();
})

app.get('/get',function(req,res,next){
    res.write('<h1>get</h1>>');
    res.end();
})


app.listen(8000);