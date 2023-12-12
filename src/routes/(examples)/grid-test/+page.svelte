<script lang="ts">
	import { DisplayOn } from '$lib/types/enums.js';
	import CustomInfoBox from '../../../example-components/CustomInfoBox.svelte';
	import Tour from '../../../lib/Tour.svelte'

	let showWalkthrough = true

	/* eslint:disable-next-line */
	const arr = Array.apply(undefined, { length: 24 })

	const characters =
		'ABCDEFG HIJKL MNOPQRS TUVWXYZa bcdefgh ijklmnopqrs tuvwxyz012 345 789'

	const getRandomInt = (min: number, max: number) => {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	const generateString = (length: number) => {
		let result = ' '
		const charactersLength = characters.length
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}

		return result
	}

	const testSteps = arr.map((item, i) => {
		return {
			title: `Test region ${i + 1}`,
			text: `Here we're seeing how the smart bubble responds to the placement of region ${
				i + 1
			} with random text length. ${generateString(getRandomInt(10, 200))}`,
			buttonText: 'Next',
			id: `grid-item-${i}`,
			displayOn: DisplayOn.Both
		}
	})

	const buttonSteps = [
		{
			title: 'Button One',
			text: "Here we're seeing how the smart bubble responds to the placement of button 1.",
			buttonText: 'Next',
			id: 'btn-1',
			displayOn: DisplayOn.Both
		},
		{
			title: 'Button Two',
			text: "Here we're seeing how the smart bubble responds to the placement of button 2.",
			buttonText: 'Next',
			id: 'btn-2',
			displayOn: DisplayOn.Both
		},
		{
			title: 'Button Three',
			text: "Here we're seeing how the smart bubble responds to the placement of button 3.",
			buttonText: 'Next',
			id: 'btn-3',
			displayOn: DisplayOn.Both
		},
		{
			title: 'Button Four',
			text: "Here we're seeing how the smart bubble responds to the placement of button 4.",
			buttonText: 'Next',
			id: 'btn-4',
			displayOn: DisplayOn.Both
		},
	]

	$:walkthroughTestSteps = [...buttonSteps, ...testSteps]
</script>

<div class="
	ducktour--w-full
	ducktour--grid
	ducktour--grid-cols-3"
>
	<header>
		<h1>gridtest</h1>
		<div class='right-side'>
			<button id='btn-1'>Button 1</button>
			<button id='btn-2'>Button 2</button>
			<button id='btn-3'>Button 3</button>
			<button id='btn-4'>Button 4</button>
		</div>
	</header>
	{#each arr as item, i}
		<div
			id="grid-item-{i}"
			class="
				ducktour--col-span-1
				ducktour--w-full
				ducktour--h-60
				{i % 2 === 0
					? 'bg-primary'
					: 'bg-secondary'}"
		/>
	{/each}
</div>

{#if showWalkthrough}
	<Tour
		customComponents={{
			infoBox: {
				component: CustomInfoBox
			}
		}}
		devmode
		close={() => {showWalkthrough = false}}
		steps={walkthroughTestSteps}
		behavior={{ startingStep: 8, animationDuration: 800 }}
	/>
{/if}

<style global>
	*, *::before, *::after {
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: border-box;    /* Firefox, other Gecko */
		box-sizing: border-box;         /* Opera/IE 8+ */
	}

	header {
		width: 100vw;
		position: fixed;
		display: flex;
		justify-content: space-between;
		left: 0;
		top: 0;
		height: 100px;
		background-color: green;
	}

	.right-side {
		display: flex;
		align-items: center;
	}

	header button {
		width: 100px;
		height: 100%;
	}

	.ducktour--h-200 {
		height: 600px;
	}

	.ducktour--grid {
		display: -ms-grid;
		display: grid;
	}

	.ducktour--grid-cols-3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.ducktour--col-span-1 {
		-ms-grid-column-span: span 1 / span 1;
		grid-column: span 1 / span 1;
	}

	.bg-primary {
		background-color: blue;
	}

	.bg-secondary {
		background-color: red;
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

	.ducktour--top-0 {
		top: 0;
	}

	.ducktour--top-3 {
		top: .75rem;
	}

	.ducktour--left-0 {
		left: 0;
	}

	.ducktour--left-0 {
		left: 0;
	}

	.ducktour--w-full {
		width: 100%;
	}

	.ducktour--w-screen {
		width: 100vw;
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

	.ducktour--p-4\.5 {
		padding: 1.125rem;
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

	.ducktour--h-60 {
		height: 15rem;
	}

	.ducktour--z-2000 {
		z-index: 2000;
	}

	.ducktour--z-10 {
		z-index: 10;
	}


	.ducktour--opacity-0 { opacity: 0 }
	.ducktour--opacity-10 { opacity: 10 }
	.ducktour--opacity-50 { opacity: 50 }
	.ducktour--opacity-80 { opacity: 80 }
	.ducktour--opacity-100 { opacity: 100 }

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

	.ducktour--origin-top-left {
		-webkit-transform-origin: top left;
		-ms-transform-origin: top left;
		transform-origin: top left;
	}

	.ducktour--duration-100 {
		-webkit-transition-duration: 500ms;
		-o-transition-duration: 500ms;
		transition-duration: 500ms;
	}

	.ducktour--duration-500 {
		-webkit-transition-duration: 500ms;
		-o-transition-duration: 500ms;
		transition-duration: 500ms;
	}
</style>