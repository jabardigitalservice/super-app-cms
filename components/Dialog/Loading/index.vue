<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <div class="flex flex-col items-center justify-center h-[300px]">
        <jds-spinner class="mb-4" size="56" />
        <p class="text-green-700 text-2xl font-lato font-bold">
          Loading....
        </p>
      </div>
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
export default {
  name: 'DialogLoading',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>
