<template>
  <div>
    <BaseDialog :show-popup="isShowPopupCreateIkp">
      <BaseDialogPanel class="w-[600px]">
        <BaseDialogHeader title="Buat Instruksi Aduan Baru" />
        <div
          class="form-input-ikp py-3 px-6 pb-6"
          :class="{ '!pr-0': !isTruncate }"
        >
          <ValidationObserver ref="form">
            <form class="w-[552px] rounded-lg border border-gray-300 p-3">
              <AlertInformation
                message="Pembuatan Instruksi Khusus Pimpinan baru."
              />
              <CardIkpNarrative class="mt-3" />
              <div
                v-if="
                  complaintType ===
                  typeAduan.instruksiKewenanganNonPemprov.props
                "
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="requiredSelectForm"
                  name="Cakupan Urusan"
                  class="py-3"
                  tag="div"
                >
                  <jds-select
                    v-model="payload.coverage_of_affairs"
                    name="Cakupan Urusan"
                    label="Cakupan Urusan"
                    placeholder="Pilih Cakupan Urusan"
                    :options="listAuthority"
                    :error-message="errors[0]"
                    disabled
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="requiredSelectForm"
                  name="Nama Instansi"
                  class="pb-3"
                  tag="div"
                >
                  <jds-select
                    v-model="payload.opd_name"
                    name="Nama Instansi"
                    label="Nama Instansi"
                    placeholder="Pilih Nama Instansi"
                    :error-message="errors[0]"
                    disabled
                    :options="listDisposition"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="requiredSelectForm"
                  name="OPD Pemprov Penanggungjawab"
                  class="pb-3"
                  tag="div"
                >
                  <jds-select
                    v-model="payload.opd_pemprov_id"
                    name="OPD Pemprov Penanggungjawab"
                    label="OPD Pemprov Penanggungjawab"
                    placeholder="Pilih OPD Pemprov Penanggungjawab"
                    helper-text="OPD Pemprov penanggungjawab bertugas untuk memeriksa tindaklanjut aduan di kota/kabupaten atau kementerian/lembaga."
                    :error-message="errors[0]"
                    disabled
                    :options="listGovResponsible"
                  />
                </ValidationProvider>
              </div>
              <ValidationProvider
                v-if="
                  complaintType === typeAduan.instruksiKewenanganPemprov.props
                "
                v-slot="{ errors }"
                rules="requiredSelectForm"
                name="Perangkat Daerah"
                class="py-3"
                tag="div"
              >
                <jds-select
                  v-model="payload.opd_name"
                  name="Perangkat Daerah"
                  label="Perangkat Daerah"
                  placeholder="Pilih Perangkat Daerah"
                  :options="listDisposition"
                  :error-message="errors[0]"
                  disabled
                />
              </ValidationProvider>
              <div class="grid grid-cols-2 gap-3 pt-3">
                <div class="w-full">
                  <label class="pb-1 text-[15px] text-gray-800"
                    >Tanggal Instruksi Diberikan</label
                  ><br />
                  <date-picker
                    v-model="instructionDate"
                    format="DD/MM/YYYY"
                    disabled
                    placeholder="Pilih Tanggal Instruksi Diberikan"
                    class="mx-datepicker--disabled !w-full"
                  >
                    <template #icon-calendar>
                      <jds-icon
                        name="calendar-date-outline"
                        size="sm"
                        class="mx-icon-date"
                      />
                    </template>
                  </date-picker>
                </div>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Tanggal Deadline"
                >
                  <label class="pb-1 text-[15px] text-gray-800"
                    >Tanggal Deadline</label
                  ><br />
                  <date-picker
                    v-model="payload.deadline_at"
                    format="DD/MM/YYYY"
                    :disabled-date="disabledDeadlineDate"
                    placeholder="Pilih Tanggal Deadline"
                    :class="{
                      'mx-datepicker--error': errors[0],
                    }"
                    class="mx-datepicker--disabled !w-full"
                    disabled
                  >
                    <template #icon-calendar>
                      <jds-icon
                        name="calendar-date-outline"
                        size="sm"
                        class="mx-icon-date"
                      />
                    </template> </date-picker
                  ><br />
                  <small class="text-red-600">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="grid grid-cols-2 gap-x-2 py-3">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|numeric"
                  name="Indikator Nilai"
                >
                  <BaseInputText
                    v-model="payload.indicator_value"
                    type="text"
                    placeholder="Masukkan Indikator Nilai"
                    label="Indikator Nilai"
                    class="!bg-white"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="Indikator Satuan"
                >
                  <BaseInputText
                    v-model="payload.indicator_unit"
                    type="text"
                    placeholder="Masukkan Indikator Satuan"
                    label="Indikator Satuan"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Keterangan Instruksi Aduan"
              >
                <BaseTextArea
                  v-model="instructionNote"
                  label="Keterangan Instruksi Aduan"
                  placeholder="Masukkan deskripsi"
                  maxlength="255"
                  class="pt-3"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
              <p class="pt-1 text-xs text-gray-600">
                Tersisa {{ 255 - instructionNote.length }} karakter
              </p>
            </form>
          </ValidationObserver>
        </div>
        <BaseDialogFooter
          :show-cancel-button="true"
          label-button-submit="Lanjutkan"
          @submit="showPopupConfirmation"
          @close="closePopupCreateIkp()"
        />
      </BaseDialogPanel>
    </BaseDialog>
    <DialogWithAlert
      :show-popup="isShowPopupConfirmation"
      :alert="alert"
      :data-dialog="dataDialog"
      @close="backToFormIkp()"
      @submit="submitIkp"
    />
    <DialogInformation
      :show-popup="isShowPopupInformationSuccess"
      :data-ikp="dataIkp"
      :data-dialog="dataDialog"
      :icon="icon"
      @close="closePopupInformation"
      @submit="submitIkp"
    />
    <DialogWithAlert
      :show-popup="isShowPopupInformationError"
      :alert="alert"
      :data-dialog="dataDialog"
      @close="closePopupInformation"
      @submit="backToFormIkp"
    />
    <DialogLoading :show-popup="isShowPopupLoading" />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'
