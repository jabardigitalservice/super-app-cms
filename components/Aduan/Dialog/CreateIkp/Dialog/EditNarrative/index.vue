<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <div class="px-6 py-6">
        <ValidationObserver ref="form">
          <ValidationProvider
            v-slot="{ errors }"
            :name="dataDialog.labelTextArea"
            rules="required"
          >
            <BaseTextArea
              v-model="fieldEditIKpNarrative"
              :label="dataDialog.labelTextArea"
              :name="dataDialog.nameTextArea"
              :placeholder="dataDialog.placeholder"
              :error-message="errors[0]"
              maxlength="500"
            />
          </ValidationProvider>
          <p class="text-xs text-gray-600">
            Tersisa {{ 500 - dataIkpNarrative.length }} Karakter
          </p>
        </ValidationObserver>
      </div>
      <BaseDialogFooter
        :label-button-submit="dataDialog.labelButtonSubmit"
        @close="closePopupHandle()"
        @submit="submitEditIkpNarrative"
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
  computed: {
    fieldEditIKpNarrative: {
      get () {
        return this.$store.state['edit-ikp-narrative'].fieldEditIkpNarrative
      },
      set (value) {
        this.$store.commit('edit-ikp-narrative/setFieldEditIkpNarrative', value)
      }
    },
    dataIkpNarrative () {
      return this.$store.state['create-ikp'].ikpNarrative
    }
  },
  methods: {
    async submitEditIkpNarrative () {
      this.isSubmit = true
      const isDataValid = await this.$refs.form.validate()
      if (isDataValid) {
        this.$store.commit('create-ikp/setIkpNarrative', this.fieldEditIKpNarrative)
        this.$emit('submit')
      }
    },
    closePopupHandle () {
      this.$store.commit('edit-ikp-narrative/setFieldEditIkpNarrative', this.dataIkpNarrative)
      this.$emit('close')
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
.form-text-area::v-deep .input-wrapper {
  @apply bg-white;
}
</style>
