<template>
  <TahuraDashboard />
</template>

<script>
export default {
  name: 'PageDashboardTahura',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Dashboard',
          link: '/tahura/dashboard'
        }
      ],
      descriptionPage:
        'Dashboard Taman Hutan Raya.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Dashboard')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>

<style></style>
