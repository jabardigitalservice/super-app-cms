<template>
  <TahuraLaporanPendapatan />
</template>

<script>
export default {
  name: 'PageLaporanPendapatan',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Laporan Pendapatan',
          link: '/tahura/laporan-pendapatan'
        }
      ],
      descriptionPage:
        'Laporan Pendapatan Taman Hutan Raya.'

    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Laporan Pendapatan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>

  <style>

  </style>
