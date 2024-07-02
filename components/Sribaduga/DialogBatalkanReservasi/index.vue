<template>
  <DialogConfirmationBasic
    :dialog-modal="dialogModal"
    @confirmation-button="deleteReservation()"
  />
</template>

<script>
export default {
  name: 'DialogBatalkanReservasi',
  props: {
    invoiceId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogModal: {
        nameModal: 'dialog-batalkan-reservasi',
        title: ' Konfirmasi Pembatalan Reservasi',
        descriptionText: 'Apakah Anda yakin ingin membatalkan reservasi ini?',
        button: {
          label: 'Batalkan Reservasi',
          variant: 'danger',
        },
      },
    }
  },
  methods: {
    async deleteReservation() {
      const payload = {
        invoice: this.invoiceId,
        attractionId: 'c64143d6-d630-4ccf-8529-483b9b737a52', // this is not credential, only attraction id
      }
      try {
        await this.$axios.post('/ticket/tms/admin/orders/cancel', payload)
        this.$store.commit('modals/CLOSE', 'detail-reservasi')
        this.$store.commit('modals/CLOSE', 'dialog-batalkan-reservasi')
        this.$store.commit(
          'dialog/setTitle',
          'Jadwal Reservasi Berhasil Dibatalkan'
        )
        this.$store.commit('modals/OPEN', 'dialog-success')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
