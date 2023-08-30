'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const ELEMENT_HR = 'hr';
const createHorizontalRulePlugin = plateCommon.createPluginFactory({
  key: ELEMENT_HR,
  isElement: true,
  isVoid: true,
  deserializeHtml: {
    rules: [{
      validNodeName: 'HR'
    }]
  }
});

exports.ELEMENT_HR = ELEMENT_HR;
exports.createHorizontalRulePlugin = createHorizontalRulePlugin;
//# sourceMappingURL=index.js.map
