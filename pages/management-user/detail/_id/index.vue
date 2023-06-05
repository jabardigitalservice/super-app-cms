<template>
  <ManagementUserDetail />
</template>
<script>
export default {
  name: 'PageDetailManagementUser',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Kelola Pengguna',
          link: '/management-user'
        },
        {
          label: 'Detail Pengguna',
          link: `/management-user/detail/${this.$route.params.id}`
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Kelola Pengguna')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
