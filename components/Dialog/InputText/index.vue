<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <div class="px-6 pb-6">
        <ValidationObserver ref="form">
          <form>
            <BaseDialogDescription
              :description="dataDialog.description"
              :sub-description="dataDialog.subDescription"
            />
            <div class="mt-4">
              <ValidationProvider
                v-slot="{ errors }"
                :name="dataDialog.labelInput"
                :rules="'required|' + dataDialog.dataRules"
              >
                <jds-input-text
                  v-model="fieldInputText"
                  :placeholder="dataDialog.placeholder"
                  :name="dataDialog.labelInput"
                  :label="dataDialog.labelInput"
                  :error-message="isInputDirty || isSubmit ? errors[0] : ''"
                  class="!w-full"
                />
              </ValidationProvider>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <BaseDialogFooter
        :label-button-submit="dataDialog.labelButtonSubmit"
        @close="closePopupHandle()"
        @submit="submitDialogInputTextHandle"
      />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'DialogInputTextArea',
  components: { ValidationProvider, ValidationObserver },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      fieldInputText: '',
      isInputDirty: false, // for check if user has typing something or no
      isSubmit: false
    }
  },
  watch: {
    fieldInputText () {
      if (this.fieldInputText.length > 0) {
        this.isInputDirty = true
      }
    }
  },
  methods: {
    async submitDialogInputTextHandle () {
      this.isSubmit = true
      const isDataValid = await this.$refs.form.validate()
      if (isDataValid) {
        this.$emit('submit', {
          subDescription: this.dataDialog.subDescription,
          valueText: this.fieldInputText
        })
        this.fieldInputText = ''
        this.isInputDirty = false
        this.isSubmit = false
      }
    },
    closePopupHandle () {
      this.isInputDirty = false
      this.isSubmit = false
      this.fieldInputText = ''
      this.$emit('close')
    }
  }
}
</script>