import AlertInformation from '~/components/Aduan/Alert/Information'
import CardIkpNarrative from '~/components/Aduan/Dialog/CreateIkp/CardIkpNarrative'
import DialogWithAlert from '~/components/Aduan/Dialog/CreateIkp/Dialog/WithAlert'
import DialogInformation from '~/components/Aduan/Dialog/CreateIkp/Dialog/Information'
import { formatDate } from '~/utils'
import { typeAduan } from '~/constant/aduan-masuk'
import { ENDPOINT_ADUAN, ENDPOINT_IKP } from '~/constant/endpoint-api'

export default {
  name: 'DialogCreateIkp',
  components: {
    AlertInformation,
    CardIkpNarrative,
    DialogWithAlert,
    DialogInformation,
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    complaintType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      instructionDate: new Date(),
      listDataDisposition: [],
      listDataAuthority: [],
      listDataGovResponsible: [],
      isTruncate: true,
      isShowPopupConfirmation: false,
      isShowPopupInformationSuccess: false,
      isShowPopupInformationError: false,
      isShowPopupLoading: false,
      isErrorInputIkp: false,
      dataIkp: {
        id: '',
        narrative: '',
      },
      dataDialog: {
        description: '',
        labelButtonSubmit: '',
        labelButtonCancel: '',
      },
      alert: {
        message: '',
        variant: '',
      },
      icon: {},
      typeAduan,
      instructionNote: '',
    }
  },
  async fetch() {
    try {
      // response cakupan urusan
      const responseAuthority = await this.$axios.get(
        `${ENDPOINT_ADUAN}/authorities`
      )
      this.listDataAuthority = responseAuthority.data.data
      // response nama instansi
      const responseDisposition = await this.$axios.get(
        `${ENDPOINT_ADUAN}/dispositions`,
        { params: { authority: this.payload.coverage_of_affairs } }
      )
      this.listDataDisposition = responseDisposition.data.data
      // response OPD Pemprov Penanggungjawab
      const responseGovResponsible = await this.$axios.get(
        `${ENDPOINT_ADUAN}/opds`
      )
      this.listDataGovResponsible = responseGovResponsible.data.data
    } catch {
      this.listDataDisposition = []
      this.listDataAuthority = []
      this.listDataGovResponsible = []
    }
  },

  computed: {
    listAuthority() {
      return this.listDataAuthority.map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    listDisposition() {
      return this.listDataDisposition.map((item) => {
        return { label: item.name, value: item.name }
      })
    },
    listGovResponsible() {
      return this.listDataGovResponsible.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    ...mapGetters('create-ikp', {
      isShowPopupCreateIkp: 'getIsShowPopup',
      ikpNarrative: 'getIkpNarrative',
    }),
    payload: {
      get() {
        return { ...this.$store.state['create-ikp'].payload }
      },
      set(value) {
        this.$store.commit('create-ikp/setPayload', value)
      },
    },
  },
  watch: {
    payload() {
      if (this.payload.coverage_of_affairs) {
        this.$fetch()
      }
      if (this.payload.description) {
        this.descriptionLength =
          this.descriptionLength - this.payload.description.length
      }
    },
  },
  methods: {
    backToFormIkp() {
      this.isShowPopupConfirmation = false
      this.isShowPopupInformationError = false
      this.$store.commit('create-ikp/setIsShowPopup', true)
    },
    closePopupInformation() {
      this.resetFormIkp()
      if (this.isShowPopupInformationSuccess) {
        this.$store.commit('followup-complaint/setDataIkp', this.dataIkp)
        this.$store.commit('followup-complaint/setIsFollowup', true)
      }
      if (this.isShowPopupInformationError) {
        this.$store.commit('followup-complaint/setIsFollowup', false)
      }
      this.isShowPopupInformationSuccess = false
      this.isShowPopupInformationError = false
      this.$store.commit('followup-complaint/setIsShowPopup', true)
    },
    closePopupCreateIkp() {
      this.resetFormIkp()
      this.$store.commit('create-ikp/setIsShowPopup', false)
      this.$store.commit('followup-complaint/setIsFollowup', false)
      this.$store.commit('followup-complaint/setIsShowPopup', true)
    },
    disabledDeadlineDate: function (date) {
      return date <= new Date()
    },
    truncateIKpnarrative() {
      this.isTruncate = true
    },
    resetFormIkp() {
      this.payload = {
        narrative: '',
        deadline_at: '',
        description: '',
        indicator_value: '',
        indicator_unit: '',
        opd_name: '',
        coverage_of_affairs: '',
        opd_pemprov_id: '',
      }
      this.instructionNote = ''
      this.$store.commit('create-ikp/setIsTruncate', false)
      this.$refs.form.reset()
    },
    async showPopupConfirmation() {
      const isValid = await this.$refs.form.validate()
      this.setAlert({
        variant: 'warning',
        message: 'Pastikan data yang diisi telah sesuai dan benar',
      })
      this.setDataDialog({
        description: 'Apakah Anda yakin ingin membuat instruksi aduan baru? ',
        labelButtonSubmit: 'Simpan Instruksi Baru',
        labelButtonCancel: 'Kembali',
      })
      if (isValid) {
        this.payload.narrative = this.ikpNarrative
        this.isShowPopupConfirmation = true
        this.$store.commit('create-ikp/setIsShowPopup', false)
      }
    },
    async submitIkp() {
      this.isShowPopupConfirmation = false
      this.isShowPopupLoading = true
      try {
        this.payload = {
          ...this.payload,
          deadline_at: formatDate(this.payload.deadline_at, 'yyyy-MM-dd'),
          description: this.instructionNote,
        }
        const response = await this.$axios.post(ENDPOINT_IKP, {
          ...this.payload,
          user_id: this.$auth?.user?.identifier,
        })
        this.dataIkp = response.data.data
        this.dataIkp.ikp_code = this.dataIkp.ikp_code.toString()
        this.setDataDialog({
          description:
            'Pembuatan Instruksi Aduan Baru telah berhasil dilakukan',
          labelButtonSubmit: 'Saya mengerti',
          showCancelButton: false,
        })
        this.setIconPopup({ name: 'check-mark-circle', fill: '#069550' })
        this.resetFormIkp()
        this.isShowPopupInformationSuccess = true
      } catch {
        this.payload.deadline_at = new Date(this.payload.deadline_at)
        this.setAlert({
          variant: 'error',
          message: 'Pembuatan Instruksi Aduan Baru Gagal',
        })
        this.setDataDialog({
          description:
            'Maaf, pembuatan instruksi aduan baru tidak dapat disimpan saat ini karena terjadi kesalahan pada sistem. Silakan coba lagi untuk menyimpan instruksi aduan baru.',
          labelButtonSubmit: 'Coba Lagi',
          labelButtonCancel: 'Batalkan',
        })
        this.isShowPopupInformationError = true
      } finally {
        this.isShowPopupLoading = false
      }
    },
    setAlert(newAlert) {
      this.alert = { ...this.alert, ...newAlert }
    },
    setDataDialog(newDataDialog) {
      this.dataDialog = { ...this.dataDialog, ...newDataDialog }
    },
    setIconPopup(newIconPopup) {
      this.icon = { ...this.iconPopup, ...newIconPopup }
    },
  },
}
</script>

<style>
.form-input-ikp {
  @apply max-h-[670px] overflow-y-auto;
  scrollbar-color: #e0e0e0 transparent;
  scrollbar-width: thin;
}

.form-input-ikp::-webkit-scrollbar {
  @apply h-5 w-5;
}

.form-input-ikp::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.form-input-ikp::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}

.form-input-ikp .form-text-area .input-wrapper {
  @apply !h-[92.5px] !bg-white;
}

.form-input-ikp .form-input-text input {
  @apply !bg-white;
}

.form-input-ikp
  .jds-select.jds-select--disabled
  .jds-input-text__input-wrapper {
  @apply !w-[528px] !bg-gray-200;
}

.form-input-ikp
  .jds-select.jds-select--disabled
  .jds-input-text__input-wrapper {
  @apply !w-[528px] !bg-gray-200;
}

.form-input-ikp
  .jds-select.jds-select--disabled
  .jds-input-text__input-wrapper
  input {
  @apply !w-[528px] !bg-gray-200 !text-gray-600;
}

.form-input-ikp .jds-select .jds-input-text__input-wrapper {
  @apply !w-[528px] !bg-white;
}

.form-input-ikp .jds-select__options {
  @apply !max-h-[500px] !max-w-[528px] !overflow-y-auto;
  scrollbar-color: #e0e0e0 transparent;
  scrollbar-width: thin;
}

.form-input-ikp
  .mx-datepicker.mx-datepicker--disabled
  .mx-input-wrapper
  .mx-input {
  @apply !bg-gray-200;
}
</style>
