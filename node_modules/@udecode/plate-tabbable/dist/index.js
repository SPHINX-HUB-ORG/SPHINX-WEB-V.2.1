'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var plateCommon = require('@udecode/plate-common');
var slate = require('slate');
var tabbable = require('tabbable');

const KEY_TABBABLE = 'tabbable';

const findTabDestination = (editor, {
  tabbableEntries,
  activeTabbableEntry,
  direction
}) => {
  var _editor$selection, _editor$selection$anc;

  if (activeTabbableEntry) {
    // Find the next tabbable entry after the active one
    const activeTabbableEntryIndex = tabbableEntries.indexOf(activeTabbableEntry);
    const nextTabbableEntryIndex = activeTabbableEntryIndex + (direction === 'forward' ? 1 : -1);
    const nextTabbableEntry = tabbableEntries[nextTabbableEntryIndex]; // If the next tabbable entry is in the same void, focus it

    if (nextTabbableEntry && slate.Path.equals(activeTabbableEntry.path, nextTabbableEntry.path)) {
      return {
        type: 'dom-node',
        domNode: nextTabbableEntry.domNode
      };
    } // Otherwise, focus the first path after the void


    if (direction === 'forward') {
      const pointAfter = plateCommon.getPointAfter(editor, activeTabbableEntry.path);
      if (!pointAfter) return null;
      return {
        type: 'path',
        path: pointAfter.path
      };
    }

    return {
      type: 'path',
      path: plateCommon.getPoint(editor, activeTabbableEntry.path).path
    };
  }

  const selectionPath = ((_editor$selection = editor.selection) === null || _editor$selection === void 0 ? void 0 : (_editor$selection$anc = _editor$selection.anchor) === null || _editor$selection$anc === void 0 ? void 0 : _editor$selection$anc.path) || []; // Find the first tabbable entry after the selection

  const nextTabbableEntry = direction === 'forward' ? tabbableEntries.find(entry => !slate.Path.isBefore(entry.path, selectionPath)) : [...tabbableEntries].reverse().find(entry => slate.Path.isBefore(entry.path, selectionPath)); // If it exists, focus it

  if (nextTabbableEntry) {
    return {
      type: 'dom-node',
      domNode: nextTabbableEntry.domNode
    };
  } // Otherwise, use the default behaviour


  return null;
};

const TabbableEffects = () => {
  const editor = plateCommon.useEditorState();
  const {
    query,
    globalEventListener,
    insertTabbableEntries,
    isTabbable
  } = plateCommon.getPluginOptions(editor, KEY_TABBABLE);
  react.useEffect(() => {
    const editorDOMNode = plateCommon.toDOMNode(editor, editor);
    if (!editorDOMNode) return;

    const handler = event => {
      var _ref;

      if (event.key !== 'Tab' || event.defaultPrevented || !query(editor, event)) return;
      const insertedTabbableEntries = insertTabbableEntries(editor, event);
      if (globalEventListener && event.target && ![editorDOMNode, ...insertedTabbableEntries.map(({
        domNode
      }) => domNode)].some(container => container.contains(event.target))) return;
      const tabbableDOMNodes = tabbable.tabbable(editorDOMNode);
      const defaultTabbableEntries = tabbableDOMNodes.map(domNode => {
        const slateNode = plateCommon.toSlateNode(editor, domNode);
        if (!slateNode) return;
        return {
          domNode,
          slateNode,
          path: plateCommon.findNodePath(editor, slateNode)
        };
      }).filter(entry => entry && isTabbable(editor, entry));
      const tabbableEntries = [...insertedTabbableEntries, ...defaultTabbableEntries].sort((a, b) => slate.Path.compare(a.path, b.path));
      const {
        activeElement
      } = document;
      const activeTabbableEntry = (_ref = activeElement && tabbableEntries.find(entry => entry.domNode === activeElement)) !== null && _ref !== void 0 ? _ref : null;
      const tabDestination = findTabDestination(editor, {
        tabbableEntries,
        activeTabbableEntry,
        direction: event.shiftKey ? 'backward' : 'forward'
      });

      if (tabDestination) {
        event.preventDefault();

        switch (tabDestination.type) {
          case 'path':
            plateCommon.focusEditor(editor, {
              anchor: {
                path: tabDestination.path,
                offset: 0
              },
              focus: {
                path: tabDestination.path,
                offset: 0
              }
            });
            break;

          case 'dom-node':
            tabDestination.domNode.focus();
            break;
        }

        return;
      }

      tabbableDOMNodes.forEach(domNode => {
        const oldTabIndex = domNode.getAttribute('tabindex');
        domNode.setAttribute('tabindex', '-1');
        setTimeout(() => {
          if (oldTabIndex) {
            domNode.setAttribute('tabindex', oldTabIndex);
          } else {
            domNode.removeAttribute('tabindex');
          }
        }, 0);
      });
    };

    const eventListenerNode = globalEventListener ? document.body : editorDOMNode;
    eventListenerNode.addEventListener('keydown', handler, true);
    return () => eventListenerNode.removeEventListener('keydown', handler, true);
  }, [editor, globalEventListener, isTabbable, insertTabbableEntries, query]);
  return null;
};

const createTabbablePlugin = plateCommon.createPluginFactory({
  key: KEY_TABBABLE,
  renderAfterEditable: TabbableEffects,
  options: {
    query: () => true,
    globalEventListener: false,
    insertTabbableEntries: () => [],
    isTabbable: (editor, tabbableEntry) => plateCommon.isVoid(editor, tabbableEntry.slateNode)
  }
});

exports.KEY_TABBABLE = KEY_TABBABLE;
exports.TabbableEffects = TabbableEffects;
exports.createTabbablePlugin = createTabbablePlugin;
exports.findTabDestination = findTabDestination;
//# sourceMappingURL=index.js.map
