<template>
  <ManagementUser />
</template>

<script>
export default {
  name: 'PageManagementUser',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Kelola Pengguna',
          link: '/management-user'
        }
      ],
      descriptionPage:
        'Berisi semua daftar terkait klaim yang dilakukan oleh RW di aplikasi Sapawarga.'
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
