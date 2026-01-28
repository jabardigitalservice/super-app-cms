<template>
  <KlaimRT />
</template>

<script>
export default {
  name: 'KlaimRTPage',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Klaim Akun RT',
          link: '/klaim-rt'
        }
      ],
      descriptionPage:
        'Berisi semua permintaan klaim yang diajukan oleh pengguna RT di aplikasi Sapawarga.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Klaim Akun RT')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
