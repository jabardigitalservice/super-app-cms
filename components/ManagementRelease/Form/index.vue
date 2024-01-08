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
          :label="
            typeForm === 'create'
              ? 'Simpan Versi Rilis'
              : 'Simpan Perubahan Versi Rilis'
          "
          variant="primary"
          class="!bg-green-600 !font-lato !text-[14px] !font-bold"
          @click="showSaveData"
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
                v-model="formField.majorVersion"
                placeholder="Major Version Number"
                class="mt-1"
                :error-message="errors[0]"
              />
            </ValidationProvider>

            <span class="mt-6 text-center text-base font-bold">.</span>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required|numeric"
              name="Minor Version Number"
            >
              <jds-input-text
                v-model="formField.minorVersion"
                placeholder="Minor Version Number"
                class="mt-1"
                :error-message="errors[0]"
              />
            </ValidationProvider>

            <span class="mt-6 text-center text-base font-bold">.</span>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required|numeric"
              name="Patch Number"
            >
              <jds-input-text
                v-model="formField.patchNumber"
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
                v-model="formField.content"
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
              {{
                isExceedCharacterLimit
                  ? `Max Karakter Hanya ${characterLimit}`
                  : `Tersisa ${characterLimit - countCharacter} Karakter`
              }}
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
                v-model="formField.forceUpdate"
                class="fix-6 !gap-x-10"
                :items="[
                  { label: 'Ya, tampilkan', val: 'Ya' },
                  { label: 'Tidak perlu ditampilkan', val: 'Tidak' },
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

    <BasePopupLoading :show-popup="isLoading" />
    <BasePopup
      :show-popup="showPopUp"
      @submit="showConfirmationSubmitFormHandle"
      @close="closeFormPopupHandle"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import popup from '~/mixins/manajemen-release'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import {
  savedConfirmationPopup,
  savedInformationPopup,
  editConfirmationPopup,
  editInformationPopup
} from '~/constant/manajemen-release'
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
    },
    idVersion: {
      type: String,
      default: ''
    },
    fieldForm: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      countCharacter: 0,
      characterLimit: 800,
      isExceedCharacterLimit: false,
      isPublished: false,
      isLoading: false,
      savedConfirmationPopup,
      savedInformationPopup,
      editConfirmationPopup,
      editInformationPopup,
      isInformationPopup: false
    }
  },
  computed: {
    formField: {
      get () {
        return {
          ...this.fieldForm
        }
      },
      set (value) {
        this.$emit('update:fieldForm', value)
      }
    }
  },

  methods: {
    handleInputTinyMce () {
      const content = this.formField.content
      if (content.length > this.characterLimit) {
        this.isExceedCharacterLimit = true
      } else {
        this.isExceedCharacterLimit = false
      }
      this.updateCharacterCountTinyMce(content)
    },
    updateCharacterCountTinyMce (content) {
      this.countCharacter = content.length
    },
    showSaveData () {
      this.$store.commit('dialog/clearState')

      this.$emit('update:fieldForm', this.formField)
      this.formField.fullVersion = this.getFullVersion()
      const confirmationPopup =
        this.typeForm === 'create'
          ? this.savedConfirmationPopup
          : this.editConfirmationPopup

      this.confirmationPopupHandle(
        confirmationPopup,
        this.formField,
        this.formField.fullVersion
      )

      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopUp = true
    },
    async showConfirmationSubmitFormHandle () {
      this.$store.commit('dialog/clearState')
      this.showPopup = false
      this.isLoading = true

      if (await this.validHandle()) {
        this.submitFormHandle()
      } else {
        this.isLoading = false
        this.dataPopup = {
          title: 'Data Belum Benar',
          buttonLeft: this.getInformationPopupByTypeForm().buttonLeft
        }
        this.showPopUp = true
        this.showInformationPopupHandle(this.getInformationPopupByTypeForm(), true)
      }
    },
    async submitFormHandle () {
      const endpoint =
        this.typeForm === 'create'
          ? '/release/create'
          : `/release/edit/${this.idVersion}`

      this.showPopUp = false
      this.popupMessage = {}
      this.popupMessage.titlePopup = this.formField.fullVersion

      try {
        const response = await this.$axios[this.typeForm === 'create' ? 'post' : 'put'](endpoint, {
          ...this.formField
        })

        this.dataDetail.id = response.data.data.id
        this.isInformationPopup = true
        this.showPopUp = true
        this.isLoading = false
      } catch (error) {
        this.showPopUp = true
        this.isError = true
        this.isLoading = false
      }

      this.showInformationPopupHandle(this.getInformationPopupByTypeForm(), this.isError)
    },
    closeFormPopupHandle () {
      this.$store.commit('dialog/clearState')
      this.showPopUp = false
      if (this.isInformationPopup) {
        this.$router.push('/management-release')
      }
    },
    async validHandle () {
      const isDataValid = await this.$refs.form.validate()
      if (!isDataValid) {
        return false
      }
      return true
    },
    showInformationPopupHandle (informationPopup, warning = false) {
      this.dataPopup = {
        title: informationPopup.title,
        buttonLeft: informationPopup.buttonLeft
      }
      this.informationPopupHandle(informationPopup, this.isError, warning)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },
    getInformationPopupByTypeForm () {
      return this.typeForm === 'create'
        ? this.savedInformationPopup
        : this.editInformationPopup
    },
    getFullVersion () {
      return this.formField.majorVersion && this.formField.minorVersion && this.formField.patchNumber
        ? `${this.formField.majorVersion}.${this.formField.minorVersion}.${this.formField.patchNumber}`
        : ''
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
