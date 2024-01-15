<template>
  <MessageNotifDetail
    :detail-message-notif="detailMessageNotif"
    @fetchData="$fetch()"
  />
</template>

<script>
import { formatDate } from '~/utils'

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
          label: 'Detail Pesan',
          link: `/message-notif/detail/${this.$route.params.id}`
        }
      ],
      descriptionPage: '',
      detailMessageNotif: {}
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(
        `/messages/${this.$route.params.id}`
      )
      this.detailMessageNotif = response.data.data
      this.detailMessageNotif.createdAt =
        formatDate(
          this.detailMessageNotif.createdAt || '',
          'dd/MM/yyyy HH:mm'
        ) || '-'
      this.detailMessageNotif.publishedAt =
        formatDate(
          this.detailMessageNotif.publishedAt || '',
          'dd/MM/yyyy HH:mm'
        ) || '-'
      this.descriptionPage = `Detail dari pesan “${this.detailMessageNotif.title}”`
    } catch (error) {
      this.detailMessageNotif = {}
    }
  },
  updated () {
    this.$store.commit('setActivePage', 'Pesan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
