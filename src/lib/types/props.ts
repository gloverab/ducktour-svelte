import type { SvelteComponent } from "svelte"
import type { DisplayOn } from "./enums.js"

export interface IAppDetails {
  headerHeight?: number
  mobileBreakpoint?: number
}

export interface IAppearance {
  defaultPaddingX?: number
  defaultPaddingY?: number
  overlayOpacity?: number
  overlayFill?: string
  infoBox?: {
    padding?: number
    maxWidth?: number
    minWidth?: number
    backgroundColor?: string
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

export interface ICustomInfoBoxComponent {
  component: typeof SvelteComponent<{
    activeStepIndex: number
    step: IStep
    steps: IStep[]
    onNext: () => void
    onBack: () => void
  }>
  props?: object
}

export interface ICustomBottomComponent {
  component: typeof SvelteComponent<{
    activeStepIndex: number
    step: IStep
    steps: IStep[]
    onNext: () => void
    onBack: () => void
  }>
  props?: object
}

export interface ICustomComponents {
  infoBox?: ICustomInfoBoxComponent
  bottom?: ICustomBottomComponent
}