'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');

const decorateFindReplace = (editor, {
  key,
  type
}) => ([node, path]) => {
  const ranges = [];
  const {
    search
  } = editor.pluginsByKey[key].options;

  if (!search || !plateCommon.isText(node)) {
    return ranges;
  }

  const {
    text
  } = node;
  const parts = text.toLowerCase().split(search.toLowerCase());
  let offset = 0;
  parts.forEach((part, i) => {
    if (i !== 0) {
      ranges.push({
        anchor: {
          path,
          offset: offset - search.length
        },
        focus: {
          path,
          offset
        },
        search,
        [type]: true
      });
    }

    offset = offset + part.length + search.length;
  });
  return ranges;
};

const MARK_SEARCH_HIGHLIGHT = 'search_highlight';
const createFindReplacePlugin = plateCommon.createPluginFactory({
  key: MARK_SEARCH_HIGHLIGHT,
  isLeaf: true,
  decorate: decorateFindReplace
});

exports.MARK_SEARCH_HIGHLIGHT = MARK_SEARCH_HIGHLIGHT;
exports.createFindReplacePlugin = createFindReplacePlugin;
exports.decorateFindReplace = decorateFindReplace;
//# sourceMappingURL=index.js.map
