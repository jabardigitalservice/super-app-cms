import { verifyConfirmationPopup, verificationInformationPopup, rejectInformationPopup } from '~/constant/klaim-rw'
import dialog from '~/mixins/dialog'

export default {
  data () {
    return {
      showPopupConfirmationInformation: false,
      informationDialog: {
        title: '',
        show: false,
        info: '',
        message: '',
        file: '',
        mimeType: ''
      },
      user: {}
    }
  },
  mixins: [dialog],
  methods: {
    showVerifyPopupHandle (dataRw) {
      const { id, name } = dataRw
      this.confirmationPopupHandle(verifyConfirmationPopup, dataRw, dataRw.name)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopupConfirmationInformation = true
      this.user.id = id || ''
      this.user.name = name || ''
    },
    rejectUser (dataRw) {
      const { id, name, email } = dataRw
      this.user.id = id || ''
      this.user.name = name || ''
      this.user.email = email || ''
      this.showRejectRw = true
    },
    async actionRejectUser () {
      this.showRejectRw = false
      this.dataInfo.title = 'Penolakan Akun RW'
      try {
        await this.$axios.post('/user/role/reject-rw', {
          userId: this.user.id
        })
        this.informationDialog.show = true
        this.informationDialog.info = rejectInformationPopup.successInformation.info
        this.informationDialog.message = rejectInformationPopup.successInformation.message
      } catch (error) {
        this.informationDialog.show = true
        this.informationDialog.info = rejectInformationPopup.failedInformation.info
        this.informationDialog.message = ''
      }
    },
    async actionVerifyUser () {
      this.showPopupConfirmationInformation = false
      this.informationDialog.title = verificationInformationPopup.title
      try {
        await this.$axios.post('/user/role/verify-rw', { userId: this.user.id })
        this.informationDialog.show = true
        this.informationDialog.info = verificationInformationPopup.successInformation.info
        this.informationDialog.message = verificationInformationPopup.successInformation.message
      } catch (error) {
        this.informationDialog.show = true
        this.informationDialog.info = verificationInformationPopup.failedInformation.info
        this.informationDialog.message = ''
      }
    },
    onClosePopupInfo () {
      this.showPopupConfirmationInformation = false
      this.informationDialog.show = false
      this.$fetch()
    }
  }
}
