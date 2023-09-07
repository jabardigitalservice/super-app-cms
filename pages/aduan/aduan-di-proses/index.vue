<template>
  <AduanMasuk :type-aduan-page="typeAduan.aduanDiProses.props" />
</template>

<script>
import AduanMasuk from '~/components/Aduan/AduanMasuk'
import { typeAduan } from '~/constant/aduan-masuk'
export default {
  name: 'PageAduanDiProses',
  components: {
    AduanMasuk
  },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: typeAduan.aduanDiProses.label,
          link: typeAduan.aduanDiProses.link
        }
      ],
      descriptionPage: 'Berisi semua daftar aduan dari masyarakat Jabar',
      typeAduan
    }
  },
  mounted () {
    this.$store.commit('setActivePage', typeAduan.aduanDiProses.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
