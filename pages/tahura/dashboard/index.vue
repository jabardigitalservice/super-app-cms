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
      ]
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Dashboard')
    this.$store.commit('setHeader', {
      navigations: this.navigations
    })
  }
}
</script>
