<template>
  <TahuraDaftarPesananDetail
    :detail-pesanan="detailDaftarPesanan"
    :detail-scanned="detailScanned"
  />
</template>

<script>
import { formatDate } from '~/utils'
export default {
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: 'Daftar Pesanan',
          link: '/tahura/daftar-pesanan',
        },
        {
          label: 'Detail Pesanan ',
          link: `/tahura/daftar-pesanan/detail/${this.$route.params.invoice}`,
        },
      ],
      descriptionPage: `Detail pesanan untuk order “${this.$route.params.invoice}”`,
      detailDaftarPesanan: {},
      categoriesTicket: [
        {
          code: 'wni',
          name: 'Total Wisatawan Lokal',
          quantity: 0,
        },
        {
          code: 'wna',
          name: 'Total Wisatawan Asing',
          quantity: 0,
        },
      ],
      detailScanned: {},
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get(
        `/ticket/tahura/orders/${this.$route.params.invoice}`
      )
      this.detailDaftarPesanan = response.data.data
      this.detailDaftarPesanan.orderedAt =
        formatDate(
          this.detailDaftarPesanan.orderedAt || '',
          'eeee, dd MMMM yyyy, HH:mm'
        ) || '-'

      this.detailDaftarPesanan.reservationDate =
        formatDate(
          this.detailDaftarPesanan.reservationDate || '',
          'eeee, dd MMMM yyyy, HH:mm'
        ) || '-'

      this.detailDaftarPesanan.categories =
        this.detailDaftarPesanan.categories.length > 0
          ? this.combinedCountTicket(this.detailDaftarPesanan.categories)
          : []

      if (this.detailDaftarPesanan.statusCode === 'scanned') {
        const responseScanned = await this.$axios.get(
          `/ticket/tahura/scan/ticket/${this.$route.params.invoice}`,
          {
            params: { status: 'success' },
          }
        )

        const { data: dataScanned } = responseScanned.data

        this.detailScanned = dataScanned
      }
    } catch (error) {
      this.detailTicketMuseum = {}
      this.detailScanned = {}
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Pesanan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
  methods: {
    combinedCountTicket(dataCategory) {
      this.categoriesTicket.forEach((status) => {
        const { code } = status
        const matchingStatus = dataCategory.find(
          (apiStatus) => apiStatus.code === code
        )
        if (matchingStatus) {
          status.quantity = matchingStatus.quantity
        }
      })

      return this.categoriesTicket
    },
  },
}
</script>
