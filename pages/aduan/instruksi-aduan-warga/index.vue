<template>
  <DaftarIkp
    :ikp-type-page="ikpType.instruksiAduanWarga.props"
    detail-page="/aduan/instruksi-aduan-warga/detail"
  />
</template>

<script>
import DaftarIkp from '~/components/Aduan/DaftarIKP'
import { ikpType } from '~/constant/daftar-ikp'
export default {
  name: 'PageInstruksiAduan',
  components: { DaftarIkp },
  layout: 'Dashboard',
  data () {
    return {
      ikpType,
      navigations: [
        {
          label: ikpType.instruksiAduanWarga.label,
          link: ikpType.instruksiAduanWarga.link
        }
      ],
      descriptionPage:
        'Berisi semua daftar instruksi aduan warga dari masyarakat Jabar yang perlu ditindaklanjuti.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Daftar Instruksi Aduan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
