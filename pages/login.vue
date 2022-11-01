<template>
  <div />
</template>

<script>
export default {
  name: 'PageLogin',
  mounted () {
    this.$auth.loginWith('keyclock')
  }
}
</script>
