import { complaintStatus } from '~/constant/aduan-masuk'
export default {
  data () {
    return {
      isShowPopupConfirmationVerification: false,
      isShowPopupConfirmationFailedVerification: false,
      isShowPopupInformation: false,
      isShowPopupInputIdSpan: false,
      isShowPopupProcessComplaint: false,
      isShowPopupFollowupComplaint: false,
      dataDialog: {
        title: '',
        description: '',
        subDescription: '',
        labelButtonSubmit: '',
        labelInput: '',
        placeholder: '',
        showCancelButton: true,
        dataRules: '',
        maxLength: 0
      },
      iconPopup: {
        fill: '',
        name: ''
      },
      complaintNote: '',
      isLoading: false,
      typeDialog: '',
      idApi: '',
      complaintStatus
    }
  },
  computed: {
    listComplaintStatus () {
      return Object.values(complaintStatus).filter(item =>
        item.typeAduan.includes(this.typeAduanPage)
      )
    }
  },
  methods: {
    closePopupHandle () {
      this.isShowPopupConfirmationFailedVerification = false
      this.isShowPopupConfirmationVerification = false
      this.isShowPopupInformation = false
      this.isShowPopupViewImage = false
      this.isShowPopupInputIdSpan = false
      this.isShowPopupProcessComplaint = false
    },
    filterComplaintStatus (listFilter) {
      return this.listComplaintStatus.filter(
        itemComplaintStatus =>
          !listFilter.find(
            itemFilter => itemComplaintStatus.id === itemFilter.id
          )
      )
    },
    showPopupConfirmationVerificationComplaintHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'verificationComplaint'
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Konfirmasi Verifikasi Aduan',
          'Apakah Anda yakin ingin mengkonfirmasi aduan ini?',
          dataComplaint.complaint_id,
          'Verifikasi Aduan Ini'
        )
      })
      this.isShowPopupConfirmationVerification = true
    },
    showPopupConfirmationFailedComplaintHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'failedComplaint'
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Konfirmasi Gagal Diverifikasi',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Konfirmasi'
        ),
        labelTextArea: 'Catatan Aduan Gagal Diverifikasi',
        placeholder: 'Detail Aduan tidak lengkap : contoh (foto tidak jelas)'
      })
      this.isShowPopupConfirmationFailedVerification = true
    },
    showPopupInputIdSpanHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'addIdSpan'
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Tambahkan ID SP4N Lapor',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Tambahkan'
        ),
        labelInput: 'ID SP4N Lapor',
        placeholder: 'Masukkan ID SP4N Lapor',
        dataRules: 'numeric',
        maxLength: 10
      })
      this.isShowPopupInputIdSpan = true
    },
    showPopupProcessComplaintHandle (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'processComplaint'
      this.isFormatDate = false
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Proses Aduan',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Proses Aduan'
        ),
        createdDate: dataComplaint.created_at_api
      })
      this.$store.commit('process-complaint/setComplaintSource', {
        id: dataComplaint.complaint_source_id,
        name: dataComplaint.complaint_source_name
      })
      this.$store.dispatch('process-complaint/changeComplaintStatusId')
      this.isShowPopupProcessComplaint = true
    },
    showPopupFollowupComplaint (dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'followupComplaint'
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Tindaklanjuti Aduan',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Tindaklanjuti Aduan'
        ),
        proposed_ikp_narrative: dataComplaint.proposed_ikp_narrative
      })
      this.isShowPopupFollowupComplaint = true
    },

    submitPopupComplaintHandle (item) {
      let dataDialogInformation = {}
      const paramRequest = {}
      if (this.typeDialog === 'verificationComplaint') {
        this.isShowPopupConfirmationVerification = false
        dataDialogInformation = {
          ...this.setDataDialogInformation(
            'Verifikasi Aduan',
            item.subDescription
          ),
          success: this.setSucessFailedInformationHandle(
            'Aduan berhasil diverifikasi',
            true
          ),
          failed: this.setSucessFailedInformationHandle(
            'Aduan gagal diverifikasi',
            false
          )
        }
        paramRequest.complaint_status_id = 'verified'
      } else {
        this.isShowPopupConfirmationFailedVerification = false
        dataDialogInformation = {
          ...this.setDataDialogInformation(
            'Aduan Gagal Diverifikasi',
            item.subDescription
          ),
          success: this.setSucessFailedInformationHandle(
            'Konfirmasi Aduan Gagal Diverifikasi berhasil dilakukan',
            true
          ),
          failed: this.setSucessFailedInformationHandle(
            'Konfirmasi Aduan Gagal Diverifikasi gagal dilakukan',
            false
          )
        }
        paramRequest.complaint_status_id = 'failed'
      }

      this.integrationPopupHandle(
        dataDialogInformation,
        { ...paramRequest, complaint_status_note: item?.note },
        'change-status'
      )
    },

    submitInputIdSpanHandle (item) {
      this.isShowPopupInputIdSpan = false
      let dataDialogInformation = {}
      dataDialogInformation = {
        ...this.setDataDialogInformation('ID SP4N Lapor', item.subDescription),
        success: this.setSucessFailedInformationHandle(
          'ID SP4N Lapor berhasil ditambah',
          true
        ),
        failed: this.setSucessFailedInformationHandle(
          'ID SP4N Lapor gagal ditambah',
          false
        )
      }
      this.integrationPopupHandle(
        dataDialogInformation,
        { sp4n_id: item.valueText },
        'add-sp4n'
      )
    },

    submitProcessComplaint (dataComplaint) {
      this.isShowPopupProcessComplaint = false
      let dataDialogInformation = {}
      dataDialogInformation = {
        ...this.setDataDialogInformation(
          'Proses Aduan',
          dataComplaint.subDescription
        ),
        success: this.setSucessFailedInformationHandle(
          'Proses Aduan berhasil dilakukan',
          true
        ),
        failed: this.setSucessFailedInformationHandle(
          'Proses Aduan gagal dilakukan',
          false
        )
      }
      this.integrationPopupHandle(
        dataDialogInformation,
        dataComplaint.payload,
        'determine-authority'
      )
    },

    submitFollowupComplaint (dataIkp) {
      this.isShowPopupConfirmationFollowup = false
      let dataDialogInformation = {}
      dataDialogInformation = {
        ...this.setDataDialogInformation(
          'Tindaklanjuti Aduan',
          dataIkp.ikp_code
        ),
        success: this.setSucessFailedInformationHandle(
          'Tindaklanjuti Aduan berhasil dilakukan',
          true
        ),
        failed: this.setSucessFailedInformationHandle(
          'Tindaklanjuti Aduan gagal dilakukan',
          false
        )
      }
      this.integrationPopupHandle(
        dataDialogInformation,
        { ikp_code: dataIkp.ikp_code },
        'follow-up'
      )
    },

    setDataDialogConfirmation (title, description, subDescription, labelButton) {
      return {
        title,
        description,
        subDescription,
        labelButtonSubmit: labelButton
      }
    },
    setDataDialogInformation (title, subDescription) {
      return { title, subDescription }
    },
    setSucessFailedInformationHandle (description, success = true) {
      if (success) {
        return {
          description,
          labelButtonSubmit: 'Saya Mengerti',
          showCancelButton: false,
          icon: { name: 'check-mark-circle', fill: '#069550' }
        }
      } else {
        return {
          description,
          labelButtonSubmit: 'Coba Lagi',
          icon: { name: 'times-circle', fill: '#EF5350' }
        }
      }
    },
    async integrationPopupHandle (paramDialog, paramsInputRequest, pathApi) {
      this.dataDialog.title = paramDialog.title
      this.dataDialog.subDescription = paramDialog.subDescription
      this.isLoading = true
      try {
        await this.$axios.patch(`/warga/complaints/${this.idApi}/${pathApi}`, {
          ...paramsInputRequest,
          user_id: this.$auth?.user?.identifier
        })
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
        case 'addIdSpan': {
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
