import { createEditor, Editor, Element, Range, Text, Transforms, Path, Point, Node } from 'slate';
import { HistoryEditor } from 'slate-history';

const createTEditor = () => createEditor();

/**
 * A helper type for getting the value of an editor.
 */

/**
 * Get editor with typed methods and operations.
 * Note that it can't be used as a parameter of type TEditor.
 */
const getTEditor = editor => editor;

/**
 * Add a custom property to the leaf text nodes in the current selection.
 *
 * If the selection is currently collapsed, the marks will be added to the
 * `editor.marks` property instead, and applied when text is inserted next.
 */
const addMark = (editor, key, value) => Editor.addMark(editor, key, value);

/**
 * Create a mutable ref for a `Path` object, which will stay in sync as new
 * operations are applied to the editor.
 */
const createPathRef = (editor, at, options) => Editor.pathRef(editor, at, options);

/**
 * Create a mutable ref for a `Point` object, which will stay in sync as new
 * operations are applied to the editor.
 */
const createPointRef = (editor, point, options) => Editor.pointRef(editor, point, options);

/**
 * Create a mutable ref for a `Range` object, which will stay in sync as new
 * operations are applied to the editor.
 */
const createRangeRef = (editor, range, options) => Editor.rangeRef(editor, range, options);

/**
 * Delete content in the editor backward from the current selection.
 */
const deleteBackward = (editor, options) => Editor.deleteBackward(editor, options);

/**
 * Delete content in the editor forward from the current selection.
 */
const deleteForward = (editor, options) => Editor.deleteForward(editor, options);

/**
 * Delete the content in the current selection.
 */
const deleteFragment = (editor, options) => Editor.deleteFragment(editor, options);

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}

var castArray_1 = castArray;

/**
 * Check if an element matches set of properties.
 *
 * Note: this checks custom properties, and it does not ensure that any
 * children are equivalent.
 */
const elementMatches = (element, props) => Element.matches(element, props);

/**
 * Check if a value implements the 'Element' interface.
 */
const isElement = value => Element.isElement(value);

/**
 * Check if a value is an array of `Element` objects.
 */
const isElementList = value => Element.isElementList(value);

/**
 * Check if a value is a block `Element` object.
 */
const isBlock = (editor, value) => isElement(value) && Editor.isBlock(editor, value);

/**
 * Match the object with a predicate object or function.
 * If predicate is:
 * - object: every predicate key/value should be in obj.
 * - function: it should return true.
 */
const match = (obj, path, predicate) => {
  if (!predicate) return true;

  if (typeof predicate === 'object') {
    return Object.entries(predicate).every(([key, value]) => {
      const values = castArray_1(value);

      return values.includes(obj[key]);
    });
  }

  return predicate(obj, path);
};
/**
 * Extended query options for slate queries:
 * - `match` can be an object predicate where one of the values should include the node value.
 * Example: { type: ['1', '2'] } will match the nodes having one of these 2 types.
 */

const getQueryOptions = (editor, options = {}) => {
  const {
    match: _match,
    block
  } = options;
  return { ...options,
    match: _match || block ? (n, path) => match(n, path, _match) && (!block || isBlock(editor, n)) : undefined
  };
};

/**
 * Get the ancestor above a location in the document.
 */
const getAboveNode = (editor, options) => Editor.above(editor, getQueryOptions(editor, options));

/**
 * Convert a range into a non-hanging one if:
 * - `unhang` is true,
 * - `at` (default: selection) is a range.
 */
const unhangRange = (editor, range, options = {}) => {
  const {
    voids,
    unhang = true
  } = options;

  if (Range.isRange(range) && unhang) {
    return Editor.unhangRange(editor, range, {
      voids
    });
  }
};

/**
 * Iterate through all of the nodes in the Editor.
 */
const getNodeEntries = (editor, options) => {
  unhangRange(editor, options === null || options === void 0 ? void 0 : options.at, options);
  return Editor.nodes(editor, getQueryOptions(editor, options));
};

/**
 * Get the parent node of a location.
 * Returns undefined if there is no parent.
 */
const getParentNode = (editor, at, options) => {
  try {
    return Editor.parent(editor, at, options);
  } catch (err) {}
};

