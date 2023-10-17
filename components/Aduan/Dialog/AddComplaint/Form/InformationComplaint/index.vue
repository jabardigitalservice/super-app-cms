<template>
  <div>
    <ValidationObserver ref="formInformationComplaint">
      <form class="pt-4 pb-6 px-6">
        <h1 class="mb-2 font-bold text-base font-roboto">
          Informasi Aduan
        </h1>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="ID SP4N Lapor" rules="required">
            <jds-input-text
              v-model="payloadInformationComplaint.sp4n_id"
              :error-message="(isInputDirty || isSubmit) ? errors[0] : ''"
              name="ID SP4N Lapor"
              label="ID SP4N Lapor"
              placeholder="Masukkan ID SP4N Lapor"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Tanggal Laporan Masuk" rules="required">
            <label class="text-gray-800 text-[15px] mb-1">Tanggal Laporan Masuk</label><br>
            <date-picker
              v-model="payloadInformationComplaint.span_created_at"
              format="DD/MM/YYYY"
              :class="{'mx-datepicker--error': (isInputDirty || isSubmit) ? errors[0] : ''}"
              placeholder="Pilih Tanggal Laporan Masuk"
            /><br>
            <small class="text-red-600">{{ (isInputDirty || isSubmit) ? errors[0] : '' }}</small>
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Nama Pelapor" rules="required">
            <jds-input-text v-model="payloadInformationComplaint.user_name" name="Nama Pelapor" label="Nama Pelapor" placeholder="Masukkan Nama Pelapor" :error-message="(isInputDirty || isSubmit) ? errors[0] : ''" />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Judul Aduan" rules="required">
            <jds-input-text v-model="payloadInformationComplaint.title" name="Judul Aduan" label="Judul Aduan" placeholder="Masukkan Judul Aduan" :error-message="(isInputDirty || isSubmit) ? errors[0] : ''" />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Isi Laporan" rules="required">
            <label class="text-[15px] text-gray-800">Isi Laporan</label>
            <div class="mt-1">
              <textarea
                v-model="payloadInformationComplaint.description"
                maxlength="255"
                placeholder="Masukkan Isi Laporan"
                class="h-[83px] w-full resize-none rounded-lg bg-gray-50 border border-gray-400 py-[10px] px-2 font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none"
                :class="{ 'border border-red-600': (isInputDirty || isSubmit) ? errors[0] : '' }"
              />
            </div>
            <small class="text-red-600">{{ (isInputDirty || isSubmit) ? errors[0] : '' }}</small>
          </ValidationProvider>
          <p class="text-sm text-gray-600">
            Tersisa {{ 255-payloadInformationComplaint.description.length }} karakter
          </p>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { formatDate } from '~/utils'

export default {
  name: 'FormInformationComplaint',
  components: { ValidationObserver, ValidationProvider },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      payloadInformationComplaint: {
        sp4n_id: '',
        span_created_at: '',
        user_name: '',
        title: '',
        description: ''
      },
      isInputDirty: false,
      isSubmit: false
    }
  },
  methods: {
    async inputDataInformationComplaintHandle () {
      this.isSubmit = true
      const isValid = await this.$refs.formInformationComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormInformationComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataInformationComplaint', { ...this.payloadInformationComplaint, span_created_at: formatDate(this.payloadInformationComplaint.span_created_at || '', 'yyyy-MM-dd') })
        this.isInputDirty = false
        this.isSubmit = false
      }
    },
    clearFormInformationComplaintHandle () {
      this.payloadInformationComplaint = {
        sp4n_id: '',
        span_created_at: '',
        user_name: '',
        title: '',
        description: ''
      }
      this.isInputDirty = false
      this.isSubmit = false
    }
  }
}

</script>

<style scoped>
 .jds-input-text::v-deep {
    @apply w-full
  }

  .jds-input-text::v-deep.jds-input-text--error .jds-input-text__input-wrapper{
    @apply !border !border-red-400;
  }
  .jds-input-text::v-deep .jds-input-text__input-wrapper{
    @apply !bg-white border !border-gray-400 rounded-lg;
  }
  .jds-input-text::v-deep input{
    @apply placeholder:!text-sm
  }

  .mx-datepicker::v-deep .mx-input-wrapper {
    @apply !w-[256px]
  }

  .mx-datepicker::v-deep.mx-datepicker--error .mx-input-wrapper {
    @apply !bg-red-400
  }
  .mx-datepicker::v-deep .mx-input {
    @apply !bg-gray-50 placeholder:!text-sm placeholder:!text-gray-800 placeholder:!font-lato !border-gray-500
  }

  .mx-datepicker::v-deep.mx-datepicker--error .mx-input {
    @apply !border-red-600
  }

  .form-text-area textarea {
    @apply !h-[200px]
  }
</style>
