<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <div class="px-6 pb-6">
        <ValidationObserver ref="form">
          <form>
            <BaseDialogDescription :description="dataDialog.description" :sub-description="dataDialog.subDescription" />
            <div class="mt-4">
              <ValidationProvider v-slot="{errors}" :name="dataDialog.labelTextArea" rules="required">
                <label class="text-[15px] text-gray-800 font-lato">{{ dataDialog.labelTextArea }}</label><br>
                <div class="mt-1">
                  <textarea
                    v-model="fieldTextArea"
                    :class="{ 'border border-red-600': (isInputDirty || isSubmit) && errors[0] }"
                    :placeholder="dataDialog.placeholder"
                    maxlength="255"
                    class="w-[462px] h-[83px] border border-gray-300 rounded-lg focus:outline-none px-2 py-[10px] placeholder:text-[14px] placeholder:font-lato"
                  />
                </div>

                <small v-show="(isInputDirty || isSubmit) && errors[0]" class="text-red-600">{{ errors[0] }}</small>
              </ValidationProvider>
              <p class="text-xs text-gray-600">
                Tersisa {{ 255 - fieldTextArea.length }} Karakter
              </p>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <BaseDialogFooter :label-button-submit=" dataDialog.labelButtonSubmit" @close="closePopupHandle()" @submit="submitConfirmationFaileComplaintdHandle()" />
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
      fieldTextArea: '',
      isInputDirty: false, // for check if user has typing something or no
      isSubmit: false
    }
  },
  watch: {
    fieldTextArea () {
      if (this.fieldTextArea.length > 0) {
        this.isInputDirty = true
      }
    }
  },
  methods: {
    async submitConfirmationFaileComplaintdHandle () {
      this.isSubmit = true
      const isDataValid = await this.$refs.form.validate()
      if (isDataValid) {
        this.$emit('submit', { ...this.dataDialog, note: this.fieldTextArea })
        this.fieldTextArea = ''
        this.isInputDirty = false
        this.isSubmit = false
      }
    },
    closePopupHandle () {
      this.isInputDirty = false
      this.isSubmit = false
      this.fieldTextArea = ''
      this.$emit('close')
    }
  }
}
</script>
