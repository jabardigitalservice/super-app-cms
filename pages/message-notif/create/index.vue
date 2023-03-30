<template>
  <MessageNotifForm />
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
        },
        {
          label: 'Tambah Pesan',
          link: '/message-notif/add'
        }
      ],
      descriptionPage:
        'Pembuatan pesan publik untuk dikirimkan ke aplikasi sapawarga'
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
