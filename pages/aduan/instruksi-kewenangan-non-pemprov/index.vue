<template>
  <div>
    <Aduan
      :type-aduan-page="typeAduan.instruksiKewenanganNonPemprov.props"
      link-page-detail="/aduan/instruksi-kewenangan-anon-pemprov/detail"
    />
  </div>
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk.js'

export default {
  name: 'PageInstruksiKewenanganPemprov',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.instruksiKewenanganNonPemprov.label,
          link: typeAduan.instruksiKewenanganNonPemprov.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar aduan dari masyarakat Jabar yang perlu untuk dikoordinasikan.',
      typeAduan,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Instruksi Kewenangan Non-Pemprov')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
