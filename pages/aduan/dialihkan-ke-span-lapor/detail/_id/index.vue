<template>
  <AduanDetail
    :type-aduan-page="typeAduan.aduanDialihkanSpanLapor"
    :list-button="listButtonDetail"
  />
</template>

<script>
import { typeAduan, complaintButtonDetail } from '~/constant/aduan-masuk'

export default {
  name: 'PageDetailAduanDialihkanKeSpan',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: 'Dialihkan ke SP4N',
          link: typeAduan.aduanDialihkanSpanLapor.link,
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/dialihkan-ke-span-lapor/detail/${this.$route.params.id}`,
        },
      ],
      descriptionPage: 'Berisi detail aduan yang dialihkan ke SP4N Lapor',
      typeAduan,
      listButtonDetail: [
        complaintButtonDetail.addIdSpan,
        complaintButtonDetail.editIdSpan,
      ],
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Dialihkan ke SP4N')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
  methods: {
    goToBackHandle() {
      this.$router.push('/aduan/dialihkan-ke-span-lapor')
    },
  },
}
</script>
