

module.exports=Layer;

function Layer(path,fn) {
    //解决没有new的问题
    if(!(this instanceof Layer)){
        return new Layer(path.fn);
    }
    this.path=path;
    this.handle=fn;
}


Layer.prototype.match=function match(path){
    return path === this.path;
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