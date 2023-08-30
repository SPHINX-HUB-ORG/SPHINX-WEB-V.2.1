'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var plateCommon = require('@udecode/plate-common');
var slateReact = require('slate-react');
var react = require('@floating-ui/react');
var reactDropdownMenu = require('@radix-ui/react-dropdown-menu');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var reactDropdownMenu__namespace = /*#__PURE__*/_interopNamespace(reactDropdownMenu);

const getDefaultBoundingClientRect = () => ({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: -9999,
  left: -9999,
  right: 9999,
  bottom: 9999
});
const createVirtualElement = () => ({
  getBoundingClientRect: getDefaultBoundingClientRect
});

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/**
 * Popover displayed over children, rendering `content`
 */
const Popover = ({
  floatingOptions,
  children,
  content,
  ...props
}) => {
  const {
    x,
    y,
    refs,
    strategy
  } = react.useFloating({
    middleware: [react.offset(12), react.flip({
      padding: 96
    }), react.shift()],
    whileElementsMounted: react.autoUpdate,
    ...floatingOptions
  });
  const {
    getReferenceProps
  } = react.useInteractions();
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React.cloneElement(children, getReferenceProps({
    ref: refs.setReference,
    ...children.props
  })), (floatingOptions === null || floatingOptions === void 0 ? void 0 : floatingOptions.open) && plateCommon.createElementAs('div', {
    ref: refs.setFloating,
    style: {
      position: strategy,
      top: y !== null && y !== void 0 ? y : 0,
      left: x !== null && x !== void 0 ? x : 0,
      zIndex: 1
    },
    contentEditable: false,
    children: content,
    ...props
  }));
};

/**
 * Popover displayed over an element if:
 * - not disabled
 * - not read-only
 * - element selected
 */

const ElementPopover = ({
  floatingOptions = {},
  ...props
}) => {
  const {
    disabled
  } = props;
  const readOnly = slateReact.useReadOnly();
  const selected = slateReact.useSelected();
  const editor = plateCommon.usePlateEditorState();
  return /*#__PURE__*/React__default["default"].createElement(Popover, _extends({
    floatingOptions: {
      open: !disabled && !readOnly && selected && plateCommon.isCollapsed(editor.selection),
      ...floatingOptions
    }
  }, props));
};

/**
 * Get bounding client rect by slate range
 */

const getRangeBoundingClientRect = (editor, at) => {
  if (!at) return getDefaultBoundingClientRect();
  const domRange = plateCommon.toDOMRange(editor, at);
  if (!domRange) return getDefaultBoundingClientRect();
  return domRange.getBoundingClientRect();
};

/**
 * Get bounding client rect of the window selection
 */

const getSelectionBoundingClientRect = () => {
  const domSelection = window.getSelection();

  if (!domSelection || domSelection.rangeCount < 1) {
    return getDefaultBoundingClientRect();
  }

  const domRange = domSelection.getRangeAt(0);
  return domRange.getBoundingClientRect();
};

/**
 * `useFloating` with a controlled virtual element. Used to follow cursor position.
 *
 * Default options:
 * - `whileElementsMounted: autoUpdate`
 *
 * Additional options:
 * - `getBoundingClientRect` to get the bounding client rect.
 * - `hidden` to hide the floating element
 *
 * Additional returns:
 * - `style` to apply to the floating element
 * - `virtualElementRef`
 *
 * @see useFloating
 * @see https://floating-ui.com/docs/react-dom#virtual-element
 */
const useVirtualFloating = ({
  getBoundingClientRect = getSelectionBoundingClientRect,
  ...floatingOptions
}) => {
  const virtualElementRef = React.useRef(createVirtualElement());
  const [visible, setVisible] = React.useState(true);
  const floatingResult = react.useFloating({
    // update on scroll and resize
    whileElementsMounted: react.autoUpdate,
    ...floatingOptions
  });
  const {
    refs,
    middlewareData,
    strategy,
    x,
    y,
    update
  } = floatingResult;
  React.useLayoutEffect(() => {
    virtualElementRef.current.getBoundingClientRect = getBoundingClientRect;
  }, [getBoundingClientRect, update]);
  React.useLayoutEffect(() => {
    refs.setReference(virtualElementRef.current);
  }, [refs]);
  React.useLayoutEffect(() => {
    if (!(middlewareData !== null && middlewareData !== void 0 && middlewareData.hide)) return;
    const {
      referenceHidden
    } = middlewareData.hide;
    setVisible(!referenceHidden);
  }, [middlewareData.hide]);
  return { ...floatingResult,
    virtualElementRef,
    style: {
      position: strategy,
      top: y !== null && y !== void 0 ? y : 0,
      left: x !== null && x !== void 0 ? x : 0,
      display: floatingOptions.open === false ? 'none' : undefined,
      visibility: !visible ? 'hidden' : undefined
    }
  };
};

