<template>
  <Maintenance />
</template>

<script>
export default {
  name: 'PageConfiguration',
  layout: 'Dashboard',
  mounted () {
    this.$store.commit('setActivePage', 'Master Data - Konfigurasi')
  }
}
</script>
