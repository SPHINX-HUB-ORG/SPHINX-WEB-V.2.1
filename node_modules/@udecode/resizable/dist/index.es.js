import { useState, useEffect } from 'react';
import { createComponentAs, createElementAs } from '@udecode/plate-common';

const resizeLengthToRelative = (length, parentLength) => {
  if (typeof length === 'number') {
    return `${length / parentLength * 100}%`;
  }

  return length;
};

const resizeLengthToStatic = (length, parentLength) => {
  if (typeof length === 'string') {
    return parentLength * parseFloat(length) / 100;
  }

  return length;
};

const resizeLengthClampStatic = (length, {
  min,
  max
}) => {
  if (min !== undefined) {
    length = Math.max(length, min);
  }

  if (max !== undefined) {
    length = Math.min(length, max);
  }

  return length;
};
const resizeLengthClamp = (length, parentLength, {
  min,
  max
}) => {
  const staticLength = resizeLengthToStatic(length, parentLength);
  const clampedStaticLength = resizeLengthClampStatic(staticLength, {
    min: min !== undefined ? resizeLengthToStatic(min, parentLength) : undefined,
    max: max !== undefined ? resizeLengthToStatic(max, parentLength) : undefined
  });

  switch (typeof length) {
    case 'string':
      return resizeLengthToRelative(clampedStaticLength, parentLength);

    case 'number':
      return clampedStaticLength;

    default:
      throw new Error('Invalid length type');
  }
};

const isTouchEvent = event => 'touches' in event;

const useResizeHandleProps = ({
  direction,
  width = 10,
  startMargin = 0,
  endMargin = 0,
  zIndex = 40,
  onResize,
  onMouseDown,
  onTouchStart,
  onHover,
  onHoverEnd,
  style,
  ...props
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [initialPosition, setInitialPosition] = useState(0);
  const [initialSize, setInitialSize] = useState(0);
  const isHorizontal = direction === 'left' || direction === 'right';

  const handleMouseDown = event => {
    const {
      clientX,
      clientY
    } = event;
    setInitialPosition(isHorizontal ? clientX : clientY);
    const element = event.target.parentElement;
    setInitialSize(isHorizontal ? element.offsetWidth : element.offsetHeight);
    setIsResizing(true);
    onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(event);
  };

  const handleTouchStart = event => {
    const {
      touches
    } = event;
    const touch = touches[0];
    const {
      clientX,
      clientY
    } = touch;
    setInitialPosition(isHorizontal ? clientX : clientY);
    const element = event.target.parentElement;
    setInitialSize(isHorizontal ? element.offsetWidth : element.offsetHeight);
    setIsResizing(true);
    onTouchStart === null || onTouchStart === void 0 ? void 0 : onTouchStart(event);
  };

  useEffect(() => {
    if (!isResizing) return;

    const sendResizeEvent = (event, finished) => {
      const {
        clientX,
        clientY
      } = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
      const currentPosition = isHorizontal ? clientX : clientY;
      const delta = currentPosition - initialPosition;
      onResize === null || onResize === void 0 ? void 0 : onResize({
        initialSize,
        delta,
        finished,
        direction
      });
    };

    const handleMouseMove = event => sendResizeEvent(event, false);

    const handleMouseUp = event => {
      setIsResizing(false);
      onHoverEnd === null || onHoverEnd === void 0 ? void 0 : onHoverEnd();
      sendResizeEvent(event, true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizing, initialPosition, initialSize, onResize, isHorizontal, onHoverEnd, direction]);

  const handleMouseOver = () => {
    onHover === null || onHover === void 0 ? void 0 : onHover();
  };

  const handleMouseOut = () => {
    if (!isResizing) {
      onHoverEnd === null || onHoverEnd === void 0 ? void 0 : onHoverEnd();
    }
  };

  const nearSide = direction;
  const start = isHorizontal ? 'top' : 'left';
  const end = isHorizontal ? 'bottom' : 'right';
  const size = isHorizontal ? 'width' : 'height';
  return {
    style: {
      position: 'absolute',
      [nearSide]: -width / 2,
      [start]: startMargin,
      [end]: endMargin,
      [size]: width,
      zIndex,
      cursor: isHorizontal ? 'col-resize' : 'row-resize',
      ...style
    },
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onTouchMove: handleMouseOver,
    onTouchEnd: handleMouseOut,
    ...props
  };
};
const ResizeHandle = createComponentAs(props => {
  const htmlProps = useResizeHandleProps(props);
  return createElementAs('div', htmlProps);
});

export { ResizeHandle, isTouchEvent, resizeLengthClamp, resizeLengthClampStatic, resizeLengthToRelative, resizeLengthToStatic, useResizeHandleProps };
//# sourceMappingURL=index.es.js.map