/**
 * Get the matching node in the branch of the document before a location.
 */
const getPreviousNode = (editor, options) => Editor.previous(editor, options);

/**
 * Check if an element is empty, accounting for void nodes.
 */
const isElementEmpty = (editor, element) => Editor.isEmpty(editor, element);

/**
 * Call a function, deferring normalization until after it completes
 * @return true if normalized.
 */
const withoutNormalizing = (editor, fn) => {
  let normalized = false;
  Editor.withoutNormalizing(editor, () => {
    normalized = !!fn();
  });
  return normalized;
};

/**
 * Check if a value implements the `Text` interface.
 */
const isText = value => Text.isText(value);

const hasSingleChild = node => {
  if (isText(node)) {
    return true;
  }

  return node.children.length === 1 && hasSingleChild(node.children[0]);
};

/**
 * Delete content in the editor.
 */
const deleteText = (editor, options) => {
  Transforms.delete(editor, options);
};

/**
 * Move the nodes at a location to a new location.
 */
const moveNodes = (editor, options) => Transforms.moveNodes(editor, options);

/**
 * Remove the nodes at a specific location in the document.
 */
const removeNodes = (editor, options) => Transforms.removeNodes(editor, options);

/**
 * Set the selection to a new value.
 */
const select = (editor, target) => {
  Transforms.select(editor, target);
};

/**
 * Merge a node at a location with the previous node of the same depth,
 * removing any empty containing nodes after the merge if necessary.
 */
const mergeNodes = (editor, options = {}) => {
  withoutNormalizing(editor, () => {
    let {
      match,
      at = editor.selection
    } = options;
    const {
      mergeNode,
      removeEmptyAncestor,
      hanging = false,
      voids = false,
      mode = 'lowest'
    } = options;

    if (!at) {
      return;
    }

    if (match == null) {
      if (Path.isPath(at)) {
        const [parent] = getParentNode(editor, at);

        match = n => parent.children.includes(n);
      } else {
        match = n => isBlock(editor, n);
      }
    }

    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor, at);
    }

    if (Range.isRange(at)) {
      if (Range.isCollapsed(at)) {
        at = at.anchor;
      } else {
        const [, end] = Range.edges(at);
        const pointRef = createPointRef(editor, end);
        deleteText(editor, {
          at
        });
        at = pointRef.unref();

        if (options.at == null) {
          select(editor, at);
        }
      }
    }

    const _nodes = getNodeEntries(editor, {
      at,
      match,
      voids,
      mode
    });

    const [current] = Array.from(_nodes);
    const prev = getPreviousNode(editor, {
      at,
      match,
      voids,
      mode
    });

    if (!current || !prev) {
      return;
    }

    const [node, path] = current;
    const [prevNode, prevPath] = prev;

    if (path.length === 0 || prevPath.length === 0) {
      return;
    }

    const newPath = Path.next(prevPath);
    const commonPath = Path.common(path, prevPath);
    const isPreviousSibling = Path.isSibling(path, prevPath);

    const _levels = Editor.levels(editor, {
      at: path
    });

    const levels = Array.from(_levels, ([n]) => n).slice(commonPath.length).slice(0, -1); // Determine if the merge will leave an ancestor of the path empty as a
    // result, in which case we'll want to remove it after merging.

    const emptyAncestor = getAboveNode(editor, {
      at: path,
      mode: 'highest',
      match: n => levels.includes(n) && isElement(n) && hasSingleChild(n)
    });
    const emptyRef = emptyAncestor && createPathRef(editor, emptyAncestor[1]);
    let properties;
    let position; // Ensure that the nodes are equivalent, and figure out what the position
    // and extra properties of the merge will be.

    if (isText(node) && isText(prevNode)) {
      const {
        text,
        ...rest
      } = node;
      position = prevNode.text.length;
      properties = rest;
    } else if (isElement(node) && isElement(prevNode)) {
      const {
        children,
        ...rest
      } = node;
      position = prevNode.children.length;
      properties = rest;
    } else {
      throw new Error(`Cannot merge the node at path [${path}] with the previous sibling because it is not the same kind: ${JSON.stringify(node)} ${JSON.stringify(prevNode)}`);
    } // If the node isn't already the next sibling of the previous node, move
    // it so that it is before merging.


    if (!isPreviousSibling) {
      // DIFF
      if (!mergeNode) {
        moveNodes(editor, {
          at: path,
          to: newPath,
          voids
        });
      }
    } // If there was going to be an empty ancestor of the node that was merged,
    // we remove it from the tree.


    if (emptyRef) {
      // DIFF: start
      if (!removeEmptyAncestor) {
        removeNodes(editor, {
          at: emptyRef.current,
          voids
        });
      } else {
        const emptyPath = emptyRef.current;
        emptyPath && removeEmptyAncestor(editor, {
          at: emptyPath
        });
      } // DIFF: end

    } // If the target node that we're merging with is empty, remove it instead
    // of merging the two. This is a common rich text editor behavior to
    // prevent losing formatting when deleting entire nodes when you have a
    // hanging selection.
    // DIFF: start


    if (mergeNode) {
      mergeNode(editor, {
        at: path,
        to: newPath
      }); // DIFF: end
    } else if (isElement(prevNode) && isElementEmpty(editor, prevNode) || isText(prevNode) && prevNode.text === '') {
      removeNodes(editor, {
        at: prevPath,
        voids
      });
    } else {
      editor.apply({
        type: 'merge_node',
        path: newPath,
        position,
        properties
      });
    }

    if (emptyRef) {
      emptyRef.unref();
    }
  });
};

