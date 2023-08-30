import { ReactEditor } from 'slate-react';
import { withoutNormalizing, deselect, select } from '@udecode/slate';

/**
 * Blur the editor.
 */
const blurEditor = editor => ReactEditor.blur(editor);

/**
 * Deselect the editor.
 */
const deselectEditor = editor => ReactEditor.deselect(editor);

/**
 * Find the DOM node that implements DocumentOrShadowRoot for the editor.
 */
const findEditorDocumentOrShadowRoot = editor => {
  try {
    return ReactEditor.findDocumentOrShadowRoot(editor);
  } catch (e) {}
};

/**
 * {@link ReactEditor.findEventRange}
 */
const findEventRange = (editor, event) => {
  try {
    return ReactEditor.findEventRange(editor, event);
  } catch (e) {}
};

/**
 * Find a key for a Slate node.
 */
const findNodeKey = (editor, node) => {
  try {
    return ReactEditor.findKey(editor, node);
  } catch (e) {}
};

/**
 * Find the path of Slate node.
 */
const findNodePath = (editor, node) => {
  try {
    return ReactEditor.findPath(editor, node);
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
    withoutNormalizing(editor, () => {
      deselect(editor);
      select(editor, target);
    });
  }

  ReactEditor.focus(editor);
};

/**
 * Return the host window of the current editor.
 */
const getEditorWindow = editor => {
  try {
    return ReactEditor.getWindow(editor);
  } catch (e) {}
};

/**
 * Check if a DOM node is within the editor.
 */
const hasEditorDOMNode = (editor, target, options) => {
  try {
    return ReactEditor.hasDOMNode(editor, target, options);
  } catch (e) {}

  return false;
};

/**
 * Check if the target is editable and in the editor.
 */
const hasEditorEditableTarget = (editor, target) => {
  try {
    return ReactEditor.hasEditableTarget(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Check if the target can be selectable.
 */
const hasEditorSelectableTarget = (editor, target) => {
  try {
    return ReactEditor.hasSelectableTarget(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Check if the target is in the editor.
 */
const hasEditorTarget = (editor, target) => {
  try {
    return ReactEditor.hasTarget(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Insert data from a `DataTransfer` into the editor.
 */
const insertData = (editor, data) => ReactEditor.insertData(editor, data);

/**
 * Check if the user is currently composing inside the editor.
 */
const isComposing = editor => ReactEditor.isComposing(editor);

/**
 * Check if the editor is focused.
 */
const isEditorFocused = editor => ReactEditor.isFocused(editor);

/**
 * Check if the editor is in read-only mode.
 */
const isEditorReadOnly = editor => ReactEditor.isReadOnly(editor);

/**
 * Check if the target is inside void and in an non-readonly editor.
 */
const isTargetInsideNonReadonlyVoid = (editor, target) => {
  try {
    return ReactEditor.isTargetInsideNonReadonlyVoid(editor, target);
  } catch (e) {}

  return false;
};

/**
 * Sets data from the currently selected fragment on a `DataTransfer`.
 */
const setFragmentData = (editor, data) => ReactEditor.setFragmentData(editor, data);

/**
 * Find the native DOM element from a Slate node.
 */
const toDOMNode = (editor, node) => {
  try {
    return ReactEditor.toDOMNode(editor, node);
  } catch (e) {}
};

/**
 * Find a native DOM selection point from a Slate point.
 */
const toDOMPoint = (editor, point) => {
  try {
    return ReactEditor.toDOMPoint(editor, point);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toDOMRange}
 */
const toDOMRange = (editor, range) => {
  try {
    return ReactEditor.toDOMRange(editor, range);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toSlateNode}
 */
const toSlateNode = (editor, domNode) => {
  try {
    return ReactEditor.toSlateNode(editor, domNode);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toSlatePoint}
 */
const toSlatePoint = (editor, domPoint, options) => {
  try {
    return ReactEditor.toSlatePoint(editor, domPoint, options);
  } catch (e) {}
};

/**
 * {@link ReactEditor.toSlateRange}
 */
const toSlateRange = (editor, domRange, options) => {
  try {
    return ReactEditor.toSlateRange(editor, domRange, options);
  } catch (e) {}
};

export { blurEditor, deselectEditor, findEditorDocumentOrShadowRoot, findEventRange, findNodeKey, findNodePath, focusEditor, getEditorWindow, hasEditorDOMNode, hasEditorEditableTarget, hasEditorSelectableTarget, hasEditorTarget, insertData, isComposing, isEditorFocused, isEditorReadOnly, isTargetInsideNonReadonlyVoid, setFragmentData, toDOMNode, toDOMPoint, toDOMRange, toSlateNode, toSlatePoint, toSlateRange };
//# sourceMappingURL=index.es.js.map
