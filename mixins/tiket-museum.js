import {
  rejectConfirmationPopup,
  rejectInformationPopup,
  verificationConfirmationPopup,
  verificationInformationPopup,
  ticketStatus
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
      isError: false,
      showPopUp: false,
      popupName: '' //  to find out which popup is running, ex: 'verify' or 'reject'
    }
  },
  mixins: [dialog],
  methods: {
    showVerificationTicketHandle (item) {
      this.confirmationPopupHandle(this.verificationConfirmationPopup, item.invoice)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopUp = true
      this.popupName = 'verify'
    },
    showRejectTicketHandle (item) {
      this.confirmationPopupHandle(this.rejectConfirmationPopup, item.invoice)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopUp = true
      this.popupName = 'reject'
    },
    submitHandle () {
      if (this.popupName === 'verify') {
        this.verificationTicketHandle()
      } else {
        this.rejectTicketHandle()
      }
    },
    async verificationTicketHandle () {
      this.popupMessage = {}
      this.popupMessage.detail = this.titleTicket
      this.dataPopup = {
        title: this.verificationInformationPopup.title,
        buttonLeft: this.verificationInformationPopup.buttonLeft
      }
      try {
        await this.$axios.post('/ticket/aljabbar/payment-verification', { invoice: this.titleTicket })
      } catch {
        this.isError = true
      }
      this.informationPopupHandle(this.verificationInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },
    async rejectTicketHandle () {
      this.popupMessage = {}
      this.popupMessage.detail = this.titleTicket
      this.dataPopup = {
        title: this.rejectInformationPopup.title,
        buttonLeft: this.rejectInformationPopup.buttonLeft
      }
      try {
        await this.$axios.post('/ticket/aljabbar/payment-reject', { invoice: this.titleTicket })
      } catch (error) {
        this.isError = true
      }
      this.informationPopupHandle(this.rejectInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },

    closeHandle () {
      this.$store.commit('dialog/clearState')
      this.showPopUp = false
      this.$fetch()
    },
    getColorIconStatus (status) {
      switch (status) {
        case ticketStatus.verified:
          return 'bg-green-600'
        case ticketStatus.rejected:
        case ticketStatus.canceled:
        case ticketStatus.expired:
          return 'bg-red-600'
        case ticketStatus.ordered:
        case ticketStatus.confirmed:
          return 'bg-yellow-600'
        default:
          return 'bg-black'
      }
    }
  }
}
