import type { DisplayOn } from "./enums.js"

export interface IAppDetails {
  headerHeight?: number
  mobileBreakpoint?: number
}

export interface IAppearance {
  defaultPaddingX?: number
  defaultPaddingY?: number
  infoBox?: {
    padding: number
    maxWidth: number
    minWidth: number
  }
}

export interface IBehavior {
  animate?: boolean
  animationDuration?: number
  lockScroll?: boolean
  scrollCurve?: (t: number) => number
  scrollType?: ScrollBehavior
  scrollTimeoutDuration?: number
  scrollYSimilarityThreshold?: number
  startingStep?: number
}

export interface IStep {
  action?: () => void
  actionTimeout?: number
  buttonText: string
  displayOn?: DisplayOn
  id: string
  mobileId?: string
  roundedFull?: boolean
  text: string
  title: string
}