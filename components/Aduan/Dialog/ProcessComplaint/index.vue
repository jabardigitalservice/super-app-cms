<template>
  <div>
    <BaseDialogFrame :name="dataDialog?.nameModal">
      <BaseDialogPanel class="max-h-[720px] w-[510px] sm:h-[calc(100vh-50px)]">
        <BaseDialogHeader :title="dataDialog.title" />
        <ValidationObserver ref="form">
          <!-- START FORM -->
          <div
            class="form-process-complaint layout-content max-h-[600px] w-full overflow-auto pl-6 pr-3 sm:h-[calc(100vh-170px)]"
          >
            <h1 class="font-roboto text-base font-bold">Informasi Aduan</h1>
            <div class="mb-4 grid grid-cols-2 gap-x-2">
              <div>
                <label class="text-sm">{{ dataDialog.description }}</label>
                <p class="mt-1 text-sm font-bold">
                  {{ dataDialog.subDescription }}
                </p>
              </div>
              <div>
                <label class="text-sm">Sumber Aduan</label>
                <div class="mt-1 flex">
                  <div
                    v-if="dataComplaintSource?.complaint_source?.logo"
                    class="flex h-[23px] w-[23px] flex-shrink-0 items-center justify-center rounded-[4px] bg-[#F6F6F9] py-[3px] px-[5px]"
                  >
                    <img
                      :src="dataComplaintSource?.complaint_source?.logo"
                      alt="logo"
                      class="flex-shrink-0"
                    />
                  </div>
                  <p
                    class="text-sm font-bold"
                    :class="{
                      'ml-2': dataComplaintSource?.complaint_source?.logo,
                    }"
                  >
                    {{ dataComplaintSource?.complaint_source?.name || '-' }}
                  </p>
                </div>
              </div>
            </div>

            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredSelectForm"
              name="Status Aduan"
              class="mb-5"
              tag="div"
            >
              <jds-select
                id="complaint-status"
                v-model="payload.complaint_status_id"
                name="Status Aduan"
                label="Status Aduan"
                placeholder="Pilih Status Aduan"
                :error-message="errors[0]"
                :options="listComplaintStatus"
                :class="{ 'mb-2': errors.length > 0 }"
                :disabled="
                  dataComplaintSource?.complaint_source?.id ===
                  complaintSource.span.id
                "
                @change="
                  changeSelectValue(
                    payload.complaint_status_id,
                    'complaint_status_id'
                  )
                "
              />
            </ValidationProvider>
            <!-- SHOW FIELD STATUS COORDINATED & DIVERTED TO SPAN -->
            <div
              v-if="payload.complaint_status_id !== complaintStatus.rejected.id"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredSelectForm"
                name="Cakupan urusan"
                class="mb-5"
                tag="div"
              >
                <jds-select
                  id="coverage-of-affairs"
                  v-model="payload.coverage_of_affairs"
                  name="Cakupan Urusan"
                  label="Cakupan Urusan"
                  placeholder="Pilih Cakupan Urusan"
                  :error-message="errors[0]"
                  :options="listAuthority"
                  :class="{ 'mb-2': errors.length > 0 }"
                  class="!w-full"
                  @change="
                    changeSelectValue(
                      payload.coverage_of_affairs,
                      'coverage_of_affairs'
                    )
                  "
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredSelectForm"
                name="Nama Instansi"
                class="mb-5"
                tag="div"
              >
                <div>
                  <label class="mt-5 mb-1 text-[15px] text-gray-800">
                    Nama Instansi
                  </label>
                </div>
                <BaseSelectSearch
                  v-model="payload.opd_id"
                  name="Nama Instansi"
                  :options="listDisposition"
                  placeholder="Pilih Nama Instansi"
                  filterable
                  width-button="100%"
                  width-option="462px"
                  class="select-search"
                  :class="{
                    'select-search--error mb-2': errors.length > 0,
                  }"
                  @change="(val) => changeSelectValue(val, 'opd_id')"
                />
                <small class="text-red-600">{{ errors[0] }}</small>
              </ValidationProvider>
              <ValidationProvider
                v-if="isShowFieldOPDPemprov"
                v-slot="{ errors }"
                rules="requiredSelectForm"
                name="Pemda Penanggungjawab"
                class="mb-5 w-full"
                tag="div"
              >
                <div>
                  <label class="mt-5 mb-1 text-[15px] text-gray-800">
                    Pemda Penanggungjawab
                  </label>
                </div>
                <p class="text-[13px] text-gray-700">
                  Kota/kabupaten penanggungjawab yang bertugas untuk
                  menindaklanjuti aduan
                </p>
                <BaseSelectSearch
                  v-model="payload.opd_pemprov_id"
                  name="Pemda Penanggungjawab"
                  :options="listGovResponsible"
                  placeholder="Pilih Pemda Penanggungjawab"
                  filterable
                  width-button="100%"
                  width-option="462px"
                  class="select-search"
                  :class="{
                    'select-search--error mb-2': errors.length > 0,
                  }"
                  @change="(val) => changeSelectValue(val, 'opd_pemprov_id')"
                />
                <small class="text-red-600">{{ errors[0] }}</small>
              </ValidationProvider>
              <ValidationProvider
                v-if="isShowFieldProposeIkpNarrative"
                v-slot="{ errors }"
                rules="required"
                name="Usulan Narasi Instruksi"
                class="mb-2"
                tag="div"
              >
                <BaseTextArea
                  v-model="payload.proposed_ikp_narrative"
                  :placeholder="showPlaceholderProposedInstruction()"
                  label="Usulan Narasi Instruksi"
                  class="text-area"
                  :error-message="errors[0]"
                  maxlength="500"
                />
                <p class="mt-1 text-xs text-gray-600">
                  Tersisa
                  {{ 500 - payload.proposed_ikp_narrative.length }} karakter
                </p>
              </ValidationProvider>
              <AlertMessage
                v-if="isShowFieldProposeIkpNarrative"
                message="Usulan Narasi akan digunakan untuk Instruksi Khusus Pimpinan."
                class="mb-5 !w-full"
              />
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Keterangan Status Aduan"
                class="mb-2"
                tag="div"
              >
                <BaseTextArea
                  v-model="payload.status_description"
                  placeholder="Masukkan keterangan disini"
                  label="Keterangan Status Aduan"
                  class="text-area"
                  :error-message="errors[0]"
                  maxlength="255"
                />
                <p class="mt-1 text-xs text-gray-600">
                  Tersisa {{ 255 - payload.status_description.length }} karakter
                </p>
              </ValidationProvider>
              <AlertMessage
                message="Keterangan status aduan ini akan disampaikan ke pelapor."
                class="mb-5 !w-full"
              />
              <h1 class="mb-2 font-roboto text-base font-bold">Lainnya</h1>
              <div class="mb-4 grid grid-cols-2 gap-x-2">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Tanggal Deadline"
                  class="mb-4"
                  tag="div"
                >
                  <label class="mb-1 text-[15px] text-gray-800"
                    >Tanggal Deadline</label
                  ><br />
                  <date-picker
                    v-model="payload.deadline_date"
                    format="DD/MM/YYYY"
                    :class="{ 'mx-datepicker--error': errors[0] }"
                    placeholder="Pilih Tanggal Deadline"
                    name="Tanggal Deadline"
                    :disabled-date="disabledDateHandle"
                    @change="changeUrgencyStatus"
                    @clear="clearDate"
                  >
                    <template #icon-calendar>
                      <jds-icon
                        name="calendar-date-outline"
                        size="sm"
                        fill="#069550"
                      />
                    </template> </date-picker
                  ><br />
                  <small class="text-red-600">{{ errors[0] }}</small>
                </ValidationProvider>
                <div class="self-center">
                  <label class="text-sm">Tingkat Urgensi</label>
                  <p class="mt-1 text-sm font-bold">
                    {{ payload?.urgency_level || '-' }}
                  </p>
                </div>
              </div>
            </div>
            <!-- SHOW FIELD STATUS REJECTED -->
            <ValidationProvider
              v-else
              v-slot="{ errors }"
              rules="required"
              name="Keterangan Status Aduan"
              class="mb-2 pr-3"
              tag="div"
            >
              <BaseTextArea
                v-model="payload.status_description"
                :data-cy="`${dataDialog.dataCy.fieldTextArea}--complaint-status-note`"
                placeholder="Masukkan keterangan disini"
                label="Keterangan Status Aduan"
                class="text-area"
                helper-text="Perhatikan kembali alasan penolakan, silahkan lengkapi alasan jika dibutuhkan."
                :error-message="errors[0]"
                maxlength="255"
              />
              <p class="mt-1 text-xs text-gray-600">
                Tersisa {{ 255 - payload.status_description.length }} karakter
              </p>
            </ValidationProvider>
          </div>
          <!-- END FORM -->
          <BaseDialogFooterNew @cancel="closePopupProcessComplaint()">
            <template #button-right>
              <jds-button
                :label="dataDialog.labelButtonSubmit"
                type="button"
                variant="primary"
                class="!text-[14px] !font-bold"
                @click.prevent="showDialogConfirmation()"
              />
            </template>
          </BaseDialogFooterNew>
        </ValidationObserver>
      </BaseDialogPanel>
    </BaseDialogFrame>
    <DialogConfirmationBasic
      :dialog-modal="dialogConfirmation"
      :detail-item-modal="dialogConfirmation.detailItemModal"
      @confirmation-button="saveDataProcessComplaint()"
      @cancel="backToForm()"
    />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import AlertMessage from '~/components/Aduan/Dialog/ProcessComplaint/AlertMessage'
