
var Router = require('./router');
var flatten = require('./utils').flatten;
var slice = Array.prototype.slice;
var http = require('http');
var app = module.exports={};
var finalhandler = require('finalhandler');
var methods = require('methods');
var View = require('./view');
var middleware = require('./middleware/init');

app.init = function(){
    this.engines={};
    this.settings={};


    if(!this._router){
        this._router = Router();
        this.use(middleware(this));
    }


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
    //给了Path
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

methods.forEach(function(method) {
    app[method] = function(path){
        var route = this._router.route(path);

        route[method].apply(route,slice.call(arguments,1));
        return this;
    }
})


//用于添加引擎
app.engine = function(ext,fn){
    if('function' != fn ) throw new Error('callback function require');
    if(ext[0] != '.') ext='.'+ext;
    this.engines[ext] = fn;
}

app.render = function(name,option,fn) {
    var engines = this.engines;
    var view = new View(name,{
        defaultEngine:this.set('view engine'),
        engines:engines,
        root:this.set('views')
    });
    if(!view.path){
        var err = new Error('fail to look the view in'+view.root);
        err.view=view;
        return fn(err);
    }

    try{
        view.render(option,fn);
    }catch(err) {
        fn(err);
    }

}
app.set=function(setting,val) {
    if(arguments.length == 1){
        return this.settings[setting];
    }
    this.settings[setting] = val;
}


function logerror(err){
    if (this.get('env') !== 'test')
        console.error(err.stack || err.toString());
}