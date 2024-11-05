<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[510px]">
      <BaseDialogHeader :title="dataDialog.title" />
      <ValidationObserver ref="form">
        <form
          class="form-process-complaint h-[576px] w-full overflow-auto px-6"
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
                  class="h-[23px] w-[23px] flex-shrink-0 rounded-[4px] bg-[#F6F6F9]"
                  :class="{
                    'py-[3px] px-[5px]':
                      dataComplaintSource?.id === complaintSource.sapawarga.id,
                  }"
                >
                  <img
                    :src="
                      dataComplaintSource?.id === complaintSource.sapawarga.id
                        ? require('~/assets/logo/sapawarga.svg')
                        : require('~/assets/logo/span-lapor.svg')
                    "
                    alt="logo"
                    :width="
                      dataComplaintSource?.id ===
                        complaintSource.sapawarga.id && '11'
                    "
                    :height="
                      dataComplaintSource?.id ===
                        complaintSource.sapawarga.id && '15'
                    "
                  />
                </div>
                <p class="ml-2 text-sm font-bold">
                  {{ dataComplaintSource?.name }}
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
              v-model="payload.complaint_status_id"
              name="Status Aduan"
              label="Status Aduan"
              placeholder="Pilih Status Aduan"
              :error-message="errors[0]"
              :options="listComplaintStatus"
              :class="{ 'mb-2': errors.length > 0 }"
              :disabled="dataComplaintSource?.id === complaintSource.span.id"
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
            class="mb-4"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredSelectForm"
              name="Cakupan urusan"
              class="mb-5"
              tag="div"
            >
              <jds-select
                v-model="payload.coverage_of_affairs"
                name="Cakupan Urusan"
                label="Cakupan Urusan"
                placeholder="Pilih Cakupan Urusan"
                :error-message="errors[0]"
                :options="listAuthority"
                :class="{ 'mb-2': errors.length > 0 }"
                class="!w-full"
                @change="
                  changeSelectValue(payload.opd_name, 'coverage_of_affairs')
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
              <jds-select
                v-model="payload.opd_name"
                name="Nama Instansi"
                label="Nama Instansi"
                placeholder="Pilih Nama Instansi"
                :error-message="errors[0]"
                :options="listDisposition"
                :class="{ 'mb-2': errors.length > 0 }"
                class="!w-full"
                @change="changeSelectValue(payload.opd_name, 'opd_name')"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="
                payload.complaint_status_id ===
                  complaintStatus.diverted_to_span.id && isShowFieldOPDPemprov
              "
              v-slot="{ errors }"
              rules="requiredSelectForm"
              name="OPD Pemprov Penanggungjawab"
              class="mb-5"
              tag="div"
            >
              <jds-select
                v-model="payload.opd_pemprov_id"
                name="OPD Pemprov Penanggungjawab"
                label="OPD Pemprov Penanggungjawab"
                placeholder="Pilih OPD Pemprov"
                helper-text="OPD Pemprov penanggungjawab bertugas untuk memeriksa tindaklanjut aduan di kota/kabupaten atau kementerian/lembaga."
                :error-message="errors[0]"
                :class="{ 'mb-2': errors.length > 0 }"
                class="!w-full"
                :options="listGovResponsible"
                @change="
                  changeSelectValue(payload.opd_name, 'coverage_of_affairs')
                "
              />
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
              class="mb-5 !w-[462px]"
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
              class="mb-5 !w-[462px]"
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
            class="mb-2"
            tag="div"
          >
            <BaseTextArea
              v-model="payload.status_description"
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
        </form>
      </ValidationObserver>
      <BaseDialogFooter
        :show-cancel-button="true"
        :label-button-submit="dataDialog.labelButtonSubmit"
        @close="closePopupProcessComplaint()"
        @submit="saveDataProcessComplaint()"
      />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import AlertMessage from '~/components/Aduan/Dialog/ProcessComplaint/AlertMessage'
