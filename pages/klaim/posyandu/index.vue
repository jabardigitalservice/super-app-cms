<template>
  <KlaimRW
    :type-claim-page="typeClaim.klaimPosyandu"
    link-page-detail="/klaim/posyandu/detail"
  />
</template>

<script>
import { typeClaim } from '~/constant/klaim-rw'

export default {
  name: 'PageKlaimPosyandu',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeClaim.klaimPosyandu.label,
          link: typeClaim.klaimPosyandu.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar terkait klaim yang dilakukan oleh Posyandu di aplikasi Sapawarga.',
      typeClaim,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', typeClaim.klaimPosyandu.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
