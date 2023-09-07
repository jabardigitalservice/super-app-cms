<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <div class="flex items-start px-6 pt-4 pb-10">
        <jds-icon :name="iconPopup.name" size="sm" :fill="iconPopup.fill" class="mr-3 mt-1" />
        <BaseDialogDescription :description="dataDialog.description" :sub-description="dataDialog.subDescription" />
      </div>
      <BaseDialogFooter :show-cancel-button="dataDialog.showCancelButton" :label-button="dataDialog.labelButton" @close="$emit('close')" @submit="$emit('submit',dataDialog)" />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
export default {
  name: 'DialogInformation',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    },
    iconPopup: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
