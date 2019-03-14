"use strict";
exports.__esModule = true;
var isBuffer = require('is-buffer');
// flatten.flatten = flatte
function flatten(target, opts) {
    opts = opts || {};
    var delimiter = opts.delimiter || '.';
    var maxDepth = opts.maxDepth;
    var output = {};
    function step(object, prev, currentDepth) {
        currentDepth = currentDepth || 1;
        Object.keys(object).forEach(function (key) {
            var value = object[key];
            if (+key >= 0) {
                key = '' + (+key + 1);
            }
            var isarray = opts.safe && Array.isArray(value);
            var type = Object.prototype.toString.call(value);
            var isbuffer = isBuffer(value);
            var isobject = (type === '[object Object]' ||
                type === '[object Array]');
            var newKey = prev
                ? prev + delimiter + key
                : key;
            if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
                (!opts.maxDepth || currentDepth < maxDepth)) {
                return step(value, newKey, currentDepth + 1);
            }
            output[newKey] = encodeURIComponent(value);
        });
    }
    step(target);
    return output;
}
exports["default"] = flatten;
