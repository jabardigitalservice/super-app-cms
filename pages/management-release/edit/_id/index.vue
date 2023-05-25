<template>
  <ManagementReleaseForm type-form="edit" />
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
          label: 'Ubah Versi Rilis',
          link: `/management-release/edit/${this.$route.params.id}`
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
