<script lang="ts" context="module">
	

	
</script>

<script lang="ts">
	import type { IAppDetailsPrivate, IAppearancePrivate, IBehaviorPrivate } from "./types/private.ts";
  import LockScroll from "./LockScroll.svelte"
  import SvgBubble from "./SvgBubble.svelte"
	import { defaultAppDetails, defaultAppearance, defaultBehavior } from "./defaults.js";
	import { AutoScrollTypes, CaretPositioning, InfoPositionsX, InfoPositionsY, determineScrollDown, getDesktopSteps, getInfoTranslateX, getInfoTranslateY, getMobileSteps, getTargetInfoBoxPositioning, getTargetItemLocation, smoothScrollTo } from "./helpers.js";
	import type { IAppearance, IBehavior, IStep } from "./types/public.js";
	import { onMount } from "svelte";

	// Required Props
	export let steps: IStep[]
	export let close: () => void

	// Optional Props
	export let appDetails: IAppDetailsPrivate = defaultAppDetails
	export let appearance: IAppearance = defaultAppearance
  export let behavior: IBehavior = defaultBehavior
	export let onComplete: () => void | undefined
	export let onExitIncomplete: (step: IStep, stepIndex: number, activeSteps: IStep[]) => void | undefined

	let _appDetails: IBehaviorPrivate
	let _appearance: IAppearancePrivate
	let _behavior: IBehaviorPrivate

	// Window Data & Element Bindings
	let mounted = false
	let windowW: number
	let windowH: number
	let scrollY: number
	let infoBoxEl: HTMLDivElement
	let infoBoxContentEl: HTMLDivElement

	// Initial Mount
	let initialInfoSet = false
	let infoBoxDisplayed = false
	let initialized = false
	let showHighlight = false // previously useHighlightSizes
	let showInfoBox = false
	let showInfoBoxContent = false

	// Step Data
	let activeStepIndex: number
	let activeStep: IStep
	let id: string
	let hideTextOnStepChange = false
	
	// Active Item Data
	let element: HTMLElement | null
	let highlightedObjectRect: DOMRect
	let stepToDisplay: IStep

	// Highlight Data
	let highlightValues = {
		width: '100%' as string | number,
		height: '100%' as string | number,
		translateX: 0,
		translateY: 0,
		roundness: 0,
		translateYExtra: 0
	}

	// Info Box Data
	let infoBoxPositioning = {
		x: InfoPositionsX.Center,
		y: InfoPositionsY.Center
	}
	let infoBoxValues = {
		x: 0,
		y: 0,
		caretPositionX: 0,
		caretPositionY: CaretPositioning.Hide,
		w: 100,
		h: 50
	}

	// Active Movement
	let infoBoxChangingPosition = false

	// User Action Data
	let activelyResizing = false
	let activelyScrolling = false

	// Timeouts
	let mousewheelTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000)
	let resizeTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000)
	let scrollTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000)
	let showHighlightTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000)

	// Scroll Bullshit
	let mousewheelMotionDetected = false
	let userScroll = false
	let lastThreeScrolls = [0,0,0]
	let activeScrollDirection: 'down' | 'up'
	let initialScrollNeeded = false
	let initialScrollTookPlace = false
	let isAutoScrolling = false
	let canScrollToPrevious = false
	let positionBeforeAutoScroll = 0
	let positionAfterAutoScroll = 0
	
	// Reactive
	$: useMobileSettings = windowW < appDetails.mobileBreakpoint
	$: stepsToUse = useMobileSettings ? getMobileSteps(steps) : getDesktopSteps(steps)

	const setCustomizations = () => {
		appDetails = {
			...defaultAppDetails,
			...appDetails,
	}
		_appearance = {
			...defaultAppearance,
			...appearance
		}
		_behavior = {
			...defaultBehavior,
			...behavior
		}
	}

	const fromWindowTop = (el: HTMLElement) => {
		return el.getBoundingClientRect().top
	}

	const fromDocumentTop = (el: HTMLElement) => {
		return el.getBoundingClientRect().top + scrollY
	}

	const display = () => {
		showHighlightTimeout = setTimeout(() => {
			showHighlight = true
		}, 500)
		setTimeout(() => {
			showInfoBox = true
		}, 800)
		setTimeout(() => {
			showInfoBoxContent = true
		}, 1200)
	}

	const initialize = () => {
		activeStepIndex = _behavior.startingStep
		activeStep = stepsToUse[activeStepIndex]
		id = useMobileSettings ? activeStep.mobileId || activeStep.id : activeStep.id
		highlightValues = {
			width: `${windowW}px` as string | number,
			height: `${windowH}px` as string | number,
			translateX: 0,
			translateY: 0,
			roundness: 0,
			translateYExtra: 0
		}
		display()
		setTimeout(() => updateStep(_behavior.startingStep), 20)
		initialized = true
	}

	const handleFinish = () => {
		if (onComplete) {
			onComplete()
		}
		close()
	}

	const handleClickBack = () => {
		if (activeStepIndex > 0) {
			const previousIndex = activeStepIndex - 1
			updateStep(previousIndex)
		}
	}

	const handleClickNext = () => {
		if (activeStepIndex === stepsToUse.length - 1) {
			handleFinish()
		} else {
			const nextIndex = activeStepIndex + 1
			updateStep(nextIndex)
		}
	}

	const handleSkip = () => {
		if (onExitIncomplete) {
			onExitIncomplete(activeStep, activeStepIndex, stepsToUse)
		}
	}

	const onScrollSuccess = () => {
		setTimeout(() => {
			initialScrollTookPlace = true
			isAutoScrolling = false
		}, 25)
		setTimeout(() => {
			showHighlight = true
		}, 1000)
	}

	const performAutoScroll = async (top: number) => {
		positionBeforeAutoScroll = scrollY
		await smoothScrollTo(scrollY, top, {
			duration: _behavior.animationDuration * 2,
			easingFunction: _behavior.scrollCurve
		})
		positionAfterAutoScroll = top
		onScrollSuccess()
	}

	const performAutoScrollToPrevious = () => {
		window.scroll({
			top: positionBeforeAutoScroll,
			behavior: behavior.scrollType
		})
		setTimeout(onScrollSuccess, behavior.animationDuration)
	}

	const performAutoScrollUp = (amount: number) => {
		positionBeforeAutoScroll = scrollY
		window.scroll({
			top: amount,
			behavior: behavior.scrollType
		})
		setTimeout(onScrollSuccess, behavior.animationDuration)
	}

	const scrollHighlightedItemToTop = () => {
		canScrollToPrevious = initialScrollTookPlace
		const scrollAmount = highlightedObjectRect.y - appDetails.headerHeight - _appearance.defaultPaddingY
		
		performAutoScroll(
			scrollAmount + scrollY
		)
		return scrollAmount + scrollY
	}

	const scrollHighlightedItemToCenter = () => {
		canScrollToPrevious = initialScrollTookPlace
		const scrollAmount =
			highlightedObjectRect.y - windowH / 2 + highlightedObjectRect.height / 2
		performAutoScroll(scrollAmount + scrollY)
		return scrollAmount + scrollY
	}

	const scrollHightlightedItemAndNextStepsToCenter = (data: { topmost: number, bottommost: number }) => {
		const { topmost, bottommost } = data
		canScrollToPrevious = initialScrollTookPlace
		const combinedHeight = Math.abs(topmost - bottommost)
		const midpoint = topmost - windowH / 2 + combinedHeight / 2
		performAutoScroll(midpoint + scrollY)
		return midpoint + scrollY
	}

	const scrollUpToPrevious = () => {
		performAutoScrollToPrevious()
		canScrollToPrevious = initialScrollTookPlace
		setHighlightValues()
	}

	const autoScrollDown = () => {
		isAutoScrolling = true
		const determinedScroll = determineScrollDown(
			activeStepIndex,
			highlightedObjectRect,
			_behavior.scrollYSimilarityThreshold,
			stepsToUse,
			useMobileSettings,
			windowH
		)
		switch (determinedScroll.type) {
			case AutoScrollTypes.DownFull:
				return scrollHighlightedItemToTop()
			case AutoScrollTypes.DownCenter:
				return scrollHighlightedItemToCenter()
			case AutoScrollTypes.DownCenterMulti:
				if (determinedScroll.data) {
					return scrollHightlightedItemAndNextStepsToCenter(determinedScroll.data)
				}
				break
			case AutoScrollTypes.UpFull:
			case AutoScrollTypes.UpCenter:
			case AutoScrollTypes.None:
		}
	}

	const autoScrollUp = () => {
		// isAutoScrolling = true
		const itemTopDistanceFromTop = highlightedObjectRect.top
		const itemHeight = highlightedObjectRect.height
		const desiredPosition =
			itemTopDistanceFromTop + itemHeight + _appearance.defaultPaddingY - windowH

		performAutoScrollUp(desiredPosition)
	}

	const calculateAutoScroll = () => {
		const willScrollDown = highlightedObjectRect.y + highlightedObjectRect.height > windowH
		const willScrollUp = highlightedObjectRect.y - appDetails.headerHeight < 0
		let scrollAmount = 0
		if (willScrollDown || willScrollUp) {
			if (willScrollDown) {
				scrollAmount = autoScrollDown() || scrollY
			}
	
			if (willScrollUp) {
				autoScrollUp()
			}
		}
		console.log(scrollAmount)
		setHighlightValues()
		updateInfoBoxPosition(scrollAmount)

	}

	const setHighlightValues = () => {
		if (!activelyScrolling) {
			highlightValues = {
				width: highlightedObjectRect.width + _appearance.defaultPaddingX * 2,
				height: highlightedObjectRect.height + _appearance.defaultPaddingY * 2,
				translateX: highlightedObjectRect.x - _appearance.defaultPaddingX,
				translateY: (highlightedObjectRect.y - _appearance.defaultPaddingY) + scrollY,
				roundness: 12,
				translateYExtra: 0
			}
		}
	}

	const changeInfoBoxPosition = () => {
			stepToDisplay = activeStep
			setTimeout(() => {
				const infoX = getInfoTranslateX(windowW, infoBoxEl, highlightedObjectRect, infoBoxPositioning.x, _appearance.defaultPaddingX)
				const infoY = getInfoTranslateY(infoBoxEl, highlightedObjectRect, infoBoxPositioning.y, _appearance.defaultPaddingY)
				const newInfoBoxValues = {
					x: infoX.boxX || 0,
					y: infoY.boxY + scrollY || 0,
					caretPositionX: infoX.caretX,
					caretPositionY: infoY.caretPositioning,
					w: infoBoxEl.getBoundingClientRect().width,
					h: infoBoxEl.getBoundingClientRect().height
				}
				if (JSON.stringify(infoBoxValues) !== JSON.stringify(newInfoBoxValues)) {
					infoBoxChangingPosition = true
					infoBoxValues = newInfoBoxValues
				}
				initialInfoSet = true
			}, 1)
			setTimeout(() => {
				infoBoxChangingPosition = false
			}, _behavior.animationDuration * .6)
	}

	const updateInfoBoxPosition = (scrollAmount: number) => {
		if (element) {
			highlightedObjectRect = element.getBoundingClientRect()
			const targetItemScreenLocation = getTargetItemLocation({windowW, windowH, highlightedObjectRect, scrollAmount})
			infoBoxPositioning = getTargetInfoBoxPositioning(targetItemScreenLocation)
			changeInfoBoxPosition()
		}
	}

	const handleResize = () => {

	}

	const determineActiveScrollDirection = () => {
		lastThreeScrolls.shift()
		lastThreeScrolls.push(scrollY)
		if (lastThreeScrolls[2] > lastThreeScrolls[1]) {
			activeScrollDirection = 'down'
			return
		}
		if (lastThreeScrolls[2] < lastThreeScrolls[1]) {
			activeScrollDirection = 'up'
		}
	}

	const determineScrollSource = () => {
		if (isAutoScrolling) {
			userScroll = false
		}
	}

	const finishedScrolling = () => {
		activelyScrolling = false
		userScroll = false
		console.log(isAutoScrolling)
		if (element && !isAutoScrolling) {
			updateInfoBoxPosition(0)
		}
	}

	const handleScroll = (e: Event) => {
		activelyScrolling = true
		if (!isAutoScrolling) {
			userScroll = true
		}
		determineActiveScrollDirection()
		determineScrollSource()
		
		clearTimeout(scrollTimeout)
		scrollTimeout = setTimeout(finishedScrolling, 20)
	}

	const checkAutoScrollAndUpdatePositions = () => {
		calculateAutoScroll()
		setHighlightValues()
	}

	const getObject = () => {
		if (element) {
			const rect = element.getBoundingClientRect()
			highlightedObjectRect = rect
			checkAutoScrollAndUpdatePositions()
		} else {
			setTimeout(getObject, 200)
		}
	}

	const updateStep = (stepIndex: number) => {
		activeStepIndex = stepIndex
		activeStep = stepsToUse[activeStepIndex]
		id = useMobileSettings ? activeStep.mobileId || activeStep.id : activeStep.id
		element = document.getElementById(id)
		if (activeStep.action) {
			activeStep.action()
			setTimeout(getObject, activeStep.actionTimeout)
		} else {
			getObject()
		}
	}

	$: if (mounted && windowW && windowH) {
		initialize()
	}

	onMount(() => {
		setCustomizations()
		mounted = true
	})

	$: translateInfoX = infoBoxValues.x > 18 ? infoBoxValues.x : 18
	$: translateInfoY = !showHighlight ? windowH / 2 : infoBoxValues.y
	$: resizingOrScrolling = activelyResizing || activelyScrolling
