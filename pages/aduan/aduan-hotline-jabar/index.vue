<template>
  <Aduan
    :type-aduan-page="typeAduan.aduanDialihkanHotlineJabar.props"
    link-page-detail="/aduan/aduan-hotline-jabar/detail"
  />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
export default {
  name: 'PageAduanHotlineJabar',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.aduanDialihkanHotlineJabar.label,
          link: typeAduan.aduanDialihkanHotlineJabar.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar aduan dari masyarakat Jabar yang merupakan kewenangan Hotline Jabar',
      typeAduan,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Aduan Hotline Jabar')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
