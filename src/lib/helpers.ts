import type { IStep } from "./public-types.js"

enum ScreenPositions {
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  TopRight = 'top-right',
  CenterLeft = 'center-left',
  Center = 'center-center',
  CenterRight = 'center-right',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
  Uncalculated = 'uncalculated'
}

export enum CaretPositioning {
  Hide,
  Top,
  Bottom,
  Left,
  Right
}

export enum InfoPositionsY {
  Above,
  Below,
  Center,
  Uncalculated
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

export enum AutoScrollTypes {
  DownFull,
  DownCenter,
  DownCenterMulti,
  UpFull,
  UpCenter,
  None
}

export const getTargetItemLocation = (
  windowW: number,
  windowH: number,
  highlightedObjectRect: DOMRect,
  scrollAmount: number
): ScreenPositions  => {
  const useWindowH = windowH - 100
  // Center Calculations
  const distanceLeft = highlightedObjectRect.x
  const distanceRight =
    windowW - highlightedObjectRect.x - highlightedObjectRect.width
  const distanceTop = highlightedObjectRect.y - scrollAmount
  const distanceBottom =
    useWindowH - highlightedObjectRect.y + scrollAmount - highlightedObjectRect.height
  const isCenterX = Math.abs(distanceLeft - distanceRight) < 50
  const isCenterY =
    Math.abs(distanceTop - distanceBottom) < 50 ||
    highlightedObjectRect.height > distanceTop + distanceBottom

  // XY Calculations
  const thresholdRight = windowW / 2 - highlightedObjectRect.width / 2
  const thresholdBottom = useWindowH / 2 - highlightedObjectRect.height / 2
  const isRightSide = highlightedObjectRect.x > thresholdRight
  const isBottom = highlightedObjectRect.y - scrollAmount > thresholdBottom

  if (isCenterX && isCenterY) {
    return ScreenPositions.Center
  }
  if (isCenterX) {
    return isBottom ? ScreenPositions.BottomCenter : ScreenPositions.TopCenter
  }
  if (isCenterY) {
    return isRightSide ? ScreenPositions.CenterRight : ScreenPositions.CenterLeft
  }
  if (isRightSide) {
    return isBottom ? ScreenPositions.BottomRight : ScreenPositions.TopRight
  }

  if (!isRightSide) {
    return isBottom ? ScreenPositions.BottomLeft : ScreenPositions.TopLeft
  }

  return ScreenPositions.Uncalculated
}

export const getTargetInfoBoxPositioning = (targetItemScreenLocation: ScreenPositions) => {
  let x = InfoPositionsX.Uncalculated
  let y = InfoPositionsY.Uncalculated

  switch (targetItemScreenLocation) {
    case ScreenPositions.TopLeft:
      x = InfoPositionsX.RightOuter
      y = InfoPositionsY.Below
      break
    case ScreenPositions.TopCenter:
      x = InfoPositionsX.LeftInner
      y = InfoPositionsY.Below
      break
    case ScreenPositions.TopRight:
      x = InfoPositionsX.LeftOuter
      y = InfoPositionsY.Below
      break
    case ScreenPositions.CenterLeft:
      x = InfoPositionsX.Right
      y = InfoPositionsY.Center
      break
    case ScreenPositions.Center:
      x = InfoPositionsX.LeftInner
      y = InfoPositionsY.Above
      break
    case ScreenPositions.CenterRight:
      x = InfoPositionsX.Left
      y = InfoPositionsY.Center
      break
    case ScreenPositions.BottomLeft:
      x = InfoPositionsX.RightOuter
      y = InfoPositionsY.Above
      break
    case ScreenPositions.BottomCenter:
      x = InfoPositionsX.LeftInner
      y = InfoPositionsY.Above
      break
    case ScreenPositions.BottomRight:
      x = InfoPositionsX.LeftOuter
      y = InfoPositionsY.Above
      break
    case ScreenPositions.Uncalculated:
      x = InfoPositionsX.Uncalculated
      y = InfoPositionsY.Uncalculated
      break
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
      caretX = 18
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
    (s) => s.displayOn === 'both' || s.displayOn === 'mobile'
  )
}

export const getDesktopSteps = (steps: IStep[]) => {
  return steps.filter(
    (s) => s.displayOn === 'both' || s.displayOn === 'desktop'
  )
}