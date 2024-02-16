<template>
  <AduanDetail
    :type-aduan-page="typeAduan.penginputanIkp.props"
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
  data() {
    return {
      navigations: [
        {
          label: this.$route.query.fromInstructionPage
            ? '...'
            : typeAduan.penginputanIkp.label,
          link: typeAduan.penginputanIkp.link,
          disabled: true,
        },
        {
          label: 'Detail Instruksi',
          link: `/aduan/penginputan-ikp/detail-ikp/${this.$route.query?.ikpCode}`,
          disabled: trua,
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/penginputan-ikp/detail/${this.$route.params.id}`,
        },
      ],
      descriptionPage:
        'Berisi detail aduan dari masyarakat Jabar yang perlu untuk dikoordinasikan.',
      typeAduan,
      listButtonDetail: [complaintButtonDetail.followup],
    }
  },
  computed: {
    listNavigation() {
      return this.navigations.filter((item) => {
        return !this.$route.query?.fromInstructionPage
          ? item.label !== 'Detail Instruksi'
          : item
      })
    },
  },
  mounted() {
    this.$store.commit('setActivePage', typeAduan.penginputanIkp.label)
    this.$store.commit('setHeader', {
      navigations: this.listNavigation,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
