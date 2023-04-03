<template>
  <TicketMuseumDetail :data-detail-ticket="detailTicketMuseum" @close="closeHandle" />
</template>

<script>
import { formatDate, convertToRupiah } from '~/utils'
export default {
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Tiket Museum',
          link: '/ticket-museum'
        },
        {
          label: 'Detail Tiket Museum ',
          link: `/ticket-museum/detail/${this.$route.params.invoice}`
        }
      ],
      detailTicketMuseum: {},
      descriptionPage: `Detail dari ticket “${this.$route.params.invoice}”`
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(
        `/ticket/aljabbar/orders/${this.$route.params.invoice}`
      )
      this.detailTicketMuseum = response.data.data
      this.detailTicketMuseum.orderedAt =
        formatDate(
          this.detailTicketMuseum.orderedAt || '',
          'dd/MM/yyyy HH:mm'
        ) || '-'

      this.detailTicketMuseum.amount =
        convertToRupiah(this.detailTicketMuseum.amount || 0)
    } catch (error) {
      this.detailTicketMuseum = {}
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Tiket Museum')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  },
  methods: {
    closeHandle (value) {
      this.$store.commit('dialog/clearState')
      if (value.popupName === 'reject' && value.dialogType === 'information') {
        this.$router.push('/ticket-museum')
      } else {
        this.$fetch()
      }
    }
  }
}
</script>
