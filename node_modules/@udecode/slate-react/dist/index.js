'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slateReact = require('slate-react');
var slate = require('@udecode/slate');

/**
 * Blur the editor.
 */
const blurEditor = editor => slateReact.ReactEditor.blur(editor);

/**
 * Deselect the editor.
 */
const deselectEditor = editor => slateReact.ReactEditor.deselect(editor);

/**
 * Find the DOM node that implements DocumentOrShadowRoot for the editor.
 */
const findEditorDocumentOrShadowRoot = editor => {
  try {
    return slateReact.ReactEditor.findDocumentOrShadowRoot(editor);
  } catch (e) {}
};

/**
 * {@link ReactEditor.findEventRange}
 */
const findEventRange = (editor, event) => {
  try {
    return slateReact.ReactEditor.findEventRange(editor, event);
  } catch (e) {}
};

/**
 * Find a key for a Slate node.
 */
const findNodeKey = (editor, node) => {
  try {
    return slateReact.ReactEditor.findKey(editor, node);
  } catch (e) {}
};

/**
 * Find the path of Slate node.
 */
const findNodePath = (editor, node) => {
  try {
    return slateReact.ReactEditor.findPath(editor, node);
  } catch (e) {}
};

/**
 * Focus the editor. Extension:
 *
 * If `target` is defined:
 * - deselect the editor (otherwise it will focus the start of the editor)
 * - select the editor
 * - focus the editor
 */
const focusEditor = (editor, target) => {
  if (target) {
    slate.withoutNormalizing(editor, () => {
      slate.deselect(editor);
      slate.select(editor, target);
    });
  }

  slateReact.ReactEditor.focus(editor);
};

/**
 * Return the host window of the current editor.
 */
const getEditorWindow = editor => {
  try {
    return slateReact.ReactEditor.getWindow(editor);
  } catch (e) {}
};

/**
 * Check if a DOM node is within the editor.
 */
const hasEditorDOMNode = (editor, target, options) => {
  try {
    return slateReact.ReactEditor.hasDOMNode(editor, target, options);
  } catch (e) {}

  return false;
};

/**
 * Check if the target is editable and in the editor.
 */
const hasEditorEditableTarget = (editor, target) => {
  try {
    return slateReact.ReactEditor.hasEditableTarget(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Check if the target can be selectable.
 */
const hasEditorSelectableTarget = (editor, target) => {
  try {
    return slateReact.ReactEditor.hasSelectableTarget(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Check if the target is in the editor.
 */
const hasEditorTarget = (editor, target) => {
  try {
    return slateReact.ReactEditor.hasTarget(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Insert data from a `DataTransfer` into the editor.
 */
const insertData = (editor, data) => slateReact.ReactEditor.insertData(editor, data);

/**
 * Check if the user is currently composing inside the editor.
 */
const isComposing = editor => slateReact.ReactEditor.isComposing(editor);

/**
 * Check if the editor is focused.
 */
const isEditorFocused = editor => slateReact.ReactEditor.isFocused(editor);

/**
 * Check if the editor is in read-only mode.
 */
const isEditorReadOnly = editor => slateReact.ReactEditor.isReadOnly(editor);

/**
 * Check if the target is inside void and in an non-readonly editor.
 */
const isTargetInsideNonReadonlyVoid = (editor, target) => {
  try {
    return slateReact.ReactEditor.isTargetInsideNonReadonlyVoid(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Sets data from the currently selected fragment on a `DataTransfer`.
 */
const setFragmentData = (editor, data) => slateReact.ReactEditor.setFragmentData(editor, data);

/**
 * Find the native DOM element from a Slate node.
 */
const toDOMNode = (editor, node) => {
  try {
    return slateReact.ReactEditor.toDOMNode(editor, node);
  } catch (e) {}
};

/**
 * Find a native DOM selection point from a Slate point.
 */
const toDOMPoint = (editor, point) => {
  try {
    return slateReact.ReactEditor.toDOMPoint(editor, point);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toDOMRange}
 */
const toDOMRange = (editor, range) => {
  try {
    return slateReact.ReactEditor.toDOMRange(editor, range);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toSlateNode}
 */
const toSlateNode = (editor, domNode) => {
  try {
    return slateReact.ReactEditor.toSlateNode(editor, domNode);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toSlatePoint}
 */
const toSlatePoint = (editor, domPoint, options) => {
  try {
    return slateReact.ReactEditor.toSlatePoint(editor, domPoint, options);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toSlateRange}
 */
const toSlateRange = (editor, domRange, options) => {
  try {
    return slateReact.ReactEditor.toSlateRange(editor, domRange, options);
  } catch (e) {}
};

exports.blurEditor = blurEditor;
exports.deselectEditor = deselectEditor;
exports.findEditorDocumentOrShadowRoot = findEditorDocumentOrShadowRoot;
exports.findEventRange = findEventRange;
exports.findNodeKey = findNodeKey;
exports.findNodePath = findNodePath;
exports.focusEditor = focusEditor;
exports.getEditorWindow = getEditorWindow;
exports.hasEditorDOMNode = hasEditorDOMNode;
exports.hasEditorEditableTarget = hasEditorEditableTarget;
exports.hasEditorSelectableTarget = hasEditorSelectableTarget;
exports.hasEditorTarget = hasEditorTarget;
exports.insertData = insertData;
exports.isComposing = isComposing;
exports.isEditorFocused = isEditorFocused;
exports.isEditorReadOnly = isEditorReadOnly;
exports.isTargetInsideNonReadonlyVoid = isTargetInsideNonReadonlyVoid;
exports.setFragmentData = setFragmentData;
exports.toDOMNode = toDOMNode;
exports.toDOMPoint = toDOMPoint;
exports.toDOMRange = toDOMRange;
exports.toSlateNode = toSlateNode;
exports.toSlatePoint = toSlatePoint;
exports.toSlateRange = toSlateRange;
//# sourceMappingURL=index.js.map
