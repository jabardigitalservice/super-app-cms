<template>
  <KlaimRW />
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Klaim Akun RW',
          link: '/'
        }
      ],
      descriptionPage:
        'Berisi semua daftar terkait klaim yang dilakukan oleh RW di aplikasi Sapawarga.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Klaim Akun RW')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
