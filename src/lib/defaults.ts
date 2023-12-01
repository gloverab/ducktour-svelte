import type { IAppDetailsPrivate, IAppearancePrivate, IBehaviorPrivate } from "./private-types.js";

export const defaultAppDetails: IAppDetailsPrivate = {
  headerHeight: 0,
  mobileBreakpoint: 420
}

export const defaultAppearance: IAppearancePrivate = {
  defaultPaddingX: 12,
  defaultPaddingY: 12
}

export const defaultBehavior: IBehaviorPrivate = {
  animate: true,
  animationDuration: 500,
  lockScroll: true,
  scrollType: 'smooth',
  scrollTimeoutDuration: 200,
  scrollYSimilarityThreshold: 20,
  startingStep: 0
}