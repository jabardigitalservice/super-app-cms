import {
  rejectConfirmationPopup,
  rejectInformationPopup,
  verificationConfirmationPopup,
  verificationInformationPopup
} from '~/constant/tiket-museum'
import dialog from '~/mixins/global-dialog'

export default {
  data () {
    return {
      rejectConfirmationPopup,
      rejectInformationPopup,
      verificationConfirmationPopup,
      verificationInformationPopup,
      popupMessage: {
        title: '',
        detail: ''
      },
      dataPopup: {
        title: '',
        descriptionText: '',
        dialogType: '',
        buttonLeft: {
          label: '',
          variant: ''
        },
        buttonRight: {
          label: '',
          variant: ''
        }
      },
      titleTicket: '',
      isError: false
    }
  },
  mixins: [dialog],
  methods: {
    showVerificationTicketHandle (item) {
      this.confirmationPopupHandle(this.verificationConfirmationPopup, item.invoice)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopup = true
    },
    showRejectTicketHandle (item) {
      this.confirmationPopupHandle(this.rejectConfirmationPopup, item.invoice)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopup = true
    },
    async verificationTicketHandle (id) {
      this.confirmationDialog.showPublished = false
      try {
        await this.$axios.post(`/messages/${id}/send`)
      } catch {
        this.isError = true
      }
      this.showInformationDialog = true
    },
    async rejectTicketHandle () {
      this.popupMessage = {}
      this.popupMessage.detail = this.titleTicket
      this.dataPopup = {
        title: this.rejectInformationPopup.title,
        buttonLeft: this.rejectInformationPopup.buttonLeft
      }
      try {
        await this.$axios.delete('/messages')
      } catch (error) {
        this.isError = true
      }
      this.informationPopupHandle(this.rejectInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },

    closeHandle () {
      this.$store.commit('dialog/clearState')
      this.showPopup = false
      this.$fetch()
    }
  }
}
