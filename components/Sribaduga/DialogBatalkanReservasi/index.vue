<template>
  <DialogConfirmationBasic
    :dialog-modal="dialogModal"
    @confirmation-button="$emit('cancel')"
  />
</template>

<script>
export default {
  name: 'DialogBatalkanReservasi',
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
}
</script>
