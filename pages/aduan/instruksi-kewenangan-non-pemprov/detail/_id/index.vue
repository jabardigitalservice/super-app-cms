<template>
  <AduanDetail
    :type-aduan-page="typeAduan.instruksiKewenanganNonPemprov"
    :list-button="listButtonDetail"
  />
</template>

<script>
import { typeAduan, complaintButtonDetail } from '~/constant/aduan-masuk.js'
export default {
  name: 'PageDetailInstruksiKewenanganNonPemprov',
  layout: 'Dashboard',
  data() {
    return {
      typeAduan,
      navigations: [
        {
          label: typeAduan.instruksiKewenanganNonPemprov.label,
          link: typeAduan.instruksiKewenanganNonPemprov.link,
          disabled: true,
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/instruksi-kewenangan-non-pemprov/detail/${this.$route.params.id}`,
        },
      ],
      descriptionPage:
        'Berisi detail aduan dari masyarakat Jabar yang perlu untuk dikoordinasikan.',
      listButtonDetail: [complaintButtonDetail.createInstruction],
    }
  },
  mounted() {
    const dataHeader = {
      label: typeAduan.instruksiKewenanganNonPemprov.label,
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
      fromInstructionPage: this.$route.query?.fromInstructionPage,
    }
    this.$store.dispatch('updateNavInstruction', dataHeader)
  },
}
</script>
