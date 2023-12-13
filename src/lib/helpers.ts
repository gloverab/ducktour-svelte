import type { IStep } from "./types/props.js"

export enum HighlightPositionX {
  Left,
  LeftCenter,
  Center,
  RightCenter,
  Right
}

export enum HighlightPositionY {
  Top,
  TopCenter,
  Center,
  BottomCenter,
  Bottom
}

export enum InfoPositionsX {
  LeftInner,
  LeftOuter,
  Left,
  RightInner,
  RightOuter,
  Right,
  Center,
  Uncalculated
}


export enum InfoPositionsY {
  Above,
  Below,
  Center,
  Uncalculated
}

export enum CaretPositioning {
  Hide,
  Top,
  Bottom,
  Left,
  Right
}

export enum AutoScrollTypes {
  DownFull,
  DownCenter,
  DownCenterMulti,
  UpFull,
  UpCenter,
  None
}

export const easeInCubic = (t: number) => t * t * t;
export const easeOutCubic = (t: number) => --t * t * t + 1;
export const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeInSine = (t: number) => 1 - Math.cos((t * Math.PI) / 2);;
export const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export const smoothScrollTo = (
  startY: number,
  y: number,
  {
    duration = 400,
    easingFunction = easeInOutCubic,
    offset = 0
  } = {}
) => {
  const difference = y - startY;
  const startTime = performance.now();

  if (y === startY + offset) {
    return Promise.resolve(undefined);
  }

  return new Promise((resolve) => {
    const step = () => {
      const progress = (performance.now() - startTime) / duration;
      const amount = easingFunction(progress);
      window.scrollTo({top: startY + amount * difference - offset});
      if (progress < 0.99) {
        window.requestAnimationFrame(step);
      } else {
        resolve(undefined);
      }
    };
    step();
  });
};

interface ITargetLocationArgs {
  windowW: number
  windowH: number
  highlightedObjectRect: DOMRect
  scrollAmount: number
}

export const getPositionRankingsY = (values: ITargetLocationArgs): {name: string, score: number, position: HighlightPositionY}[] => {
  const { windowH, highlightedObjectRect, scrollAmount } = values
  console.log(values)
  // 100 accounts for controls on bottom
  const topThreshold = 10
  const bottomThreshold = 10
  const centerThreshold = windowH / 5
  const itemTopFromScreenTop = highlightedObjectRect.top - scrollAmount
  const itemBottomFromScreenTop = itemTopFromScreenTop + highlightedObjectRect.height
  const itemBottomFromScreenBottom = windowH - itemBottomFromScreenTop

  const isVeryTop = itemTopFromScreenTop <= topThreshold
  const isVeryBottom = itemBottomFromScreenBottom <= bottomThreshold
  const moreRoomOnBottom = itemBottomFromScreenBottom > itemTopFromScreenTop

  const sameRoomOnTopAndBottom = Math.abs(itemBottomFromScreenBottom - itemTopFromScreenTop) < topThreshold
  const similarRoomOnBottomAndTop = Math.abs(itemTopFromScreenTop - itemBottomFromScreenBottom) < centerThreshold
  const objectOccupiesMostofScreenHeight = highlightedObjectRect.height > itemTopFromScreenTop + itemBottomFromScreenBottom

  let topScore = 0
  let bottomScore = 0
  let centerScore = 0

  if (isVeryTop) { topScore += 2 }
  if (isVeryBottom) { bottomScore += 2 }
  if ( similarRoomOnBottomAndTop ) { centerScore += 2 }
  if (moreRoomOnBottom && !sameRoomOnTopAndBottom) { topScore += 1 }
  if (!moreRoomOnBottom && !sameRoomOnTopAndBottom) { bottomScore += 1 }
  if (objectOccupiesMostofScreenHeight) { centerScore +=1 }

  return [
    {
      name: 'top',
      score: topScore,
      position: HighlightPositionY.Top
    },
    {
      name: 'bottom',
      score: bottomScore,
      position: HighlightPositionY.Bottom
    },
    {
      name: 'center',
      score: centerScore,
      position: HighlightPositionY.Center
    },
  ]
}

