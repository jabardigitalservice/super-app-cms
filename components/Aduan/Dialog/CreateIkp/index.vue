<template>
  <div>
    <BaseDialog :show-popup="isShowPopupCreateIkp">
      <BaseDialogPanel class="max-h-[720px] w-[600px] sm:h-[calc(100vh-50px)]">
        <BaseDialogHeader title="Buat Instruksi Aduan Baru" />
        <div
          class="form-input-ikp px-6 pt-3 pb-5"
          :class="{ '!pr-0': !isTruncate }"
        >
          <div
            class="w-full overflow-y-auto rounded-lg border border-gray-300 p-3"
          >
            <AlertInformation message="Pembuatan Instruksi Aduan baru." />
            <CardIkpNarrative class="mt-5" />
            <ValidationObserver ref="form">
              <form>
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
                    class="max-w-full py-3"
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
                      v-model="payload.opd_id"
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
                    name="Pemda Penanggungjawab"
                    class="pb-3"
                    tag="div"
                  >
                    <jds-select
                      v-model="payload.opd_pemprov_id"
                      name="Pemda Penanggungjawab"
                      label="Pemda Penanggungjawab"
                      placeholder="Pilih Pemda Penanggungjawab"
                      helper-text="Kota/kabupaten penanggungjawab yang bertugas untuk menindaklanjuti aduan"
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
                    v-model="payload.opd_id"
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
        </div>
        <BaseDialogFooterNew>
          <div class="mr-4">
            <jds-button
              label="Kembali"
              type="button"
              variant="secondary"
              @click="closePopupCreateIkp()"
            />
          </div>

          <jds-button
            label="Lanjutkan"
            type="button"
            variant="primary"
            @click="showPopupConfirmation"
          />
        </BaseDialogFooterNew>
      </BaseDialogPanel>
    </BaseDialog>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'
import AlertInformation from '~/components/Aduan/Alert/Information'
import CardIkpNarrative from '~/components/Aduan/Dialog/CreateIkp/CardIkpNarrative'
import { formatDate } from '~/utils'
import { typeAduan } from '~/constant/aduan-masuk'

export default {
  name: 'DialogCreateIkp',
  components: {
    AlertInformation,
    CardIkpNarrative,
    ValidationObserver,
    ValidationProvider,
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

  computed: {
    listAuthority() {
      return this.$store.state['utilities-complaint'].listAuthorities.map(
        (item) => {
          return { value: item.id, label: item.name }
        }
      )
    },
    listDisposition() {
      return this.$store.state['utilities-complaint'].listDisposition.map(
        (item) => {
          return { label: item.name, value: item.id }
        }
      )
    },
    listGovResponsible() {
      return this.$store.state['utilities-complaint'].listGovResponsible.map(
        (item) => {
          return { label: item.name, value: item.id }
        }
      )
    },
    ...mapGetters('create-ikp', {
      isShowPopupCreateIkp: 'getIsShowPopup',
      ikpNarrative: 'getIkpNarrative',
    }),
    ...mapGetters('followup-complaint', {
      complaintType: 'getComplaintType',
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
    payload: {
      deep: true,
      handler() {
        if (this.payload.description) {
          this.descriptionLength =
            this.descriptionLength - this.payload.description.length
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch('utilities-complaint/getDataAuthorities')
    this.$store.dispatch(
      'utilities-complaint/getDataDispositions',
      this.payload.coverage_of_affairs
    )
    this.$store.dispatch('utilities-complaint/getDataGovResponsible')
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
      this.$store.commit('followup-complaint/setIsCreateIkp', false)
    },
    disabledDeadlineDate: function (date) {
      return date <= new Date()
    },
    truncateIKpnarrative() {
      this.isTruncate = true
    },
    resetFormIkp() {
      this.payload = {
        description: '',
        indicator_value: '',
        indicator_unit: '',
      }
      this.instructionNote = ''
      this.$store.commit('create-ikp/setIsTruncate', false)
      this.$refs.form.reset()
    },
    async showPopupConfirmation() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.payload = {
          ...this.payload,
          indicator_value: parseInt(this.payload.indicator_value),
          narrative: this.ikpNarrative,
          deadline_at: formatDate(this.payload.deadline_at, 'yyyy-MM-dd'),
          description: this.instructionNote,
        }
        this.$store.commit('create-ikp/setPayload', this.payload)
        this.$store.commit('create-ikp/setIsShowPopup', false)
        this.$store.commit('followup-complaint/setIsCreateIkp', true)
        this.$emit('submit')
        this.$refs.form.reset()
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
  @apply max-h-[600px] w-full overflow-y-auto sm:h-[calc(100vh-180px)];
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
  @apply !w-[510px] !bg-gray-200;
}

.form-input-ikp
  .jds-select.jds-select--disabled
  .jds-input-text__input-wrapper {
  @apply !w-[510px] !bg-gray-200;
}

.form-input-ikp
  .jds-select.jds-select--disabled
  .jds-input-text__input-wrapper
  input {
  @apply !max-w-[510px] !bg-gray-200 !text-gray-600;
}

.form-input-ikp .jds-select .jds-input-text__input-wrapper {
  @apply !max-w-full !bg-white;
}

.form-input-ikp .jds-select__options {
  @apply !max-h-[500px] !max-w-full !overflow-y-auto;
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