/**
 * Get the end point of a location.
 */
const getEndPoint = (editor, at) => Editor.end(editor, at);

/**
 * Get the leaf text node at a location.
 */
const getLeafNode = (editor, at, options) => Editor.leaf(editor, at, options);

/**
 * Get the point after a location.
 */
const getPointAfter = (editor, at, options) => Editor.after(editor, at, options);

/**
 * Get the point before a location.
 */
const getPointBefore = (editor, at, options) => Editor.before(editor, at, options);

/**
 * Get the start point of a location.
 */
const getStartPoint = (editor, at) => Editor.start(editor, at);

/**
 * Match a void node in the current branch of the editor.
 */
const getVoidNode = (editor, options) => Editor.void(editor, options);

/**
 * Check if a value is a void `Element` object.
 */
const isVoid = (editor, value) => {
  return isElement(value) && Editor.isVoid(editor, value);
};

const deleteMerge = (editor, options = {}) => {
  withoutNormalizing(editor, () => {
    const {
      reverse = false,
      unit = 'character',
      distance = 1,
      voids = false
    } = options;
    let {
      at = editor.selection,
      hanging = false
    } = options;

    if (!at) {
      return;
    }

    if (Range.isRange(at) && Range.isCollapsed(at)) {
      at = at.anchor;
    }

    if (Point.isPoint(at)) {
      const furthestVoid = getVoidNode(editor, {
        at,
        mode: 'highest'
      });

      if (!voids && furthestVoid) {
        const [, voidPath] = furthestVoid;
        at = voidPath;
      } else {
        const opts = {
          unit,
          distance
        };
        const target = reverse ? getPointBefore(editor, at, opts) || getStartPoint(editor, []) : getPointAfter(editor, at, opts) || getEndPoint(editor, []);
        at = {
          anchor: at,
          focus: target
        };
        hanging = true;
      }
    }

    if (Path.isPath(at)) {
      removeNodes(editor, {
        at,
        voids
      });
      return;
    }

    if (Range.isCollapsed(at)) {
      return;
    }

    if (!hanging) {
      at = Editor.unhangRange(editor, at, {
        voids
      });
    }

    let [start, end] = Range.edges(at);
    const startBlock = getAboveNode(editor, {
      match: n => isBlock(editor, n),
      at: start,
      voids
    });
    const endBlock = getAboveNode(editor, {
      match: n => isBlock(editor, n),
      at: end,
      voids
    });
    const isAcrossBlocks = startBlock && endBlock && !Path.equals(startBlock[1], endBlock[1]);
    const isSingleText = Path.equals(start.path, end.path);
    const startVoid = voids ? null : getVoidNode(editor, {
      at: start,
      mode: 'highest'
    });
    const endVoid = voids ? null : getVoidNode(editor, {
      at: end,
      mode: 'highest'
    }); // If the start or end points are inside an inline void, nudge them out.

    if (startVoid) {
      const before = getPointBefore(editor, start);

      if (before && startBlock && Path.isAncestor(startBlock[1], before.path)) {
        start = before;
      }
    }

    if (endVoid) {
      const after = getPointAfter(editor, end);

      if (after && endBlock && Path.isAncestor(endBlock[1], after.path)) {
        end = after;
      }
    } // Get the highest nodes that are completely inside the range, as well as
    // the start and end nodes.


    const matches = [];
    let lastPath;

    const _nodes = getNodeEntries(editor, {
      at,
      voids
    });

    for (const entry of _nodes) {
      const [node, path] = entry;

      if (lastPath && Path.compare(path, lastPath) === 0) {
        continue;
      }

      if (!voids && isVoid(editor, node) || !Path.isCommon(path, start.path) && !Path.isCommon(path, end.path)) {
        matches.push(entry);
        lastPath = path;
      }
    }

    const pathRefs = Array.from(matches, ([, p]) => createPathRef(editor, p));
    const startRef = createPointRef(editor, start);
    const endRef = createPointRef(editor, end);

    if (!isSingleText && !startVoid) {
      const point = startRef.current;
      const [node] = getLeafNode(editor, point);
      const {
        path
      } = point;
      const {
        offset
      } = start;
      const text = node.text.slice(offset);
      editor.apply({
        type: 'remove_text',
        path,
        offset,
        text
      });
    }

    for (const pathRef of pathRefs) {
      const path = pathRef.unref();
      removeNodes(editor, {
        at: path,
        voids
      });
    }

    if (!endVoid) {
      const point = endRef.current;
      const [node] = getLeafNode(editor, point);
      const {
        path
      } = point;
      const offset = isSingleText ? start.offset : 0;
      const text = node.text.slice(offset, end.offset);
      editor.apply({
        type: 'remove_text',
        path,
        offset,
        text
      });
    }

    if (!isSingleText && isAcrossBlocks && endRef.current && startRef.current) {
      // DIFF: allow custom mergeNodes
      mergeNodes(editor, {
        at: endRef.current,
        hanging: true,
        voids
      });
    }

    const point = endRef.unref() || startRef.unref();

    if (options.at == null && point) {
      select(editor, point);
    }
  });
};

