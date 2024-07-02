<template>
  <AduanDetail
    :type-aduan-page="typeAduan.aduanMasuk.props"
    :list-button="listButtonDetail"
  />
</template>

<script>
import { typeAduan, complaintButtonDetail } from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'PageDetailAduanMasuk',
  mixins: [popupAduanMasuk],
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
      typeAduan,
      listButtonDetail: [
        complaintButtonDetail.failed,
        complaintButtonDetail.verified
      ]
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
