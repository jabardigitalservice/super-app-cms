<template>
  <div>
    <p class="text-sm">
      {{ description }}
    </p>
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
      default: ''
    },
    subDescription: {
      type: String,
      default: ''
    }
  }
}
</script>
