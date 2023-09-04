<template>
  <AduanMasuk :type-aduan-page="typeAduan.aduanSpanLapor.props" />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
export default {
  name: 'PageManagementRelease',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: typeAduan.aduanSpanLapor.label,
          link: typeAduan.aduanSpanLapor.link
        }
      ],
      descriptionPage: 'Berisi semua daftar aduan dari masyarakat Jabar',
      typeAduan
    }
  },
  mounted () {
    this.$store.commit('setActivePage', typeAduan.aduanSpanLapor.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
