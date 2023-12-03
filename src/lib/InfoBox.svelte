<script lang='ts'>
  import { CaretPositioning } from './helpers.js'
	import type { IAppearancePrivate, IBehaviorPrivate } from './types/private.js';
	import type { IStep } from './types/props.js';
  export let activeStepIndex: number
  export let _appearance: IAppearancePrivate
  export let _behavior: IBehaviorPrivate
  export let element: HTMLElement
  export let handleClickNext: () => void
  export let handleClickBack: () => void
  export let infoBoxValues: any
  export let hideText = false
  export let showHighlight: boolean
  export let stepToDisplay: any
  export let stepsToUse: IStep[]
  export let transitioning = false

  let windowH: number

  let animateTransition = false

  export const triggerNextStepAnimation = () => {
    animateTransition = true
    setTimeout(() => {
      animateTransition = false
    }, 1010)
  }

  export const triggerTextReveal = () => {

  }

  $: translateInfoX = infoBoxValues.x > 18 ? infoBoxValues.x : 18
	$: translateInfoY = !showHighlight ? windowH / 2 : infoBoxValues.y

  $: transform = `translate3d(${translateInfoX}px,${infoBoxValues.caretPositionY !== CaretPositioning.Top
    ? translateInfoY - 12
    : translateInfoY}px,0)`
</script>

<svelte:window bind:innerHeight={windowH} />

<div
  bind:this={element}
  class:ducktour--opacity-0={hideText}
  class:ducktour--opacity-80={transitioning}
  class:ducktour--opacity-100={!hideText && !transitioning}
  class:ducktour--duration-500={true}
  class="
    ducktour--min-w-50
    ducktour--max-w-90
    ducktour--absolute
    ducktour--top-3
    ducktour--left-0
    ducktour--p-4
    ducktour--z-10
  "
  style="
    transform: {transform};
    maxWidth: {_appearance.infoBox.maxWidth}
  "
>
  <div
    class:animateTransition
    class="
      ducktour--relative
      ducktour--z-10
    "
  >
    <p class="font-medium">{stepToDisplay?.title}</p>
    <p class="text-sm">{stepToDisplay?.text}</p>
    <div class="
      ducktour--flex
      ducktour--justify-between
      ducktour--items-center
      ducktour--pt-4
      ducktour--space-x-6
    ">
      <p class="font-medium text-sm text-grey-dark">
        {activeStepIndex + 1} of {stepsToUse.length}
      </p>
      <div class="
        ducktour--flex
        ducktour--items-center
        ducktour--space-x-6
      ">
        <button on:click={handleClickBack}>Back</button>
        <button on:click={handleClickNext}>Next</button>
      </div>
    </div>
  </div>
</div>

<style global>
	*, *::before, *::after {
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: border-box;    /* Firefox, other Gecko */
		box-sizing: border-box;         /* Opera/IE 8+ */
	}

	p, span, h1, h2, h3, h4, h5, h6 {
		font-family: 'Helvetica Neue', sans-serif;
		margin: 0;
	}

	p {
		font-size: 10pt;
		margin: 0;
	}

	.ducktour--absolute {
		position: absolute;
	}

	.ducktour--relative {
		position: relative;
	}

	.ducktour--left-0 { left: 0; }

	.ducktour--top-3 { top: .75rem; }

	.ducktour--flex {
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}

	.ducktour--justify-between {
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: space-between;
	}

	.ducktour--p-4 {
		padding: 1rem;
	}

	.ducktour--pt-4 {
		padding-top: 1rem;
	}

	.ducktour--max-w-90 {
		max-width: 22.5rem;
	}

	.ducktour--min-w-50 {
		min-width: 12.5rem;
	}


	.ducktour--z-10 {
		z-index: 10;
	}

	.ducktour--opacity-0 { opacity: 0; }
	.ducktour--opacity-80 { opacity: 0.8; }
	.ducktour--opacity-100 { opacity: 1; }

  .ducktour--duration-500 {
		-webkit-transition-duration: 500ms;
		-o-transition-duration: 500ms;
		transition-duration: 500ms;
	}

  .animateTransition {
    animation: changeStep 1s forwards;
  }

  @keyframes changeStep {
    0% {
      transform: translate3d(0,0,0);
      opacity: 0;
    }
    5% {
      transform: translate3d(0,0,0);
      opacity: 0;
    }

    45% {
      transform: translate3d(0, 12px, 0);
      opacity: 0;
    }
    50% {
      transform: translate3d(0, 12px, 0);
      opacity: 0;
    }

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
</style>