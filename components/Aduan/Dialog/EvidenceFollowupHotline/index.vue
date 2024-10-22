<template>
  <div>
    <BaseDialogFrame :name="nameModal" @close="closePopup()">
      <BaseDialogPanel class="w-[520px]">
        <BaseDialogHeader title="Upload Bukti Tindaklanjut" />
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form class="w-full px-6 pb-3 pt-4">
            <BaseDragAndDropFile
              ref="uploadFile"
              height-drag-and-drop="h-[161px]"
              :detail-drag-and-drop="detailDragAndDrop"
              @get-decree-file="getResponseImage"
              @preview-file="previewFile"
            />
            <small class="text-red-600">{{
              checkValidationFile()
                ? 'Pengunggahan file wajib dilakukan. Harap pastikan untuk menyertakan file yang diperlukan.'
                : ''
            }}</small>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Keterangan"
              class="mb-2"
              tag="div"
            >
              <BaseTextArea
                v-model="payload.description"
                placeholder="Masukkan keterangan tindak lanjut"
                label="Keterangan"
                class="text-area mt-6"
                :error-message="errors[0]"
                maxlength="255"
              />
              <p class="mt-1 text-xs text-gray-600">
                Tersisa {{ 255 - payload.description.length }} karakter
              </p>
            </ValidationProvider>
          </form>
          <BaseDialogFooterNew name="evidenceFollowupHotline">
            <div class="mr-4">
              <jds-button
                label="Kembali"
                type="button"
                variant="secondary"
                class="!text-[14px] !font-bold"
                @click="closePopup()"
              />
            </div>
            <jds-button
              label="Upload Bukti"
              type="button"
              variant="primary"
              :disabled="
                invalid ||
                !$refs.uploadFile?.fileIsCorrect ||
                checkValidationFile()
              "
            />
          </BaseDialogFooterNew>
        </ValidationObserver>
      </BaseDialogPanel>
    </BaseDialogFrame>
    <BaseViewFile
      title="Bukti Tindaklanjut"
      :show="dataEvidence.showDialog"
      :file="dataEvidence.fileId"
      :mime-type="dataEvidence.mimeType"
      @close="dataEvidence.showDialog = false"
    />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      detailDragAndDrop: {
        informationSizeCompatible: 'Ukuran file tidak boleh melebihi 2 MB.',
        informationFormatCompatible:
          'Hanya file yang berformat JPG/JPEG/PNG/PDF yang dapat diupload.',
        formatTypeFile: [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'application/pdf',
        ],
        maxSizeFile: 2097152,
        acceptFile: '.jpg,.jpeg,.png,.pdf',
      },
      payload: {
        description: '',
        files: [{ url: '' }],
      },
      dataEvidence: {
        showDialog: false,
        fileId: '',
        mimeType: '',
      },
      nameModal: '',
    }
  },
  mounted() {
    this.nameModal = 'evidenceFollowupHotline'
  },
  methods: {
    closePopup() {
      this.$refs.form.reset()
      this.$store.commit('modals/CLOSEALL')
    },
    previewFile() {
      this.dataEvidence.showDialog = true
      this.dataEvidence.fileId = 'loading'
      this.dataEvidence.fileId = this.$store.state.dataImage.data
      this.dataEvidence.mimeType = this.$store.state.dataImage.mimeType
    },
    getResponseImage(responseImage) {
      if (responseImage === 'error') {
        this.isError = true
        this.showInformationPopupHandle()
      } else {
        this.payload.files[0].url = responseImage.path
      }
    },
    checkValidationFile() {
      return !!(
        !this.$refs.uploadFile?.files && this.$refs.uploadFile?.isUpload
      )
    },
  },
}
</script>

<style scoped>
.form-text-area::v-deep .input-wrapper {
  @apply !h-[85.53px] !bg-white;
}
</style>
