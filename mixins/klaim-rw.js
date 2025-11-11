import {
  ENDPOINT_KLAIM_PENOLAKAN,
  ENDPOINT_KLAIM_VERIFIKASI,
} from '~/constant/endpoint-api'
import {
  verifyConfirmationPopup,
  rejectionConfirmationPopup,
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
      currentClaimType: {},
      isPopupConfirmationVerification: false,
      isPopupConfirmationRejection: false,
      isPopupEditStatus: false,
      isLoading: false,
      typeDialog: '', // verify-confirmation / reject-confirmation / edit-status-claim
    }
  },
  mixins: [dialog],
  methods: {
    checkTypeClaimPopupConfirmation(typeClaimPage, typeDialog) {
      console.log(typeClaimPage)
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
      this.typeDialog = typeDialog

      if (typeDialog === 'reject-confirmation') {
        this.isPopupConfirmationRejection = true
      } else {
        this.isPopupConfirmationVerification = true
      }

      this.user = { id, name, email }
      this.$store.commit('modals/OPEN', this.dataDialog.nameModal)
    },
    showPopupEditStatusClaim(props, data) {
      this.currentClaimType = props
      const { id, name, roleStatus } = data
      this.user = { id, name, roleStatus }
      this.isPopupEditStatus = true
      this.typeDialog = 'edit-status-claim'
    },
    async actionRejectUser() {
      this.isPopupConfirmationRejection = false
      this.$store.commit('modals/CLOSEALL')
      this.informationDialog.show = true
      this.isLoading = true
      this.informationDialog.title =
        rejectInformationPopup[this.currentClaimType.id].title
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
          rejectInformationPopup[
            this.currentClaimType.id
          ].successInformation.info
        this.informationDialog.message =
          rejectInformationPopup[
            this.currentClaimType.id
          ].successInformation.message
        this.informationDialog.isSuccess = true
      } catch (error) {
        this.informationDialog.info =
          rejectInformationPopup[
            this.currentClaimType.id
          ].failedInformation.info
        this.informationDialog.message = ''
        this.informationDialog.isSuccess = false
      } finally {
        this.isLoading = false
      }
    },
    async actionVerifyUser() {
      this.isPopupConfirmationVerification = false
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
        this.informationDialog.isSuccess = true
      } catch (error) {
        this.informationDialog.info =
          verificationInformationPopup[
            this.currentClaimType.id
          ].failedInformation.info
        this.informationDialog.message = ''
        this.informationDialog.isSuccess = false
      } finally {
        this.isLoading = false
      }
      this.informationDialog.show = true
    },
    onClosePopupInfo() {
      this.showPopupConfirmationInformation = false
      this.informationDialog.show = false
      this.$fetch()
    },
    onClosePopupConfirmation() {
      this.isPopupConfirmationRejection = false
      this.isPopupConfirmationVerification = false

      this.$store.commit('modals/CLOSEALL')
    },
    onRetryAction() {
      this.informationDialog.show = false
      if (
        this.typeDialog === 'verify-confirmation' ||
        this.typeDialog === 'reject-confirmation'
      ) {
        this.dataDialog = {
          ...this.dataDialog,
          nameModal: this.typeDialog,
          button: {
            label: this.dataDialog.buttonSubmit.label,
            variant: this.dataDialog.buttonSubmit.variant,
          },
        }
        this.showPopupConfirmation(
          this.user,
          this.typeDialog,
          this.currentClaimType
        )
      } else {
        this.showPopupEditStatusClaim(this.currentClaimType, this.user)
      }
    },
  },
}
