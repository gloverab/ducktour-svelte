<script lang='ts'>
	import { onMount } from "svelte";
	import type { IAppearancePrivate, IBehaviorPrivate } from "./types/private.js";

	interface ValueShape {
		x: number
		y: number
		w: number
		h: number
		r: number
	}

	export let _appearance: IAppearancePrivate
	export let _behavior: IBehaviorPrivate
	export let wrapperHeight: number

	let animatedEl: SVGAnimateElement
	let mounted = false
	let isFirstTransition = true
	let windowW: number
	let windowH: number

	let initial: ValueShape
	let from: ValueShape
	let to: ValueShape

	export const animate = (values: ValueShape) => {
		if (isFirstTransition) {
			from = initial
			console.log('first')
			to = values
			isFirstTransition = false
		} else {
			console.log('not first')
			from = to
			to = values
		}

		animatedEl.beginElement()
	}

	const getSvgPath = (values: ValueShape) => {
		const portalBottom = values.y + values.h
		const portalRight = values.x + values.w
		const portalM = `${values.x + values.r} ${portalBottom}`
		
		const topPlusCurve = values.y + values.r
		const bottomMinusCurve = portalBottom - values.r
		const rightMinusCurve = (values.x + values.w) - values.r

		return `M0 0
			H${windowW}
			V${wrapperHeight}
			H0
			V0
			Z
			M${portalM}
			A${values.r} ${values.r} 0 0 1 ${values.x} ${bottomMinusCurve}
			V${topPlusCurve}
			A${values.r} ${values.r} 0 0 1 ${values.x + values.r} ${values.y}
			H${rightMinusCurve}
			A${values.r} ${values.r} 0 0 1 ${portalRight} ${values.y + values.r}
			V${bottomMinusCurve}
			A${values.r} ${values.r} 0 0 1 ${rightMinusCurve} ${portalBottom}
			H${values.x + values.r}
			Z`
	}

	const setInitial = () => {
		initial = {
			x: 0,
			y: 0,
			w: windowW,
			h: windowH,
			r: 1
		}
	}

	$: if (mounted && windowW && windowH) {
		setInitial()
	}

	onMount(() => {
		mounted = true
	})
</script>

<svelte:window
	bind:innerWidth={windowW}
	bind:innerHeight={windowH}
/>

<div class='highlight-wrapper'>
	{#if windowW && windowH && initial}
		<svg width={windowW} height={wrapperHeight} viewBox="0 0 {windowW} {wrapperHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				id="highlight-path"
				fill-rule="evenodd"
				clip-rule="evenodd"
				d={getSvgPath(initial)} fill={_appearance.overlayFill} opacity={_appearance.overlayOpacity}/>
			<animate
				bind:this={animatedEl}
				xlink:href="#highlight-path"
				attributeName="d"
				dur="{_behavior.animationDuration}ms"
				begin="indefinite"
				keySplines=".4, 0.0, 0.2, 1"
				keyTimes="0; 1"
				calcMode="spline"
				from={from ? getSvgPath(from) : getSvgPath(initial)}
				to={to ? getSvgPath(to) : ''}
				fill="freeze"
			/>
		</svg>
	{/if}
</div>

<style>
	.highlight-wrapper {
		position: absolute;
		top: 0;
		left: 0;
	}

	button {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	*, *::before, *::after {
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: border-box;    /* Firefox, other Gecko */
		box-sizing: border-box;         /* Opera/IE 8+ */
	}

	.ducktour--w-screen {
		width: 100vw;
		max-width: 100%;
	}
	
	.ducktour--h-screen {
		height: 100vh;
	}
</style>