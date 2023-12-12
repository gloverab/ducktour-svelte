<script lang='ts'>
	import type { IStep } from "$lib/types/props.js";

  export let activeStepIndex: number
  export let step: any
  export let steps: IStep[]
  export let onNext: () => void
  export let onBack: () => void
</script>

<p class="font-medium">{step?.title}</p>
  <p class="text-sm">{step?.text}</p>
  <div class="
    ducktour--flex
    ducktour--justify-between
    ducktour--items-center
    ducktour--pt-4
    ducktour--space-x-6
  ">
    <p class="font-medium text-sm text-grey-dark">
      {activeStepIndex + 1} la la lao {steps.length}
    </p>
    <div class="
      ducktour--flex
      ducktour--items-center
      ducktour--space-x-6
    ">
      <button on:click={onBack}>Back</button>
      <button on:click={onNext}>Next</button>
    </div>
  </div>