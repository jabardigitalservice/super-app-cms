import { deleteConfirmationPopup, deleteInformationPopup, publishedConfirmationPopup, publishedInformationPopup } from '~/constant/message-notif'
import dialog from '~/mixins/dialog'

export default {
  data () {
    return {
      publishedInformationPopup,
      publishedConfirmationPopup,
      deleteConfirmationPopup,
      deleteInformationPopup,
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
      dataMessageNotif: '',
      isError: false
    }
  },
  mixins: [dialog],
  methods: {
    showPublishedPopupHandle (item) {
      this.confirmationPopupHandle(this.publishedConfirmationPopup, item)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopup = true
    },
    showDeletePopupHandle (item) {
      this.confirmationPopupHandle(this.deleteConfirmationPopup, item)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopup = true
    },
    async publishedMessageNotifHandle (id) {
      this.confirmationDialog.showPublished = false
      try {
        await this.$axios.post(`/messages/${id}/send`)
      } catch {
        this.isError = true
      }
      this.showInformationDialog = true
    },
    async deleteMessageNotifHandle () {
      this.popupMessage = {}
      this.popupMessage.detail = this.dataMessageNotif.title
      this.dataPopup = {
        title: this.deleteInformationPopup.title,
        buttonLeft: this.deleteInformationPopup.buttonLeft
      }
      try {
        await this.$axios.delete('/messages')
      } catch (error) {
        this.isError = true
      }
      this.informationPopupHandle(this.deleteInformationPopup, this.isError)
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
