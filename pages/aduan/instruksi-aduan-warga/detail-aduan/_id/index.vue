<template>
  <AduanDetail :type-aduan-page="typeAduan.instruksiAduanWarga" />
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'PageDetailAduanMasuk',
  mixins: [popupAduanMasuk],
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: '...',
          link: '/aduan/instruksi-aduan-warga',
          disabled: true,
        },
        {
          label: 'Detail Instruksi',
          link: `/aduan/instruksi-aduan-warga/detail/${this.$route.query.ikpCode}`,
          disabled: true,
        },
        {
          label: 'Detail Aduan',
          link: this.$route.fullPath,
        },
      ],
      descriptionPage: 'Berisi detail aduan warga.',
      typeAduan,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Instruksi Aduan Warga')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
