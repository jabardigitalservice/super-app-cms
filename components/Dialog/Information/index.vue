<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <div class="flex items-start items-center px-6 pt-4 pb-10">
        <jds-icon
          :name="iconPopup.name"
          size="sm"
          :fill="iconPopup.fill"
          class="mr-3 mt-1"
          :class="{ 'mt-0': !dataDialog.subDescription }"
        />
        <BaseDialogDescription
          :description="dataDialog.description"
          :sub-description="dataDialog.subDescription"
        />
      </div>
      <BaseDialogFooter
        :data-cy="dataDialog.dataCy?.footer"
        :show-cancel-button="dataDialog.showCancelButton"
        :label-button-submit="dataDialog.labelButtonSubmit"
        @close="$emit('close')"
        @submit="$emit('submit', dataDialog)"
      />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
export default {
  name: 'DialogInformation',
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    dataDialog: {
      type: Object,
      default: () => ({}),
    },
    iconPopup: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
