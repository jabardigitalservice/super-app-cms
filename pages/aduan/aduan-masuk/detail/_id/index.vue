<template>
  <DetailAduanMasuk />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
import DetailAduanMasuk from '~/components/Aduan/AduanMasuk/Detail'
export default {
  name: 'PageDetailAduanMasuk',
  components: { DetailAduanMasuk },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: typeAduan.aduanMasuk.label,
          link: typeAduan.aduanMasuk.link
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/aduan-masuk/detail/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Berisi detail aduan dari masyarakat Jabar',
      typeAduan
    }
  },
  mounted () {
    this.$store.commit('setActivePage', typeAduan.aduanMasuk.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
