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
        titlePopup: '',
        detailPopup: ''
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
      dataDetail: {},
      isError: false,
      showPopupConfirmationInformation: false,
      popupName: '' //  to find out which popup is running, ex: 'publish' or 'delete'
    }
  },
  mixins: [dialog],
  methods: {
    showPublishedPopupHandle (itemDataDetail) {
      this.confirmationPopupHandle(this.publishedConfirmationPopup, itemDataDetail, itemDataDetail.title)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopupConfirmationInformation = true
      this.popupName = 'publish'
    },
    showDeletePopupHandle (itemDataDetail) {
      this.confirmationPopupHandle(this.deleteConfirmationPopup, itemDataDetail, itemDataDetail.title)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopupConfirmationInformation = true
      this.popupName = 'delete'
    },
    submitHandle () {
      if (this.popupName === 'publish') {
        this.publishedMessageNotifHandle()
      } else {
        this.deleteMessageNotifHandle()
      }
    },
    async publishedMessageNotifHandle () {
      this.popupMessage = {}
      this.popupMessage.titlePopup = this.dataDetail.title
      this.dataPopup = {
        title: this.publishedInformationPopup.title,
        buttonLeft: this.publishedInformationPopup.buttonLeft
      }
      try {
        await this.$axios.post(`/messages/${this.dataDetail.id}/send`)
      } catch {
        this.isError = true
      }
      this.informationPopupHandle(this.publishedInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },
    async deleteMessageNotifHandle () {
      this.popupMessage = {}
      this.popupMessage.titlePopup = this.dataDetail.title
      this.dataPopup = {
        title: this.deleteInformationPopup.title,
        buttonLeft: this.deleteInformationPopup.buttonLeft
      }
      try {
        await this.$axios.delete(`/messages/${this.dataDetail.id}`)
      } catch (error) {
        this.isError = true
      }
      this.informationPopupHandle(this.deleteInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },

    closeHandle () {
      this.$store.commit('dialog/clearState')
      this.showPopupConfirmationInformation = false
      this.$fetch()
    },
    goToBackHandle () {
      this.$router.push('/message-notif')
    }
  }
}
