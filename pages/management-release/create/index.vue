<template>
  <ManagementReleaseForm type-form="create" />
</template>

<script>
export default {
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Manajemen Rilis',
          link: '/management-release'
        },
        {
          label: 'Tambah Versi Rilis',
          link: '/management-release/create'
        }
      ],
      descriptionPage: 'Pengaturan versi rilis aplikasi Sapawarga.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Manajemen Rilis')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
