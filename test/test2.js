/**
 * Created by Mangotree on 2015/12/2.
 */

var  pathRegexp = require('path-to-regexp');


var ex=pathRegexp('/user',[],{
    end: false
})
//ex.fast_slash=true;
//console.log(ex);

console.log(ex.exec('/user/kkk'));



