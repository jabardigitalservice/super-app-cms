<template>
  <BaseCustomPopup :title="detailDragAndDrop.titleModal" :show-popup="showPopup">
    <template #body-popup>
      <div class="px-6 mb-6 mt-4">
        <slot name="header" />
        <BaseDragAndDropFile
          ref="BaseDragAndDropFile"
          :detail-drag-and-drop="detailDragAndDrop"
          @disabled-button="changeDisabeButton"
          @get-decree-file="getResponseImage"
          @preview-file="previewFile"
        />
      </div>
    </template>

    <template #footer-popup>
      <div class="px-[24px] flex justify-end">
        <div class="mr-[16px]">
          <jds-button label="Batal" variant="secondary" class="!text-sm !font-lato !font-bold" @click="closeEdit" />
        </div>
        <jds-button label="Simpan" variant="primary" :class="disabledButton ? 'disabled:opacity-25' : ''" :disabled="disabledButton" @click="submitFile" />
      </div>
    </template>
  </BaseCustomPopup>
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
