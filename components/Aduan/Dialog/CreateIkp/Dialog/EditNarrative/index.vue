<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <div class="px-6 py-6">
        <ValidationObserver ref="form">
          <ValidationProvider v-slot="{errors}" :name="dataDialog.labelTextArea" rules="required">
            <BaseTextArea v-model="dataIkpNarrative" :label="dataDialog.labelTextArea" :name="dataDialog.nameTextArea" :placeholder="dataDialog.placeholder" :error-message="errors[0]" />
          </ValidationProvider>
          <p class="text-xs text-gray-600">
            Tersisa {{ 255 - dataIkpNarrative.length }} Karakter
          </p>
        </ValidationObserver>
      </div>
      <BaseDialogFooter :label-button-submit="dataDialog.labelButtonSubmit" @close="closePopupHandle()" @submit="submitEditIkpNarrative" />
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
    dataIkpNarrative: {
      get () {
        return this.$store.state['create-ikp'].ikpNarrative
      },
      set (value) {
        this.$store.commit('create-ikp/setIkpNarrative', value)
      }
    }
  },
  methods: {
    async submitEditIkpNarrative () {
      this.isSubmit = true
      const isDataValid = await this.$refs.form.validate()
      if (isDataValid) {
        this.$store.commit('create-ikp/setIkpNarrative', this.dataIkpNarrative)
        this.$emit('submit')
      }
    },
    closePopupHandle () {
      this.$emit('close')
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  .form-text-area::v-deep .input-wrapper{
    @apply bg-white
  }
</style>
