<template>
  <TahuraDaftarPesananDetail />
</template>

<script>
export default {
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Daftar Pesanan',
          link: '/tahura/daftar-pesanan'
        },
        {
          label: 'Detail Pesanan ',
          link: `/tahura/daftar-pesanan/detail/${this.$route.params.invoice}`
        }
      ],
      descriptionPage: `Detail pesanan untuk order “${this.$route.params.invoice}”`
    }
  },

  mounted () {
    this.$store.commit('setActivePage', 'Daftar Pesanan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
