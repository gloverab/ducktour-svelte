# Ducktour Svelte

A lightweight and dependancy-free way to create highly-customizable product tours and walkthroughs, built from the ground up in Svelte.

## Install

```bash
npm install ducktour --save-dev
```

## Usage

```svelte
<script>
  import { onMount } from "svelte"
	import { Ducktour } from 'ducktour'

  let showTour = false
	
  const steps = [
    {
      title: 'Step 1',
      text: 'Install Ducktour with npm',
      id: 'step-1'
      buttonText: 'Next'
    },
    {
      title: 'Step 2',
      text: 'Create an array of steps with IDs',
      id: 'step-2'
      buttonText: 'Got it!'
    },
    {
      title: 'Step 3',
      text: 'Pass the steps to the Ducktour component',
      id: 'step-3'
      buttonText: 'Finish'
    }
  ]

  const handleClose = () => {
    showTour = false
  }

  onMount(() => {
    showTour = true
  })
</script>

<Ducktour
  steps={steps}
  close={handleClose}
/>
```

## Usage

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| steps | IStep[] | An array of steps that the tour will follow in order. | *required* |
| close | function | A function that closes the walkthrough. | *required* |
| appDetails | IAppDetails | An optional object that helps Ducktour render as effectively as possible in your application. | ```{ headerHeight: 100, mobileBreakpoint: 480 }``` |

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
