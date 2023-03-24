<template>
  <TicketMuseumDetail :data-detail="detailTicketMuseum" @close="closeHandle" />
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
      descriptionPage: `Detail dari ticket “${this.$route.params.invoice}”`,
      dataDummy: {
        reservationDate: '2023-03-20',
        sessionId: '2',
        sessionName: 'Sesi 2',
        sessionHour: '15:30 - 17.30 WIB',
        invoice: 'MRAJ-23032324001',
        ticketCount: 4,
        amount: 50000,
        status: 'confirmed',
        orderedAt: '2023-03-20 02:24:56.961784',
        fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
        tickets: [
          {
            id: 1,
            ticketNumber: '',
            code: 'regular',
            name: 'Reguler'
          },
          {
            id: 2,
            ticketNumber: '',
            code: 'regular',
            name: 'Reguler'
          },
          {
            id: 3,
            ticketNumber: '',
            code: 'student',
            name: 'Pelajar'
          }
        ]
      }
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
      // todo: replace data to API ready
      // this.detailTicketMuseum = {}

      this.detailTicketMuseum = this.dataDummy
      this.detailTicketMuseum.orderedAt =
        formatDate(
          this.detailTicketMuseum.orderedAt || '',
          'dd/MM/yyyy HH:mm'
        ) || '-'
      this.detailTicketMuseum.amount =
        convertToRupiah(this.detailTicketMuseum.amount || 0)
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
