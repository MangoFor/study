
var  Regexp = require('path-to-regexp');
module.exports=Layer;

function Layer(path,options,fn) {
    //解决没有new的问题
    if(!(this instanceof Layer)){
        return new Layer(path.options,fn);
    }
    this.path=undefined;
    this.handle=fn;
    this.regexp= Regexp(path,[],options);

}


Layer.prototype.match=function match(path){
    var ret=this.regexp.exec(path);
    if(!ret){
        return false;
    }
    return true;
}


Layer.prototype.handle_request = function(req,res,next) {
    var fn = this.handle;
    //console.log(fn.toString());
    try{
        fn(req,res,next);
    }catch(err){
        next(err);
    }
}