/**
 * Created by Mangotree on 2015/12/2.
 */



module.exports = initCraetor;

function initCraetor(app){
    return function init(req,res,next){
        req.__proto__= app.request;
        res.__proto__= app.response;

        req.res=res;
        res.req=req;
        req.next=next;
        res.next=next;

        next();
    }
}