import { complaintStatus, complaintSource } from '~/constant/aduan-masuk'
import { formatDate } from '~/utils'

export default {
  name: 'DialogComplaintProcess',
  components: {
    ValidationProvider,
    ValidationObserver,
    AlertMessage,
  },

  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    dataDialog: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      listComplaintStatus: [
        {
          value: complaintStatus.coordinated.id,
          label: complaintStatus.coordinated.name,
        },
        {
          value: complaintStatus.diverted_to_span.id,
          label: complaintStatus.diverted_to_span.name,
        },
        {
          value: complaintStatus.rejected.id,
          label: complaintStatus.rejected.name,
        },
      ],
      listDataAuthority: [],
      listDataDisposition: [],
      listDataGovResponsible: [],
      complaintStatus,
      complaintSource,
      complaintStatusValue: '',
      coverageOfAffairs: {
        district: {
          id: 'Pemerintah Kabupaten/Kota',
          name: 'Pemerintah Kabupaten/Kota',
        },
        institutions: {
          id: 'Kementerian/Lembaga',
          name: 'Kementerian/Lembaga',
        },
        government: {
          id: 'Pemerintah Provinsi Jawa Barat',
          name: 'Pemerintah Provinsi Jawa Barat',
        },
      },
      isShowFieldOPDPemprov: false,
      isShowFieldProposeIkpNarrative: true,
      opd: {},
      dialogConfirmation: {},
    }
  },
  computed: {
    listAuthority() {
      return this.filterListAuthority().map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    listDisposition() {
      return this.$store.state['utilities-complaint'].listDisposition.map(
        (item) => {
          return { value: item.id, label: item.name }
        }
      )
    },
    listGovResponsible() {
      return this.$store.state['utilities-complaint'].listGovResponsible.map(
        (item) => {
          return { value: item.id, label: item.name }
        }
      )
    },
    payload: {
      get() {
        return { ...this.$store.state['process-complaint'].payload }
      },
      set(value) {
        this.$store.commit('process-complaint/setPayload', value)
      },
    },
    dataComplaintSource: {
      get() {
        return {
          ...this.$store.state['process-complaint'].dataComplaintSource,
        }
      },
      set(value) {
        this.$store.commit('process-complaint/setComplaintSource', value)
      },
    },
  },
  mounted() {
    this.$store.dispatch('utilities-complaint/getDataAuthorities')
    // condition field select on form change authority
    if (this.payload.opd_id) {
      this.$store.dispatch(
        'utilities-complaint/getDataDispositions',
        this.payload.coverage_of_affairs
      )
    }
    this.$store.dispatch('utilities-complaint/getDataGovResponsible')
    this.isShowFieldOPDPemprov = this.payload.opd_pemprov_id
    this.isShowFieldProposeIkpNarrative = this.payload.proposed_ikp_narrative

    const selectForm = document.querySelectorAll('div.jds-popover[id]')
    selectForm.forEach((selectItem) => {
      const selectInput = selectItem.querySelector(`#${selectItem.id} input`)
      selectInput.setAttribute(
        'data-cy',
        `${this.dataDialog.dataCy?.fieldSelect}--${selectItem.id}`
      )
    })

    const selectOptionComplaintStatus = document.querySelectorAll(
      '#complaint-status li'
    )
    selectOptionComplaintStatus.forEach((selectOption, index) => {
      selectOption.setAttribute(
        'data-cy',
        `${this.dataDialog.dataCy?.fieldSelectOptions}-complaint-status--${this.listComplaintStatus[index].value}`
      )
    })
  },
  methods: {
    changeSelectValue(value, keyObject) {
      switch (keyObject) {
        case 'complaint_status_id':
          this.clearPopupProcessComplaint()
          this.$refs.form.reset()
          this.isShowFieldProposeIkpNarrative = true
          break
        case 'coverage_of_affairs':
          this.$store.dispatch(
            'utilities-complaint/getDataDispositions',
            this.payload?.coverage_of_affairs
          )
          this.isShowFieldOPDPemprov =
            this.payload.coverage_of_affairs ===
              this.coverageOfAffairs.district.id &&
            this.payload.complaint_status_id ===
              complaintStatus.diverted_to_span.id
          this.isShowFieldProposeIkpNarrative =
            this.payload.coverage_of_affairs !==
            this.coverageOfAffairs.institutions.id

          this.payload = {
            ...this.payload,
            opd_id: null,
            opd_pemprov_id: null,
            proposed_ikp_narrative: '',
          }
          this.$store.commit('process-complaint/setPayload', {
            ...this.payload,
          })
          this.$refs.form.reset()
          break
        default:
          this.payload = { ...this.payload, [keyObject]: value }
          this.$store.commit('process-complaint/setPayload', {
            ...this.payload,
          })
          break
      }
    },
    clearDate() {
      this.payload.urgency_level = '-'
    },
    filterListAuthority() {
      switch (this.payload.complaint_status_id) {
        case complaintStatus.coordinated.id:
          return this.$store.state[
            'utilities-complaint'
          ].listAuthorities.filter(
            (item) => item.id === 'Pemerintah Provinsi Jawa Barat'
          )
        case complaintStatus.diverted_to_span.id:
          return this.$store.state[
            'utilities-complaint'
          ].listAuthorities.filter(
            (item) => item.id !== 'Pemerintah Provinsi Jawa Barat'
          )
        default:
          return this.listDataAuthority
      }
    },
    clearPopupProcessComplaint() {
      this.payload = {
        ...this.payload,
        coverage_of_affairs: null,
        status_description: '',
        deadline_date: null,
        proposed_ikp_narrative: '',
        urgency_level: null,
        opd_pic: null,
        opd_id: null,
        opd_name: null,
        opd_pemprov_id: null,
      }
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
    },
    closePopupProcessComplaint() {
      this.payload = { ...this.payload, complaint_status_id: null }
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
      this.clearPopupProcessComplaint()
      this.$refs.form.reset()
      this.$emit('close')
    },
    changeUrgencyStatus() {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + 1)
      const millisecondDifferent =
        new Date(this.payload.deadline_date).getTime() - currentDate.getTime() // to get diffrent date in millisecond unit
      const result = Math.floor(millisecondDifferent / (1000 * 3600 * 24)) + 1 // to get different date with divide different millisecond and mllisecond in 24 hours
      if (result <= 7) {
        this.payload.urgency_level = 'Mendesak'
      } else {
        this.payload.urgency_level = 'Tidak Mendesak'
      }
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
    },
    disabledDateHandle: function (date) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate())
      return date <= currentDate
    },
    showPlaceholderProposedInstruction() {
      if (
        this.payload.complaint_status_id === complaintStatus.diverted_to_span.id
      ) {
        return 'Contoh: Instruksi Pimpinan : PJ Gubernur Bey Triadi Machmudin  S.E., M.T - melakukan koordinasi dan konfirmasi tindaklanjut aduan di SP4N Lapor'
      }
      return 'Contoh: Melakukan survey dan perbaikan jalan berlubang di jl. Laswi'
    },
    backToForm() {
      this.$store.commit('modals/CLOSEALL')
      this.$store.commit('modals/OPEN', this.dataDialog?.nameModal)
    },
    async showDialogConfirmation() {
      const isValid = await this.$refs.form.validate()

      if (isValid) {
        this.$refs.form.reset()
        this.$store.commit('modals/CLOSEALL')
        this.dialogConfirmation = {
          ...this.dataDialog,
          descriptionText: 'Apakah anda yakin ingin memproses aduan tersebut?',
          button: {
            label: 'Ya, lanjutkan',
            variant: 'primary',
            dataCy: `dialog__confirmation-process-complaint__button--confirmation`,
          },
          nameModal: 'dialogConfirmationComplaintProcess',
        }
        this.$store.commit('modals/OPEN', this.dialogConfirmation.nameModal)
      }
    },
    saveDataProcessComplaint() {
      this.$store.commit('modals/CLOSEALL')
      this.payload.deadline_date = this.payload?.deadline_date
        ? formatDate(this.payload?.deadline_date || '', 'yyyy-MM-dd')
        : null
      this.$emit('submit', { ...this.dataDialog, payload: this.payload })
      this.clearPopupProcessComplaint()
      if (
        this.dataComplaintSource?.complaint_source?.id !==
        complaintSource.span.id
      ) {
        this.payload.complaint_status_id = null
      }
      this.$store.commit('followup-complaint/setPayload', { ...this.payload })
    },
  },
}
</script>

