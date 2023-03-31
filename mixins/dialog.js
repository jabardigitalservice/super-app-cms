import { iconPopup } from '~/constant/icon-popup'

export default {
  data () {
    return {
      iconPopup
    }
  },
  methods: {
    confirmationPopupHandle (confirmationPopup, item, messageTitle) {
      this.popupMessage = {}
      this.dataPopup = {}
      this.popupMessage.detailPopup = confirmationPopup.descriptionText
      this.popupMessage.titlePopup = messageTitle
      this.dataDetail = item
      this.dataPopup = confirmationPopup
    },
    informationPopupHandle (informationPopup, isError = false, isWarning = false) {
      if (isError) {
        this.popupMessage.detailPopup = informationPopup.failedInformation.descriptionText
        this.$store.commit('dialog/setIcon', this.iconPopup[1])
        this.dataPopup.buttonRight = informationPopup.failedInformation.buttonRight
        this.dataPopup.dialogType = informationPopup.failedInformation.dialogType
      } else if (isWarning) {
        this.popupMessage.detailPopup = informationPopup.warningInformation.descriptionText
        this.$store.commit('dialog/setIcon', this.iconPopup[2])
        this.dataPopup.buttonRight = informationPopup.warningInformation.buttonRight
        this.dataPopup.dialogType = informationPopup.warningInformation.dialogType
      } else {
        this.popupMessage.detailPopup = informationPopup.successInformation.descriptionText
        this.$store.commit('dialog/setIcon', this.iconPopup[0])
        this.dataPopup.buttonRight = informationPopup.successInformation.buttonRight
        this.dataPopup.dialogType = informationPopup.successInformation.dialogType
      }
    }
  }
}
