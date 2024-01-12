<template>
  <BaseDialogFrame :name="`${nameModal}-${typeModal}`">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dialogModal.title" />
      <BaseDialogDescription
        :description="dialogModal.descriptionText"
        :sub-description="detailItemModal.title"
        class="p-6"
      />
      <BaseDialogFooterNew :name="`${nameModal}-${typeModal}`">
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
    nameModal: { type: String, required: true, default: '' },
    typeModal: { type: String, required: true, default: '' },
    dialogModal: { type: Object, default: () => ({}) },
    detailItemModal: { type: Object, default: () => ({}) },
    path: { type: String, required: true },
    httpMethod: { type: String, default: 'post' }
  },
  methods: {
    async confirmationButton () {
      try {
        await this.$axios[this.httpMethod](this.path)
        this.$emit('success', this.nameModal, true)
      } catch (error) {
        this.$emit('error', this.nameModal, false)
      }
    }
  }
}
</script>
