var EventEmitter = require('events').EventEmitter;
var proto = require('./application');
var mixin = require('utils-merge');
var req=require('./request');
var res=require('./response');

module.exports = createApplication;


function createApplication(){
    var app = function(req,res,next){
         app.handle(req,res,next);
    };

    mixin(app.__proto__  , proto);
    mixin(app, EventEmitter.prototype);
    app.request = {__proto__:req,app:app};
    app.response = {__proto__:res,app:app};

    app.init();
    return app;
}
