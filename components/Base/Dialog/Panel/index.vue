<template>
  <div class="rounded-lg bg-white" :class="customWidth">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseDialogPanel',
  props: {
    customWidth: {
      type: String,
      default: 'min-w-[510px]',
    },
  },
}
</script>
