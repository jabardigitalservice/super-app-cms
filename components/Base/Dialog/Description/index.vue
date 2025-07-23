<template>
  <div>
    <label class="mb-1 text-sm text-gray-800">
      {{ description }}
    </label>
    <slot>
      <p class="text-sm font-bold">
        {{ subDescription }}
      </p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'BaseDialogDescription',
  props: {
    description: {
      type: String,
      default: '',
    },
    subDescription: {
      type: String,
      default: '',
    },
  },
}
</script>
