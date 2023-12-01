export interface IAppDetails {
  headerHeight?: number
  mobileBreakpoint?: number
}

export interface IAppearance {
  defaultPaddingX?: number
  defaultPaddingY?: number
}

export interface IBehavior {
  animate?: boolean
  animationDuration?: number
  lockScroll?: boolean
  scrollType?: ScrollBehavior
  scrollTimeoutDuration?: number
  scrollYSimilarityThreshold?: number
  startingStep?: number
}

export interface IStep {
  action?: () => void
  actionTimeout?: number
  buttonText: string
  displayOn?: 'mobile' | 'desktop' | 'both'
  id: string
  mobileId?: string
  roundedFull?: boolean
  text: string
  title: string
}