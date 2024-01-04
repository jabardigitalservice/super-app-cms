<template>
  <div>
    <BaseDialog :show-popup="isShowPopupCreateIkp">
      <BaseDialogPanel class="w-[600px]">
        <BaseDialogHeader title="Buat IKP Baru" />
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
              <div class="grid grid-cols-2 gap-3 pt-3">
                <div class="w-full">
                  <label class="pb-1 text-[15px] text-gray-800">Tanggal Instruksi Diberikan</label><br>
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
                  <label class="pb-1 text-[15px] text-gray-800">Tanggal Deadline</label><br>
                  <date-picker
                    v-model="payload.deadline_at"
                    format="DD/MM/YYYY"
                    :class="{ 'mx-datepicker--error': errors[0] }"
                    :disabled-date="disabledDeadlineDate"
                    placeholder="Pilih Tanggal Deadline"
                    class="!w-full"
                  >
                    <template #icon-calendar>
                      <jds-icon
                        name="calendar-date-outline"
                        size="sm"
                        class="mx-icon-date"
                      />
                    </template>
                  </date-picker><br>
                  <small class="text-red-600">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Keterangan Instruksi Khusus Pimpinan"
              >
                <BaseTextArea
                  v-model="payload.description"
                  label="Keterangan Instruksi Khusus Pimpinan"
                  placeholder="Masukkan deskripsi"
                  maxlength="255"
                  class="pt-3"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
              <p class="pt-1 text-xs text-gray-600">
                Tersisa {{ 255 - payload.description.length }} karakter
              </p>
              <div class="grid grid-cols-2 gap-x-2 py-3">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|numeric"
                  name="Indikator Nilai"
                >
                  <BaseInputText
                    v-model="payload.indicator_value"
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
                    placeholder="Masukkan Indikator Satuan"
                    label="Indikator Satuan"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredSelectForm"
                name="Perangkat Daerah"
                class="pb-3"
                tag="div"
              >
                <jds-select
                  v-model="payload.opd_name"
                  name="Perangkat Daerah"
                  label="Perangkat Daerah"
                  placeholder="Pilih Perangkat Daerah"
                  :options="listDisposition"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
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

export default {
  name: 'DialogCreateIkp',
  components: {
    AlertInformation,
    CardIkpNarrative,
    DialogWithAlert,
    DialogInformation,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      payload: {
        narrative: '',
        deadline_at: '',
        description: '',
        indicator_value: '',
        indicator_unit: '',
        opd_name: ''
      },
      instructionDate: new Date(),
      listDataDisposition: [],
      isTruncate: true,
      isShowPopupConfirmation: false,
      isShowPopupInformationSuccess: false,
      isShowPopupInformationError: false,
      isShowPopupLoading: false,
      isErrorInputIkp: false,
      dataIkp: {
        id: '',
        narrative: ''
      },
      dataDialog: {
        description: '',
        labelButtonSubmit: '',
        labelButtonCancel: ''
      },
      alert: {
        message: '',
        variant: ''
      },
      icon: {}
    }
  },
  async fetch () {
    try {
      const responseDisposition = await this.$axios.get(
        'warga/complaints/dispositions',
        { params: { authority: 'Pemerintah Provinsi Jawa Barat' } }
      )
      this.listDataDisposition = responseDisposition.data.data
    } catch {
      this.listDataDisposition = []
    }
  },
  computed: {
    listDisposition () {
      return this.listDataDisposition.map((item) => {
        return { label: item.name, value: item.name }
      })
    },
    ...mapGetters('create-ikp', {
      isShowPopupCreateIkp: 'getIsShowPopup',
      ikpNarrative: 'getIkpNarrative'
    })
  },
  methods: {
    backToFormIkp () {
      this.isShowPopupConfirmation = false
      this.isShowPopupInformationError = false
      this.$store.commit('create-ikp/setIsShowPopup', true)
    },
    closePopupInformation () {
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
    closePopupCreateIkp () {
      this.resetFormIkp()
      this.$store.commit('create-ikp/setIsShowPopup', false)
      this.$store.commit('followup-complaint/setIsFollowup', false)
      this.$store.commit('followup-complaint/setIsShowPopup', true)
    },
    disabledDeadlineDate: function (date) {
      return date <= new Date()
    },
    truncateIKpnarrative () {
      this.isTruncate = true
    },
    resetFormIkp () {
      this.payload = {
        narrative: '',
        deadline_at: '',
        description: '',
        indicator_value: '',
        indicator_unit: '',
        opd_name: ''
      }
      this.$store.commit('create-ikp/setIsTruncate', false)
      this.$refs.form.reset()
    },
    async showPopupConfirmation () {
      const isValid = await this.$refs.form.validate()
      this.setAlert({
        variant: 'warning',
        message: 'Pastikan data yang diisi telah sesuai dan benar'
      })
      this.setDataDialog({
        description: 'Apakah Anda yakin ingin membuat IKP baru? ',
        labelButtonSubmit: 'Simpan IKP Baru',
        labelButtonCancel: 'Kembali'
      })
      if (isValid) {
        this.payload.narrative = this.ikpNarrative
        this.isShowPopupConfirmation = true
        this.$store.commit('create-ikp/setIsShowPopup', false)
      }
    },
    async submitIkp () {
      this.isShowPopupConfirmation = false
      this.isShowPopupLoading = true
      try {
        this.payload.deadline_at = formatDate(
          this.payload.deadline_at,
          'yyyy-MM-dd'
        )
        const response = await this.$axios.post('/warga/ikp', {
          ...this.payload,
          user_id: this.$auth?.user?.identifier
        })
        this.dataIkp = response.data.data
        this.dataIkp.ikp_code = this.dataIkp.ikp_code.toString()
        this.setDataDialog({
          description: 'Pembuatan IKP Baru telah berhasil dilakukan',
          labelButtonSubmit: 'Saya mengerti',
          showCancelButton: false
        })
        this.setIconPopup({ name: 'check-mark-circle', fill: '#069550' })
        this.resetFormIkp()
        this.isShowPopupInformationSuccess = true
      } catch {
        this.payload.deadline_at = new Date(this.payload.deadline_at)
        this.setAlert({
          variant: 'error',
          message: 'Pembuatan IKP Baru Gagal'
        })
        this.setDataDialog({
          description:
            'Maaf, pembuatan IKP baru tidak dapat disimpan saat ini karena terjadi kesalahan pada sistem. Silakan coba lagi untuk menyimpan IKP baru.',
          labelButtonSubmit: 'Coba Lagi',
          labelButtonCancel: 'Batalkan'
        })
        this.isShowPopupInformationError = true
      } finally {
        this.isShowPopupLoading = false
      }
    },
    setAlert (newAlert) {
      this.alert = { ...this.alert, ...newAlert }
    },
    setDataDialog (newDataDialog) {
      this.dataDialog = { ...this.dataDialog, ...newDataDialog }
    },
    setIconPopup (newIconPopup) {
      this.icon = { ...this.iconPopup, ...newIconPopup }
    }
  }
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
  @apply !h-[92.5px];
}

.form-input-ikp .form-input-text input {
  @apply !bg-white;
}

.form-input-ikp .jds-select .jds-input-text__input-wrapper {
  @apply !w-[528px] !bg-white;
}

.form-input-ikp .jds-select__options {
  @apply !max-h-[500px] !max-w-[528px] !overflow-y-auto;
  scrollbar-color: #e0e0e0 transparent;
  scrollbar-width: thin;
}
</style>
