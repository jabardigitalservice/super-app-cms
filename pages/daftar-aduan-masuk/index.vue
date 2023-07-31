<template>
  <AduanMasuk />
</template>

<script>
export default {
  name: 'PageManagementRelease',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Daftar Aduan Masuk',
          link: '/daftar-aduan-masuk'
        }
      ],
      descriptionPage: 'Berisi semua daftar aduan dari masyarakat Jabar'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Daftar Aduan Masuk')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
