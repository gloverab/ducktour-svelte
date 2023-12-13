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
| `appearance` | IAppearance | Learn More about [Appearance](#appearance) | [Appearance Defaults](#appearance-defaults) |
| `behavior` | IBehavior | Learn More about [Behavior](#behavior) | [Behavior Defaults](#behavior-defaults) |
| `customComponents` | ICustomComponents | Learn More about [Custom Components](#custom-components) | None |

## Appearance

An optional object used to customize the appearance of Ducktour.

### Appearance Defaults

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

### Behavior Defaults

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

## Custom Components

Ducktour provides a basic customizable look for the walkthrough out of the box. You're able to apply classes to the wrapper, title, text, colors, and buttons. But if you'd like to pass in your own component, Ducktour supports that too. We've all worked with designers and companies who need everything to stay as on brand as possible.

Ducktour will always pass the following props to your component:

| Prop | Type | Description |
| ---- | ---- | ----------- |
| activeStepIndex | number | Index of the current step |
| step | IStep | An object of the current step, containing the step information that you can display to the user. |
| steps | IStep[] | An array of all active steps in the tour. Primarily useful for displaying the total step count. |
| onNext | function | A function that Ducktour will use to progress to the next step when clicked. You can perform any actions you want when a user clicks your "next" button, but you must invoke this function at some point in order to move the tour forward.|
| onBack | function | A function that Ducktour will use to regress to the previous step when clicked. You can perform any actions you want when a user clicks your "back" button, but you must invoke this function in order to move the tour back.|

You can also optionally define a custom props object that will also get passed to your custom component.

### Usage

```svelte
  <script>
    import YourSpecialInfoBoxComponent from './somewhere'
    import YourBottomComponent from './somewhere-else'
  </script>

  <Ducktour
    ...
    customComponents={
      {
        infoBox: {
          component: YourSpecialInfoBoxComponent,
          props: {
            foo: "fighters", 
            bar: "ista"
          }
        },
        bottom: {
          component: YourBottomComponent
        }
      }
    }
  >
```



## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
