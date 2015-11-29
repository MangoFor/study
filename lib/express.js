var EventEmitter = require('events').EventEmitter;
var proto = require('./application');
var mixin = require('utils-merge');

module.exports = createApplication;


function createApplication(){
    var app = function(req,res,next){
         app.handle(req,res,next);
    };

    mixin(app.__proto__  , proto);
    mixin(app, EventEmitter.prototype);

    app.init();
    return app;
}
