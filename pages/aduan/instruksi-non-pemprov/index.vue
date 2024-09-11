<template>
  <DaftarIkp
    :ikp-type-page="ikpType.instruksiNonPemprov.props"
    detail-page="/aduan/instruksi-non-pemprov/detail"
  />
</template>

<script>
import DaftarIkp from '~/components/Aduan/DaftarIKP'
import { ikpType } from '~/constant/daftar-ikp'
export default {
  name: 'PageInstruksiAduan',
  components: { DaftarIkp },
  layout: 'Dashboard',
  data() {
    return {
      ikpType,
      navigations: [
        {
          label: ikpType.instruksiNonPemprov.label,
          link: ikpType.instruksiNonPemprov.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar instruksi aduan warga dari masyarakat Jabar yang perlu ditindaklanjuti.',
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Instruksi Non Pemprov')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
