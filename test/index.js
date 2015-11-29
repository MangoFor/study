var express = require('../index.js');

var app = express();


app.use('/user',function(req,res,next){
    res.write('user');
    res.end();
})

app.use(function(req,res,next){
    res.write('dewdewdew');
    res.end();
})
app.use('/tree',function(req,res,next){
    res.write('tree');
    res.end();
})



app.listen(8000);