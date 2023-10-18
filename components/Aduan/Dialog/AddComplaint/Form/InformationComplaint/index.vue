<template>
  <div>
    <ValidationObserver ref="informationComplaintValidate">
      <form class="pt-4 pb-6 px-6">
        <h1 class="mb-2 font-bold text-base font-roboto">
          Informasi Aduan
        </h1>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="ID SP4N Lapor" rules="required|numeric">
            <BaseInputText
              v-model="dataInformationComplaint.sp4n_id.value"
              placeholder="Masukkan ID SP4N Lapor"
              :error-message="(dataInformationComplaint.sp4n_id.isInputDirty || isSubmit) ? errors[0] : ''"
              label="ID SP4N Lapor"
              maxlength="10"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Tanggal Laporan Masuk" rules="required">
            <label class="text-gray-800 text-[15px] mb-1">Tanggal Laporan Masuk</label><br>
            <date-picker
              v-model="dataInformationComplaint.span_created_at.value"
              format="DD/MM/YYYY"
              :class="{'mx-datepicker--error': (dataInformationComplaint.span_created_at.isInputDirty || isSubmit) ? errors[0] : ''}"
              placeholder="Pilih Tanggal Laporan Masuk"
            /><br>
            <small class="text-red-600">{{ (dataInformationComplaint.span_created_at.isInputDirty || isSubmit) ? errors[0] : '' }}</small>
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Nama Pelapor" rules="required">
            <jds-input-text
              v-model="dataInformationComplaint.user_name.value"
              name="Nama Pelapor"
              label="Nama Pelapor"
              placeholder="Masukkan Nama Pelapor"
              :error-message="(dataInformationComplaint.user_name.isInputDirty || isSubmit) ? errors[0] : ''"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Judul Aduan" rules="required">
            <jds-input-text
              v-model="dataInformationComplaint.title.value"
              name="Judul Aduan"
              label="Judul Aduan"
              placeholder="Masukkan Judul Aduan"
              :error-message="(dataInformationComplaint.title.isInputDirty || isSubmit) ? errors[0] : ''"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Isi Laporan" rules="required">
            <BaseTextArea
              v-model="dataInformationComplaint.description.value"
              placeholder="Masukkan Isi Laporan"
              label="Isi Laporan"
              name="Isi Laporan"
              maxlength="255"
              :error-message="(dataInformationComplaint.description.isInputDirty || isSubmit) ? errors[0] : ''"
            />
          </ValidationProvider>
          <p class="text-sm text-gray-600">
            Tersisa {{ 255-dataInformationComplaint.description.value.length }} karakter
          </p>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { formatDate } from '~/utils'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'FormInformationComplaint',
  components: { ValidationObserver, ValidationProvider },
  mixins: [popupAduanMasuk],
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataInformationComplaint: {
        sp4n_id: {
          value: '',
          isInputDirty: false
        },
        span_created_at: {
          value: '',
          isInputDirty: false
        },
        user_name: {
          value: '',
          isInputDirty: false
        },
        title: {
          value: '',
          isInputDirty: false
        },
        description: {
          value: '',
          isInputDirty: false
        }
      },
      isSubmit: false,
      spanId: '',
      payloadInformationComplaint: {}
    }
  },
  watch: {
    dataInformationComplaint: {
      deep: true,
      handler () {
        this.changeDataInformationComplaint('input')
      }
    }
  },
  methods: {
    changeDataInformationComplaint (typeChange) {
      Object.keys(this.dataInformationComplaint).forEach((item) => {
        switch (typeChange) {
          case 'input': // this type for change when user input data
            if (this.dataInformationComplaint[item].value) {
              this.dataInformationComplaint[item].isInputDirty = true
              this.payloadInformationComplaint[item] = this.dataInformationComplaint[item].value
            }
            break
          case 'clear': // this type for clear form
            this.dataInformationComplaint[item].isInputDirty = false
            this.dataInformationComplaint[item].value = ''
            break
          default:
            this.dataInformationComplaint[item].isInputDirty = false
        }
      })
    },
    async inputDataInformationComplaintHandle () {
      this.isSubmit = true
      const isValid = await this.$refs.informationComplaintValidate.validate()
      this.isValidFormInformationComplaint = isValid
      this.$store.commit('add-complaint/setIsValidFormInformationComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataInformationComplaint', { ...this.payloadInformationComplaint, span_created_at: formatDate(this.payloadInformationComplaint.span_created_at || '', 'yyyy-MM-dd') })
        this.changeDataInformationComplaint('submit')
        this.isSubmit = false
      }
    },
    clearFormInformationComplaintHandle () {
      this.changeDataInformationComplaint('clear')
      this.payloadInformationComplaint = { }
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

  .form-text-area::v-deep .input-wrapper {
    @apply !h-[83px]
  }
  .form-input-text::v-deep input {
    @apply !bg-white !border-gray-400
  }

  .form-input-text::v-deep .form-input-text--error {
    @apply !border !border-red-600
  }
</style>