Object.defineProperty(exports, 'FloatingDelayGroup', {
  enumerable: true,
  get: function () { return react.FloatingDelayGroup; }
});
Object.defineProperty(exports, 'FloatingFocusManager', {
  enumerable: true,
  get: function () { return react.FloatingFocusManager; }
});
Object.defineProperty(exports, 'FloatingNode', {
  enumerable: true,
  get: function () { return react.FloatingNode; }
});
Object.defineProperty(exports, 'FloatingOverlay', {
  enumerable: true,
  get: function () { return react.FloatingOverlay; }
});
Object.defineProperty(exports, 'FloatingPortal', {
  enumerable: true,
  get: function () { return react.FloatingPortal; }
});
Object.defineProperty(exports, 'FloatingTree', {
  enumerable: true,
  get: function () { return react.FloatingTree; }
});
Object.defineProperty(exports, 'arrow', {
  enumerable: true,
  get: function () { return react.arrow; }
});
Object.defineProperty(exports, 'autoPlacement', {
  enumerable: true,
  get: function () { return react.autoPlacement; }
});
Object.defineProperty(exports, 'autoUpdate', {
  enumerable: true,
  get: function () { return react.autoUpdate; }
});
Object.defineProperty(exports, 'computePosition', {
  enumerable: true,
  get: function () { return react.computePosition; }
});
Object.defineProperty(exports, 'detectOverflow', {
  enumerable: true,
  get: function () { return react.detectOverflow; }
});
Object.defineProperty(exports, 'flip', {
  enumerable: true,
  get: function () { return react.flip; }
});
Object.defineProperty(exports, 'getOverflowAncestors', {
  enumerable: true,
  get: function () { return react.getOverflowAncestors; }
});
Object.defineProperty(exports, 'hide', {
  enumerable: true,
  get: function () { return react.hide; }
});
Object.defineProperty(exports, 'inline', {
  enumerable: true,
  get: function () { return react.inline; }
});
Object.defineProperty(exports, 'limitShift', {
  enumerable: true,
  get: function () { return react.limitShift; }
});
Object.defineProperty(exports, 'offset', {
  enumerable: true,
  get: function () { return react.offset; }
});
Object.defineProperty(exports, 'safePolygon', {
  enumerable: true,
  get: function () { return react.safePolygon; }
});
Object.defineProperty(exports, 'shift', {
  enumerable: true,
  get: function () { return react.shift; }
});
Object.defineProperty(exports, 'size', {
  enumerable: true,
  get: function () { return react.size; }
});
Object.defineProperty(exports, 'useClick', {
  enumerable: true,
  get: function () { return react.useClick; }
});
Object.defineProperty(exports, 'useDelayGroup', {
  enumerable: true,
  get: function () { return react.useDelayGroup; }
});
Object.defineProperty(exports, 'useDelayGroupContext', {
  enumerable: true,
  get: function () { return react.useDelayGroupContext; }
});
Object.defineProperty(exports, 'useDismiss', {
  enumerable: true,
  get: function () { return react.useDismiss; }
});
Object.defineProperty(exports, 'useFloating', {
  enumerable: true,
  get: function () { return react.useFloating; }
});
Object.defineProperty(exports, 'useFloatingNodeId', {
  enumerable: true,
  get: function () { return react.useFloatingNodeId; }
});
Object.defineProperty(exports, 'useFloatingParentNodeId', {
  enumerable: true,
  get: function () { return react.useFloatingParentNodeId; }
});
Object.defineProperty(exports, 'useFloatingPortalNode', {
  enumerable: true,
  get: function () { return react.useFloatingPortalNode; }
});
Object.defineProperty(exports, 'useFloatingTree', {
  enumerable: true,
  get: function () { return react.useFloatingTree; }
});
Object.defineProperty(exports, 'useFocus', {
  enumerable: true,
  get: function () { return react.useFocus; }
});
Object.defineProperty(exports, 'useHover', {
  enumerable: true,
  get: function () { return react.useHover; }
});
Object.defineProperty(exports, 'useId', {
  enumerable: true,
  get: function () { return react.useId; }
});
Object.defineProperty(exports, 'useInteractions', {
  enumerable: true,
  get: function () { return react.useInteractions; }
});
Object.defineProperty(exports, 'useListNavigation', {
  enumerable: true,
  get: function () { return react.useListNavigation; }
});
Object.defineProperty(exports, 'useRole', {
  enumerable: true,
  get: function () { return react.useRole; }
});
Object.defineProperty(exports, 'useTypeahead', {
  enumerable: true,
  get: function () { return react.useTypeahead; }
});
exports.DropdownMenu = reactDropdownMenu__namespace;
exports.ElementPopover = ElementPopover;
exports.Popover = Popover;
exports.createVirtualElement = createVirtualElement;
exports.getDefaultBoundingClientRect = getDefaultBoundingClientRect;
exports.getRangeBoundingClientRect = getRangeBoundingClientRect;
exports.getSelectionBoundingClientRect = getSelectionBoundingClientRect;
exports.useVirtualFloating = useVirtualFloating;
//# sourceMappingURL=index.js.map
