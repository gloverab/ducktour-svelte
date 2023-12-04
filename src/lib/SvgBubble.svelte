<script lang="ts">
	import { CaretPositioning } from "./helpers.js";
	import type { IAppearancePrivate, IBehaviorPrivate } from "./types/private.js";

	interface ValueShape {
		topAddition: number,
		bottomAddition: number,
		width: number,
		height: number,
		caretL: number,
		caretC: number,
		caretR: number
	}

	const baseCaretL = 8
	const baseCaretC = 11.125
	const baseCaretR = 14.25

	const viewBox = 100

	const caretHeight = 3.5
	const caretWidthMaybe = 2.5
	const curveWidthMaybe = 6

	const curveValueMaybe = 2.6863 // Can this round to 2.6863? Feels like yes?
	const curveValueConverse = 0.8137 // adding this with the main one equals caret height? Hmm

	const mysteryNumber = 8 // Where does 8 come from??

	export let activeScrollOrWindowResize = false
	export let _appearance: IAppearancePrivate
	export let _behavior: IBehaviorPrivate
	export let show = false
	export let values = {
		w: 10,
		h: 10,
		x: 0,
		y: 0,
		caretPositionX: 0,
		caretPositionY: CaretPositioning.Hide
	}

	let initialValuesSet = false
	let outerWidth: number
	let multiplier: number
	let caretHidden = false

	$: if (outerWidth) {
		multiplier = viewBox / outerWidth
	}

	let valuesToUse: {
		w: number
		h: number
		caretOffset: number
		caretPositionY: CaretPositioning
	}

	$: if (multiplier && values) {
		valuesToUse = {
			w: values.w * multiplier,
			h: values.h * multiplier,
			caretOffset: values.caretPositionX * multiplier,
			caretPositionY: values.caretPositionY
		}
	}

	let animatedEl: SVGAnimateElement

	let initialValues: ValueShape
	let fromValues: ValueShape
	let toValues: ValueShape

	const setInitialValues = () => {
		initialValues = {
			topAddition: 0,
			bottomAddition: 3.5,
			width: valuesToUse.w,
			height: valuesToUse.h,
			caretL: baseCaretL,
			caretC: baseCaretC,
			caretR: baseCaretR
		}
		fromValues = {
			topAddition: 0,
			bottomAddition: 3.5,
			width: valuesToUse.w,
			height: valuesToUse.h,
			caretL: baseCaretL,
			caretC: baseCaretC,
			caretR: baseCaretR
		}
		toValues = {
			topAddition: valuesToUse.caretPositionY === CaretPositioning.Bottom ? 0 : 3.5,
			bottomAddition: valuesToUse.caretPositionY === CaretPositioning.Bottom ? 0 : 3.5,
			width: valuesToUse.w,
			height: valuesToUse.h,
			caretL: baseCaretL,
			caretC: baseCaretC,
			caretR: baseCaretR
		}
		initialValuesSet = true
	}

	$: if (valuesToUse && !initialValuesSet) {
		setInitialValues()
	}

	// const onHideCaret = () => {
	// 	fromValues = toValues
	// 	toValues = {
	// 		...toValues,
	// 		topAddition: 0,
	// 		bottomAddition: 3.5
	// 	}
	// 	caretHidden = true
	// 	animatedEl.beginElement()
	// }

	// const unhide = () => {
	// 	const previousFromValues = {...fromValues}
	// 	fromValues = toValues
	// 	toValues = previousFromValues
	// 	caretHidden = false
	// 	animatedEl.beginElement()
	// }

	// const onUnhideCaret = () => {
	// 	unhide()
	// 	setTimeout(unhide, 500)
	// }

	const animate = () => {
		fromValues = !show ? initialValues : toValues
		const maxOffsetRight = valuesToUse.w - baseCaretR * 2
		const useMaxRight = valuesToUse.caretOffset > maxOffsetRight
		let topAddition = 0
		let bottomAddition = 3.5
		switch (values.caretPositionY) {
			case CaretPositioning.Top:
				topAddition = 3.5
				bottomAddition = 3.5
				break
			case CaretPositioning.Bottom:
				topAddition = 0
				bottomAddition = 0
				break
		}
		toValues = {
			topAddition,
			bottomAddition,
			width: valuesToUse.w,
			height: valuesToUse.h,
			caretL: useMaxRight
				? baseCaretL + maxOffsetRight
				: baseCaretL + valuesToUse.caretOffset,
			caretC: useMaxRight
				? baseCaretC + maxOffsetRight
				: baseCaretC + valuesToUse.caretOffset,
			caretR: useMaxRight
				? baseCaretR + maxOffsetRight
				: baseCaretR + valuesToUse.caretOffset
		}
		show = true
		animatedEl.beginElement()
	}

	$: if (
		initialValuesSet &&
		animatedEl &&
		valuesToUse
	) {
		animate()
	}

	const getSvgPath = (values: ValueShape) => {
		const newHeight = values.height + values.bottomAddition
		return `
      M0 ${curveWidthMaybe + values.topAddition}
      C0 ${curveValueMaybe + values.topAddition} ${curveValueMaybe} ${values.topAddition} ${curveWidthMaybe} ${
			values.topAddition
		}
      H${values.caretL}
      L${values.caretC} 0
      L${values.caretR} ${values.topAddition}
      H${values.width - curveWidthMaybe}
      C${values.width - curveValueMaybe} ${values.topAddition} ${values.width} ${
			curveValueMaybe + values.topAddition
		} ${values.width} ${curveWidthMaybe + values.topAddition}
      V${newHeight - caretWidthMaybe}
      C${values.width} ${newHeight + curveValueConverse} ${values.width - curveValueMaybe} ${
			newHeight + caretHeight
		} ${values.width - curveWidthMaybe} ${newHeight + caretHeight}
      H${values.caretR}
      L${values.caretC} ${values.height + caretHeight * 2}
      L${values.caretL} ${newHeight + caretHeight}
      H${mysteryNumber}
      C${curveValueMaybe} ${newHeight + caretHeight} 0 ${newHeight + curveValueConverse} 0 ${newHeight - caretWidthMaybe}
      V${caretHeight + curveWidthMaybe}
      Z
    `
		
	}
