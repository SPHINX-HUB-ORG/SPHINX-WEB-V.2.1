'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const MARK_BOLD = 'bold';
/**
 * Enables support for bold formatting
 */

const createBoldPlugin = plateCommon.createPluginFactory({
  key: MARK_BOLD,
  isLeaf: true,
  deserializeHtml: {
    rules: [{
      validNodeName: ['STRONG', 'B']
    }, {
      validStyle: {
        fontWeight: ['600', '700', 'bold']
      }
    }],
    query: el => !plateCommon.someHtmlElement(el, node => node.style.fontWeight === 'normal')
  },
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  options: {
    hotkey: 'mod+b'
  }
});

const MARK_CODE = 'code';
/**
 * Enables support for code formatting
 */

const createCodePlugin = plateCommon.createPluginFactory({
  key: MARK_CODE,
  isLeaf: true,
  deserializeHtml: {
    rules: [{
      validNodeName: ['CODE']
    }, {
      validStyle: {
        wordWrap: 'break-word'
      }
    }, {
      validStyle: {
        fontFamily: 'Consolas'
      }
    }],

    query(el) {
      const blockAbove = plateCommon.findHtmlParentElement(el, 'P');
      if ((blockAbove === null || blockAbove === void 0 ? void 0 : blockAbove.style.fontFamily) === 'Consolas') return false;
      return !plateCommon.findHtmlParentElement(el, 'PRE');
    }

  },
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  options: {
    hotkey: 'mod+e'
  }
});

const MARK_ITALIC = 'italic';
/**
 * Enables support for italic formatting.
 */

const createItalicPlugin = plateCommon.createPluginFactory({
  key: MARK_ITALIC,
  isLeaf: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  options: {
    hotkey: 'mod+i'
  },
  deserializeHtml: {
    rules: [{
      validNodeName: ['EM', 'I']
    }, {
      validStyle: {
        fontStyle: 'italic'
      }
    }],
    query: el => !plateCommon.someHtmlElement(el, node => node.style.fontStyle === 'normal')
  }
});

const MARK_STRIKETHROUGH = 'strikethrough';
/**
 * Enables support for strikethrough formatting.
 */

const createStrikethroughPlugin = plateCommon.createPluginFactory({
  key: MARK_STRIKETHROUGH,
  isLeaf: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  options: {
    hotkey: 'mod+shift+x'
  },
  deserializeHtml: {
    rules: [{
      validNodeName: ['S', 'DEL', 'STRIKE']
    }, {
      validStyle: {
        textDecoration: 'line-through'
      }
    }],
    query: el => !plateCommon.someHtmlElement(el, node => node.style.textDecoration === 'none')
  }
});

const MARK_SUBSCRIPT$1 = 'subscript';
const MARK_SUPERSCRIPT$1 = 'superscript';
/**
 * Enables support for subscript formatting.
 */

const createSubscriptPlugin = plateCommon.createPluginFactory({
  key: MARK_SUBSCRIPT$1,
  isLeaf: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  options: {
    hotkey: 'mod+,',
    clear: MARK_SUPERSCRIPT$1
  },
  deserializeHtml: {
    rules: [{
      validNodeName: ['SUB']
    }, {
      validStyle: {
        verticalAlign: 'sub'
      }
    }]
  }
});

const MARK_SUPERSCRIPT = 'superscript';
const MARK_SUBSCRIPT = 'subscript';
/**
 * Enables support for superscript formatting.
 */

const createSuperscriptPlugin = plateCommon.createPluginFactory({
  key: MARK_SUPERSCRIPT,
  isLeaf: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  options: {
    hotkey: 'mod+.',
    clear: MARK_SUBSCRIPT
  },
  deserializeHtml: {
    rules: [{
      validNodeName: ['SUP']
    }, {
      validStyle: {
        verticalAlign: 'super'
      }
    }]
  }
});

const MARK_UNDERLINE = 'underline';
/**
 * Enables support for underline formatting.
 */

const createUnderlinePlugin = plateCommon.createPluginFactory({
  key: MARK_UNDERLINE,
  isLeaf: true,
  handlers: {
    onKeyDown: plateCommon.onKeyDownToggleMark
  },
  options: {
    hotkey: 'mod+u'
  },
  deserializeHtml: {
    rules: [{
      validNodeName: ['U']
    }, {
      validStyle: {
        textDecoration: ['underline']
      }
    }],
    query: el => !plateCommon.someHtmlElement(el, node => node.style.textDecoration === 'none')
  }
});

/**
 * Enables support for basic marks:
 * - Bold
 * - Code
 * - Italic
 * - Strikethrough
 * - Subscript
 * - Superscript
 * - Underline
 */

const createBasicMarksPlugin = plateCommon.createPluginFactory({
  key: 'basicMarks',
  plugins: [createBoldPlugin(), createCodePlugin(), createItalicPlugin(), createStrikethroughPlugin(), createSubscriptPlugin(), createSuperscriptPlugin(), createUnderlinePlugin()]
});

exports.MARK_BOLD = MARK_BOLD;
exports.MARK_CODE = MARK_CODE;
exports.MARK_ITALIC = MARK_ITALIC;
exports.MARK_STRIKETHROUGH = MARK_STRIKETHROUGH;
exports.MARK_SUBSCRIPT = MARK_SUBSCRIPT$1;
exports.MARK_SUPERSCRIPT = MARK_SUPERSCRIPT;
exports.MARK_UNDERLINE = MARK_UNDERLINE;
exports.createBasicMarksPlugin = createBasicMarksPlugin;
exports.createBoldPlugin = createBoldPlugin;
exports.createCodePlugin = createCodePlugin;
exports.createItalicPlugin = createItalicPlugin;
exports.createStrikethroughPlugin = createStrikethroughPlugin;
exports.createSubscriptPlugin = createSubscriptPlugin;
exports.createSuperscriptPlugin = createSuperscriptPlugin;
exports.createUnderlinePlugin = createUnderlinePlugin;
//# sourceMappingURL=index.js.map
