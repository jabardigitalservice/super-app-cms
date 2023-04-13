<template>
  <BaseDialog
    :title="detailDragAndDrop.titleModal"
    :show-popup="showPopup"
    label-button="Simpan"
    confirmation-type="verify"
    dialog-type="confirmation"
    :disabled-button="disabledButton"
    @submit="submitFile"
    @close="closeEdit"
  >
    <slot name="header" />
    <BaseDragAndDropFile
      ref="BaseDragAndDropFile"
      :detail-drag-and-drop="detailDragAndDrop"
      :auto-decree="true"
      @disabled-button="changeDisabeButton"
      @preview-file="previewFile"
    />
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
    },
    apiUpdateFile: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      disabledButton: true,
      decreeFile: ''
    }
  },
  methods: {
    changeDisabeButton (disabledButton) {
      this.disabledButton = disabledButton
    },
    closeEdit () {
      this.$emit('close')
    },
    previewFile () {
      this.$emit('preview-file')
    },
    async submitFile () {
      if (this.$store.state.dataImage.fileCorrect) {
        try {
          const response = await this.$axios.post('/file/upload', {
            ...this.$store.state.dataImage
          })
          if (response.data.status) {
            this.decreeFile = response.data.data.id
            this.updateFileDecreeSK()
          }
        } catch {
          this.$emit(
            'submit-edit-file',
            this.detailDragAndDrop.informationError
          )
        }
      }
    },
    async updateFileDecreeSK () {
      try {
        const response = await this.$axios.patch(this.apiUpdateFile, {
          decree: this.decreeFile
        })
        if (response.data.status) {
          this.$emit(
            'submit-edit-file',
            this.detailDragAndDrop.infromationSuccess
          )
          this.$refs.BaseDragAndDropFile.resetDataFile()
        }
      } catch (error) {
        this.$emit('submit-edit-file', this.detailDragAndDrop.informationError)
      }
    }
  }
}
</script>
