<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <BaseDialogDescription
        :description="dataDialog.description"
        :sub-description="dataDialog.subDescription"
        class="p-6"
      />
      <BaseDialogFooter
        :data-cy="dataDialog.dataCy?.footer"
        :label-button-submit="dataDialog.labelButtonSubmit"
        :label-button-cancel="dataDialog.labelButtonCancel"
        @close="$emit('close')"
        @submit="$emit('submit', dataDialog)"
      />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
export default {
  name: 'DialogConfirmation',
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
}
</script>
