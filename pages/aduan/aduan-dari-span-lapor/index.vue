<template>
  <Aduan
    :type-aduan-page="typeAduan.aduanDariSpanLapor"
    link-page-detail="/aduan/aduan-dari-span-lapor/detail"
  />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
export default {
  name: 'PageAduanDariSpanLapor',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.aduanDariSpanLapor.label,
          link: typeAduan.aduanDariSpanLapor.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar aduan dari masyarakat Jabar yang dari SP4N Lapor',
      typeAduan,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Aduan dari SP4N')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
