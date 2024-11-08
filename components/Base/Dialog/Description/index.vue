<template>
  <div>
    <label class="mb-1 text-sm text-gray-800">
      {{ description }}
    </label>
    <p class="text-sm font-bold">
      {{ subDescription }}
    </p>
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
