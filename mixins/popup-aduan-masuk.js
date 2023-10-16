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
        showCancelButton: true,
        dataRules: ''
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

    showPopupConfirmationVerificationComplaintHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'verificationComplaint'
      this.setDataDialog({
        ...this.setDataDialogConfirmation('Konfirmasi Verifikasi Aduan',
          'Apakah Anda yakin ingin mengkonfirmasi aduan ini?', dataComplaint.complaint_id, 'Verifikasi Aduan Ini')
      })
      this.isShowPopupConfirmationVerification = true
    },
    showPopupConfirmationFailedComplaintHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'failedComplaint'
      this.setDataDialog({
        ...this.setDataDialogConfirmation('Konfirmasi Gagal Diverifikasi',
          'No.Aduan', dataComplaint.complaint_id, 'Konfirmasi'),
        labelTextArea: 'Catatan Aduan Gagal Diverifikasi',
        placeholder: 'Detail Aduan tidak lengkap : contoh (foto tidak jelas)'
      })
      this.isShowPopupConfirmationFailedVerification = true
    },
    showPopupInputIdSpanHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'addIdSpan'
      this.setDataDialog({
        ...this.setDataDialogConfirmation('Tambahkan ID SP4N Lapor',
          'No.Aduan', dataComplaint.complaint_id, 'Tambahkan'),
        labelInput: 'ID SP4N Lapor',
        placeholder: 'Masukkan ID SP4N Lapor',
        dataRules: 'maxTenDigitsInt'
      })
      this.isShowPopupInputIdSpan = true
    },

    submitPopupComplaintHandle (item) {
      let dataDialogInformation = { }
      const paramRequest = {}
      if (this.typeDialog === 'verificationComplaint') {
        this.isShowPopupConfirmationVerification = false
        dataDialogInformation = {
          ...this.setDataDialogInformation('Verifikasi Aduan', item.subDescription),
          success: this.setSucessFailedInformationHandle('Aduan berhasil diverifikasi', true),
          failed: this.setSucessFailedInformationHandle('Aduan gagal diverifikasi', false)
        }
        paramRequest.complaint_status_id = 'verified'
      } else {
        this.isShowPopupConfirmationFailedVerification = false
        dataDialogInformation = {
          ...this.setDataDialogInformation('Aduan Gagal Diverifikasi', item.subDescription),
          success: this.setSucessFailedInformationHandle('Konfirmasi Aduan Gagal Diverifikasi berhasil dilakukan', true),
          failed: this.setSucessFailedInformationHandle('Konfirmasi Aduan Gagal Diverifikasi gagal dilakukan', false)
        }
        paramRequest.complaint_status_id = 'failed'
      }

      this.integrationPopupHandle(dataDialogInformation, { ...paramRequest, complaint_status_note: item?.note }, 'change-status')
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
          return this.submitPopupComplaintHandle(this.dataDialog)
        case 'failedComplaint':
          return this.submitPopupComplaintHandle(this.dataDialog)
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
