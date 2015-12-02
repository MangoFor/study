
var path = require('path');
var fs = require('fs');
var dirname = path.dirname;
var basename = path.basename;
var extname = path.extname;
var exists = fs.existsSync;


module.exports = View;

function View(name,option) {
    option = option || {};

    var engines = option.engines;
    this.defaultEngine = option.defaultEngine;
    this.root = option.root;
    var ext = extname(name);
    if (!this.ext && !this.defaultEngine) throw new Error('No default engine and no extension!');
    if (!ext) name+=(ext=this.defaultEngine[0] == '.'?this.defaultEngine:'.'+this.defaultEngine);

    //取得引擎
    this.engine = engines[ext] || (engines[ext] = require(ext.slice(1)).__express);
    //取得视图路径
    this.path = this.lookup(name);
}

View.prototype.lookup =function lookup(name) {
    if(!path.isAbsolute(name)) name=path.join(this.root,name);
    if(exists(name)) return name;
}


View.prototype.render = function render(option,fn){
    this.engine(this.path,option,fn);
}
