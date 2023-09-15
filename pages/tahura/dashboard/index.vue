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
        'Lorem ipsum dolor sit amet consectetur. Quis platea malesuada tincidunt et.'
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
