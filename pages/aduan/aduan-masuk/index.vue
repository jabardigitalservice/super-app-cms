<template>
  <AduanMasuk :type-aduan-page="typeAduan.aduanMasuk" />
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
          label: 'Daftar Aduan Masuk',
          link: '/aduan/aduan-masuk'
        }
      ],
      descriptionPage: 'Berisi semua daftar aduan dari masyarakat Jabar',
      typeAduan
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
