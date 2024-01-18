<template>
  <BaseDialogFrame :name="dialogModal?.nameModal">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dialogModal?.title" />
      <BaseDialogDescription
        :description="dialogModal?.descriptionText"
        :sub-description="detailItemModal.title"
        class="p-6"
      />
      <BaseDialogFooterNew :name="`${dialogModal?.nameModal}`">
        <jds-button
          :label="dialogModal?.button.label"
          type="button"
          :variant="dialogModal?.button.variant"
          @click.prevent="confirmationButton()"
        />
      </BaseDialogFooterNew>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
export default {
  name: 'DialogConfirmationNew',
  props: {
    dialogModal: { type: Object, default: () => ({}) },
    detailItemModal: { type: Object, default: () => ({}) },
    path: { type: String, default: '' },
    httpMethod: { type: String, default: 'post' },
    params: { type: Object, default: () => ({}) }
  },
  methods: {
    async confirmationButton () {
      let isSuccess
      try {
        const response = await this.$axios[this.httpMethod](this?.path, { ...this.params })
        isSuccess = true
        this.$emit('success', this.dialogModal.nameModal, isSuccess, response)
      } catch (error) {
        isSuccess = false
        this.$emit('error', this.dialogModal.nameModal, isSuccess)
      }
    }
  }
}
</script>
