<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[510px]">
      <BaseDialogHeader title="Proses Aduan" />
      <ValidationObserver ref="form">
        <form
          class="form-process-complaint max-h-[536px] w-full overflow-auto px-6"
        >
          <h1 class="font-roboto text-base font-bold">
            Informasi Aduan
          </h1>
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
                  >
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
            class="mb-4"
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
          <div
            v-if="payload.complaint_status_id !== complaintStatus.rejected.id"
            class="mb-4"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredSelectForm"
              name="Cakupan urusan"
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
          </div>
          <ValidationProvider
            v-if="
              payload.complaint_status_id !==
                complaintStatus.diverted_to_span.id
            "
            v-slot="{ errors }"
            rules="required"
            name="Keterangan Status Aduan"
            class="mb-4"
            tag="div"
          >
            <BaseTextArea
              v-model="payload.status_description"
              placeholder="Masukkan keterangan disini"
              label="Keterangan Status Aduan"
              maxlength="255"
              class="text-area"
              :error-message="errors[0]"
            />
            <p class="mt-1 text-xs text-gray-600">
              Tersisa {{ 255 - payload.status_description.length }} karakter
            </p>
          </ValidationProvider>

          <div
            v-if="payload.complaint_status_id !== complaintStatus.rejected.id"
          >
            <AlertMessage
              v-if="
                payload.complaint_status_id ===
                  complaintStatus.coordinated.id || !payload.complaint_status_id
              "
              message="Keterangan status aduan ini akan disampaikan ke pelapor."
              class="!w-[462px]"
            />
            <h1 class="mb-2 font-roboto text-base font-bold">
              Informasi Instansi
            </h1>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredSelectForm"
              name="Nama Instansi"
              class="mb-4"
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
                  complaintStatus.coordinated.id || !payload.complaint_status_id
              "
              v-slot="{ errors }"
              rules="required"
              name="Nama Kepala Perangkat Daerah"
              class="mb-4"
              tag="div"
            >
              <BaseInputText
                v-model="payload.opd_pic"
                :error-message="errors[0]"
                placeholder="Masukkan nama kepala perangkat daerah"
                label="Nama Kepala Perangkat Daerah"
                class="!w-[462px]"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="
                payload.complaint_status_id ===
                  complaintStatus.coordinated.id || !payload.complaint_status_id
              "
              v-slot="{ errors }"
              rules="required"
              name="Usulan Narasi IKP"
              class="mb-4"
              tag="div"
            >
              <BaseTextArea
                v-model="payload.proposed_ikp_narrative"
                placeholder="Masukkan keterangan disini"
                label="Usulan Narasi IKP"
                class="text-area"
                :error-message="errors[0]"
              />
              <p class="mt-1 text-xs text-gray-600">
                Tersisa
                {{ 500 - payload.proposed_ikp_narrative.length }} karakter
              </p>
            </ValidationProvider>
          </div>
          <div
            v-if="payload.complaint_status_id !== complaintStatus.rejected.id"
          >
            <AlertMessage
              v-if="
                payload.complaint_status_id ===
                  complaintStatus.coordinated.id || !payload.complaint_status_id
              "
              message="Usulan Narasi akan digunakan untuk Instruksi Khusus Pimpinan."
              class="mb-4 !w-[462px]"
            />
            <h1 class="mb-2 font-roboto text-base font-bold">
              Lainnya
            </h1>
            <ValidationProvider
              v-if="
                payload.complaint_status_id ==
                  complaintStatus.diverted_to_span.id
              "
              v-slot="{ errors }"
              rules="required"
              name="Keterangan Status Aduan"
              class="mb-4"
              tag="div"
            >
              <BaseTextArea
                v-model="payload.status_description"
                placeholder="Masukkan keterangan status aduan"
                label="Keterangan Status Aduan"
                class="text-area"
                :error-message="errors[0]"
              />
              <p class="mt-1 text-xs text-gray-600">
                Tersisa {{ 255 - payload.status_description.length }} karakter
              </p>
            </ValidationProvider>
            <div
              v-if="
                payload.complaint_status_id ===
                  complaintStatus.coordinated.id || !payload.complaint_status_id
              "
              class="mb-4 grid grid-cols-2 gap-x-2"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Tanggal Deadline"
                class="mb-4"
                tag="div"
              >
                <label class="mb-1 text-[15px] text-gray-800">Tanggal Deadline</label><br>
                <date-picker
                  v-model="payload.deadline_date"
                  format="DD/MM/YYYY"
                  :class="{ 'mx-datepicker--error': errors[0] }"
                  placeholder="Pilih Tanggal Deadline"
                  name="Tanggal Deadline"
                  :disabled-date="disabledDateHandle"
                  @change="changeUrgencyStatus"
                /><br>
                <small class="text-red-600">{{ errors[0] }}</small>
              </ValidationProvider>
              <div class="self-center">
                <label class="text-sm">Tingkat Urgensi</label>
                <p class="text-sm font-bold">
                  {{ payload?.urgency_level || "-" }}
                </p>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <BaseDialogFooter
        :show-cancel-button="true"
        label-button-submit="Proses Aduan"
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
import { formatDate } from '~/utils'

