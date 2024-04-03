<template>
  <div
    class="h-fit rounded-lg bg-white"
    :class="customWidth === '' ? 'min-w-[510px]' : customWidth"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseDialogPanel',
  props: {
    customWidth: {
      type: String,
      default: '',
    },
  },
}
</script>
