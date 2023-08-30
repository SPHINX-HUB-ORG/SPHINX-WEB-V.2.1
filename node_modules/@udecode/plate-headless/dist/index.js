'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateAlignment = require('@udecode/plate-alignment');
var plateAutoformat = require('@udecode/plate-autoformat');
var plateBasicElements = require('@udecode/plate-basic-elements');
var plateBasicMarks = require('@udecode/plate-basic-marks');
var plateBlockQuote = require('@udecode/plate-block-quote');
var plateBreak = require('@udecode/plate-break');
var plateButton = require('@udecode/plate-button');
var plateCodeBlock = require('@udecode/plate-code-block');
var plateCombobox = require('@udecode/plate-combobox');
var plateComments = require('@udecode/plate-comments');
var plateCommon = require('@udecode/plate-common');
var plateEmoji = require('@udecode/plate-emoji');
var plateFindReplace = require('@udecode/plate-find-replace');
var plateFloating = require('@udecode/plate-floating');
var plateFont = require('@udecode/plate-font');
var plateHeading = require('@udecode/plate-heading');
var plateHighlight = require('@udecode/plate-highlight');
var plateHorizontalRule = require('@udecode/plate-horizontal-rule');
var plateIndent = require('@udecode/plate-indent');
var plateIndentList = require('@udecode/plate-indent-list');
var plateKbd = require('@udecode/plate-kbd');
var plateLineHeight = require('@udecode/plate-line-height');
var plateLink = require('@udecode/plate-link');
var plateList = require('@udecode/plate-list');
var plateMedia = require('@udecode/plate-media');
var plateMention = require('@udecode/plate-mention');
var plateNodeId = require('@udecode/plate-node-id');
var plateNormalizers = require('@udecode/plate-normalizers');
var plateParagraph = require('@udecode/plate-paragraph');
var plateResetNode = require('@udecode/plate-reset-node');
var plateSelect = require('@udecode/plate-select');
var plateSerializerCsv = require('@udecode/plate-serializer-csv');
var plateSerializerDocx = require('@udecode/plate-serializer-docx');
var plateSerializerHtml = require('@udecode/plate-serializer-html');
var plateSerializerMd = require('@udecode/plate-serializer-md');
var plateSuggestion = require('@udecode/plate-suggestion');
var plateTabbable = require('@udecode/plate-tabbable');
var plateTable = require('@udecode/plate-table');
var plateTrailingBlock = require('@udecode/plate-trailing-block');
var resizable = require('@udecode/resizable');



Object.keys(plateAlignment).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateAlignment[k]; }
	});
});
Object.keys(plateAutoformat).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateAutoformat[k]; }
	});
});
Object.keys(plateBasicElements).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateBasicElements[k]; }
	});
});
Object.keys(plateBasicMarks).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateBasicMarks[k]; }
	});
});
Object.keys(plateBlockQuote).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateBlockQuote[k]; }
	});
});
Object.keys(plateBreak).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateBreak[k]; }
	});
});
Object.keys(plateButton).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateButton[k]; }
	});
});
Object.keys(plateCodeBlock).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateCodeBlock[k]; }
	});
});
Object.keys(plateCombobox).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateCombobox[k]; }
	});
});
Object.keys(plateComments).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateComments[k]; }
	});
});
Object.keys(plateCommon).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateCommon[k]; }
	});
});
Object.keys(plateEmoji).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateEmoji[k]; }
	});
});
Object.keys(plateFindReplace).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateFindReplace[k]; }
	});
});
Object.keys(plateFloating).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateFloating[k]; }
	});
});
Object.keys(plateFont).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateFont[k]; }
	});
});
Object.keys(plateHeading).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateHeading[k]; }
	});
});
Object.keys(plateHighlight).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateHighlight[k]; }
	});
});
Object.keys(plateHorizontalRule).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateHorizontalRule[k]; }
	});
});
Object.keys(plateIndent).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateIndent[k]; }
	});
});
Object.keys(plateIndentList).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateIndentList[k]; }
	});
});
Object.keys(plateKbd).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateKbd[k]; }
	});
});
Object.keys(plateLineHeight).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateLineHeight[k]; }
	});
});
Object.keys(plateLink).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateLink[k]; }
	});
});
Object.keys(plateList).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateList[k]; }
	});
});
Object.keys(plateMedia).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateMedia[k]; }
	});
});
Object.keys(plateMention).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateMention[k]; }
	});
});
Object.keys(plateNodeId).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateNodeId[k]; }
	});
});
Object.keys(plateNormalizers).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateNormalizers[k]; }
	});
});
Object.keys(plateParagraph).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateParagraph[k]; }
	});
});
Object.keys(plateResetNode).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateResetNode[k]; }
	});
});
Object.keys(plateSelect).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateSelect[k]; }
	});
});
Object.keys(plateSerializerCsv).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateSerializerCsv[k]; }
	});
});
Object.keys(plateSerializerDocx).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateSerializerDocx[k]; }
	});
});
Object.keys(plateSerializerHtml).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateSerializerHtml[k]; }
	});
});
Object.keys(plateSerializerMd).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateSerializerMd[k]; }
	});
});
Object.keys(plateSuggestion).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateSuggestion[k]; }
	});
});
Object.keys(plateTabbable).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateTabbable[k]; }
	});
});
Object.keys(plateTable).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateTable[k]; }
	});
});
Object.keys(plateTrailingBlock).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return plateTrailingBlock[k]; }
	});
});
Object.keys(resizable).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return resizable[k]; }
	});
});
//# sourceMappingURL=index.js.map
