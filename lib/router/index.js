var slice = Array.prototype.slice;
var Layer = require('./layer');
var parseUrl = require('parseurl');
var utils = require('../utils');
var Route = require('./route');
var methods = require('methods');

var proto = module.exports = function(options) {
    function router(req,res,next){
        proto.handle(req, res, next);
    }

    router.__proto__ = proto;
    router.stack=[];

    return router;
}


proto.handle = function(req, res, done) {
    var self = this;

    var stack = self.stack;
    var idx=0;

    next();
    function next(err) {
        var layerError = err;
        var layer = stack[idx++];
        if(!layer) {
            return done();
        }
        self.match_layer(layer,req,res,function(err,path) {
            if(err || path === undefined){
                return next(layerError || err);
            }
            layer.handle_request(req, res, next);
        });
    }
}

//match a layer
proto.match_layer=function match_layer(layer,req,res,done) {
    var path;
    var error=null;
    try{
        path = parseUrl(req).pathname;

        if(!layer.match(path)) {
            path = undefined;
        }
    }catch(err) {
        error=err;
    }

    done(error,path);
}

//如果没有path则默认 /
//回调可能是多个
proto.use = function(fn) {
    var path = '/';
    var self = this;

    if(typeof fn !== 'function') {
        path=fn;
        offset=1;
    }
    var callbacks = utils.flatten(slice.call(arguments,offset));
    callbacks.forEach(function(fn){
        if(typeof fn != 'function'){
            throw new TypeError('router.use() middleware need a funciton');
        }
        var layer = new Layer(path,fn);
        self.stack.push(layer);
    })
}

proto.route = function(path){
    var route = new Route(path);
    layer = new Layer(path,route.dispatch.bind(route));

    layer.route = route;

    this.stack.push(layer);
    return route;
}

methods.forEach(function (method) {
    proto[method] = function(path){
        var route = this.route(path);
        route[method].call(route,slice.call(arguments,1));
        return this;
    }
})

