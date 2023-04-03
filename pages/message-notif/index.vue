<template>
  <div>
    <MessageNotif />
  </div>
</template>

<script>

export default {
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Pesan Broadcast',
          link: '/message-notif'
        }
      ],
      descriptionPage:
        'Berisi semua daftar pesan yang dikirimkan ke aplikasi Sapawarga.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Pesan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
