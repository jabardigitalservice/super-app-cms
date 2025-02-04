<template>
  <div>
    <BaseDialogFrame :name="nameModal">
      <BaseDialogPanel>
        <BaseDialogHeader :title="dataDialog.title" />
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form>
            <div class="px-6 pb-3">
              <BaseDialogDescription
                :description="dataDialog.description"
                :sub-description="dataDialog.subDescription"
              />
              <div class="mt-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="ID SP4N Lapor"
                  rules="required|numeric"
                >
                  <BaseInputText
                    v-model="payload.sp4n_id"
                    type="text"
                    placeholder="Masukkan ID SP4N Lapor"
                    :error-message="errors[0]"
                    label="ID SP4N Lapor"
                    maxlength="10"
                  />
                </ValidationProvider>
              </div>
              <div class="mt-4">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Tanggal Input SP4N Lapor"
                  rules="required"
                >
                  <label class="mb-1 text-[15px] text-gray-800"
                    >Tanggal Input ID SP4N Lapor</label
                  ><br />
                  <date-picker
                    v-model="payload.sp4n_created_at"
                    format="DD/MM/YYYY"
                    class="!w-full"
                    :class="{ 'mx-datepicker--error': errors[0] }"
                    placeholder="Pilih Tanggal"
                    name="Tanggal Input ID SP4N Lapor"
                    :disabled-date="disabledDate"
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
              </div>
            </div>
            <BaseDialogFooterNew :name="nameModal" @cancel="clearForm()">
              <template #button-right>
                <jds-button
                  :label="dataDialog.labelButtonSubmit"
                  type="button"
                  variant="primary"
                  :disabled="invalid"
                  @click.prevent="showConfirmationDialog()"
                />
              </template>
            </BaseDialogFooterNew>
          </form>
        </ValidationObserver>
      </BaseDialogPanel>
    </BaseDialogFrame>
    <DialogConfirmationBasic
      :dialog-modal="dialogConfirmation"
      @confirmation-button="submitIdSpan()"
      @cancel="backToForm()"
    />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { formatDate } from '~/utils'

export default {
  name: 'DialogInputTextArea',
  components: { ValidationProvider, ValidationObserver },
  props: {
    dataDialog: {
      type: Object,
      default: () => ({}),
    },
    nameModal: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialogConfirmation: {},
    }
  },
  computed: {
    payload: {
      get() {
        return { ...this.$store.state['id-span'].payload }
      },
      set(value) {
        this.$store.commit('id-span/setPayload', value)
      },
    },
  },
  methods: {
    disabledDate: function (date) {
      const currentDate = new Date()
      const oneMonthAgo = new Date(currentDate)
      oneMonthAgo.setMonth(currentDate.getMonth() - 1) // Kurangi 1 bulan
      oneMonthAgo.setDate(currentDate.getDate()) // tanggal se
      return date < oneMonthAgo || date > currentDate
    },
    clearDate() {
      this.payload.sp4n_created_at = ''
    },
    async showConfirmationDialog() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.$store.commit('modals/CLOSEALL')
        // dialog confirmation add id span
        const dataDialog = {
          title: 'Tambahkan ID SP4N Lapor',
          nameModal: `${this.nameModal}Confirmation`,
          descriptionText:
            'Apakah anda yakin ingin menambahkan ID SP4N Lapor tersebut?',
          button: {
            label: 'Ya, lanjutkan',
            variant: 'primary',
          },
        }

        // dialog confirmation edit id span
        if (this.nameModal === 'formEditIdSpan') {
          dataDialog.title = 'Ubah ID SP4N Lapor'
          dataDialog.descriptionText =
            'Apakah anda yakin ingin mengubah ID SP4N Lapor tersebut?'
        }
        this.dialogConfirmation = dataDialog
        this.$store.commit('modals/OPEN', dataDialog.nameModal)
        this.$refs.form.reset()
      }
    },
    submitIdSpan() {
      const spanCreatedDate = formatDate(
        this.payload.sp4n_created_at,
        'yyyy-MM-dd'
      )
      const [year, month, day] = spanCreatedDate.split('-')
      const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
      this.payload.sp4n_created_at = date
      this.$emit('submit', {
        subDescription: this.dataDialog.subDescription,
        payload: this.payload,
      })

      this.clearForm()
    },
    backToForm() {
      this.$store.commit('modals/CLOSEALL')
      this.$store.commit('modals/OPEN', this.nameModal)
    },
    clearForm() {
      this.$store.commit('id-span/setPayload', {
        sp4n_created_at: '',
        sp4n_id: '',
      })
    },
  },
}
</script>

<style scoped>
.form-input-text::v-deep input {
  @apply !bg-white;
}
.mx-datepicker::v-deep.mx-datepicker--error .mx-input-wrapper {
  @apply !bg-red-400;
}

.mx-datepicker::v-deep .mx-input {
  @apply !border-gray-500 !bg-white placeholder:!font-lato placeholder:!text-sm placeholder:!text-gray-500;
}

.mx-datepicker::v-deep.mx-datepicker--error .mx-input {
  @apply !border-red-600;
}
</style>
