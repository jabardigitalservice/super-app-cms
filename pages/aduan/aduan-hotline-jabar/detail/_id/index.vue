<template>
  <AduanDetail
    :type-aduan-page="typeAduan.aduanDialihkanHotlineJabar"
    :list-button="listButtonDetail"
  />
</template>

<script>
import { typeAduan, complaintButtonDetail } from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'PageDetailAduanHotlineJabar',
  mixins: [popupAduanMasuk],
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.aduanDialihkanHotlineJabar.label,
          link: typeAduan.aduanDialihkanHotlineJabar.link,
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/aduan-hotline-jabar/detail/${this.$route.params.id}`,
        },
      ],
      descriptionPage: 'Berisi detail aduan dari masyarakat Jabar',
      typeAduan,
      listButtonDetail: [
        complaintButtonDetail.followupHotlineJabar,
        complaintButtonDetail.evidenceFollowupHotlineJabar,
      ],
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
