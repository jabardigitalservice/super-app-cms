<template>
  <DetailAduanDialihkanKeSpan />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
import DetailAduanDialihkanKeSpan from '~/components/Aduan/DialihkanKeSpan/Detail'
export default {
  name: 'PageDetailAduanDialihkanKeSpan',
  components: { DetailAduanDialihkanKeSpan },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: typeAduan.aduanDialihkanSpanLapor.label,
          link: typeAduan.aduanDialihkanSpanLapor.link
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/dialihkan-ke-span-lapor/detail/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Berisi detail aduan yang dialihkan ke SP4N Lapor',
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
