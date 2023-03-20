<template>
  <TicketMuseum />
</template>

<script>
export default {
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Tiket Museum',
          link: '/'
        }
      ],
      descriptionPage:
          'Berisi semua daftar tiket museum di aplikasi Sapawarga.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Tiket Museum')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
