/**
 * Created by Mangotree on 2015/12/2.
 */
var http = require('http');

var res = exports = module.exports ={
    __proto__:http.ServerResponse.prototype
};


res.render=function render(name,option){
    var self= this;
    this.app.render(name,option,function(err,html){
        if(err){
            return self.next(err);
        }
        self.write(html);
        self.end();
    })
}




