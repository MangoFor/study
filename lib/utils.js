/**
 * Created by Mangotree on 2015/11/28.
 */

exports.flatten = function flatten(arr, ret) {
    ret = ret || [];
    var len = arr.length;
    for (var i = 0; i < len; ++i) {
        if (Array.isArray(arr[i])) {
            flatten(arr[i], ret);
        } else {
            ret.push(arr[i]);
        }
    }
    return ret;
};