<script>
  import '@svelteness/kit-docs/client/polyfills/index.js';
  import '@svelteness/kit-docs/client/styles/normalize.css';
  import '@svelteness/kit-docs/client/styles/fonts.css';
  import '@svelteness/kit-docs/client/styles/theme.css';
  import '@svelteness/kit-docs/client/styles/vars.css';

  import { page } from '$app/stores';
  import SvelteLogo from '$img/svelte-horizontal.svg?raw';

  import { Button, KitDocs, KitDocsLayout, createSidebarContext } from '@svelteness/kit-docs';
	import { base } from '$app/paths';

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: ({ meta, sidebar } = data);

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [{ title: 'Documentation', slug: `${base}/docs`, match: /\/docs/ }],

  };

  const { activeCategory } = createSidebarContext(sidebar);

  $: category = $activeCategory ? `${$activeCategory}: ` : '';
  $: title = meta ? `${category}${meta.title} | KitDocs` : null;
  $: description = meta?.description;
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<div class=''>
  <a href='{base}/docs/[...1]first-category/[...1]first-page'>1</a>
  <a href='{base}/docs/[...1]first-category/[...2]second-page'>2</a>
  <a href='{base}/docs/[...2]second-category/[...1]first-page'>3</a>
  <a href='{base}/docs/[...2]second-category/[...2]second-page'>4</a>
</div>
<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <div class="logo" slot="navbar-left">
      <Button href="{base}/">
        {@html SvelteLogo}
      </Button>
    </div>

    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  :global(:root) {
    --kd-color-brand-rgb: 233, 127, 6;
  }

  :global(:root.dark) {
    --kd-color-brand-rgb: 213, 149, 76;
  }

  .logo :global(a) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo :global(svg) {
    height: 36px;
    overflow: hidden;
  }
</style>
