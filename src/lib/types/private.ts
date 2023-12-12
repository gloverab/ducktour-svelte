import type { SvelteComponent } from "svelte"

export interface IAppDetailsPrivate {
  headerHeight: number
  mobileBreakpoint: number
}

export interface IAppearancePrivate {
  defaultPaddingX: number
  defaultPaddingY: number
  overlayOpacity: number
  overlayFill: string
  infoBox: {
    backgroundColor: string
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

export interface ICustomComponent {
  component: SvelteComponent
  props: object
}

export interface ICustomComponents {
  infoBox?: ICustomComponent
  bottom?: ICustomComponent
}