export default {
  name: 'DialogComplaintProcess',
  components: {
    ValidationProvider,
    ValidationObserver,
    AlertMessage
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      listDataComplaintStatus: [],
      listDataAuthority: [],
      listDataDisposition: [],
      complaintStatus,
      complaintSource,
      complaintStatusValue: ''
    }
  },
  async fetch () {
    try {
      const responseComplaintStatus = await this.$axios.get(
        '/warga/complaints/status'
      )
      const dataComplaintStatus = responseComplaintStatus.data.data
      this.listDataComplaintStatus = dataComplaintStatus.filter(
        item =>
          item.id === this.complaintStatus.coordinated.id ||
          item.id === this.complaintStatus.rejected.id ||
          item.id === this.complaintStatus.diverted_to_span.id
      )

      const responseAuthority = await this.$axios.get(
        '/warga/complaints/authorities'
      )
      this.listDataAuthority = responseAuthority.data.data

      if (this.payload.coverage_of_affairs) {
        const responseDisposition = await this.$axios.get(
          '/warga/complaints/dispositions',
          { params: { authority: this.payload.coverage_of_affairs } }
        )
        this.listDataDisposition = responseDisposition.data.data
      }
    } catch {
      this.listDataComplaintStatus = []
      this.listDataAuthority = []
      this.listDataDisposition = []
    }
  },
  computed: {
    listComplaintStatus () {
      return this.listDataComplaintStatus.map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    listAuthority () {
      return this.listDataAuthority.map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    listDisposition () {
      return this.listDataDisposition.map((item) => {
        return { value: item.name, label: item.name }
      })
    },
    valueComplaintStatus () {
      if (
        this.dataDialog.complaintSource?.id ===
        this.complaintSource.sapawarga.id
      ) {
        return ''
      } else {
        return this.complaintStatus.coordinated.id
      }
    },
    payload: {
      get () {
        return { ...this.$store.state['process-complaint'].payload }
      },
      set (value) {
        this.$store.commit('process-complaint/setPayload', value)
      }
    },
    dataComplaintSource: {
      get () {
        return {
          ...this.$store.state['process-complaint'].dataComplaintSource
        }
      },
      set (value) {
        this.$store.commit('process-complaint/setComplaintSource', value)
      }
    }
  },
  mounted () {
    this.complaintStatusValue = this.valueComplaintStatus
  },
  methods: {
    changeSelectValue (value, keyObject) {
      switch (keyObject) {
        case 'complaint_status_id':
          this.clearPopupProcessComplaint()
          break
        case 'coverage_of_affairs':
          this.$fetch()
          break
        default:
          this.paylod = { ...this.payload, [keyObject]: value }
          this.$store.commit('process-complaint/setPayload', {
            ...this.payload
          })
          break
      }
    },
    clearPopupProcessComplaint () {
      this.payload = {
        ...this.payload,
        coverage_of_affairs: null,
        status_description: '',
        deadline_date: null,
        proposed_ikp_narrative: '',
        urgency_level: null,
        opd_pic: null,
        opd_name: null
      }
      this.listDataDisposition = [{ label: '', value: '' }]
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
      this.$refs.form.reset()
    },
    closePopupProcessComplaint () {
      this.payload = { ...this.payload, complaint_status_id: null }
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
      this.clearPopupProcessComplaint()
      this.$emit('close')
    },
    changeUrgencyStatus () {
      const millisecondDifferent =
        new Date(this.payload.deadline_date).getTime() -
        new Date(this.dataDialog.createdDate).getTime() // to get diffrent date in millisecond unit
      const result = Math.floor(millisecondDifferent / (1000 * 3600 * 24)) + 1 // to get different date with divide different millisecond and mllisecond in 24 hours
      if (result <= 7) {
        this.payload.urgency_level = 'Mendesak'
      } else {
        this.payload.urgency_level = 'Tidak Mendesak'
      }
      this.$store.commit('process-complaint/setPayload', { ...this.payload })
    },
    disabledDateHandle: function (date) {
      const createdDate = new Date(this.dataDialog.createdDate)
      return date < createdDate
    },
    async saveDataProcessComplaint () {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.payload.deadline_date = this.payload?.deadline_date
          ? formatDate(this.payload?.deadline_date || '', 'yyyy-MM-dd')
          : null
        this.$emit('submit', { ...this.dataDialog, payload: this.payload })
        this.closePopupProcessComplaint()
      }
    }
  }
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
  @apply !h-[83px] !w-[462px];
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
</style>
