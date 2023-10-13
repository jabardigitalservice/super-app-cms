<template>
  <TahuraDaftarPesanan />
</template>

<script>
export default {
  name: 'PageDaftarPesanan',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Daftar Pesanan',
          link: '/tahura/daftar-pesanan'
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Daftar Pesanan')
    this.$store.commit('setHeader', {
      navigations: this.navigations
    })
  }
}
</script>
