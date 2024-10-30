import { complaintStatus } from '~/constant/aduan-masuk'
import { ENDPOINT_ADUAN } from '~/constant/endpoint-api'
export default {
  data() {
    return {
      isShowPopupConfirmationVerification: false,
      isShowPopupConfirmationFailedVerification: false,
      isShowPopupConfirmationRedirectHotlineJabar: false,
      isShowPopupInformation: false,
      isShowPopupInputIdSpan: false,
      isShowPopupProcessComplaint: false,
      isShowPopupChangeAuthority: false,
      dataDialog: {
        title: '',
        description: '',
        subDescription: '',
        labelButtonSubmit: '',
        labelInput: '',
        placeholder: '',
        showCancelButton: true,
        dataRules: '',
        maxLength: 0,
      },
      iconPopup: {
        fill: '',
        name: '',
      },
      dataComplaint: {},
      complaintNote: '',
      isLoading: false,
      typeDialog: '',
      idApi: '',
      complaintStatus,
    }
  },
  computed: {
    listComplaintStatus() {
      return Object.values(complaintStatus).filter((item) =>
        item.typeAduan.includes(this.typeAduanPage)
      )
    },
  },
  methods: {
    closePopupHandle() {
      this.isShowPopupConfirmationFailedVerification = false
      this.isShowPopupConfirmationVerification = false
      this.isShowPopupInformation = false
      this.isShowPopupViewImage = false
      this.isShowPopupInputIdSpan = false
      this.isShowPopupProcessComplaint = false
      this.isShowPopupChangeAuthority = false
    },
    filterComplaintStatus(listFilter) {
      return this.listComplaintStatus.filter(
        (itemComplaintStatus) =>
          !listFilter.find(
            (itemFilter) => itemComplaintStatus.id === itemFilter.id
          )
      )
    },
    showPopupConfirmationVerificationComplaintHandle(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'verificationComplaint'
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Konfirmasi Verifikasi Aduan',
          'Apakah Anda yakin ingin mengkonfirmasi aduan ini?',
          dataComplaint.complaint_id,
          'Verifikasi Aduan Ini'
        ),
      })
      this.isShowPopupConfirmationVerification = true
    },
    showPopupConfirmationComplaint(dataComplaint, typeDialog) {
      this.idApi = dataComplaint.id
      this.dataComplaint = dataComplaint
      if (typeDialog === 'failedComplaint') {
        this.typeDialog = 'failedComplaint'
        this.setDataDialog({
          ...this.setDataDialogConfirmation(
            'Konfirmasi Gagal Diverifikasi',
            'No.Aduan',
            dataComplaint.complaint_id,
            'Konfirmasi'
          ),
          labelTextArea: 'Catatan Aduan Gagal Diverifikasi',
          placeholder: 'Detail Aduan tidak lengkap : contoh (foto tidak jelas)',
        })
      }
      if (typeDialog === 'redirectHotlineComplaint') {
        this.typeDialog = 'redirectHotlineComplaint'
        this.setDataDialog({
          ...this.setDataDialogConfirmation(
            'Konfirmasi Dialihkan ke Hotline Jabar',
            'No.Aduan',
            dataComplaint.complaint_id,
            'Konfirmasi'
          ),
          labelTextArea: 'Alasan dialihkan ke Hotline Jabar',
          placeholder: 'Contoh: Aduan terkait kegawat daruratan',
        })
      }
      this.dataDialog.name = this.typeDialog
      this.$store.commit('modals/OPEN', this.typeDialog)
    },
    showPopupConfirmationRedirectHotline(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'redirectHotlineComplaint'
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Konfirmasi Dialihkan ke Hotline Jabar',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Konfirmasi'
        ),
        labelTextArea: 'Alasan dialihkan ke Hotline Jabar',
        placeholder: 'Contoh: Aduan terkait kegawat daruratan',
      })
      this.isShowPopupConfirmationFailedVerification = true
    },
    showPopupInputIdSpanHandle(dataComplaint) {
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
        maxLength: 10,
      })
      this.isShowPopupInputIdSpan = true
    },
    showPopupProcessComplaintHandle(dataComplaint) {
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
        createdDate: dataComplaint.created_at_api,
      })
      this.$store.commit('process-complaint/setComplaintSource', {
        id: dataComplaint.complaint_source_id,
        name: dataComplaint.complaint_source_name,
      })
      this.$store.dispatch('process-complaint/changeComplaintStatusId')
      this.isShowPopupProcessComplaint = true
    },
    showPopupChangeAuthority(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'changeAuthority'
      this.isFormatDate = false
      this.setDataDialog({
        ...this.dataDialog,
        title: 'Ubah Kewenangan',
        labelButtonSubmit: 'Ubah Kewenangan',
        ...this.setDataDialogConfirmation(
          'Ubah Kewenangan',
          'No Aduan',
          dataComplaint.complaint_id,
          'Ubah Kewenangan'
        ),
        createDate: dataComplaint.created_at_api,
      })
      this.$store.commit('process-complaint/setPayload', {
        coverage_of_affairs: dataComplaint?.coverage_of_affairs,
        deadline_date: dataComplaint?.deadline_date
          ? new Date(dataComplaint?.deadline_date)
          : '-',
        status_description: dataComplaint?.status_description || '-',
        proposed_ikp_narrative: dataComplaint?.proposed_ikp_narrative || '-',
        opd_name: dataComplaint?.opd_name,
        complaint_status_id: dataComplaint?.complaint_status_id,
        urgency_level: dataComplaint?.urgency_level,
      })
      this.$store.commit('process-complaint/setComplaintSource', {
        id: dataComplaint.complaint_source_id,
        name: dataComplaint.complaint_source_name,
      })
      this.isShowPopupChangeAuthority = true
    },
    showPopupFollowupComplaint(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'followupComplaint'
      dataComplaint = {
        opd_name: dataComplaint.opd_name,
        deadline_date: new Date(dataComplaint.deadline_date) || '-',
        coverage_of_affairs: dataComplaint.coverage_of_affairs,
      }
      this.setDataDialog({
        dataComplaint,
        ...this.setDataDialogConfirmation(
          'Tindaklanjuti Aduan',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Tindaklanjuti Aduan'
        ),
        proposed_ikp_narrative: dataComplaint.proposed_ikp_narrative || '-',
      })
      this.$store.commit('followup-complaint/setIsShowPopup', true)
    },
    showPopupCreateInstruction(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'createInstruction'
      dataComplaint = {
        ...dataComplaint,
        deadline_date: new Date(dataComplaint.deadline_date) || '',
      }
      this.setDataDialog({
        dataComplaint,
        ...this.setDataDialogConfirmation(
          'Buat Instruksi',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Buat Instruksi'
        ),
        proposed_ikp_narrative: dataComplaint.proposed_ikp_narrative || '-',
      })
      this.$store.commit('followup-complaint/setIsShowPopup', true)
    },
    submitPopupComplaintHandle(item) {
      let dataDialogInformation = {}
      let paramRequest = { complaint_status_note: item?.note }
      let pathApi = 'change-status'
      switch (this.typeDialog) {
        case 'verificationComplaint':
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
            ),
          }
          paramRequest.complaint_status_id = 'verified'
          break
        case 'failedComplaint':
          this.$store.commit('modals/CLOSEALL')
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
            ),
          }
          paramRequest.complaint_status_id = 'failed'
          break
        case 'redirectHotlineComplaint':
          this.$store.commit('modals/CLOSEALL')
          dataDialogInformation = {
            ...this.setDataDialogInformation(
              'Aduan Dialihkan ke Hotline Jabar',
              item.subDescription
            ),
            success: this.setSucessFailedInformationHandle(
              'Aduan berhasil dialihkan ke Hotline Jabar',
              true
            ),
            failed: this.setSucessFailedInformationHandle(
              'Aduan gagal dialihkan ke Hotline Jabar',
              false
            ),
          }
          paramRequest = { directed_to_hotline_jabar_note: item?.note }
          pathApi = 'redirected-to-hotline-jabar'
      }
      this.integrationPopupHandle(dataDialogInformation, paramRequest, pathApi)
    },

    submitInputIdSpanHandle(item) {
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
        ),
      }
      this.integrationPopupHandle(
        dataDialogInformation,
        { sp4n_id: item.valueText },
        'add-sp4n'
      )
    },

    submitProcessComplaint(dataComplaint) {
      this.isShowPopupProcessComplaint = false
      let dataDialogInformation = {}
      const dialogTitle =
        this.typeDialog === 'changeAuthority'
          ? 'Ubah Kewenangan'
          : 'Proses Aduan'
      dataDialogInformation = {
        ...this.setDataDialogInformation(
          dialogTitle,
          dataComplaint.subDescription
        ),
        success: this.setSucessFailedInformationHandle(
          `${dialogTitle} berhasil dilakukan`,
          true
        ),
        failed: this.setSucessFailedInformationHandle(
          `${dialogTitle} gagal dilakukan`,
          false
        ),
      }
      this.integrationPopupHandle(
        dataDialogInformation,
        dataComplaint.payload,
        'determine-authority'
      )
    },

    submitFollowupComplaint(dataIkp) {
      this.isShowPopupConfirmationFollowup = false
      let dataDialogInformation = {}
      const dialogDescriptionSucceess =
        this.typeDialog === 'createInstruction'
          ? 'Instruksi Anda berhasil dibuat'
          : 'Tindaklanjuti aduan Anda berhasil diproses'

      const dialogDescriptionFailed =
        this.typeDialog === 'createInstruction'
          ? 'Instruksi Anda gagal dibuat'
          : 'Tindaklanjuti aduan Anda gagal diproses'

      dataDialogInformation = {
        ...this.setDataDialogInformation(
          this.dataDialog.title,
          dataIkp.ikp_code
        ),
        success: this.setSucessFailedInformationHandle(
          dialogDescriptionSucceess,
          true
        ),
        failed: this.setSucessFailedInformationHandle(
          dialogDescriptionFailed,
          false
        ),
      }
      this.integrationPopupHandle(
        dataDialogInformation,
        { ikp_code: dataIkp.ikp_code },
        'follow-up'
      )
    },

    setDataDialogConfirmation(title, description, subDescription, labelButton) {
      return {
        title,
        description,
        subDescription,
        labelButtonSubmit: labelButton,
      }
    },
    setDataDialogInformation(title, subDescription) {
      return { title, subDescription }
    },
    setSucessFailedInformationHandle(description, success = true) {
      if (success) {
        return {
          description,
          labelButtonSubmit: 'Saya Mengerti',
          showCancelButton: false,
          icon: { name: 'check-mark-circle', fill: '#069550' },
        }
      } else {
        return {
          description,
          labelButtonSubmit: 'Coba Lagi',
          icon: { name: 'times-circle', fill: '#EF5350' },
        }
      }
    },
    async integrationPopupHandle(paramDialog, paramsInputRequest, pathApi) {
      this.dataDialog.title = paramDialog.title
      this.dataDialog.subDescription = paramDialog.subDescription
      this.isLoading = true
      const urlApi = `${ENDPOINT_ADUAN}/${this.idApi}/${pathApi}`

      try {
        await this.$axios.patch(urlApi, {
          ...paramsInputRequest,
          user_id: this.$auth?.user?.identifier,
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
    submitRetryHandle() {
      this.isShowPopupInformation = false
      switch (this.typeDialog) {
        case 'verificationComplaint':
          return this.submitPopupComplaintHandle(this.dataDialog)
        case 'failedComplaint':
          return this.showPopupConfirmationComplaint(
            this.dataComplaint,
            'failedComplaint'
          )
        case 'redirectHotlineComplaint':
          return this.showPopupConfirmationComplaint(
            this.dataComplaint,
            'redirectHotlineComplaint'
          )
        case 'addIdSpan': {
          return this.submitInputIdSpanHandle(this.dataDialog)
        }
      }
    },
    setDataDialog(newDataDialog) {
      this.dataDialog = { ...this.dataDialog, ...newDataDialog }
    },
    setIconPopup(newIconPopup) {
      this.iconPopup = { ...this.iconPopup, ...newIconPopup }
    },
    closePopupInformationHandle() {
      this.query.page = 1
      this.closePopupHandle()
      this.$fetch()
    },
  },
}
