<template>
  <KlaimRW
    :type-claim-page="typeClaim.klaimRT"
    link-page-detail="/klaim/rt/detail"
  />
</template>

<script>
import { typeClaim } from '~/constant/klaim-rw'

export default {
  name: 'PageKlaimRT',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeClaim.klaimRT.label,
          link: typeClaim.klaimRT.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar terkait klaim yang dilakukan oleh RT di aplikasi Sapawarga.',
      typeClaim,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', typeClaim.klaimRT.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
