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
          :label="typeForm === 'create' ? 'Simpan Versi Rilis' : 'Simpan Perubahan Versi Rilis'"
          variant="primary"
          class="!bg-green-600 !font-lato !text-[14px] !font-bold"
        />
      </div>
    </div>

    <ValidationObserver ref="form">
      <form
        class="vee-validate-form grid grid-cols-2 gap-x-6 rounded-lg bg-white py-4 px-6"
      >
        <div>
          <label class="vee-validate-form__label-required">Masukan versi rilis terbaru
            <span class="text-sm italic text-blue-400">(Versi terakhir saat ini 3.1.1)
            </span></label>
          <div class="mt-2 flex flex-row gap-x-2.5">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|numeric"
              name="Major Version Number"
            >
              <jds-input-text
                v-model="fieldForm.majorVersion"
                placeholder="Major Version Number"
                class="mt-1"
                :error-message="errors[0]"
              />
            </ValidationProvider>

            <span class="text-center text-base font-bold mt-6">.</span>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required|numeric"
              name="Minor Version Number"
            >
              <jds-input-text
                v-model="fieldForm.minorVersion"
                placeholder="Minor Version Number"
                class="mt-1"
                :error-message="errors[0]"
              />
            </ValidationProvider>

            <span class="text-center text-base font-bold mt-6">.</span>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required|numeric"
              name="Patch Number"
            >
              <jds-input-text
                v-model="fieldForm.patchNumber"
                placeholder="Patch Number"
                class="mt-1"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
        </div>

        <div class="col-span-2 mt-5">
          <ValidationProvider
            v-slot="{ errors }"
            name="Pembaruan versi"
            rules="required"
          >
            <label class="vee-validate-form__label-required">Pembaruan apa saja yang ada diversi ini?</label>
            <div class="mt-2">
              <Editor
                v-model="fieldForm.content"
                :api-key="`${$config.tinymceApiKey}`"
                :init="{
                  height: 350,
                  forced_root_block: '',
                  menubar: false,
                  selector: 'textarea',
                  maxlength: 100,
                  branding: false,
                  resize: false,
                  paste_as_text: true,
                  placeholder: 'Masukkan disini',
                  plugins: [
                    'wordcount',
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help',
                  ],
                  toolbar:
                    'bold italic underline backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | help',
                }"
                @input="handleInputTinyMce"
              />
            </div>

            <p :class="isExceedCharacterLimit ? 'text-red-500' : ''">
              {{ isExceedCharacterLimit ? `Max Karakter Hanya ${characterLimit}` : `Tersisa ${ characterLimit - countCharacter } Karakter` }}
            </p>
            <small class="text-red-600">{{ errors[0] }}</small>
          </ValidationProvider>
        </div>

        <div class="col-span-2 mt-5">
          <ValidationProvider
            v-slot="{ errors }"
            name="Tampilan force update"
            rules="requiredSelectForm"
          >
            <label class="vee-validate-form__label-required">Tampilan force update</label>
            <div class="mt-2">
              <jds-radio-button-group
                class="fix-6 !gap-x-10"
                :items="[
                  { label: 'Ya, tampilkan', val: true },
                  { label: 'Tidak perlu ditampilkan', val: false },
                ]"
                value-key="val"
                placeholder-key="label"
                name="radio-button-group"
                orientation="horizontal"
              />
            </div>

            <small class="text-red-600">{{ errors[0] }}</small>
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import popup from '~/mixins/manajemen-release'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
export default {
  name: 'ManagementReleaseForm',
  components: {
    Editor,
    ArrowLeft,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [popup],
  props: {
    typeForm: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fieldForm: {
        majorVersion: '',
        minorVersion: '',
        content: ''
      },
      countCharacter: 0,
      characterLimit: 800,
      isExceedCharacterLimit: false
    }
  },
  computed: {
    characterCount () {
      return this.content.length
    }
  },
  methods: {
    handleInputTinyMce () {
      const content = this.fieldForm.content
      if (content.length > this.characterLimit) {
        this.isExceedCharacterLimit = true
      } else {
        this.isExceedCharacterLimit = false
      }
      this.updateCharacterCountTinyMce(content)
    },
    updateCharacterCountTinyMce (content) {
      this.countCharacter = content.length
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

.jds-radio-button-group__list {
  @apply !gap-x-10;
}
</style>
