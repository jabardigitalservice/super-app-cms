<template>
  <KlaimRW
    :type-claim-page="typeClaim.klaimCamat"
    link-page-detail="/klaim/camat/detail"
  />
</template>

<script>
import { typeClaim } from '~/constant/klaim-rw'

export default {
  name: 'PageKlaimCamat',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeClaim.klaimCamat.label,
          link: typeClaim.klaimCamat.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar terkait klaim yang dilakukan oleh Camat di aplikasi Sapawarga.',
      typeClaim,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', typeClaim.klaimCamat.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
