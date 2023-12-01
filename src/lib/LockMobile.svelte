<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	let scrollYState
	let scrollY
	let windowW

	onMount(() => {
		if (windowW && document) {
			const body = document.getElementsByTagName('body')[0]
			const diff = windowW - body.clientWidth
			scrollYState = scrollY
			body.style.position = 'fixed'
			body.style.marginTop = `-${scrollY}px`
			body.style.width = '100vw'
			body.style.paddingRight = `${diff}px`
		}
	})

	onDestroy(() => {
		if (document && window) {
			const body = document.getElementsByTagName('body')[0]
			body.style.position = 'initial'
			body.style.marginTop = `initial`
			body.style.width = `initial`
			body.style.paddingRight = `0px`

			window.scrollTo(0, scrollYState)
		}
	})
</script>

<svelte:window bind:innerWidth={windowW} bind:scrollY />
