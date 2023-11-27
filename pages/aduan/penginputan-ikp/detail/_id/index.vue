<template>
  <AduanDetail :type-aduan-page="typeAduan.penginputanIkp.props" :list-button="listButtonDetail" />
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
          label: typeAduan.penginputanIkp.label,
          link: typeAduan.penginputanIkp.link
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/penginputan-ikp/detail/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Berisi detail aduan dari masyarakat Jabar yang perlu untuk dikoordinasikan.',
      typeAduan,
      listButtonDetail: [
        complaintButtonDetail.followup
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
