<template>
  <KlaimRW
    :type-claim-page="typeClaim.klaimLurah"
    link-page-detail="/klaim/lurah/detail"
  />
</template>

<script>
import { typeClaim } from '~/constant/klaim-rw'

export default {
  name: 'PageKlaimLurah',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeClaim.klaimLurah.label,
          link: typeClaim.klaimLurah.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar terkait klaim yang dilakukan oleh Lurah di aplikasi Sapawarga.',
      typeClaim,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', typeClaim.klaimLurah.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
