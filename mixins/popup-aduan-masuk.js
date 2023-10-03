export default {
  data () {
    return {
      isShowPopupConfirmationVerification: false,
      isShowPopupConfirmationFailedVerification: false,
      isShowPopupInformation: false,
      isShowPopupInputIdSpan: false,
      dataDialog: {
        title: '',
        description: '',
        subDescription: '',
        labelButton: '',
        labelInput: '',
        placeholder: '',
        showCancelButton: true
      },
      iconPopup: {
        fill: '',
        name: ''
      },
      complaintNote: '',
      isLoading: false,
      typeDialog: '',
      idApi: ''
    }
  },
  methods: {
    closePopupHandle () {
      this.isShowPopupConfirmationFailedVerification = false
      this.isShowPopupConfirmationVerification = false
      this.isShowPopupInformation = false
      this.isShowPopupViewImage = false
      this.isShowPopupInputIdSpan = false
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
        this.typeDialog = 'verificationComplaint'
      } else {
        this.setDataDialog({
          title: 'Konfirmasi Gagal Diverifikasi',
          description: 'No. Aduan',
          labelButton: 'Konfirmasi'
        })
        this.isShowPopupConfirmationFailedVerification = true
        this.typeDialog = 'failedComplaint'
      }
    },
    showPopupInputIdSpanHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'addIdSpan'
      this.setDataDialog({
        ...this.setDataDialogConfirmation('Tambahkan ID SP4N Lapor',
          'No.Aduan', dataComplaint.complaint_id, 'Tambahkan'),
        labelInput: 'ID SP4N Lapor',
        placeholder: 'Masukkan ID SP4N Lapor'
      })
      this.isShowPopupInputIdSpan = true
    },
    submitInputIdSpanHandle (item) {
      this.isShowPopupInputIdSpan = false
      let dataDialogInformation = { }
      dataDialogInformation = {
        ...this.setDataDialogInformation('ID SP4N Lapor', item.subDescription),
        success: this.setSucessFailedInformationHandle('ID SP4N Lapor berhasil ditambah', true),
        failed: this.setSucessFailedInformationHandle('ID SP4N Lapor gagal ditambah', false)
      }
      this.integrationPopupHandle(dataDialogInformation, { sp4n_id: item.valueText }, 'add-sp4n')
    },
    setDataDialogConfirmation (title, description, subDescription, labelButton) {
      return { title, description, subDescription, labelButton }
    },
    setDataDialogInformation (title, subDescription) {
      return { title, subDescription }
    },
    setSucessFailedInformationHandle (description, success = true) {
      if (success) {
        return { description, labelButton: 'Saya Mengerti', showCancelButton: false }
      } else {
        return { description, labelButton: 'Coba Lagi' }
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
    async integrationPopupHandle (paramDialog, paramsInputRequest, pathApi) {
      this.dataDialog.title = paramDialog.title
      this.dataDialog.subDescription = paramDialog.subDescription
      this.isLoading = true
      try {
        await this.$axios.patch(`/warga/complaints/${this.idApi}/${pathApi}`, { ...paramsInputRequest, user_id: this.$auth?.user?.identifier })
        this.setDataDialog({ ...paramDialog.success })
        this.setIconPopup({ name: 'check-mark-circle', fill: '#069550' })
      } catch {
        this.setDataDialog({ ...paramDialog.failed })
        this.setIconPopup({ name: 'times-circle', fill: '#EF5350' })
      } finally {
        this.isLoading = false
      }
      this.isShowPopupInformation = true
    },
    submitRetryHandle () {
      switch (this.typeDialog) {
        case 'verificationComplaint':
          return this.submitPopupVerificationHandle(this.dataDialog)
        case 'failedComplaint':
          return this.submitPopupVerificationHandle(this.dataDialog)
        case 'addIdSpan' : {
          return this.submitInputIdSpanHandle(this.dataDialog)
        }
      }
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
