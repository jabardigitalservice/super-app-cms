<template>
  <AduanDetail :type-aduan-page="typeAduan.aduanDariSpanLapor" />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'PageDetailAduanDariSpanLapor',
  mixins: [popupAduanMasuk],
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.aduanDariSpanLapor.label,
          link: typeAduan.aduanDariSpanLapor.link,
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/aduan-dari-span-lapor/detail/${this.$route.params.id}`,
        },
      ],
      descriptionPage: 'Berisi detail aduan dari sp4n Lapor',
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
