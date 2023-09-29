<template>
  <BasePreviewPdf />
</template>

<script>
export default {
  name: 'PreviewPdfTahura',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Preview Laporan Pendapatan',
          link: '/tahura/preview-pdf'
        }
      ],
      descriptionPage: 'Preview Laporan Pendapatan Taman Hutan Raya.'
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

  <style></style>