/**
 * Get the start and end points of a location.
 */
const getEdgePoints = (editor, at) => Editor.edges(editor, at);

/**
 * Get the text string content of a location.
 *
 * Note: by default the text of void nodes is considered to be an empty
 * string, regardless of content, unless you pass in true for the voids option
 */
const getEditorString = (editor, at, options) => {
  if (!at) return '';

  try {
    return Editor.string(editor, at, options);
  } catch (error) {
    return '';
  }
};

/**
 * Get the first node at a location.
 */
const getFirstNode = (editor, at) => Editor.first(editor, at);

/**
 * Get the fragment at a location.
 */
const getFragment = (editor, at) => Editor.fragment(editor, at);

/**
 * Get the last node at a location.
 */
const getLastNode = (editor, at) => Editor.last(editor, at);

/**
 * Iterate through all of the levels at a location.
 */
const getLevels = (editor, options) => Editor.levels(editor, options);

/**
 * Get the marks that would be added to text at the current selection.
 */
const getMarks = editor => Editor.marks(editor);

/**
 * Get the matching node in the branch of the document after a location.
 */
const getNextNode = (editor, options) => Editor.next(editor, options);

/**
 * Get the node at a location.
 */
const getNodeEntry = (editor, at, options) => {
  try {
    return Editor.node(editor, at, options);
  } catch (err) {}
};

/**
 * Get the path of a location.
 */
const getPath = (editor, at, options) => Editor.path(editor, at, options);

/**
 * Get the set of currently tracked path refs of the editor.
 */
const getPathRefs = editor => Editor.pathRefs(editor);

/**
 * Get the start or end point of a location.
 */
const getPoint = (editor, at, options) => Editor.point(editor, at, options);

/**
 * Get the set of currently tracked point refs of the editor.
 */
