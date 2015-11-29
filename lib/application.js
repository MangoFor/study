
var Router = require('./router');
var flatten = require('./utils').flatten;
var slice = Array.prototype.slice;
var http = require('http');
var app = module.exports={};
var finalhandler = require('finalhandler');


app.init = function(){
    this._router = Router();
}


app.handle = function(req,res,done){
    var router = this._router;

    // final handler
    done = done || finalhandler(req, res, {
            env:'test',
            onerror: logerror.bind(this)
        });

    router.handle(req,res,done);
}

app.use = function(fn){
    var offset = 0;
    var path = '/';

    var router = this._router;
    //¸øÁËPath
    if(typeof fn != 'function'){
        path = fn;
        offset = 1;
    }
    var fns = flatten(slice.call(arguments,offset));

    fns.forEach(function(fn){
        return router.use(path,fn);
    })
}

app.listen = function listen(){
    var server = http.createServer(this);
    console.log('listening in port :'+arguments[0]);
    return server.listen.apply(server,arguments);
}

function logerror(err){
    if (this.get('env') !== 'test')
        console.error(err.stack || err.toString());
}