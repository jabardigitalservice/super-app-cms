<template>
  <Aduan
    :type-aduan-page="typeAduan.penentuanKewenangan"
    link-page-detail="/aduan/penentuan-kewenangan/detail"
  />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'

export default {
  name: 'PagePenentuanKewenangan',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.penentuanKewenangan.label,
          link: typeAduan.penentuanKewenangan.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar aduan dari masyarakat Jabar yang perlu untuk diproses ke tahap selanjutnya.',
      typeAduan,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Penentuan Kewenangan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
