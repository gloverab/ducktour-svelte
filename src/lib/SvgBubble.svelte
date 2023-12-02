<script lang="ts">
	import { CaretPositioning } from "./helpers.js";

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

	export let activeScrollOrWindowResize = false
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

	// $: if (show && hideCaret && !caretHidden) {
	// 	onHideCaret()
	// }

	// $: if (show && !hideCaret && caretHidden) {
	// 	onUnhideCaret()
	// }

	const getSvgPath = (values: ValueShape) => {
		const newHeight = values.height + values.bottomAddition
		return `
      M0 ${6 + values.topAddition}
      C0 ${2.68629 + values.topAddition} 2.68629 ${values.topAddition} 6 ${
			values.topAddition
		}
      H${values.caretL}
      L${values.caretC} 0
      L${values.caretR} ${values.topAddition}
      H${values.width - 6}
      C${values.width - 2.6863} ${values.topAddition} ${values.width} ${
			2.68629 + values.topAddition
		} ${values.width} ${6 + values.topAddition}
      V${newHeight - 2.5}
      C${values.width} ${newHeight + 0.8137} ${values.width - 2.6863} ${
			newHeight + 3.5
		} ${values.width - 6} ${newHeight + 3.5}
      H${values.caretR}
      L${values.caretC} ${values.height + 7}
      L${values.caretL} ${newHeight + 3.5}
      H8
      C2.68629 ${newHeight + 3.5} 0 ${newHeight + 0.8137} 0 ${newHeight - 2.5}
      V9.5
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
				ducktour--duration-1200
				{show
					? 'ducktour--translate-y-0'
					: 'ducktour--translate-y-30'}"
		>
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<path id="p1" fill="#fff" d={getSvgPath(initialValues)} />
				<animate
					bind:this={animatedEl}
					xlink:href="#p1"
					attributeName="d"
					dur={activeScrollOrWindowResize ? '100ms' : '500ms'}
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