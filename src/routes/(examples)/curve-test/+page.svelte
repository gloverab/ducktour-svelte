<script lang='ts'>
	import { onMount } from "svelte";

	interface ValueShape {
		x: number
		y: number
		w: number
		h: number
		r: number
	}

	export let zoomTimeout = 500

	let animatedEl: SVGAnimateElement
	let mounted = false
	let isFirstTransition = true
	let windowW: number
	let windowH: number

	let initial: ValueShape
	let from: ValueShape
	let to: ValueShape

	let portalPosition = {
		x: 10,
		y: 20
	}
	let portalDimensions = {
		w: 400,
		h: 400
	}

	const handleClick = () => {
		animate()
	}

	const animate = () => {
		if (isFirstTransition) {
			from = initial
			to = {
				x: portalPosition.x,
				y: portalPosition.y,
				w: portalDimensions.w,
				h: portalDimensions.h,
				r: 100
			}
			isFirstTransition = false
		} else {
			from = to
			to = {
				x: Math.random() * 1000,
				y: 300,
				w: portalDimensions.w,
				h: portalDimensions.h,
				r: 200
			}
		}

		console.log('from', from)
		console.log('to', to)

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
			V${windowH}
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
			r: 0.001
		}
	}

	$: if (mounted && windowW && windowH) {
		setInitial()
	}

	$: if (animatedEl) {
		setTimeout(animate, zoomTimeout)
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
		<svg width={windowW} height={windowH} viewBox="0 0 {windowW} {windowH}" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				id="highlight-path"
				fill-rule="evenodd"
				clip-rule="evenodd"
				d={getSvgPath(initial)} fill="#444"/>
			<animate
				bind:this={animatedEl}
				xlink:href="#highlight-path"
				attributeName="d"
				dur="500ms"
				begin="indefinite"
				keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
				keyTimes="0; 0.25; 0.5; 0.75; 1"
				calcMode="spline"
				from={from ? getSvgPath(from) : ''}
				to={to ? getSvgPath(to) : ''}
				fill="freeze"
			/>
		</svg>
	{/if}
</div>

<button on:click={handleClick}>Animate</button>

<style>
	.highlight-wrapper {
		position: absolute;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
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