const getPointRefs = editor => Editor.pointRefs(editor);

/**
 * Iterate through all of the positions in the document where a `Point` can be
 * placed.
 *
 * By default it will move forward by individual offsets at a time,  but you
 * can pass the `unit: 'character'` option to moved forward one character, word,
 * or line at at time.
 *
 * Note: By default void nodes are treated as a single point and iteration
 * will not happen inside their content unless you pass in true for the
 * voids option, then iteration will occur.
 */
const getPositions = (editor, options) => Editor.positions(editor, options);

/**
 * Get a range of a location.
 */
const getRange = (editor, at, to) => Editor.range(editor, at, to);

/**
 * Get the set of currently tracked range refs of the editor.
 */
const getRangeRefs = editor => Editor.rangeRefs(editor);

/**
 * Check if a node has block children.
 */
const hasBlocks = (editor, element) => Editor.hasBlocks(editor, element);

/**
 * Check if a node has inline and text children.
 */
const hasInlines = (editor, element) => Editor.hasInlines(editor, element);

/**
 * Check if a node has text children.
 */
const hasTexts = (editor, element) => Editor.hasTexts(editor, element);

/**
 * Insert a block break at the current selection.
 *
 * If the selection is currently expanded, it will be deleted first.
 */
const insertBreak = editor => Editor.insertBreak(editor);

/**
 * Insert a node at the current selection.
 *
 * If the selection is currently expanded, it will be deleted first.
 */
const insertNode = (editor, node) => Editor.insertNode(editor, node);

/**
 * Check if a point is an edge of a location.
 */
const isEdgePoint = (editor, point, at) => Editor.isEdge(editor, point, at);

/**
 * Check if a value is an `Editor` object.
 */
const isEditor = value => Editor.isEditor(value);

/**
 * Check if the editor is currently normalizing after each operation.
 */
const isEditorNormalizing = editor => Editor.isNormalizing(editor);

/**
 * Check if a point is the end point of a location.
 * If point is null, return false.
 */
const isEndPoint = (editor, point, at) => !!point && Editor.isEnd(editor, point, at);

/**
 * Check if a value is an inline `Element` object.
 */
const isInline = (editor, value) => isElement(value) && Editor.isInline(editor, value);

/**
 * Check if a point is the start point of a location.
 * If point is null, return false.
 */
const isStartPoint = (editor, point, at) => !!point && Editor.isStart(editor, point, at);

/**
 * Normalize any dirty objects in the editor.
 */
const normalizeEditor = (editor, options) => Editor.normalize(editor, options);

/**
 * Remove a custom property from all of the leaf text nodes in the current
 * selection.
 *
 * If the selection is currently collapsed, the removal will be stored on
 * `editor.marks` and applied to the text inserted next.
 */
const removeEditorMark = (editor, key) => Editor.removeMark(editor, key);

/**
 * {@link HistoryEditor.isHistoryEditor}
 */
const isHistoryEditor = value => HistoryEditor.isHistoryEditor(value);

/**
 * {@link HistoryEditor.isMerging}
 */
const isHistoryMerging = editor => HistoryEditor.isMerging(editor);

/**
 * {@link HistoryEditor.isSaving}
 */
const isHistorySaving = editor => HistoryEditor.isSaving(editor);

/**
 * {@link HistoryEditor.withoutMerging}
 */
const withoutMergingHistory = (editor, fn) => HistoryEditor.withoutMerging(editor, fn);

/**
 * {@link HistoryEditor.withoutSaving}
 */
const withoutSavingHistory = (editor, fn) => HistoryEditor.withoutSaving(editor, fn);

const isDescendant = node => isElement(node) || isText(node);

/**
 * Get an entry for the common ancesetor node of two paths.
 */
const getCommonNode = (root, path, another) => Node.common(root, path, another);

/**
 * Check if a value is a list of `Text` objects.
 */
const isTextList = value => Text.isTextList(value);

/**
 * Check if two text nodes are equal.
 */
const textEquals = (text, another) => Text.equals(text, another);

/**
 * Check if an text matches set of properties.
 *
 * Note: this is for matching custom properties, and it does not ensure that
 * the `text` property are two nodes equal.
 */
