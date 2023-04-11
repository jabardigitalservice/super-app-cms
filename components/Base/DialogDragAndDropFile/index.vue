<template>
  <BaseDialog
    :title="detailDragAndDrop.titleModal"
    :show-popup="showPopup"
    label-button="Simpan"
    confirmation-type="verify"
    dialog-type="confirmation"
    :disabled-button="disabledButton"
    @close="closeEdit"
  >
    <BaseDragAndDropFile :detail-drag-and-drop="detailDragAndDrop" />
  </BaseDialog>
</template>

<script>
export default {
  name: 'BaseDialogDragAndDropFile',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },

    detailDragAndDrop: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      disabledButton: true
    }
  },
  methods: {
    closeEdit () {
      this.$emit('close')
    }
  }
}
</script>
