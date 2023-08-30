import React, { cloneElement, useRef, useState, useLayoutEffect } from 'react';
import { createElementAs, usePlateEditorState, isCollapsed, toDOMRange } from '@udecode/plate-common';
import { useReadOnly, useSelected } from 'slate-react';
import { useFloating, offset, flip, shift, autoUpdate, useInteractions } from '@floating-ui/react';
export { FloatingDelayGroup, FloatingFocusManager, FloatingNode, FloatingOverlay, FloatingPortal, FloatingTree, arrow, autoPlacement, autoUpdate, computePosition, detectOverflow, flip, getOverflowAncestors, hide, inline, limitShift, offset, safePolygon, shift, size, useClick, useDelayGroup, useDelayGroupContext, useDismiss, useFloating, useFloatingNodeId, useFloatingParentNodeId, useFloatingPortalNode, useFloatingTree, useFocus, useHover, useId, useInteractions, useListNavigation, useRole, useTypeahead } from '@floating-ui/react';
import * as reactDropdownMenu from '@radix-ui/react-dropdown-menu';
export { reactDropdownMenu as DropdownMenu };

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
  } = useFloating({
    middleware: [offset(12), flip({
      padding: 96
    }), shift()],
    whileElementsMounted: autoUpdate,
    ...floatingOptions
  });
  const {
    getReferenceProps
  } = useInteractions();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/cloneElement(children, getReferenceProps({
    ref: refs.setReference,
    ...children.props
  })), (floatingOptions === null || floatingOptions === void 0 ? void 0 : floatingOptions.open) && createElementAs('div', {
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
  const readOnly = useReadOnly();
  const selected = useSelected();
  const editor = usePlateEditorState();
  return /*#__PURE__*/React.createElement(Popover, _extends({
    floatingOptions: {
      open: !disabled && !readOnly && selected && isCollapsed(editor.selection),
      ...floatingOptions
    }
  }, props));
};

/**
 * Get bounding client rect by slate range
 */

const getRangeBoundingClientRect = (editor, at) => {
  if (!at) return getDefaultBoundingClientRect();
  const domRange = toDOMRange(editor, at);
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
  const virtualElementRef = useRef(createVirtualElement());
  const [visible, setVisible] = useState(true);
  const floatingResult = useFloating({
    // update on scroll and resize
    whileElementsMounted: autoUpdate,
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
  useLayoutEffect(() => {
    virtualElementRef.current.getBoundingClientRect = getBoundingClientRect;
  }, [getBoundingClientRect, update]);
  useLayoutEffect(() => {
    refs.setReference(virtualElementRef.current);
  }, [refs]);
  useLayoutEffect(() => {
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

export { ElementPopover, Popover, createVirtualElement, getDefaultBoundingClientRect, getRangeBoundingClientRect, getSelectionBoundingClientRect, useVirtualFloating };
//# sourceMappingURL=index.es.js.map
