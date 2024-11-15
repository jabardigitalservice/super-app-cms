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
                <BaseInputText
                  v-model="fieldInputText"
                  type="text"
                  placeholder="Masukkan ID SP4N Lapor"
                  :error-message="errors[0]"
                  label="ID SP4N Lapor"
                  :maxlength="dataDialog.maxLength"
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
      default: false,
    },
    dataDialog: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    fieldInputText: {
      get() {
        return this.$store.state['popup-complaint'].fieldInput
      },
      set(value) {
        this.$store.commit('popup-complaint/setFieldInput', value)
      },
    },
  },
  methods: {
    async submitDialogInputTextHandle() {
      const isDataValid = await this.$refs.form.validate()
      if (isDataValid) {
        this.$emit('submit', {
          subDescription: this.dataDialog.subDescription,
          valueText: this.fieldInputText,
        })
        // this.fieldInputText = ''
      }
    },
    closePopupHandle() {
      this.$store.commit('popup-complaint/setFieldInput', '')
      this.$refs.form.reset()
      this.$emit('close')
    },
  },
}
</script>
