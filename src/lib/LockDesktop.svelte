<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	let windowW: number
	let initialHeight: string
	let initialWidth: string
	let initialOverflow: string

	onMount(() => {
		if (windowW) {
			const body = document.getElementsByTagName('body')[0]
			const diff = windowW - body.clientWidth

			initialHeight = body.style.height
			initialWidth = body.style.width
			initialOverflow = body.style.overflow

			body.style.height = '100vh'
			body.style.width = '100vw'
			body.style.overflow = 'hidden'
			body.style.paddingRight = `${diff}px`
		}
	})

	onDestroy(() => {
		if (windowW) {
			const body = document.getElementsByTagName('body')[0]

			body.style.height = initialHeight
			body.style.width = initialWidth
			body.style.overflow = initialOverflow
			body.style.paddingRight = `0px`
		}
	})
</script>

<svelte:window bind:innerWidth={windowW} />
