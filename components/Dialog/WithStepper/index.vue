<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[640px]">
      <BaseDialogHeader :title="title" />
      <ProgressStepper class="pt-4 px-6" :index-current-active="indexCurrentActive" />
      <slot name="form-complaint" />
      <slot name="footer" />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import ProgressStepper from '~/components/Dialog/WithStepper/ProgressStepper'
export default {
  name: 'DialogWithStepper',
  components: { ProgressStepper },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    indexCurrentActive: {
      type: Number,
      default: 0
    }
  }
}
</script>
