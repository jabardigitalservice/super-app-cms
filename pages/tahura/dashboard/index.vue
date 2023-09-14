<template>
  <div>Dashboard Tahura</div>
</template>

<script>
export default {
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
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>

<style>

</style>
