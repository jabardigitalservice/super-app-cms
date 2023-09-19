export default {
  data () {
    return {
      isShowPopupConfirmationVerification: false,
      isShowPopupConfirmationFailedVerification: false,
      isShowPopupInformation: false,
      isShowPopupViewImage: false,
      dataDialog: {
        title: '',
        description: '',
        subDescription: '',
        labelButton: '',
        showCancelButton: true
      },
      iconPopup: {
        fill: '',
        name: ''
      },
      complaintNote: '',
      isLoading: false
    }
  },
  methods: {
    closePopupHandle () {
      this.isShowPopupConfirmationFailedVerification = false
      this.isShowPopupConfirmationVerification = false
      this.isShowPopupInformation = false
      this.isShowPopupViewImage = false
    },
    showPopupVerificationHandle (dataComplaint, typeConfirmation) {
      this.dataDialog.subDescription = dataComplaint.complaint_id
      this.dataDialog.idApi = dataComplaint.id
      if (typeConfirmation === 'verification') {
        this.setDataDialog({
          title: 'Konfirmasi Verifikasi Aduan',
          description: 'Apakah Anda yakin ingin mengkonfirmasi aduan ini?',
          labelButton: 'Verifikasi Aduan Ini'
        })
        this.isShowPopupConfirmationVerification = true
      } else {
        this.setDataDialog({
          title: 'Konfirmasi Gagal Diverifikasi',
          description: 'No. Aduan',
          labelButton: 'Konfirmasi'
        })
        this.isShowPopupConfirmationFailedVerification = true
      }
    },
    async submitPopupVerificationHandle (paramDialog) {
      this.isShowPopupConfirmationVerification = false
      this.isShowPopupConfirmationFailedVerification = false
      this.dataDialog.title = paramDialog.status === 'verified' ? 'Verifikasi Aduan' : 'Aduan Gagal Diverifikasi'
      this.dataDialog.subDescription = paramDialog.subDescription
      this.isLoading = true
      const paramsInputRequest = { complaint_status_id: paramDialog.status, complaint_status_note: paramDialog?.note, user_id: this.$auth?.user?.identifier }

      try {
        await this.$axios.patch(`/warga/complaints/${paramDialog.idApi}/change-status`, paramsInputRequest)
        this.setDataDialog({
          description: paramDialog.status === 'verified' ? 'Aduan berhasil diverifikasi' : 'Konfirmasi Aduan Gagal Diverifikasi berhasil dilakukan',
          labelButton: 'Saya mengerti',
          showCancelButton: false
        })
        this.setIconPopup({ name: 'check-mark-circle', fill: '#069550' })
      } catch {
        this.setDataDialog({
          description: paramDialog.status === 'verified' ? 'Aduan gagal diverifikasi' : 'Konfirmasi Aduan Gagal Diverifikasi gagal dilakukan',
          status: paramDialog.status,
          labelButton: 'Coba lagi'
        })
        this.setIconPopup({ name: 'times-circle', fill: '#EF5350' })
      } finally {
        this.isLoading = false
      }
      this.isShowPopupInformation = true
    },
    setDataDialog (newDataDialog) {
      this.dataDialog = { ...this.dataDialog, ...newDataDialog }
    },
    setIconPopup (newIconPopup) {
      this.iconPopup = { ...this.iconPopup, ...newIconPopup }
    },
    closePopupInformationHandle () {
      this.closePopupHandle()
      this.$fetch()
    }
  }
}
