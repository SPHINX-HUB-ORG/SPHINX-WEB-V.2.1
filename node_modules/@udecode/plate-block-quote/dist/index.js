'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const ELEMENT_BLOCKQUOTE = 'blockquote';
/**
 * Enables support for block quotes, useful for
 * quotations and passages.
 */

const createBlockquotePlugin = plateCommon.createPluginFactory({
  key: ELEMENT_BLOCKQUOTE,
  isElement: true,
  deserializeHtml: {
    rules: [{
      validNodeName: 'BLOCKQUOTE'
    }]
  },
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleElement
  },
  options: {
    hotkey: 'mod+shift+.'
  }
});

exports.ELEMENT_BLOCKQUOTE = ELEMENT_BLOCKQUOTE;
exports.createBlockquotePlugin = createBlockquotePlugin;
//# sourceMappingURL=index.js.map
