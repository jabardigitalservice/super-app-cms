<template>
  <Maintenance :title="title" />
</template>

<script>
export default {
  name: 'PageUnauthorized',
  layout: 'Dashboard',
  data () {
    return {
      title: 'Oops, Anda tidak memiliki akses pada fitur ini!'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', '')
    this.$store.commit('setHeader', {
      navigations: [],
      descriptionPage: ''
    })
  }
}
</script>