export const getPositionRankingsX = (values: ITargetLocationArgs): {name: string, score: number, position: HighlightPositionX}[] => {
  const { windowW, highlightedObjectRect } = values

  const leftThreshold = 20
  const rightThreshold = 20
  const centerThreshold = windowW / 5
  const itemLeftFromScreenLeft = highlightedObjectRect.left
  const itemRightFromScreenLeft = itemLeftFromScreenLeft + highlightedObjectRect.width
  const itemRightFromScreenRight = windowW - itemRightFromScreenLeft

  const isVeryLeft = itemLeftFromScreenLeft <= leftThreshold
  const isVeryRight = itemRightFromScreenRight <= rightThreshold
  const moreRoomOnLeft = itemLeftFromScreenLeft > itemRightFromScreenRight

  const sameRoomOnLeftAndRight = Math.abs(itemRightFromScreenRight - itemLeftFromScreenLeft) < leftThreshold
  const similarRoomOnLeftAndRight = Math.abs(itemRightFromScreenRight - itemLeftFromScreenLeft) < centerThreshold
  const objectOccupiesMostofScreenWidth = highlightedObjectRect.width > itemLeftFromScreenLeft + itemRightFromScreenRight

  let leftScore = 0
  let rightScore = 0
  let centerScore = 0

  if (isVeryLeft) { leftScore += 2 }
  if (isVeryRight) { rightScore += 2 }
  if (similarRoomOnLeftAndRight) { centerScore += 2 }
  if (!moreRoomOnLeft && !sameRoomOnLeftAndRight) { leftScore += 1 }
  if (moreRoomOnLeft && !sameRoomOnLeftAndRight) { rightScore += 1 }
  if (objectOccupiesMostofScreenWidth) { centerScore +=1 }

  return [
    {
      name: 'left',
      score: leftScore,
      position: HighlightPositionX.Left
    },
    {
      name: 'right',
      score: rightScore,
      position: HighlightPositionX.Right
    },
    {
      name: 'center',
      score: centerScore,
      position: HighlightPositionX.Center
    },
  ]
}

export const getTargetItemLocation = (values: ITargetLocationArgs): { x: HighlightPositionX, y: HighlightPositionY }  => {
  const positionRankingsX = getPositionRankingsX(values)
  const positionRankingsY = getPositionRankingsY(values)
  
  const sortedX = positionRankingsX.sort((a,b) => a.score < b.score ? 1 : -1)
  const sortedY = positionRankingsY.sort((a,b) => a.score < b.score ? 1 : -1)

  const highestX = sortedX[0]
  const highestY = sortedY[0]

  return {
    x: highestX.position,
    y: highestY.position
  }
}

export const getTargetInfoBoxPositioning = (targetItemScreenLocation: { x: HighlightPositionX, y: HighlightPositionY }) => {
  let x = InfoPositionsX.Uncalculated
  let y = InfoPositionsY.Uncalculated

  switch (targetItemScreenLocation.x) {
    case HighlightPositionX.Left:
    case HighlightPositionX.LeftCenter:
      x = InfoPositionsX.RightOuter
      break
    case HighlightPositionX.Center:
      x = InfoPositionsX.LeftInner
      break
    case HighlightPositionX.RightCenter:
    case HighlightPositionX.Right:
      x = InfoPositionsX.LeftOuter
      break
  }

  switch(targetItemScreenLocation.y) {
    case HighlightPositionY.Top:
    case HighlightPositionY.TopCenter:
      y = InfoPositionsY.Below
      break
    case HighlightPositionY.Center:
      y = InfoPositionsY.Above
      break
    case HighlightPositionY.BottomCenter:
    case HighlightPositionY.Bottom:
      y = InfoPositionsY.Above
      break
  }

  if (targetItemScreenLocation.y === HighlightPositionY.Center) {
    switch (targetItemScreenLocation.x) {
      case HighlightPositionX.Left:
      case HighlightPositionX.LeftCenter:
        x = InfoPositionsX.Right
        y = InfoPositionsY.Center
        break
      case HighlightPositionX.Center:
        x = InfoPositionsX.LeftInner
        break
      case HighlightPositionX.RightCenter:
      case HighlightPositionX.Right:
        x = InfoPositionsX.Left
        y = InfoPositionsY.Center
        break
    }
  }

  return {
    x,
    y
  }
}

export const getInfoTranslateX = (
  windowW: number,
  infoBoxEl: HTMLDivElement,
  highlightedObjectRect: DOMRect,
  infoPositionX: InfoPositionsX,
  paddingX: number
): {
  boxX: number
  caretX: number
} => {
  const infoBoxW = infoBoxEl.getBoundingClientRect().width
  const rightSide =
    highlightedObjectRect.x + highlightedObjectRect.width + paddingX
  const centerOfHighlightedObject = highlightedObjectRect.width / 2
  // const infoBoxOffset
  const infoBoxHalfW = infoBoxW / 2
  const caretHalfW = 8
  let boxX = 0
  let caretX = 0
  const shouldCenter = infoBoxW > highlightedObjectRect.width

  const handleLeftInner = () => {
    const leftInnerCaret = infoBoxW - 18 - caretHalfW
    boxX = shouldCenter
      ? highlightedObjectRect.x -
        (infoBoxW - highlightedObjectRect.width) / 2
      : highlightedObjectRect.x
    caretX = shouldCenter ? infoBoxHalfW - caretHalfW - 30 : leftInnerCaret
  }

  const handleLeftOuter = () => {
    const leftOuterCaret =
        centerOfHighlightedObject - caretHalfW + infoBoxHalfW - 30
      boxX = highlightedObjectRect.x - infoBoxHalfW
      caretX = leftOuterCaret
  }

  switch (infoPositionX) {
    case InfoPositionsX.LeftInner:
      handleLeftInner()
      break
    case InfoPositionsX.LeftOuter:
      handleLeftOuter()
      break
    case InfoPositionsX.Left:
      boxX = highlightedObjectRect.x - infoBoxW - paddingX * 2
      caretX = infoBoxW
      break
    case InfoPositionsX.RightInner:
      boxX = rightSide - infoBoxW
      caretX = shouldCenter
      ? rightSide - infoBoxHalfW + centerOfHighlightedObject
      : 0
      break
    case InfoPositionsX.RightOuter:
      boxX = rightSide - infoBoxHalfW
      caretX = shouldCenter
        ? rightSide - infoBoxHalfW + centerOfHighlightedObject
        : 0
      break
    case InfoPositionsX.Right:
      boxX = rightSide + paddingX * 2
      caretX = 0
      break
    case InfoPositionsX.Center:
      boxX = rightSide / 2 - infoBoxHalfW
      caretX = infoBoxHalfW
      break
  }

  if (boxX + infoBoxW > windowW) {
    boxX = windowW - infoBoxW - paddingX
    caretX = infoBoxW
  }
  return {
    boxX,
    caretX
  }
}

