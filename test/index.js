var express = require('../index.js');

var app = express();
var path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(function(req,res,next){
    res.render('hello',{user:{name:'Mango'}});
})

app.use('/user',function(req,res,next){
    app.render('user',{},function(err,html){
        if(err) return next(err);
        res.write(html);
        res.end();
    });
})
app.use('/tree',function(req,res,next){
    res.write('tree');
    res.end();
})



app.listen(8000);