const textMatches = (text, props) => Text.matches(text, props);

/**
 * Get the descendant node referred to by a specific path.
 * If the path is an empty array, it refers to the root node itself.
 * If the node is not found, return null.
 * Based on Slate get and has, performance optimization without overhead of
 * stringify on throwing
 */
const getNode = (root, path) => {
  try {
    for (let i = 0; i < path.length; i++) {
      const p = path[i];

      if (isText(root) || !root.children[p]) {
        return null;
      }

      root = root.children[p];
    }

    return root;
  } catch (e) {
    return null;
  }
};

/**
 * Get the node at a specific path, asserting that it's an ancestor node.
 */
const getNodeAncestor = (root, path) => Node.ancestor(root, path);

/**
 * Return a generator of all the ancestor nodes above a specific path.
 *
 * By default the order is bottom-up, from lowest to highest ancestor in
 * the tree, but you can pass the `reverse: true` option to go top-down.
 */
const getNodeAncestors = (root, path, options) => Node.ancestors(root, path, options);

/**
 * Get the child of a node at a specific index.
 */
const getNodeChild = (root, index) => Node.child(root, index);

/**
 * Iterate over the children of a node at a specific path.
 */
const getNodeChildren = (root, path, options) => Node.children(root, path, options);

/**
 * Get the node at a specific path, asserting that it's a descendant node.
 */
const getNodeDescendant = (root, path) => Node.descendant(root, path);

/**
 * Return a generator of all the descendant node entries inside a root node.
 */
const getNodeDescendants = (root, options) => Node.descendants(root, options);

/**
 * Return a generator of all the element nodes inside a root node. Each iteration
 * will return an `ElementEntry` tuple consisting of `[Element, Path]`. If the
 * root node is an element it will be included in the iteration as well.
 */
const getNodeElements = (root, options) => Node.elements(root, options);

/**
 * Get the first node entry in a root node from a path.
 */
const getNodeFirstNode = (root, path) => Node.first(root, path);

/**
 * Get the sliced fragment represented by a range inside a root node.
 */
const getNodeFragment = (root, range) => Node.fragment(root, range);

/**
 * Get the last node entry in a root node from a path.
 */
const getNodeLastNode = (root, path) => Node.last(root, path);

/**
 * Get the node at a specific path, ensuring it's a leaf text node.
 */
const getNodeLeaf = (root, path) => Node.leaf(root, path);

/**
 * Return a generator of the in a branch of the tree, from a specific path.
 *
 * By default the order is top-down, from lowest to highest node in the tree,
 * but you can pass the `reverse: true` option to go bottom-up.
 */
const getNodeLevels = (root, path, options) => Node.levels(root, path, options);

/**
 * Get the parent of a node at a specific path.
 */
const getNodeParent = (root, path) => Node.parent(root, path);

/**
 * Extract the custom properties from a node.
 */
const getNodeProps = node => Node.extractProps(node);

/**
 * Get the concatenated text string of a node's content.
 *
 * Note that this will not include spaces or line breaks between block nodes.
 * It is not a user-facing string, but a string for performing offset-related
 * computations for a node.
 */
const getNodeString = node => Node.string(node);

/**
 * Return a generator of all leaf text nodes in a root node.
 */
const getNodeTexts = (root, options) => Node.texts(root, options);

/**
 * Return a generator of all the node entries of a root node. Each entry is
 * returned as a `[Node, Path]` tuple, with the path referring to the node's
 * position inside the root node.
 */
const getNodes = (root, options) => Node.nodes(root, options);

/**
 * Check if a descendant node exists at a specific path.
 */
const hasNode = (root, path) => Node.has(root, path);

/**
 * Check if a value implements the 'Ancestor' interface.
 */
const isAncestor = value => Element.isAncestor(value);

/**
 * Check if a value implements the `Node` interface.
 */
const isNode = value => Node.isNode(value);

/**
 * Check if a value is a list of `Node` objects.
 */
const isNodeList = value => Node.isNodeList(value);

/**
 * Check if a node matches a set of props.
 */
const nodeMatches = (node, props) => Node.matches(node, props);

/**
 * See {@link Range.isCollapsed}.
 * Return false if `range` is not defined.
 */

