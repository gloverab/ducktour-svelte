<script lang='ts'>
  import LockMobile from './LockMobile.svelte'
  import LockDesktop from './LockDesktop.svelte'
  
  let windowW
</script>

<svelte:window bind:innerWidth={windowW} />

{#if windowW < 500}
  <LockMobile />
{:else}
  <LockDesktop />
{/if}