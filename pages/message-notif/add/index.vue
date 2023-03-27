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
        'Pengaturan versi rilis aplikasi Sapawarga'
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