const isCollapsed = range => !!range && Range.isCollapsed(range);

/**
 * See {@link Range.isExpanded}.
 * Return false if `range` is not defined.
 */

const isExpanded = range => !!range && Range.isExpanded(range);

/**
 * Collapse the selection.
 */
const collapseSelection = (editor, options) => {
  Transforms.collapse(editor, options);
};

/**
 * Unset the selection.
 */
const deselect = editor => {
  Transforms.deselect(editor);
};

/**
 * Insert a fragment at a specific location in the editor.
 */
const insertFragment = (editor, fragment, options) => {
  Transforms.insertFragment(editor, fragment, options);
};

/**
 * Insert nodes at a specific location in the Editor.
 */
const insertNodes = (editor, nodes, options) => Transforms.insertNodes(editor, nodes, options);

/**
 * Insert a string of text in the Editor.
 */
const insertText = (editor, text, options) => {
  Transforms.insertText(editor, text, options);
};

/**
 * Lift nodes at a specific location upwards in the document tree, splitting
 * their parent in two if necessary.
 */
const liftNodes = (editor, options) => Transforms.liftNodes(editor, options);

/**
 * Move the selection's point forward or backward.
 */
const moveSelection = (editor, options) => {
  Transforms.move(editor, options);
};

/**
 * Set new properties on the nodes at a location.
 */
const setNodes = (editor, props, options) => Transforms.setNodes(editor, props, options);

/**
 * Set new properties on one of the selection's points.
 */
const setPoint = (editor, props, options) => {
  Transforms.setPoint(editor, props, options);
};

/**
 * Set new properties on the selection.
 */
const setSelection = (editor, props) => {
  Transforms.setSelection(editor, props);
};

/**
 * Split the nodes at a specific location.
 */
const splitNodes = (editor, options) => Transforms.splitNodes(editor, options);

/**
 * Unset properties on the nodes at a location.
 */
const unsetNodes = (editor, props, options) => {
  return Transforms.unsetNodes(editor, props, options);
};

/**
 * Unwrap the nodes at a location from a parent node, splitting the parent if
 * necessary to ensure that only the content in the range is unwrapped.
 */
const unwrapNodes = (editor, options) => {
  Transforms.unwrapNodes(editor, getQueryOptions(editor, options));
};

/**
 * Wrap the nodes at a location in a new container node, splitting the edges
 * of the range first to ensure that only the content in the range is wrapped.
 */
const wrapNodes = (editor, element, options) => {
  unhangRange(editor, options === null || options === void 0 ? void 0 : options.at, options);
  Transforms.wrapNodes(editor, element, options);
};

/**
 * Query the node entry.
 */
const queryNode = (entry, {
  filter,
  allow,
  exclude,
  level,
  maxLevel
} = {}) => {
  if (!entry) return false;
  const [node, path] = entry;

  if (level) {
    const levels = castArray_1(level);

    if (!levels.includes(path.length)) {
      return false;
    }
  }

  if (maxLevel) {
    if (path.length > maxLevel) {
      return false;
    }
  }

  if (filter && !filter(entry)) {
    return false;
  }

  if (allow) {
    const allows = castArray_1(allow);

    if (allows.length && !allows.includes(node.type)) {
      return false;
    }
  }

  if (exclude) {
    const excludes = castArray_1(exclude);

    if (excludes.length && excludes.includes(node.type)) {
      return false;
    }
  }

  return true;
};

/**
 * Find node matching the condition.
 */
const findNode = (editor, options = {}) => {
  // Slate throws when things aren't found so we wrap in a try catch and return undefined on throw.
  try {
    const nodeEntries = getNodeEntries(editor, {
      at: editor.selection || [],
      ...getQueryOptions(editor, options)
    });

    for (const [node, path] of nodeEntries) {
      return [node, path];
    }
  } catch (error) {
    return undefined;
  }
};

/**
 * Iterate through all of the nodes in the editor and break early for the first truthy match. Otherwise
 * returns false.
 */

const someNode = (editor, options) => {
  return !!findNode(editor, options);
};

/**
 * Add marks to each node of a range.
 */
