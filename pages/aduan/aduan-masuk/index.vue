<template>
  <Aduan
    :type-aduan-page="typeAduan.aduanMasuk"
    link-page-detail="/aduan/aduan-masuk/detail"
  />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
export default {
  name: 'PageAduanMasuk',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.aduanMasuk.label,
          link: typeAduan.aduanMasuk.link,
        },
      ],
      descriptionPage: 'Berisi semua daftar aduan dari masyarakat Jabar',
      typeAduan,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', typeAduan.aduanMasuk.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
