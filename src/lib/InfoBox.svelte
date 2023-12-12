<script lang='ts'>
  import { CaretPositioning } from './helpers.js'
	import type { IAppearancePrivate, IBehaviorPrivate } from './types/private.js';
	import type { ICustomComponents, IStep } from './types/props.js';
  export let activeStepIndex: number
  export let _appearance: IAppearancePrivate
  export let _behavior: IBehaviorPrivate
  export let _customComponents: ICustomComponents
  export let element: HTMLElement
  export let handleClickNext: () => void
  export let handleClickBack: () => void
  export let infoBoxValues: any
  export let showInfoBox = false
  export let stepToDisplay: any
  export let stepsToUse: IStep[]
  export let transitioning = false

  let windowH: number

  let animateTransition = false

  export const triggerNextStepAnimation = () => {
    animateTransition = true
    setTimeout(() => {
      animateTransition = false
    }, _behavior.animationDuration)
  }

  $: transform = `translate3d(0,${infoBoxValues.caretPositionY === CaretPositioning.Bottom ? -12 : 0}px,0)`
</script>

<svelte:window bind:innerHeight={windowH} />

<div
  bind:this={element}
  class:ducktour--opacity-0={!showInfoBox}
  class:ducktour--opacity-80={showInfoBox && transitioning}
  class:ducktour--opacity-100={showInfoBox && !transitioning}
  class="
    ducktour--min-w-50
    ducktour--max-w-90
    ducktour--absolute
    ducktour--top-3
    ducktour--left-0
    ducktour--p-4
    ducktour--z-10
    ducktour--bubble
  "
  style="
    transform: {transform};
    minWidth: {_appearance.infoBox.minWidth};
    maxWidth: {_appearance.infoBox.maxWidth};
  "
>
  <div
  class:animateTransition
  class="
  ducktour--relative
  ducktour--z-10
  ">
    {#if _customComponents?.infoBox?.component}
      <svelte:component
        this={_customComponents.infoBox.component}
        {..._customComponents.infoBox.props}
        {activeStepIndex}
        step={stepToDisplay}
        steps={stepsToUse}
        onNext={handleClickNext}
        onBack={handleClickBack}
      />
    {:else}
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
    {/if}
  </div>
</div>

<style>
	*, *::before, *::after {
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: border-box;    /* Firefox, other Gecko */
		box-sizing: border-box;         /* Opera/IE 8+ */
	}

	p {
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

  .animateTransition {
    -webkit-animation-name: changeStep;
    -webkit-animation-duration: var(--ducktour-animation-duration);
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-timing-function: cubic-bezier(.4, 0.0, 0.2, 1);
    animation-name: changeStep;
    animation-duration: var(--ducktour-animation-duration);
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(.4, 0.0, 0.2, 1);
  }


  @keyframes changeStep {
    0% {
      transform: translate3d(0,0,0);
      opacity: 0;
    }
    1% {
      transform: translate3d(0,0,0);
      opacity: 0;
    }

    2% {
      transform: translate3d(0, 4px, 0);
      opacity: 0;
    }
    

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
</style>