export const getInfoTranslateY = (
  infoBoxEl: HTMLDivElement,
  highlightedObjectRect: DOMRect,
  infoPositionY: InfoPositionsY,
  paddingY: number
): {
  boxY: number
  caretPositioning: CaretPositioning
} => {
  const infoBoxH = infoBoxEl.getBoundingClientRect().height
  const bottom =
    highlightedObjectRect.y + highlightedObjectRect.height + paddingY

  let boxY: number
  let caretPositioning = CaretPositioning.Hide
  switch (infoPositionY) {
    case InfoPositionsY.Above:
      boxY = highlightedObjectRect.y - infoBoxH - paddingY * 2
      caretPositioning = CaretPositioning.Bottom
      break
    case InfoPositionsY.Below:
      boxY = bottom + paddingY
      caretPositioning = CaretPositioning.Top
      break
    case InfoPositionsY.Center:
      boxY =
        highlightedObjectRect.y +
        highlightedObjectRect.height / 2 -
        infoBoxH / 2
      break
    case InfoPositionsY.Uncalculated:
      boxY = bottom + paddingY
      break
  }

  return {
    boxY,
    caretPositioning
  }
}

type RectOrNull = DOMRect | null

const getTopmostBottommost = (rects: RectOrNull[]): {
  topmost: number
  bottommost: number
} => {
  let topmost = rects[0]?.y || 0
  let bottommost = rects[0] ? rects[0]?.y + rects[0].height : 0
  rects.forEach((rect, i) => {
    if (rect) {
      const itemBottom = rect.y + rect.height
      if (i === 0) {
        topmost = rect.y
        bottommost = itemBottom
        return
      }
      if (rect.y < topmost) {
        topmost = rect.y
      }
      if (itemBottom > bottommost) {
        bottommost = itemBottom
      }
    }
  })
  return {
    topmost,
    bottommost
  }
}

export const determineScrollDown = (
  activeStepIndex: number,
  highlightedObjectRect: DOMRect,
  scrollYSimilarityThreshold: number,
  steps: IStep[],
  useMobileSettings: boolean,
  windowH: number,
): {
  type: AutoScrollTypes
  data?: { topmost: number, bottommost: number }
} => {
  // If this is the last step, only scroll far enough to center the object
  const isLastStep = activeStepIndex === steps.length - 1
  if (isLastStep) {
    return { type: AutoScrollTypes.DownCenter }
  }

  // Otherwise, determine how many steps are left and where they're positioned
  const nextStepIds = steps
    .slice(activeStepIndex, steps.length - 1)
    .map((item) => {
      if (useMobileSettings && item.mobileId) {
        return item.mobileId
      }
      return item.id
    })

  const remainingItemRects = nextStepIds.map((item: string) => {
    const element = document.getElementById(item)
    if (element) {
      return element.getBoundingClientRect()
    }
    return null
  })

  const { topmost, bottommost } = getTopmostBottommost(remainingItemRects)

  if (Math.abs(topmost - bottommost) < windowH) {
    return {
      type: AutoScrollTypes.DownCenterMulti,
      data: {
        topmost,
        bottommost
      }
    }
  }

  const itemsAboveThreshold = remainingItemRects
    .map((rect) => rect?.y)
    .filter(
      (y) => y && y > highlightedObjectRect.y + scrollYSimilarityThreshold
    )
  const shouldScrollFull = itemsAboveThreshold.length > 0

  if (shouldScrollFull) {
    return { type: AutoScrollTypes.DownFull }
  }

  return { type: AutoScrollTypes.DownCenter }
}


export const getMobileSteps = (steps: IStep[]) => {
  return steps.filter(
    (s) => !s.displayOn || s.displayOn === 'mobile'
  )
}

export const getDesktopSteps = (steps: IStep[]) => {
  return steps.filter(
    (s) => !s.displayOn || s.displayOn === 'desktop'
  )
}