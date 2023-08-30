'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const MARK_KBD = 'kbd';
/**
 * Enables support for code formatting
 */

const createKbdPlugin = plateCommon.createPluginFactory({
  key: MARK_KBD,
  isLeaf: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  deserializeHtml: {
    rules: [{
      validNodeName: ['KBD']
    }, {
      validStyle: {
        wordWrap: 'break-word'
      }
    }]
  }
});

exports.MARK_KBD = MARK_KBD;
exports.createKbdPlugin = createKbdPlugin;
//# sourceMappingURL=index.js.map
