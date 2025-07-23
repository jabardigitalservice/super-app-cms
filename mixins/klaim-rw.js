import {
  verifyConfirmationPopup,
  verificationInformationPopup,
  rejectInformationPopup,
} from '~/constant/klaim-rw'
import dialog from '~/mixins/dialog'

export default {
  data() {
    return {
      showPopupConfirmationInformation: false,
      informationDialog: {
        title: '',
        show: false,
        info: '',
        message: '',
        file: '',
        mimeType: '',
      },
      user: {},
      dataDialog: {},
      isPopupConfirmationVerificationRw: false,
      isPopupConfirmationRejectionRw: false,
      isLoading: false,
    }
  },
  mixins: [dialog],
  methods: {
    showPopupConfirmationRw(dataRw, typeDialog) {
      const { id, name, email } = dataRw
      this.dataDialog = {
        nameModal: typeDialog,
        title: 'Tolak Akun RW',
        descriptionText: 'Apakah Anda yakin ingin menolak akun RW ini?',
        button: {
          label: 'Tolak Akun RW ini',
          variant: 'danger',
        },
      }

      if (typeDialog === 'verify-confirmation-rw') {
        this.dataDialog = {
          ...this.dataDialog,
          title: verifyConfirmationPopup.title,
          descriptionText: verifyConfirmationPopup.descriptionText,
          button: {
            label: verifyConfirmationPopup.buttonSubmit.label,
            variant: verifyConfirmationPopup.buttonSubmit.variant,
          },
        }
        this.isPopupConfirmationVerificationRw = true
      } else {
        this.isPopupConfirmationRejectionRw = true
      }

      this.user = { id, name, email }
      this.$store.commit('modals/OPEN', this.dataDialog.nameModal)
    },
    rejectUser(dataRw) {
      const { id, name, email } = dataRw
      this.user.id = id || ''
      this.user.name = name || ''
      this.user.email = email || ''
      this.showRejectRw = true
    },
    async actionRejectUser() {
      this.isPopupConfirmationRejectionRw = false
      this.$store.commit('modals/CLOSEALL')
      this.isLoading = true
      this.informationDialog.title = 'Penolakan Akun RW'
      try {
        await this.$axios.post('/user/role/reject-rw', {
          userId: this.user.id,
        })
        this.informationDialog.show = true
        this.informationDialog.info =
          rejectInformationPopup.successInformation.info
        this.informationDialog.message =
          rejectInformationPopup.successInformation.message
      } catch (error) {
        this.informationDialog.show = true
        this.informationDialog.info =
          rejectInformationPopup.failedInformation.info
        this.informationDialog.message = ''
      } finally {
        this.isLoading = false
      }
    },
    async actionVerifyUser() {
      this.isPopupConfirmationVerificationRw = false
      this.$store.commit('modals/CLOSEALL')
      this.isLoading = true
      this.informationDialog.title = verificationInformationPopup.title
      try {
        await this.$axios.post('/user/role/verify-rw', { userId: this.user.id })
        this.informationDialog.show = true
        this.informationDialog.info =
          verificationInformationPopup.successInformation.info
        this.informationDialog.message =
          verificationInformationPopup.successInformation.message
      } catch (error) {
        this.informationDialog.show = true
        this.informationDialog.info =
          verificationInformationPopup.failedInformation.info
        this.informationDialog.message = ''
      } finally {
        this.isLoading = false
      }
    },
    onClosePopupInfo() {
      this.showPopupConfirmationInformation = false
      this.informationDialog.show = false
      this.$fetch()
    },
    onClosePopupConfirmation() {
      this.isPopupConfirmationRejectionRw = false
      this.isPopupConfirmationVerificationRw = false
      this.$store.commit('modals/CLOSEALL')
    },
  },
}
