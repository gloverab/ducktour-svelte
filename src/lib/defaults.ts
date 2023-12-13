import { easeOutCubic } from "./helpers.js";
import type { IAppDetailsPrivate, IAppearancePrivate, IBehaviorPrivate } from "./types/private.js";

export const defaultAppDetails: IAppDetailsPrivate = {
  headerHeight: 0,
  mobileBreakpoint: 420
}

export const defaultAppearance: IAppearancePrivate = {
  highlightPaddingX: 12,
  highlightPaddingY: 12,
  highlightRadius: 12,
  overlayOpacity: .7,
  overlayFill: "#000",
  infoBox: {
    backgroundColor: '#fff',
    padding: 16,
    maxWidth: 200,
    minWidth: 360
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