<template>
  <Maintenance />
</template>

<script>
export default {
  name: 'PageActivities',
  layout: 'Dashboard',
  mounted () {
    this.$store.commit('setActivePage', 'Kegiatan RW')
    this.$store.commit('setHeader', {
      navigations: [],
      descriptionPage: ''
    })
  }
}
</script>
