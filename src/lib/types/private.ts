export interface IAppDetailsPrivate {
  headerHeight: number
  mobileBreakpoint: number
}

export interface IAppearancePrivate {
  defaultPaddingX: number
  defaultPaddingY: number
  infoBox: {
    padding: number
    maxWidth: number
    minWidth: number
  }
}

export interface IBehaviorPrivate {
  animate: boolean
  animationDuration: number
  lockScroll: boolean
  scrollCurve: (t: number) => number
  scrollType: ScrollBehavior
  scrollTimeoutDuration: number
  scrollYSimilarityThreshold: number
  startingStep: number
}