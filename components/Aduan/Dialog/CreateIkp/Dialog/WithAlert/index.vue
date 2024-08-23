<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[510px]">
      <BaseDialogHeader title="Buat Instruksi Aduan Baru" />
      <div class="px-6 pb-4 pt-4">
        <jds-section-message
          show
          :variant="alert.variant"
          :dismissible="false"
          :message="alert.message"
          class="!h-[55px] !p-4"
        />
        <BaseDialogDescription
          :description="dataDialog.description"
          class="mt-4"
        />
      </div>

      <BaseDialogFooter
        :show-cancel-button="true"
        :label-button-submit="dataDialog.labelButtonSubmit"
        :label-button-cancel="dataDialog.labelButtonCancel"
        @submit="$emit('submit')"
        @close="$emit('close')"
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
    alert: {
      type: Object,
      default: () => ({}),
    },
    dataDialog: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
