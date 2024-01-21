"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var debugLogger = debug_1.default('aws-appsync');
var extend = function (category) {
    if (category === void 0) { category = ''; }
    var newCategory = category ? __spreadArrays(this.namespace.split(':'), [category]).join(':') : this.namespace;
    var result = debug_1.default(newCategory);
    result.extend = extend.bind(result);
    return result;
};
debugLogger.extend = extend.bind(debugLogger);
exports.default = debugLogger;
