<template>
  <Maintenance />
</template>

<script>
export default {
  name: 'PageManagementRelease',
  layout: 'Dashboard',
  mounted () {
    this.$store.commit('setActivePage', 'Master Data - Manajemen Rilis')
  }
}
</script>
