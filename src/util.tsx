// calculates where the popped item should be placed,
// return CSSProperties of position,
// width and height of the popped div
export function calculatePopoverPosition(
  width: number,
  height: number,
  rect: ClientRect | DOMRect
): {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
} {
  let allWidth = window.innerWidth;
  let allHeight = window.innerHeight;

  let reachRightEdge = rect.left + width + 8 > allWidth;
  let reachBottomEdge = rect.top + height + 8 > allHeight;

  if (!reachRightEdge && !reachBottomEdge) {
    return {
      left: rect.left,
      top: rect.bottom + 8,
    };
  } else if (reachBottomEdge && !reachRightEdge) {
    return { left: rect.left, bottom: allHeight - rect.bottom + rect.height };
  } else if (reachRightEdge && !reachBottomEdge) {
    return { top: rect.bottom + 8, right: 8 };
  } else {
    return { bottom: allHeight - rect.bottom + rect.height, right: 8 };
  }
}
