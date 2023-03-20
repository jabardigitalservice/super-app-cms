import { iconPopup } from '~/constant/icon-popup'

export default {
  data () {
    return {
      iconPopup
    }
  },
  methods: {
    confirmationPopupHandle (confirmationPopup, item) {
      this.popupMessage = {}
      this.dataPopup = {}
      this.popupMessage.title = confirmationPopup.descriptionText
      this.popupMessage.detail = item.title
      this.dataMessageNotif = item
      this.dataPopup = confirmationPopup
    },
    informationPopupHandle (informationPopup, isError) {
      if (isError) {
        this.popupMessage.title = informationPopup.failedInformation.descriptionText
        this.$store.commit('dialog/setIcon', this.iconPopup[1])
        this.dataPopup.buttonRight = informationPopup.failedInformation.buttonRight
        this.dataPopup.dialogType = informationPopup.failedInformation.dialogType
      } else {
        this.popupMessage.title = informationPopup.successInformation.descriptionText
        this.$store.commit('dialog/setIcon', this.iconPopup[0])
        this.dataPopup.buttonRight = informationPopup.successInformation.buttonRight
        this.dataPopup.dialogType = informationPopup.successInformation.dialogType
      }
    }
  }
}
