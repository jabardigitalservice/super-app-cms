<template>
  <AduanDalihkanKeSpan :type-aduan-page="typeAduan.aduanDialihkanSpanLapor.props" />
</template>

<script>
import AduanDalihkanKeSpan from '~/components/Aduan/DialihkanKeSpan'
import { typeAduan } from '~/constant/aduan-masuk'
export default {
  name: 'PageDialihkanKeSpan',
  components: {
    AduanDalihkanKeSpan
  },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: typeAduan.aduanDialihkanSpanLapor.label,
          link: typeAduan.aduanDialihkanSpanLapor.link
        }
      ],
      descriptionPage: 'Berisi semua daftar aduan dari masyarakat Jabar yang dialihkan ke SP4N Lapor',
      typeAduan
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Dialihkan ke SP4N')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
