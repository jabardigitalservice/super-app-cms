<template>
  <div>
    <ValidationObserver ref="informationComplaintValidate">
      <form class="px-6 pt-4 pb-6">
        <h1 class="mb-2 font-roboto text-base font-bold">Informasi Aduan</h1>
        <ValidationProvider
          v-slot="{ errors }"
          name="ID SP4N Lapor"
          class="mb-4"
          rules="required|numeric"
          tag="div"
        >
          <BaseInputText
            v-model="payloadInformationComplaint.sp4n_id"
            type="text"
            placeholder="Masukkan ID SP4N Lapor"
            :error-message="errors[0]"
            label="ID SP4N Lapor"
            maxlength="10"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Tanggal Laporan Masuk"
          rules="required"
          class="mb-4"
          tag="div"
        >
          <label class="mb-1 text-[15px] text-gray-800"
            >Tanggal Laporan Masuk</label
          ><br />
          <date-picker
            v-model="payloadInformationComplaint.span_created_at"
            format="DD/MM/YYYY"
            :class="{
              'mx-datepicker--error': errors[0],
            }"
            placeholder="Pilih Tanggal Laporan Masuk"
          /><br />
          <small class="text-red-600">{{ errors[0] }}</small>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Nama Pelapor"
          rules="required"
          class="mb-4"
          tag="div"
        >
          <jds-input-text
            v-model="payloadInformationComplaint.user_name"
            name="Nama Pelapor"
            label="Nama Pelapor"
            placeholder="Masukkan Nama Pelapor"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Judul Aduan"
          rules="required"
          class="mb-4"
          tag="div"
        >
          <jds-input-text
            v-model="payloadInformationComplaint.title"
            name="Judul Aduan"
            label="Judul Aduan"
            placeholder="Masukkan Judul Aduan"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Isi Laporan"
          rules="required"
          class="mb-4"
          tag="div"
        >
          <BaseTextArea
            v-model="payloadInformationComplaint.description"
            placeholder="Masukkan Isi Laporan"
            label="Isi Laporan"
            name="Isi Laporan"
            maxlength="255"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <p class="text-sm text-gray-600">
          Tersisa
          {{ 255 - payloadInformationComplaint.description.length }} karakter
        </p>
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
      default: false,
    },
  },
  data() {
    return {
      payloadInformationComplaint: {
        sp4n_id: '',
        span_created_at: '',
        user_name: '',
        title: '',
        description: '',
      },
      spanId: '',
    }
  },
  methods: {
    async inputDataInformationComplaintHandle() {
      const isValid = await this.$refs.informationComplaintValidate.validate()
      this.isValidFormInformationComplaint = isValid
      this.$store.commit(
        'add-complaint/setIsValidFormInformationComplaint',
        isValid
      )
      if (isValid) {
        this.$store.commit('add-complaint/setDataInformationComplaint', {
          ...this.payloadInformationComplaint,
          span_created_at: formatDate(
            this.payloadInformationComplaint.span_created_at || '',
            'yyyy-MM-dd'
          ),
        })
        this.isSubmit = false
      }
    },
    clearFormInformationComplaintHandle() {
      this.payloadInformationComplaint = {
        sp4n_id: '',
        span_created_at: '',
        user_name: '',
        title: '',
        description: '',
      }
      this.isSubmit = false
      this.$refs.informationComplaintValidate.reset()
    },
  },
}
</script>

<style scoped>
.jds-input-text::v-deep {
  @apply w-full;
}

.jds-input-text::v-deep.jds-input-text--error .jds-input-text__input-wrapper {
  @apply !border !border-red-400;
}
.jds-input-text::v-deep .jds-input-text__input-wrapper {
  @apply rounded-lg border !border-gray-400 !bg-white;
}
.jds-input-text::v-deep input {
  @apply placeholder:!text-sm;
}

.mx-datepicker::v-deep .mx-input-wrapper {
  @apply !w-[256px];
}

.mx-datepicker::v-deep.mx-datepicker--error .mx-input-wrapper {
  @apply !bg-red-400;
}
.mx-datepicker::v-deep .mx-input {
  @apply !border-gray-500 !bg-gray-50 placeholder:!font-lato placeholder:!text-sm placeholder:!text-gray-800;
}

.mx-datepicker::v-deep.mx-datepicker--error .mx-input {
  @apply !border-red-600;
}

.form-text-area::v-deep .input-wrapper {
  @apply !h-[83px];
}
.form-input-text::v-deep input {
  @apply !border-gray-400 !bg-white;
}

.form-input-text::v-deep .form-input-text--error {
  @apply !border !border-red-600;
}
</style>
