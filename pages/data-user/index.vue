<template>
  <Maintenance />
</template>

<script>
export default {
  name: 'PageDataUser',
  layout: 'Dashboard',
  mounted () {
    this.$store.commit('setActivePage', 'Master Data - Kelola Pengguna')
    this.$store.commit('setHeader', {
      navigations: '',
      descriptionPage: ''
    })
  }
}
</script>
