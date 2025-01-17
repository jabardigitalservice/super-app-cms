import { complaintStatus, typeAduan } from '~/constant/aduan-masuk'
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
      // this.typeDialog = 'redirectHotlineComplaint'
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
    showPopupInputIdSpanHandle(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'addIdSpan'
      this.dataComplaint = dataComplaint
      this.setDataDialog({
        description: 'No. Aduan',
        subDescription: dataComplaint.complaint_id,
      })
      this.$store.commit('modals/OPEN', 'formAddIdSpan')
    },
    showPopupProcessComplaintHandle(dataComplaint) {
      this.idApi = dataComplaint.id
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
    showPopupFollowupComplaint(dataComplaint) {
      this.idApi = dataComplaint.id
      this.typeDialog = 'followupComplaint'
      this.isPopupFollowupComplaint = true
      dataComplaint.deadline_date = new Date(dataComplaint.deadline_date) || '-'
      this.dataComplaint = dataComplaint
      const dialogConfirmation =
        this.$store.state['followup-complaint'].dialogConfirmation
      this.$store.commit('followup-complaint/setDialogConfirmation', {
        ...dialogConfirmation,
        title: 'Tindaklanjuti Aduan',
        nameModal: 'followupComplaintConfirmation',
      })
      this.$store.commit(
        'create-ikp/setComplaintType',
        typeAduan.instruksiKewenanganPemprov.props
      )
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
      this.isPopupFollowupComplaint = true
      dataComplaint.deadline_date = new Date(dataComplaint.deadline_date) || '-'
      this.dataComplaint = dataComplaint
      const dialogConfirmation =
        this.$store.state['followup-complaint'].dialogConfirmation
      this.$store.commit('followup-complaint/setDialogConfirmation', {
        ...dialogConfirmation,
        title: 'Buat Instruksi',
        nameModal: 'createInstructionConfirmation',
      })
      this.$store.commit(
        'create-ikp/setComplaintType',
        typeAduan.instruksiKewenanganNonPemprov.props
      )
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
      this.$store.commit('followup-complaint/setDialogConfirmation', {
        ...dialogConfirmation,
        title: 'Buat Instruksi',
        nameModal: 'followupComplaintConfirmation',
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
            success: {
              ...this.setSucessFailedInformationHandle(
                'Aduan berhasil diverifikasi',
                true
              ),
              dataCy: {
                footer: {
                  buttonSubmit:
                    'dialog__information-success-from-verification__button--close',
                },
              },
            },
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
            success: {
              ...this.setSucessFailedInformationHandle(
                'Konfirmasi Aduan Gagal Diverifikasi berhasil dilakukan',
                true
              ),
              dataCy: {
                footer: {
                  buttonSubmit:
                    'dialog__information-success-from-failed-verification__button--close',
                },
              },
            },
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
            success: {
              ...this.setSucessFailedInformationHandle(
                'Aduan berhasil dialihkan ke Hotline Jabar',
                true
              ),
              dataCy: {
                footer: {
                  buttonSubmit:
                    'dialog__information-success-from-diverted-to-hotline-jabar__button--close',
                },
              },
            },
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
      this.$store.commit('modals/CLOSEALL')
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
        {
          sp4n_id: item.payload.sp4n_id,
          sp4n_created_at: item.payload.sp4n_created_at,
          complaint_number: this.dataComplaint.complaint_id,
        },
        'add-sp4n'
      )
    },

    submitProcessComplaint(dataComplaint) {
      this.isShowPopupProcessComplaint = false
      this.dataComplaint = dataComplaint
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
          payload.ikp_code
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
      this.integrationPopupHandle(dataDialogInformation, payload, 'follow-up')
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
      this.$store.commit('followup-complaint/setComplaintType', '')
    },
    getApiEndpoint(pathApi) {
      const complaintType =
        this.$store.state['followup-complaint'].complaintType
      const endpointApi =
        complaintType === typeAduan.instruksiKewenanganNonPemprov.props
          ? ENDPOINT_ADUAN_NON_PEMPROV
          : ENDPOINT_ADUAN
      return `${endpointApi}/${this.idApi}/${pathApi}`
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
        case 'addIdSpan':
          return this.showPopupInputIdSpanHandle(this.dataComplaint)
        case 'followupComplaint':
        case 'createInstruction':
          return this.retryFollowupComplaint()
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
      this.$store.dispatch('process-complaint/clearPayload')
      this.closePopupHandle()
      this.$fetch()
    },
  },
}
