<template>
  <ManagementRelease />
</template>

<script>
export default {
  name: 'PageManagementRelease',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Manajemen Rilis',
          link: '/management-release'
        }
      ],
      descriptionPage: 'Pengaturan versi rilis aplikasi Sapawarga.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Master Data - Manajemen Rilis')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