import { complaintStatus, complaintSource } from '~/constant/aduan-masuk'
import { ENDPOINT_ADUAN } from '~/constant/endpoint-api'
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
    }
  },
  async fetch() {
    try {
      // get data Cakupan urusan
      const responseAuthority = await this.$axios.get(
        `${ENDPOINT_ADUAN}/authorities`
      )
      this.listDataAuthority = responseAuthority.data.data

      if (this.payload.coverage_of_affairs) {
        // get data nama instansi
        const responseDisposition = await this.$axios.get(
          `${ENDPOINT_ADUAN}/dispositions`,
          { params: { authority: this.payload.coverage_of_affairs } }
        )
        this.listDataDisposition = responseDisposition.data.data
      }

      // get data OPD Pemprov Penanggungjawab
      const responseGovResponsible = await this.$axios.get(
        `${ENDPOINT_ADUAN}/opds`
      )
      this.listDataGovResponsible = responseGovResponsible.data.data
    } catch {
      this.listDataComplaintStatus = []
      this.listDataAuthority = []
      this.listDataDisposition = []
    }
  },
  computed: {
    listAuthority() {
      return this.filterListAuthority().map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    listDisposition() {
      return this.listDataDisposition.map((item) => {
        return { value: item.name, label: item.name }
      })
    },
    listGovResponsible() {
      return this.listDataGovResponsible.map((item) => {
        return { value: item.id, label: item.name }
      })
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
  watch: {
    payload() {
      if (this.payload.coverage_of_affairs) {
        this.$fetch()
      }
    },
  },
  methods: {
    changeSelectValue(value, keyObject) {
      switch (keyObject) {
        case 'complaint_status_id':
          this.clearPopupProcessComplaint()
          this.isShowFieldProposeIkpNarrative = true
          break
        case 'coverage_of_affairs':
          this.$fetch()
          this.isShowFieldOPDPemprov =
            this.payload.coverage_of_affairs ===
            this.coverageOfAffairs.district.id
          this.isShowFieldProposeIkpNarrative =
            this.payload.coverage_of_affairs !==
            this.coverageOfAffairs.institutions.id

          break
        default:
          this.paylod = { ...this.payload, [keyObject]: value }
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
          return this.listDataAuthority.filter(
            (item) => item.id === 'Pemerintah Provinsi Jawa Barat'
          )
        case complaintStatus.diverted_to_span.id:
          return this.listDataAuthority.filter(
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
        opd_name: null,
        opd_pemprov_id: null,
      }
      this.listDataDisposition = [{ label: '', value: '' }]
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
      this.$refs.form.reset()
    },
    closePopupProcessComplaint() {
      this.payload = { ...this.payload, complaint_status_id: null }
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
      this.clearPopupProcessComplaint()
      this.$emit('close')
    },
    changeUrgencyStatus() {
      const millisecondDifferent =
        new Date(this.payload.deadline_date).getTime() - new Date().getTime() // to get diffrent date in millisecond unit
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
      currentDate.setDate(currentDate.getDate() - 1)
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
    async saveDataProcessComplaint() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.payload.deadline_date = this.payload?.deadline_date
          ? formatDate(this.payload?.deadline_date || '', 'yyyy-MM-dd')
          : null
        this.$emit('submit', { ...this.dataDialog, payload: this.payload })
        this.closePopupProcessComplaint()
      }
    },
  },
}
</script>

<style>
.form-process-complaint::-webkit-scrollbar {
  @apply h-5 w-5;
}

.form-process-complaint::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.form-process-complaint::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}

.form-process-complaint .jds-options__option-list li {
  @apply !h-fit;
}

.form-process-complaint .jds-select .jds-input-text__input-wrapper {
  @apply !w-[462px] !bg-white;
}

.form-process-complaint .jds-select--disabled .jds-input-text__input-wrapper {
  @apply !bg-gray-200;
}

.form-process-complaint
  .jds-select--disabled
  .jds-input-text__input-wrapper
  input {
  @apply !text-gray-600;
}

.form-process-complaint .text-area .input-wrapper {
  @apply !h-[83px] !w-[462px] !bg-white;
}

.form-process-complaint .mx-datepicker.mx-datepicker--error .mx-input-wrapper {
  @apply !bg-red-400;
}

.form-process-complaint .mx-datepicker .mx-input {
  @apply !border-gray-500 !bg-gray-50 placeholder:!font-lato placeholder:!text-sm placeholder:!text-gray-800;
}

.form-process-complaint .mx-datepicker.mx-datepicker--error .mx-input {
  @apply !border-red-600;
}

.form-process-complaint .jds-select__options {
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
