'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const ELEMENT_PARAGRAPH = 'p';
/**
 * Enables support for paragraphs.
 */

const createParagraphPlugin = plateCommon.createPluginFactory({
  key: ELEMENT_PARAGRAPH,
  isElement: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleElement
  },
  options: {
    hotkey: ['mod+opt+0', 'mod+shift+0']
  },
  deserializeHtml: {
    rules: [{
      validNodeName: 'P'
    }],
    query: el => el.style.fontFamily !== 'Consolas'
  }
});

exports.ELEMENT_PARAGRAPH = ELEMENT_PARAGRAPH;
exports.createParagraphPlugin = createParagraphPlugin;
//# sourceMappingURL=index.js.map
