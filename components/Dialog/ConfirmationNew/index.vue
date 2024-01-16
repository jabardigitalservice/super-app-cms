<template>
  <BaseDialogFrame :name="dialogModal?.nameModal">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dialogModal.title" />
      <BaseDialogDescription
        :description="dialogModal.descriptionText"
        :sub-description="detailItemModal.title"
        class="p-6"
      />
      <BaseDialogFooterNew :name="`${dialogModal.nameModal}`">
        <jds-button
          :label="dialogModal.button.label"
          type="button"
          :variant="dialogModal.button.variant"
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
    path: { type: String, required: true },
    httpMethod: { type: String, default: 'post' }
  },
  methods: {
    async confirmationButton () {
      try {
        await this.$axios[this.httpMethod](this.path)
        this.$emit('success', this.dialogModal.nameModal, true)
      } catch (error) {
        this.$emit('error', this.dialogModal.nameModal, false)
      }
    }
  }
}
</script>
