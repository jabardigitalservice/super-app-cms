import { complaintStatus, typeAduan } from '~/constant/aduan-masuk'
import { formatDate } from '~/utils'
import {
  ENDPOINT_ADUAN,
  ENDPOINT_ADUAN_NON_PEMPROV,
} from '~/constant/endpoint-api'

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
      isPopupFollowupComplaint: false,
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
      dataIkp: {},
      complaintNote: '',
      isLoading: false,
      typeDialog: '',
      idApi: '',
      complaintStatus,
      listDialogConfirmation: {
        failedComplaint: {
          id: 'failedComplaint',
          title: 'Konfirmasi Gagal Diverifikasi',
          labelTextArea: 'Catatan Aduan Gagal Diverifikasi',
          placeholder: 'Detail Aduan tidak lengkap : contoh (foto tidak jelas)',
          dataCyFormat: 'dialog__confirmation-failed-verification',
        },
        redirectHotlineComplaint: {
          id: 'redirectHotlineComplaint',
          title: 'Konfirmasi Dialihkan ke Hotline Jabar',
          labelTextArea: 'Alasan dialihkan ke Hotline Jabar',
          placeholder: 'Contoh: Aduan terkait kegawat daruratan',
          dataCyFormat: 'dialog__confirmation-diverted-to-hotline-jabar',
        },
        verificationComplaint: {
          id: 'verificationComplaint',
          title: 'Konfirmasi Verifikasi Aduan',
          dataCyFormat: 'dialog__confirmation-verification',
        },
      },
      dialogDataPopupComplaintHandle: {
        verificationComplaint: {
          title: 'Verifikasi Aduan',
          successMessage: 'Aduan berhasil diverifikasi',
          successButtonText:
            'dialog__information-success-from-verification__button--close',
          failedMessage: 'Aduan gagal diverifikasi',
          statusId: 'verified',
          pathApi: 'change-status',
        },
        failedComplaint: {
          title: 'Aduan Gagal Diverifikasi',
          successMessage:
            'Konfirmasi Aduan Gagal Diverifikasi berhasil dilakukan',
          successButtonText:
            'dialog__information-success-from-failed-verification__button--close',
          failedMessage: 'Konfirmasi Aduan Gagal Diverifikasi gagal dilakukan',
          statusId: 'failed',
          pathApi: 'change-status',
        },
        redirectHotlineComplaint: {
          title: 'Aduan Dialihkan ke Hotline Jabar',
          successMessage: 'Aduan berhasil dialihkan ke Hotline Jabar',
          successButtonText:
            'dialog__information-success-from-diverted-to-hotline-jabar__button--close',
          failedMessage: 'Aduan gagal dialihkan ke Hotline Jabar',
          statusId: '',
          pathApi: 'redirected-to-hotline-jabar',
        },
      },
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
      this.isPopupFollowupComplaint = false
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
      this.typeDialog = this.listDialogConfirmation.verificationComplaint.id
      this.dataComplaint = dataComplaint
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          this.listDialogConfirmation.verificationComplaint.title,
          'Apakah Anda yakin ingin mengkonfirmasi aduan ini?',
          dataComplaint.complaint_id,
          'Verifikasi Aduan Ini'
        ),
      })
      this.dataDialog.dataCy = {
        footer: {
          buttonSubmit: `${this.listDialogConfirmation.verificationComplaint.dataCyFormat}__button--verify-complaint`,
        },
      }
      this.isShowPopupConfirmationVerification = true
    },
    showPopupConfirmationComplaint(dataComplaint, typeDialog) {
      this.idApi = dataComplaint.id
      this.dataComplaint = dataComplaint
      this.typeDialog = typeDialog

      const config = this.listDialogConfirmation[typeDialog]

      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          config.title,
          'No.Aduan',
          dataComplaint.complaint_id,
          'Konfirmasi'
        ),
        labelTextArea: config.labelTextArea,
        placeholder: config.placeholder,
      })

      this.dataDialog.dataCy = {
        fieldTextArea: `${config.dataCyFormat}__text-area`,
        buttonSubmit: `${config.dataCyFormat}__button--confirmation`,
      }

      this.dataDialog.name = this.typeDialog
      this.$store.commit('modals/OPEN', this.typeDialog)
    },
    showPopupConfirmationRedirectHotline(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = this.listDialogConfirmation.redirectHotlineComplaint.id

      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          this.listDialogConfirmation.redirectHotlineComplaint.title,
          'No.Aduan',
          dataComplaint.complaint_id,
          'Konfirmasi'
        ),
        labelTextArea:
          this.listDialogConfirmation.redirectHotlineComplaint.labelTextArea,
        placeholder:
          this.listDialogConfirmation.redirectHotlineComplaint.placeholder,
      })
      this.isShowPopupConfirmationFailedVerification = true
    },
    showPopupInputIdSpanHandle(dataComplaint, dialogName) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'addIdSpan'
      this.dataComplaint = dataComplaint
      this.setDataDialog({
        description: 'No. Aduan',
        nameModal: dialogName,
        title: 'Tambahkan ID SP4N Lapor',
        labelButtonSubmit: 'Tambahkan',
      })

      this.$store.commit('id-span/setPayload', {
        ...this.$store.state['id-span'].payload,
        complaint_number: dataComplaint.complaint_id,
      })

      // show form edit id span
      if (dialogName === 'formEditIdSpan') {
        this.typeDialog = 'editIdSpan'
        this.setDataDialog({
          title: 'Ubah ID SP4N Lapor',
          labelButtonSubmit: 'Ubah Data',
        })

        const [date, month, year] = dataComplaint.sp4n_created_at.split('/')

        this.$store.commit('id-span/setPayload', {
          sp4n_id: dataComplaint.sp4n_id,
          sp4n_created_at: new Date(year, month - 1, date),
          complaint_number: dataComplaint.complaint_id,
        })
      }

      this.isShowPopupInputIdSpan = true

      this.$store.commit('modals/OPEN', dialogName)
    },
    showPopupProcessComplaintHandle(dataComplaint) {
      this.idApi = dataComplaint.id
      this.dataComplaint = dataComplaint
      this.typeDialog = 'processComplaint'
      const dataCyFormat = 'dialog__form-process-complaint'
      this.isFormatDate = false
      this.setDataDialog({
        ...this.setDataDialogConfirmation(
          'Proses Aduan',
          'No.Aduan',
          dataComplaint.complaint_id,
          'Proses Aduan'
        ),
        createdDate: dataComplaint.created_at_api,
        nameModal: this.typeDialog,
      })
      this.dataDialog.dataCy = {
        fieldTextArea: `${dataCyFormat}__text-area`,
        fieldSelect: `${dataCyFormat}__select`,
        fieldSelectOptions: `${dataCyFormat}__select-dropdown`,
        footer: {
          buttonSubmit: `${dataCyFormat}__button--process-complaint`,
        },
      }
      this.$store.commit('process-complaint/setComplaintSource', {
        complaint_source: dataComplaint?.complaint_source,
      })
      this.$store.dispatch('process-complaint/changeComplaintStatusId')
      this.isShowPopupProcessComplaint = true
      this.$store.commit('modals/OPEN', this.dataDialog.nameModal)
    },
    showPopupChangeAuthority(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'changeAuthority'
      this.dataComplaint = dataComplaint
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
        nameModal: this.typeDialog,
      })
      this.$store.commit('process-complaint/setPayload', {
        coverage_of_affairs: dataComplaint?.coverage_of_affairs,
        deadline_date: dataComplaint?.deadline_date
          ? new Date(dataComplaint?.deadline_date)
          : '-',
        status_description: dataComplaint?.status_description || '',
        proposed_ikp_narrative: dataComplaint?.proposed_ikp_narrative || '',
        opd_id: dataComplaint?.opd_id,
        opd_name: dataComplaint?.opd_name,
        complaint_status_id: dataComplaint?.complaint_status_id,
        urgency_level: dataComplaint?.urgency_level,
        opd_pemprov_id: dataComplaint?.opd_pemprov_id,
      })
      this.$store.commit('process-complaint/setComplaintSource', {
        complaint_source: dataComplaint?.complaint_source,
      })
      this.isShowPopupChangeAuthority = true
      this.$store.commit('modals/OPEN', this.dataDialog.nameModal)
    },
    showPopupFollowupComplaint(dataComplaint, typeDialog) {
      this.idApi = dataComplaint.id
      this.typeDialog = typeDialog
      this.isPopupFollowupComplaint = true
      const {
        opd_id: opdId,
        deadline_date: deadlineDate,
        coverage_of_affairs: coverageOfAffairs,
        opd_pemprov_id: opdPemprovId,
      } = dataComplaint
      this.$store.commit('create-ikp/setDataComplaint', {
        opd_id: opdId,
        deadline_date: deadlineDate,
        coverage_of_affairs: coverageOfAffairs,
        opd_pemprov_id: opdPemprovId,
      })
      this.dataComplaint = dataComplaint
      const dialogConfirmation =
        this.$store.state['followup-complaint'].dialogConfirmation
      this.$store.commit('followup-complaint/setDialogConfirmation', {
        ...dialogConfirmation,
        title:
          typeDialog === 'followupComplaint'
            ? 'Tindaklanjuti Aduan'
            : 'Buat Instruksi',
        nameModal:
          typeDialog === 'followupComplaint'
            ? 'followupComplaintConfirmation'
            : 'createInstructionConfirmation',
      })
      this.$store.commit(
        'followup-complaint/setComplaintType',
        typeAduan.instruksiKewenanganPemprov.props
      )
      this.setDataDialog({
        title:
          typeDialog === 'followupComplaint'
            ? 'Tindaklanjuti Aduan'
            : 'Buat Instruksi',
        description: 'No.Aduan',
        subDescription: dataComplaint.complaint_id,
        proposed_ikp_narrative: dataComplaint.proposed_ikp_narrative || '-',
        sp4n_id: dataComplaint.sp4n_id || '',
        labelButtonSubmit:
          typeDialog === 'followupComplaint'
            ? 'Tindaklanjuti Aduan'
            : 'Buat Instruksi',
      })
      this.$store.commit('followup-complaint/setIsShowPopup', true)
    },

    showPopupUpdateInstruction(dataIkp) {
      this.idApi = dataIkp.ikp_code

      this.dataIkp = dataIkp

      const newPayload = {
        ...this.$store.state['create-ikp'].payload,
        narrative: dataIkp.narrative,
        deadline_at: new Date(dataIkp.deadline_at) || '',
        coverage_of_affairs: dataIkp.coverage_of_affairs,
        opd_pemprov_id: dataIkp.opd_pemprov_id,
        ikp_code: dataIkp.ikp_code,
        opd_id: dataIkp.opd_id,
        opd_name: dataIkp.opd_name,
      }

      this.$store.commit('create-ikp/setPayload', newPayload)
      this.typeDialog = 'update-ikp'

      const complaintType =
        newPayload.is_prov_responsibility === 1
          ? typeAduan.instruksiKewenanganPemprov.props
          : typeAduan.instruksiKewenanganNonPemprov.props

      this.$store.commit('create-ikp/setIkpNarrative', dataIkp.narrative)

      this.$store.commit('followup-complaint/setComplaintType', complaintType)
      this.$store.dispatch('create-ikp/checkTruncate')
      this.$store.dispatch('create-ikp/showPopupInstruction', 'update-ikp')
    },

    submitPopupComplaintHandle(item) {
      let dataDialogInformation = {}
      let paramRequest = { complaint_status_note: item?.note }
      let pathApi = 'change-status'

      const createDialogData = (dialogType) => {
        const dialog = this.dialogDataPopupComplaintHandle[dialogType]
        return {
          ...this.setDataDialogInformation(dialog.title, item.subDescription),
          success: {
            ...this.setSucessFailedInformationHandle(
              dialog.successMessage,
              true
            ),
            dataCy: { footer: { buttonSubmit: dialog.successButtonText } },
          },
          failed: this.setSucessFailedInformationHandle(
            dialog.failedMessage,
            false
          ),
        }
      }

      switch (this.typeDialog) {
        case 'verificationComplaint':
          this.isShowPopupConfirmationVerification = false
          dataDialogInformation = createDialogData('verificationComplaint')
          paramRequest.complaint_status_id =
            this.dialogDataPopupComplaintHandle.verificationComplaint.statusId
          break
        case 'failedComplaint':
          this.$store.commit('modals/CLOSEALL')
          dataDialogInformation = createDialogData('failedComplaint')
          paramRequest.complaint_status_id =
            this.dialogDataPopupComplaintHandle.failedComplaint.statusId
          this.dataComplaint = {
            ...this.dataComplaint,
            complaint_status_note: item?.note,
          }
          break
        case 'redirectHotlineComplaint':
          this.$store.commit('modals/CLOSEALL')
          dataDialogInformation = createDialogData('redirectHotlineComplaint')
          paramRequest = { directed_to_hotline_jabar_note: item?.note }
          this.dataComplaint = {
            ...this.dataComplaint,
            directed_to_hotline_jabar_note: item?.note,
          }
          pathApi =
            this.dialogDataPopupComplaintHandle.redirectHotlineComplaint.pathApi
          break
      }

      this.integrationPopupHandle(dataDialogInformation, paramRequest, pathApi)
    },

    submitInputIdSpanHandle(item) {
      this.$store.commit('modals/CLOSEALL')
      let dataDialogInformation = {}
      // information add id span
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
      this.dataComplaint = {
        sp4n_id: item.payload.sp4n_id,
        sp4n_created_at: item.payload.sp4n_created_at,
        complaint_id: item.payload.complaint_number,
      }
      // information edit id span
      if (this.typeDialog === 'editIdSpan') {
        dataDialogInformation.success = this.setSucessFailedInformationHandle(
          'ID SP4N Lapor berhasil diubah',
          true
        )
        dataDialogInformation.failed = this.setSucessFailedInformationHandle(
          'ID SP4N Lapor gagal diubah',
          false
        )
      }
      this.integrationPopupHandle(
        dataDialogInformation,
        {
          sp4n_id: item.payload.sp4n_id,
          sp4n_created_at: item.payload.sp4n_created_at,
          complaint_number: item.payload.complaint_number,
        },
        'add-sp4n'
      )
    },

    submitProcessComplaint(dataComplaint) {
      this.isShowPopupProcessComplaint = false
      this.dataComplaint.payload = dataComplaint.payload
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
        success: {
          ...this.setSucessFailedInformationHandle(
            `${dialogTitle} berhasil dilakukan`,
            true
          ),
          dataCy: {
            footer: {
              buttonSubmit:
                'dialog__information-success-from-process-complaint__button--close',
            },
          },
        },
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
    submitFollowupComplaint(payload) {
      this.$store.commit('modals/CLOSEALL')
      let dataDialogInformation = {}
      this.dataComplaint = payload
      let successMessage = ''
      let failedMessage = ''

      if (this.typeDialog === 'createInstruction') {
        successMessage = 'Instruksi Anda berhasil dibuat'
        failedMessage = 'Instruksi Anda gagal dibuat'
      } else {
        successMessage = 'Tindaklanjuti aduan Anda berhasil diproses'
        failedMessage = 'Tindaklanjuti aduan Anda gagal diproses'
      }

      dataDialogInformation = {
        ...this.setDataDialogInformation(
          this.dataDialog.title,
          payload.ikp_code
        ),
        success: this.setSucessFailedInformationHandle(successMessage, true),
        failed: this.setSucessFailedInformationHandle(failedMessage, false),
      }
      this.integrationPopupHandle(dataDialogInformation, payload, 'follow-up')
    },

    submitChangeInstruction(payload) {
      this.$store.commit('modals/CLOSEALL')
      let dataDialogInformation = {}
      this.dataIkp = payload

      dataDialogInformation = {
        ...this.setDataDialogInformation(
          'Ubah Detail Instruksi',
          String(payload.ikp_code)
        ),
        success: this.setSucessFailedInformationHandle(
          'Instruksi Anda berhasil diubah',
          true
        ),
        failed: this.setSucessFailedInformationHandle(
          'Instruksi Anda gagal diubah',
          false
        ),
      }
      this.integrationPopupHandle(dataDialogInformation, payload, 'ikp')
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
          showCancelButton: true,
          icon: { name: 'times-circle', fill: '#EF5350' },
        }
      }
    },
    async integrationPopupHandle(paramDialog, paramsInputRequest, pathApi) {
      this.dataDialog.title = paramDialog.title

      this.dataDialog.subDescription = paramDialog.subDescription
      this.isLoading = true
      if (this.idApi) {
        this.$store.commit('popup-complaint/setIdApi', this.idApi)
      }

      const urlApi = this.getApiEndpoint(pathApi)

      try {
        await this.$axios.patch(urlApi, {
          ...paramsInputRequest,
          user_id: this.$auth?.user?.identifier,
        })

        this.handleSuccessResponse(paramDialog)
      } catch (error) {
        this.handleErrorResponse(error, paramDialog)
      } finally {
        this.isLoading = false
      }
      this.isShowPopupInformation = true
    },
    getApiEndpoint(pathApi) {
      const complaintType =
        this.$store.state['followup-complaint'].complaintType
      const endpointApi =
        complaintType === typeAduan.instruksiKewenanganNonPemprov.props
          ? ENDPOINT_ADUAN_NON_PEMPROV
          : ENDPOINT_ADUAN

      if (this.typeDialog === 'update-ikp') {
        return `${endpointApi}/${pathApi}/${this.$store.state['popup-complaint'].idApi}`
      }
      return `${endpointApi}/${this.$store.state['popup-complaint'].idApi}/${pathApi}`
    },
    handleSuccessResponse(paramDialog) {
      this.setDataDialog({ ...paramDialog.success })
      this.setIconPopup({ name: 'check-mark-circle', fill: '#069550' })
      this.$store.commit('followup-complaint/setIsCreateIkp', false)
      this.$store.commit('create-ikp/setPayload', {
        description: '',
        indicator_value: '',
        indicator_unit: '',
      })
    },
    handleErrorResponse(error, paramDialog) {
      const { code, errors } = error.response.data
      this.setDataDialog({ ...paramDialog.failed })
      if (code === '4221400') {
        if (errors?.instruction) {
          this.setDataDialog({
            ...paramDialog.failed,
            description: errors?.instruction || '',
          })
        }
        if (errors?.sp4n_id) {
          this.setDataDialog({
            ...paramDialog.failed,
            description: errors?.sp4n_id,
            subDescription: '',
          })
        }
      }
      this.setIconPopup({ name: 'times-circle', fill: '#EF5350' })
    },
    submitRetryHandle() {
      this.isShowPopupInformation = false
      switch (this.typeDialog) {
        case 'verificationComplaint':
          return this.showPopupConfirmationVerificationComplaintHandle(
            this.dataComplaint
          )
        case 'failedComplaint':
          this.$store.commit(
            'popup-complaint/setFieldInput',
            this.dataComplaint.complaint_status_note
          )
          this.showPopupConfirmationComplaint(
            this.dataComplaint,
            'failedComplaint'
          )
          break
        case 'redirectHotlineComplaint':
          this.$store.commit(
            'popup-complaint/setFieldInput',
            this.dataComplaint.directed_to_hotline_jabar_note
          )
          this.showPopupConfirmationComplaint(
            this.dataComplaint,
            'redirectHotlineComplaint'
          )
          break
        case 'processComplaint':
          this.dataComplaint.payload.deadline_date = new Date(
            this.dataComplaint.payload.deadline_date
          )
          this.$store.commit(
            'process-complaint/setPayload',
            this.dataComplaint?.payload
          )
          this.showPopupProcessComplaintHandle(this.dataComplaint)
          break
        case 'changeAuthority':
          this.dataComplaint = {
            ...this.dataComplaint,
            ...this.dataComplaint?.payload,
          }
          this.showPopupChangeAuthority(this.dataComplaint)
          break
        case 'addIdSpan':
          this.$store.commit('id-span/setPayload', this.dataComplaint)
          this.showPopupInputIdSpanHandle(this.dataComplaint, 'formAddIdSpan')
          break
        case 'editIdSpan':
          this.dataComplaint.sp4n_created_at = formatDate(
            this.dataComplaint.sp4n_created_at,
            'dd/MM/yyyy'
          )
          this.$store.commit('id-span/setPayload', this.dataComplaint)
          this.showPopupInputIdSpanHandle(this.dataComplaint, 'formEditIdSpan')
          break
        case 'followupComplaint':
        case 'createInstruction':
          return this.retryFollowupComplaint()
        case 'update-ikp':
          this.dataIkp.deadline_at = new Date(this.dataIkp.deadline_at)
          return this.showPopupUpdateInstruction(this.dataIkp)
      }
    },
    retryFollowupComplaint() {
      const isCreateIkp = this.$store.state['followup-complaint'].isCreateIkp
      this.setDataDialog({
        dataComplaint: this.dataComplaint,
        ...this.setDataDialogConfirmation(
          'Tindaklanjuti Aduan',
          'No.Aduan',
          this.dataComplaint.complaint_id,
          'Tindaklanjuti Aduan'
        ),
      })

      if (isCreateIkp) {
        const payload = this.$store.state['create-ikp'].payload
        this.$store.commit('create-ikp/setPayload', {
          ...payload,
          deadline_at: new Date(payload.deadline_at),
        })
        this.$store.commit('create-ikp/setIsShowPopup', true)
      } else {
        this.$store.commit('followup-complaint/setIsShowPopup', true)
      }
    },
    setDataDialog(newDataDialog) {
      this.dataDialog = { ...this.dataDialog, ...newDataDialog }
    },
    setIconPopup(newIconPopup) {
      this.iconPopup = { ...this.iconPopup, ...newIconPopup }
    },
    closePopupInformationHandle() {
      if (!this.$route.params?.id) {
        this.query.page = 1
      }
      this.$store.commit('popup-complaint/setFieldInput', '')
      this.$store.commit('followup-complaint/setComplaintType', '')
      this.$store.dispatch('create-ikp/clearPayload')
      this.$store.dispatch('process-complaint/clearPayload')
      this.closePopupHandle()
      this.$fetch()
    },
  },
}
