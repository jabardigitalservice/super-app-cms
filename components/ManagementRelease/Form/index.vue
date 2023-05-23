<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!w-[126px] !text-[14px] !font-bold"
        @click="goToBackHandle"
      >
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Batalkan
        </div>
      </jds-button>
      <div class="flex">
        <jds-button
          label="Simpan Versi Rilis"
          variant="primary"
          class="!bg-green-600 !font-lato !text-[14px] !font-bold"
          @click="showPublishedPopupHandle(fieldForm)"
        />
      </div>
    </div>
    <ValidationObserver ref="form">
      <form
        class="vee-validate-form grid grid-cols-2 gap-x-6 rounded-lg bg-white py-4 px-6"
      >
        <div>
          <ValidationProvider
            v-slot="{ errors }"
            name="Judul Pesan"
            rules="max:100|min:10|required"
          >
            <label>Judul Pesan</label>

            <input
              v-model="fieldForm.versiRilis"
              type="text"
              minlength="10"
              maxlength="100"
              placeholder="Masukkan judul pesan"
              :class="{ '!border !border-red-600': errors.length > 0 }"
            >
            <small class="text-red-600">{{ errors[0] }}</small>
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// import Editor from '@tinymce/tinymce-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
export default {
  name: 'ManagementReleaseForm',
  components: {
    // Editor,
    ArrowLeft,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      fieldForm: {
        versiRilis: ''
      }
    }
  }
}
</script>

<style>
.vee-validate-form__label,
.vee-validate-form__label-required {
  @apply mb-3 font-lato text-[15px] text-gray-800;
}

.vee-validate-form__label-required::before {
  content: "*";
  color: red;
  margin-right: 4px;
}

.vee-validate-form input[type="text"] {
  @apply h-[38px] w-full rounded-lg border border-gray-500 bg-gray-50 px-2 py-[11px] font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none;
}

.vee-validate-form .jds-popover__activator {
  @apply !w-full;
}

.vee-validate-form .jds-select {
  @apply !w-full;
}

.vee-validate-form .jds-input-text__input-wrapper {
  @apply !h-[40px] !w-full;
}
.vee-validate-form .jds-input-text {
  @apply !h-fit !w-full;
}

.vee-validate-form .jds-options__option-list-item--selected {
  display: none !important;
}

.vee-validate-form .tox-statusbar {
  display: none !important;
}
</style>