const addRangeMarks = (editor, props, {
  at = editor.selection
} = {}) => {
  if (at) {
    if (Path.isPath(at)) {
      at = getRange(editor, at);
    }

    const match = (node, path) => {
      if (!Text.isText(node)) {
        return false; // marks can only be applied to text
      }

      const parentEntry = Editor.parent(editor, path);
      if (!parentEntry) return false;
      const [parentNode] = parentEntry;
      return !editor.isVoid(parentNode) || editor.markableVoid(parentNode);
    };

    const isExpandedRange = Range.isExpanded(at);
    let markAcceptingVoidSelected = false;

    if (!isExpandedRange) {
      const selectedEntry = Editor.node(editor, at);
      if (!selectedEntry) return;
      const [selectedNode, selectedPath] = selectedEntry;

      if (selectedNode && match(selectedNode, selectedPath)) {
        const parentEntry = Editor.parent(editor, selectedPath);
        if (!parentEntry) return;
        const [parentNode] = parentEntry;
        markAcceptingVoidSelected = parentNode && editor.markableVoid(parentNode);
      }
    }

    if (isExpandedRange || markAcceptingVoidSelected) {
      Transforms.setNodes(editor, props, {
        match,
        split: true,
        voids: true,
        at
      });
    } // else {
    //   const marks = {
    //     ...(Editor.marks(editor as any) || {}),
    //     [key]: value,
    //   };
    //
    //   editor.marks = marks;
    //   if (!FLUSHING.get(editor as any)) {
    //     editor.onChange();
    //   }
    // }

  }
};

const setElements = (editor, props, options) => setNodes(editor, props, options);

/**
 * Unhang the range of length 1 so both edges are in the same text node.
 */

const unhangCharacterRange = (editor, at) => {
  let [start, end] = Range.edges(at);

  if (!Path.equals(start.path, end.path)) {
    if (end.offset === 0) {
      const pointAfter = getPointAfter(editor, start);

      if (pointAfter) {
        end = pointAfter;
      }
    } else {
      const pointBefore = getPointBefore(editor, end);

      if (pointBefore) {
        start = pointBefore;
      }
    }
  }

  return {
    anchor: start,
    focus: end
  };
};

export { addMark, addRangeMarks, collapseSelection, createPathRef, createPointRef, createRangeRef, createTEditor, deleteBackward, deleteForward, deleteFragment, deleteMerge, deleteText, deselect, elementMatches, findNode, getAboveNode, getCommonNode, getEdgePoints, getEditorString, getEndPoint, getFirstNode, getFragment, getLastNode, getLeafNode, getLevels, getMarks, getNextNode, getNode, getNodeAncestor, getNodeAncestors, getNodeChild, getNodeChildren, getNodeDescendant, getNodeDescendants, getNodeElements, getNodeEntries, getNodeEntry, getNodeFirstNode, getNodeFragment, getNodeLastNode, getNodeLeaf, getNodeLevels, getNodeParent, getNodeProps, getNodeString, getNodeTexts, getNodes, getParentNode, getPath, getPathRefs, getPoint, getPointAfter, getPointBefore, getPointRefs, getPositions, getPreviousNode, getQueryOptions, getRange, getRangeRefs, getStartPoint, getTEditor, getVoidNode, hasBlocks, hasInlines, hasNode, hasSingleChild, hasTexts, insertBreak, insertFragment, insertNode, insertNodes, insertText, isAncestor, isBlock, isCollapsed, isDescendant, isEdgePoint, isEditor, isEditorNormalizing, isElement, isElementEmpty, isElementList, isEndPoint, isExpanded, isHistoryEditor, isHistoryMerging, isHistorySaving, isInline, isNode, isNodeList, isStartPoint, isText, isTextList, isVoid, liftNodes, match, mergeNodes, moveNodes, moveSelection, nodeMatches, normalizeEditor, queryNode, removeEditorMark, removeNodes, select, setElements, setNodes, setPoint, setSelection, someNode, splitNodes, textEquals, textMatches, unhangCharacterRange, unhangRange, unsetNodes, unwrapNodes, withoutMergingHistory, withoutNormalizing, withoutSavingHistory, wrapNodes };
//# sourceMappingURL=index.es.js.map