</script>

<svelte:window
	on:resize={handleResize}
	on:scroll={handleScroll}
	bind:innerWidth={windowW}
	bind:innerHeight={windowH}
	bind:scrollY
/>



{#if behavior.lockScroll}
	<!-- <LockScroll /> -->
{/if}

{#if mounted}
	<div class='ducktour--wrapper'>
		<div class="
			ducktour--absolute
			ducktour--w-screen
			ducktour--top-0
			ducktour--left-0
			ducktour--z-2000
			ducktour--flex
			ducktour--justify-center"
			style="height: {mounted ? `${document.body.clientHeight}px` : 'auto'};"
			>
			<div class='ducktour--relative ducktour--w-screen ducktour--h-full'>
				<svg class='ducktour--absolute ducktour--left-0 ducktour--top-0' width="100%" height="100%">
					<defs>
						<mask id="mask" x="0" y="0" width="100" height="100">
							<rect x="0" y="0" width="100%" height="{document.body.clientHeight}px" fill="#fff" />
							<rect
								class="ducktour--origin-top-left ducktour--duration-500"
								x="0"
								y="0"
								width={highlightValues.width}
								height={highlightValues.height}
								rx={activeStep.roundedFull ? (highlightedObjectRect.height + _appearance.defaultPaddingY * 2) / 2 : highlightValues.roundness}
								style="transform: translate3d({highlightValues.translateX}px,{highlightValues.translateY + highlightValues.translateYExtra}px,0);"
							/>
						</mask>
					</defs>
					<rect
						x="0"
						y="0"
						width="100%"
						height="100%"
						mask="url(#mask)"
						fill-opacity="0.7"
					/>
				</svg>
			</div>
			<div
				class:ducktour--duration-500={infoBoxDisplayed}
				class:ducktour--opacity-0={!showInfoBox}
				class:ducktour--opacity-100={!resizingOrScrolling && showInfoBox}
				class:ducktour--opacity-80={resizingOrScrolling}
				class="
					ducktour--w-90
					ducktour--absolute
					ducktour--top-0
					ducktour--left-0
					ducktour--z-10
				"
				style="transform: translate3d({translateInfoX}px,{translateInfoY}px,0);"
			>
				{#if initialInfoSet}
					<SvgBubble
						values={infoBoxValues}
						activeScrollOrWindowResize={resizingOrScrolling || activelyResizing}
						bind:show={infoBoxDisplayed}
					/>
				{/if}
			</div>
			<div
				bind:this={infoBoxEl}
				class:ducktour--opacity-0={!showInfoBoxContent ||
					!initialInfoSet ||
					!showHighlight}
				class:ducktour--opacity-80={initialInfoSet &&
					showHighlight &&
					(resizingOrScrolling)}
				class:ducktour--opacity-100={!resizingOrScrolling && initialInfoSet &&
					showHighlight &&
					showInfoBoxContent}
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
				style="transform: translate3d({translateInfoX}px,{infoBoxValues.caretPositionY !== CaretPositioning.Top
					? translateInfoY - 12
					: translateInfoY}px,0);"
			>
				<div
					class="
						ducktour--relative
						ducktour--z-10
					"
					class:ducktour--opacity-0={infoBoxChangingPosition}
					class:ducktour--opacity-100={!infoBoxChangingPosition}
					class:ducktour--duration-100={infoBoxChangingPosition}
					class:ducktour--duration-500={!infoBoxChangingPosition}
					bind:this={infoBoxContentEl}
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
							<!-- <ButtonSecondary
								id="walkthrough-back-{id}"
								disabled={activeStepIndex === 0}
								color="primary"
								onClick={handleBack}
								text="previous"
							/>
							<Button
								id="walkthrough-next-{id}"
								onClick={handleNext}
								sm
								text={infoBoxContext?.buttonText}
							/> -->
							<button on:click={handleClickBack}>Back</button>
							<button on:click={handleClickNext}>Next</button>
						</div>
					</div>
				</div>
			</div>
			{#if showInfoBox}
				<!-- <Bottom {activeStepIndex} {handleBack} {handleSkip} steps={stepsToUse} /> -->
			{/if}
		</div>
	</div>
{/if}

<div class='
	ducktour--fixed
	ducktour--top-3
	ducktour--left-3
	ducktour--p-2
	ducktour--bg-white
	ducktour--z-2000
	ducktour--databox
'>
	<div class='ducktour--mb-3'>
		<h4>General Data</h4>
		<p>Window Height: {windowH}</p>
		<p>Starting Step Index: {behavior.startingStep}</p>
	</div>
	<div class='ducktour--mb-3'>
		<h4>Active Step Data</h4>
		<p>Active Step Index: {activeStepIndex}</p>
		<p>Active Step Title: {activeStep?.title}</p>
	</div>
	<div class='ducktour--mb-3'>
		<h4>Scroll Data</h4>
		<p>scrollY: {scrollY}</p>
		<p>Actively Scrolling: {activelyScrolling}</p>
		<p>Mousewheel Motion Detected: {mousewheelMotionDetected}</p>
		<p>Is Auto Scrolling: {isAutoScrolling}</p>
		<p>Active Scroll Direction: {activeScrollDirection}</p>
		<p>Position Before Auto Scroll: {positionBeforeAutoScroll}</p>
		<p>Position After Auto Scroll: {positionAfterAutoScroll}</p>
	</div>
	<div class='ducktour--mb-3'>
		<h4>Info Box Values:</h4>
		<p>scrollY: {scrollY}</p>
		<p>Actively Scrolling: {activelyScrolling}</p>
		<p>Mousewheel Motion Detected: {mousewheelMotionDetected}</p>
		<p>Is Auto Scrolling: {isAutoScrolling}</p>
		<p>Active Scroll Direction: {activeScrollDirection}</p>
		<p>Position Before Auto Scroll: {positionBeforeAutoScroll}</p>
		<p>Position After Auto Scroll: {positionAfterAutoScroll}</p>
	</div>
</div>

<style global>
	html {
		/* scroll-behavior: cubic-bezier(0, 0, 0, 0); */
	}

	.ducktour--wrapper {
		overflow-x: hidden;
	}

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

	h4 {
		font-weight: 1.5;
	}

	.ducktour--fixed {
		position: fixed;
	}

	.ducktour--absolute {
		position: absolute;
	}

	.ducktour--relative {
		position: relative;
	}

	.ducktour--top-0 { top: 0; }
	.ducktour--right-0 { right: 0; }
	.ducktour--bottom-0 { bottom: 0; }
	.ducktour--left-0 { left: 0; }

	.ducktour--top-3 { top: .75rem; }
	.ducktour--right-3 { right: .75rem; }
	.ducktour--bottom-3 { bottom: .75rem; }
	.ducktour--left-3 { left: .75rem; }

	.ducktour--w-screen {
		width: 100vw;
		max-width:100%;
	}
	
	.ducktour--h-screen {
		height: 100vh;
	}

	.ducktour--flex {
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}

	.ducktour--justify-center {
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
	}

	.ducktour--justify-between {
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: space-between;
	}

	.ducktour--mb-3 {
		margin-bottom: .75rem;
	}

	.ducktour--p-2 {
		padding: .5rem;
	}

	.ducktour--p-4 {
		padding: 1rem;
	}

	.ducktour--pt-4 {
		padding-top: 1rem;
	}

	.ducktour--w-90 {
		width: 22.5rem;
	}

	.ducktour--max-w-90 {
		max-width: 22.5rem;
	}

	.ducktour--min-w-50 {
		min-width: 12.5rem;
	}

	.ducktour--z-2000 {
		z-index: 2000;
	}

	.ducktour--z-10 {
		z-index: 10;
	}

	.ducktour--bg-white {
		background-color: #ffffff;
	}


	.ducktour--opacity-0 { opacity: 0; }
	.ducktour--opacity-80 { opacity: 0.8; }
	.ducktour--opacity-100 { opacity: 1; }

	.ducktour--origin-top-left {
		-webkit-transform-origin: top left;
		-ms-transform-origin: top left;
		transform-origin: top left;
	}

	.ducktour--duration-100 {
		-webkit-transition-duration: 100ms;
		-o-transition-duration: 100ms;
		transition-duration: 100ms;
	}

	.ducktour--duration-500 {
		-webkit-transition-duration: 500ms;
		-o-transition-duration: 500ms;
		transition-duration: 500ms;
	}



	/* Internal */

	.ducktour--databox {
		background-color: #ffffff;
		padding: .5rem;
		border-radius: 12px;

	}
</style>