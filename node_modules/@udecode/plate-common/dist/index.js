'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var plateUtils = require('@udecode/plate-utils');
var slate = require('@udecode/slate');
var slateReact = require('@udecode/slate-react');
var slateUtils = require('@udecode/slate-utils');
var utils = require('@udecode/utils');



Object.keys(plateCore).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateCore[k]; }
	});
});
Object.keys(plateUtils).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateUtils[k]; }
	});
});
Object.keys(slate).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return slate[k]; }
	});
});
Object.keys(slateReact).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return slateReact[k]; }
	});
});
Object.keys(slateUtils).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return slateUtils[k]; }
	});
});
Object.keys(utils).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return utils[k]; }
	});
});
//# sourceMappingURL=index.js.map
