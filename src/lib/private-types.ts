export interface IAppDetailsPrivate {
  headerHeight: number
  mobileBreakpoint: number
}

export interface IAppearancePrivate {
  defaultPaddingX: number
  defaultPaddingY: number
}

export interface IBehaviorPrivate {
  animate: boolean
  animationDuration: number
  lockScroll: boolean
  scrollType: ScrollBehavior
  scrollTimeoutDuration: number
  scrollYSimilarityThreshold: number
  startingStep: number
}