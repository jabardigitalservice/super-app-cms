<template>
  <div>
    <BaseDialogFrame :name="nameModal" @close="closePopup()">
      <BaseDialogPanel class="w-[520px]">
        <BaseDialogHeader title="Upload Bukti Tindaklanjut" />
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form class="w-full px-6 pb-3 pt-4">
            <BaseDragAndDropFile
              ref="dragDropFile"
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
                !$refs.dragDropFile?.fileIsCorrect ||
                checkValidationFile()
              "
              @click="showConfirmationDialog()"
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
    <DialogConfirmationBasic
      :dialog-modal="dialogConfirmation"
      @confirmation-button="submitEvidenceFollowup()"
      @cancel="backToForm()"
    />
    <DialogInformationNew
      :name-modal="dialogInformation?.nameModal"
      :dialog-modal="dialogInformation?.dialogModal"
      :is-success="isSuccess"
      @close-all-modal="closePopup()"
      @retry="backToForm()"
    />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ENDPOINT_ADUAN_HOTLINE_JABAR } from '~/constant/endpoint-api'

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
      refDragDropFile: {},
      dialogConfirmation: {},
      dialogInformation: {},
      isLoading: false,
      isSuccess: false,
    }
  },
  mounted() {
    this.nameModal = 'evidenceFollowupHotline'
  },
  methods: {
    closePopup() {
      this.payload = {
        description: '',
        files: [],
      }
      this.$refs.form?.reset()
      this.$store.commit('modals/CLOSEALL')
    },
    backToForm() {
      this.$store.commit('modals/CLOSEALL')
      this.$store.commit('modals/OPEN', this.nameModal)
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
    async showConfirmationDialog() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.$store.commit('modals/CLOSEALL')
        const dataDialog = {
          title: 'Upload Bukti Tindaklanjut',
          nameModal: `${this.nameModal}Confirmation`,
          descriptionText:
            'Apakah Anda yakin ingin mengupload bukti tindaklanjut ?',
          button: {
            label: 'Ya, lanjutkan',
            variant: 'primary',
          },
        }
        this.refsDragDropFile = this.$refs.dragDropFile
        this.dialogConfirmation = dataDialog
        this.$store.commit('modals/OPEN', dataDialog.nameModal)
      }
    },
    async submitEvidenceFollowup() {
      this.$store.commit('modals/CLOSEALL')
      this.isLoading = true
      // SET DIALOG INFORMATION
      const nameModal = `${this.nameModal}Information`
      const dataDialogSuccess = {
        nameModal,
        dialogModal: {
          title: 'Upload Bukti Tindaklanjut Berhasil',
          descriptionText:
            'File bukti tindaklanjut telah berhasil terupload, dan tersimpan pada tab bukti tindaklanjut di detail aduan. ',
          icon: { name: 'check-mark-circle', fill: '#069550' },
        },
      }

      const dataDialogFailed = {
        nameModal,
        dialogModal: {
          title: 'Upload Bukti Tindaklanjut Gagal',
          descriptionText:
            'File bukti tindaklanjut gagal terupload. Silahkan coba kembali',
          icon: { name: 'times-circle', fill: '#EF5350' },
        },
      }
      try {
        await this.refsDragDropFile.uploadFile()
        const responseFile = this.$store.state.responseFile
        // SET API
        const dataApi = {
          method: 'patch',
          url: `${ENDPOINT_ADUAN_HOTLINE_JABAR}/5x9-2xe-4x5-bxb-1x31/finished`,
        }

        // SET PAYLOAD
        this.payload.files[0] = { url: responseFile.path }
        this.payload.user_id = this.$auth?.user?.identifier

        this.$store.commit('popup-complaint/setIsMockApi', true)
        await this.$store.dispatch('popup-complaint/integrationApi', {
          dataApi,
          payload: this.payload,
        })
        this.dialogInformation = dataDialogSuccess
        this.isSuccess = true
      } catch (error) {
        this.dialogInformation = dataDialogFailed
        this.isSuccess = false
      } finally {
        this.isLoading = false
      }
      if (!this.isLoading) {
        this.$store.commit('modals/OPEN', this.dialogInformmation?.nameModal)
      }
    },
  },
}
</script>

<style scoped>
.form-text-area::v-deep .input-wrapper {
  @apply !h-[85.53px] !bg-white;
}
</style>