</script>

<div bind:clientWidth={outerWidth} class="ducktour--w-full">
	{#if initialValuesSet}
		<div
			class="
				ducktour--w-full
				ducktour--transform
				ducktour--duration-1000
				{show
					? 'ducktour--translate-y-0'
					: 'ducktour--translate-y-30'}"
		>
			<svg viewBox="0 0 {viewBox} {viewBox}" xmlns="http://www.w3.org/2000/svg">
				<path id="p1" fill="{_appearance.infoBox.backgroundColor}" d={getSvgPath(initialValues)} />
				<animate
					bind:this={animatedEl}
					xlink:href="#p1"
					attributeName="d"
					dur={activeScrollOrWindowResize ? '100ms' : `${_behavior.animationDuration}ms`}
					begin="indefinite"
					keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
					keyTimes="0; 0.25; 0.5; 0.75; 1"
					calcMode="spline"
					from={getSvgPath(fromValues)}
					to={getSvgPath(toValues)}
					fill="freeze"
				/>
			</svg>
		</div>
	{/if}
</div>

<style global>
	.ducktour--transform {
	--tw-translate-x: 0;
	--tw-translate-y: 0;
	--tw-translate-z: 0;
	--tw-rotate: 0;
	--tw-rotate-x: 0;
	--tw-rotate-y: 0;
	--tw-rotate-z: 0;
	--tw-skew-x: 0;
	--tw-skew-y: 0;
	--tw-scale-x: 1;
	--tw-scale-y: 1;
	--tw-scale-z: 1;
	-webkit-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z));
	-ms-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z));
	transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z));
}

.ducktour--w-full {
	width: 100%;
}

.ducktour--duration-1200 {
	-webkit-transition-duration: 1200ms;
	-o-transition-duration: 1200ms;
	transition-duration: 1200ms;
}

.ducktour--translate-y-0 {
	--tw-translate-y: 0px;
}

.ducktour--translate-y-30 {
	--tw-translate-y: 7.5rem;
}
</style>