"use strict";
exports.__esModule = true;
function default_1(string) {
    return encodeURIComponent(string).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
exports["default"] = default_1;
