<template>
  <jds-button variant="primary" :class="variant" v-on="$listeners">
    <slot name="icon-right" />
  </jds-button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    title: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: ''
    }
  }
}
</script>
