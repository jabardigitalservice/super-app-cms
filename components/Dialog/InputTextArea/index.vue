<template>
  <ValidationObserver v-slot="{ invalid }" ref="form">
    <BaseDialogFrame :name="dataDialog.name" @close="closePopup()">
      <BaseDialogPanel>
        <BaseDialogHeader :title="dataDialog.title" />
        <div class="px-6 pb-6">
          <BaseDialogDescription
            :description="dataDialog.description"
            :sub-description="dataDialog.subDescription"
          />
          <ValidationProvider
            v-slot="{ errors }"
            :name="dataDialog.labelTextArea"
            rules="required"
            tag="div"
            class="mt-4"
          >
            <BaseTextArea
              v-model="fieldTextArea"
              :data-cy="dataDialog.dataCy.fieldTextArea"
              :placeholder="dataDialog.placeholder"
              :label="dataDialog.labelTextArea"
              class="text-area"
              :error-message="errors[0]"
              maxlength="255"
            />
          </ValidationProvider>
          <p class="mt-1 text-xs text-gray-600">
            Tersisa {{ 255 - fieldTextArea.length }} Karakter
          </p>
        </div>
        <BaseDialogFooterNew
          :name="dataDialog.name"
          @cancel="closePopup(invalid)"
        >
          <template #button-right>
            <jds-button
              :data-cy="dataDialog.dataCy.buttonSubmit"
              :label="dataDialog.labelButtonSubmit"
              type="button"
              variant="primary"
              :disabled="invalid"
              @click="submitConfirmationComplaint()"
            />
          </template>
        </BaseDialogFooterNew>
      </BaseDialogPanel>
    </BaseDialogFrame>
  </ValidationObserver>
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
  data() {
    return {
      fieldTextArea: '',
    }
  },
  methods: {
    async submitConfirmationComplaint() {
      this.isSubmit = true
      const isDataValid = await this.$refs.form.validate()
      if (isDataValid) {
        this.$emit('submit', { ...this.dataDialog, note: this.fieldTextArea })
        this.closePopup()
      }
    },
    closePopup() {
      this.fieldTextArea = ''
      this.$refs.form.reset()
      this.$store.commit('modals/CLOSEALL')
    },
  },
}
</script>

<style scoped>
.text-area::v-deep .input-wrapper {
  @apply !h-[83px] !w-[462px] !bg-white;
}
</style>
