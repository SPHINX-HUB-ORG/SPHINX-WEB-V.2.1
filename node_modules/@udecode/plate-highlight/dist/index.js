'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const MARK_HIGHLIGHT = 'highlight';
/**
 * Enables support for highlights, useful when reviewing
 * content or highlighting it for future reference.
 */

const createHighlightPlugin = plateCommon.createPluginFactory({
  key: MARK_HIGHLIGHT,
  isLeaf: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  deserializeHtml: {
    rules: [{
      validNodeName: ['MARK']
    }]
  },
  options: {
    hotkey: 'mod+shift+h'
  }
});

exports.MARK_HIGHLIGHT = MARK_HIGHLIGHT;
exports.createHighlightPlugin = createHighlightPlugin;
//# sourceMappingURL=index.js.map
