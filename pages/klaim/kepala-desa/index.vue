<template>
  <KlaimRW
    :type-claim-page="typeClaim.klaimKepalaDesa"
    link-page-detail="/klaim/kepala-desa/detail"
  />
</template>

<script>
import { typeClaim } from '~/constant/klaim-rw'

export default {
  name: 'PageKlaimKepalaDesa',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeClaim.klaimKepalaDesa.label,
          link: typeClaim.klaimKepalaDesa.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar terkait klaim yang dilakukan oleh Kepala Desa di aplikasi Sapawarga.',
      typeClaim,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', typeClaim.klaimKepalaDesa.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
