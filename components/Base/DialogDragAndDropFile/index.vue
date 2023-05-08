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
      @disabled-button="changeDisabeButton"
      @get-decree-file="getResponseImage"
      @preview-file="previewFile"
    />
    <slot name="footer" />
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
      await this.$refs.BaseDragAndDropFile.uploadFile()
    },
    getResponseImage (responseImage) {
      if (responseImage === 'error') {
        this.$emit('submit-edit-file', this.detailDragAndDrop.informationError)
      } else {
        this.decreeFile = responseImage.id
        this.updateFileDecree()
      }
    },
    async updateFileDecree () {
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
          this.decreeFile = ''
        }
      } catch (error) {
        this.$emit('submit-edit-file', this.detailDragAndDrop.informationError)
      }
    }
  }
}
</script>