<style scoped>
.form-process-complaint::v-deep .jds-options__option-list li {
  @apply !h-fit;
}

.form-process-complaint::v-deep .jds-select .jds-input-text__input-wrapper {
  @apply !w-[462px] !bg-white;
}

.form-process-complaint::v-deep
  .jds-select--disabled
  .jds-input-text__input-wrapper {
  @apply !bg-gray-200;
}

.form-process-complaint::v-deep
  .jds-select--disabled
  .jds-input-text__input-wrapper
  input {
  @apply !text-gray-600;
}

.form-process-complaint::v-deep .text-area .input-wrapper {
  @apply !h-[83px] !w-full !bg-white;
}

.form-process-complaint::v-deep
  .mx-datepicker.mx-datepicker--error
  .mx-input-wrapper {
  @apply !bg-red-400;
}

.form-process-complaint::v-deep .mx-datepicker .mx-input {
  @apply !border-gray-500 !bg-gray-50 placeholder:!font-lato placeholder:!text-sm placeholder:!text-gray-800;
}

.form-process-complaint::v-deep .mx-datepicker.mx-datepicker--error .mx-input {
  @apply !border-red-600;
}

.form-process-complaint::v-deep .jds-select__options {
  @apply !max-h-[500px] !overflow-y-auto;
  scrollbar-color: #e0e0e0 transparent;
  scrollbar-width: thin;
}

.form-process-complaint .jds-select__options::-webkit-scrollbar {
  @apply h-5 w-5;
}

.form-process-complaint .jds-select__options::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.form-process-complaint .jds-select__options::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}

.form-process-complaint .jds-options__option-list li {
  @apply !h-fit;
}

.form-process-complaint .mx-datepicker .mx-input {
  @apply !bg-white;
}
</style>
