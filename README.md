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

## Props

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `steps` | IStep[] | An array of steps that the tour will follow in order. | *required* |
| `close` | function | A function that closes the walkthrough. | *required* |
| `appDetails` | IAppDetails | An optional object that helps Ducktour render as effectively as possible in your application. | ```{ headerHeight: 100, mobileBreakpoint: 480 }``` |
| `appearance` | IAppearance | Go to [Appearance](##appearance) | See [Appearance](##appearance) |
| `behavior` | IBehavior |  | Go to [Behavior](##behavior) | See [Behavior](##behavior) |
| `customComponents` | ICustomComponents | Go to [Custom Components](##custom-components) | See [Custom Components](##custom-components) |

## Appearance

An optional object used to customize the appearance of Ducktour.

### Default

```js
{
  highlightPaddingX: 12,
  highlightPaddingY: 12,
  highlightRadius: 12,
  overlayOpacity: .7,
  overlayFill: "#000",
  infoBox: {
    backgroundColor: "#fff",
    padding: 16,
    maxWidth: 200,
    minWidth: 360
  }
}
```

## Behavior

An optional object used to customize the appearance of Ducktour.

### Default

```js
{
  highlightPaddingX: 12,
  highlightPaddingY: 12,
  highlightRadius: 12,
  overlayOpacity: .7,
  overlayFill: "#000",
  infoBox: {
    backgroundColor: "#fff",
    padding: 16,
    maxWidth: 200,
    minWidth: 360
  }
}
```

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
