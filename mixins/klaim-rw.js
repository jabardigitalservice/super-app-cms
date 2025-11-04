import {
  ENDPOINT_KLAIM_PENOLAKAN,
  ENDPOINT_KLAIM_VERIFIKASI,
} from '~/constant/endpoint-api'
import {
  verifyConfirmationPopup,
  rejectionConfirmationPopup,
  verificationInformationPopup,
  rejectInformationPopup,
  typeClaim,
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
      currentClaimType: {},
      isPopupConfirmationVerificationRw: false,
      isPopupConfirmationRejectionRw: false,
      isLoading: false,
    }
  },
  mixins: [dialog],
  methods: {
    checkTypeClaimPopupConfirmation(typeClaimPage, typeDialog) {
      const dataPopup = {
        verifyConfirmationPopup,
        rejectionConfirmationPopup,
      }

      const keyObject =
        typeDialog === 'reject-confirmation'
          ? 'rejectionConfirmationPopup'
          : 'verifyConfirmationPopup'
      const dataDialog = {
        dialogType: dataPopup[keyObject].dialogType,
        buttonCancel: dataPopup[keyObject].buttonCancel,
        buttonSubmit: dataPopup[keyObject][typeClaimPage.id].buttonSubmit,
        title: dataPopup[keyObject][typeClaimPage.id].title,
        descriptionText: dataPopup[keyObject][typeClaimPage.id].descriptionText,
      }
      return dataDialog
    },
    showPopupConfirmation(dataUser, typeDialog, props) {
      const { id, name, email } = dataUser
      this.currentClaimType = props
      this.dataDialog = this.checkTypeClaimPopupConfirmation(props, typeDialog)
      this.dataDialog = {
        ...this.dataDialog,
        nameModal: typeDialog,
        button: {
          label: this.dataDialog.buttonSubmit.label,
          variant: this.dataDialog.buttonSubmit.variant,
        },
      }

      if (typeDialog === 'reject-confirmation') {
        this.isPopupConfirmationRejectionRw = true
      } else {
        this.isPopupConfirmationVerificationRw = true
      }

      this.user = { id, name, email }
      this.$store.commit('modals/OPEN', this.dataDialog.nameModal)
    },
    async actionRejectUser() {
      this.isPopupConfirmationRejectionRw = false
      this.$store.commit('modals/CLOSEALL')
      this.isLoading = true
      this.informationDialog.title = 'Penolakan Akun RW'
      const endpointClaimType = `${ENDPOINT_KLAIM_PENOLAKAN}-${
        this.currentClaimType.pros === typeClaim.klaimKepalaDesa.props
          ? 'kades'
          : this.currentClaimType.name.toLowerCase()
      }`
      try {
        await this.$axios.post(endpointClaimType, {
          userId: this.user.id,
        })
        this.informationDialog.show = true
        this.informationDialog.info =
          rejectInformationPopup.successInformation.info
        this.informationDialog.message =
          rejectInformationPopup[
            this.currentClaimType.id
          ].successInformation.message
      } catch (error) {
        this.informationDialog.show = true
        this.informationDialog.info =
          rejectInformationPopup[
            this.currentClaimType.id
          ].failedInformation.info
        this.informationDialog.message = ''
      } finally {
        this.isLoading = false
      }
    },
    async actionVerifyUser() {
      this.isPopupConfirmationVerificationRw = false
      this.$store.commit('modals/CLOSEALL')
      this.isLoading = true
      this.informationDialog.title =
        verificationInformationPopup[this.currentClaimType.id].title
      const endpointClaimType = `${ENDPOINT_KLAIM_VERIFIKASI}-${
        this.currentClaimType.pros === typeClaim.klaimKepalaDesa.props
          ? 'kades'
          : this.currentClaimType.name.toLowerCase()
      }`
      try {
        await this.$axios.post(endpointClaimType, { userId: this.user.id })
        this.informationDialog.show = true
        this.informationDialog.info =
          verificationInformationPopup[
            this.currentClaimType.id
          ].successInformation.info
        this.informationDialog.message =
          verificationInformationPopup[
            this.currentClaimType.id
          ].successInformation.message
      } catch (error) {
        this.informationDialog.show = true
        this.informationDialog.info =
          verificationInformationPopup[
            this.currentClaimType.id
          ].failedInformation.info
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
