<template>
  <BaseDialogFrame :name="dialogModal?.nameModal">
    <BaseDialogPanel class="w-[510px]">
      <BaseDialogHeader :title="dialogModal?.title" />
      <BaseDialogDescription
        :description="dialogModal?.descriptionText"
        :sub-description="detailItemModal.title"
        class="p-6"
      />
      <BaseDialogFooterNew
        :name="`${dialogModal?.nameModal}`"
        @cancel="$emit('cancel')"
      >
        <template #button-right>
          <jds-button
            :label="dialogModal?.button.label"
            type="button"
            :variant="dialogModal?.button.variant"
            @click="$emit('confirmation-button')"
          />
        </template>

        <slot name="footer-custom" />
      </BaseDialogFooterNew>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
export default {
  name: 'DialogConfirmationBasic',
  props: {
    dialogModal: { type: Object, default: () => ({}) },
    detailItemModal: { type: Object, default: () => ({}) },
  },
}
</script>
