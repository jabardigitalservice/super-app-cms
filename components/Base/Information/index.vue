<template>
  <div class="flex">
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
</template>

<script>
export default {
  name: 'BaseInformation',
  props: {
    iconPopup: {
      type: Object,
      default: () => ({})
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
