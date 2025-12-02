<template>
  <Maintenance />
</template>

<script>
export default {
  name: 'PageActivities',
  layout: 'Dashboard',
  mounted() {
    this.$store.commit('setActivePage', 'Kegiatan Posyandu')
    this.$store.commit('setHeader', {
      navigations: [],
      descriptionPage: '',
    })
  },
}
</script>
