<template>
  <AduanDetail :type-aduan-page="typeAduan.penentuanKewenangan.props" :list-button="listButtonDetail" />
</template>

<script>
import { typeAduan, complaintButtonDetail } from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'PageDetailPenentuanKewenangan',
  mixins: [popupAduanMasuk],
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: typeAduan.penentuanKewenangan.label,
          link: typeAduan.penentuanKewenangan.link
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/penentuan-kewenangan/detail/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Berisi detail aduan dari masyarakat Jabar yang perlu untuk diproses ke tahap selanjutnya.',
      typeAduan,
      listButtonDetail: [
        complaintButtonDetail.complaintProcess
      ]
    }
  },
  mounted () {
    this.$store.commit('setActivePage', typeAduan.penentuanKewenangan.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
