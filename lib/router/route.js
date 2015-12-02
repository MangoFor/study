
var methods = require('methods');
var flatten = require('../utils').flatten;
var Layer = require('./layer');
module.exports = Route;

function Route(path){
    this.stack=[];
    this.methods={};
    this.path = path;

}


Route.prototype.dispatch = function dispatch(req,res,done){

    var idx = 0;
    var stack = this.stack;
    var method = req.method.toLowerCase();

    next();
    function next(err){
        var layer = stack[idx++];
        if(!layer){
            done(err);
        }
        if(method != layer.method) {
            next(err);
        }
        //todo:有可能会有err?
        layer.handle_request(req,res,next);

    }
}

methods.forEach(function(method){
    Route.prototype[method]=function() {
        var self = this;
        var callbacks = flatten(arguments);
        callbacks.forEach(function(fn){
            layer = new Layer('/',fn);
            layer.method = method;
            self.methods[method] = true;
            self.stack.push(layer);
        });

    }
})
