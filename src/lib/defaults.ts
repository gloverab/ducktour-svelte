import { easeOutCubic } from "./helpers.js";
import type { IAppDetailsPrivate, IAppearancePrivate, IBehaviorPrivate } from "./types/private.js";

export const defaultAppDetails: IAppDetailsPrivate = {
  headerHeight: 0,
  mobileBreakpoint: 420
}

export const defaultAppearance: IAppearancePrivate = {
  defaultPaddingX: 12,
  defaultPaddingY: 12,
  infoBox: {
    padding: 16
  }
}

export const defaultBehavior: IBehaviorPrivate = {
  animate: true,
  animationDuration: 500,
  lockScroll: true,
  scrollCurve: easeOutCubic,
  scrollType: 'smooth',
  scrollTimeoutDuration: 200,
  scrollYSimilarityThreshold: 20,
  startingStep: 0
}