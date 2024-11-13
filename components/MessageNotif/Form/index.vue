<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!w-[126px] !text-[14px] !font-bold"
        @click="goToBackHandle"
      >
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div class="flex">
        <div class="mr-3">
          <jds-button
            label="Simpan Pesan"
            variant="secondary"
            class="!font-lato !text-[14px] !font-bold"
            @click="submitForm(savedConfirmationPopup.nameModal)"
          />
        </div>
        <jds-button
          label="Publikasikan Pesan"
          variant="primary"
          class="!bg-green-600 !font-lato !text-[14px] !font-bold"
          @click="submitForm(publishedConfirmationPopup.nameModal)"
        />
      </div>
    </div>
    <ValidationObserver ref="form">
      <form
        class="message-notif-form grid grid-cols-2 gap-x-6 rounded-lg bg-white py-4 px-6"
      >
        <div>
          <ValidationProvider
            v-slot="{ errors }"
            name="Judul Pesan"
            rules="max:100|min:10|required"
          >
            <label class="message-notif-form__label-required"
              >Judul Pesan</label
            >
            <p class="mb-1 text-[13px] text-gray-700">
              Minimum 10 Karakter, maksimal 100 karakter
            </p>
            <input
              v-model="fieldMessageNotif.title"
              type="text"
              minlength="10"
              maxlength="100"
              placeholder="Masukkan judul pesan"
              :class="{ '!border !border-red-600': errors.length > 0 }"
            />
            <small class="text-red-600">{{ errors[0] }}</small>
          </ValidationProvider>
          <div class="mt-4">
            <ValidationProvider
              v-slot="{ errors }"
              name="Subtext Pesan"
              rules="required|max:100|min:10"
            >
              <label class="message-notif-form__label-required"
                >Subtext Pesan</label
              >
              <div class="mt-1">
                <textarea
                  v-model="fieldMessageNotif.notificationBody"
                  minlength="10"
                  maxlength="100"
                  placeholder="Tulis isi subtext disini"
                  class="h-[64px] w-full resize-none rounded-lg border border-gray-500 py-2 px-[14px] font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none"
                  :class="{ 'border border-red-600': errors.length > 0 }"
                />
              </div>
              <small class="text-red-600">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="mt-4">
            <ValidationProvider
              v-slot="{ errors }"
              name="Kategori Pesan"
              rules="requiredSelectForm"
            >
              <label class="message-notif-form__label-required"
                >Kategori Pesan</label
              >
              <jds-select
                v-model="fieldMessageNotif.category"
                placeholder="Pilih kategori"
                :options="categoryOptions"
                class="mt-1 !w-full"
                :error-message="errors[0]"
              />
            </ValidationProvider>
          </div>
        </div>
        <div>
          <label class="text-[15px]">Gambar Cover</label>
          <p class="my-1 text-[13px]">
            Tipe File JPG/JPEG/PNG dengan maksimal ukuran file 2 MB
          </p>

          <BaseDragAndDropFile
            ref="BaseDragAndDropFile"
            height-drag-and-drop="h-[226px]"
            :detail-drag-and-drop="detailDragAndDrop"
            @get-decree-file="getResponseImage"
            @preview-file="previewFile"
          />
        </div>
        <div class="col-span-2 mt-5">
          <ValidationProvider
            v-slot="{ errors }"
            name="Detail Pesan"
            rules="required"
          >
            <label class="message-notif-form__label-required"
              >Detail Pesan</label
            >
            <div class="mt-1">
              <Editor
                v-model="fieldMessageNotif.content"
                :api-key="`${$config.tinymceApiKey}`"
                :init="{
                  forced_root_block: '',
                  menubar: false,
                  selector: 'textarea',
                  branding: false,
                  resize: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help',
                  ],
                  toolbar:
                    'bold italic underline backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | help',
                }"
              />
            </div>

            <small class="text-red-600">{{ errors[0] }}</small>
          </ValidationProvider>
        </div>
        <!--- Target must be choose one between platform or topic, because in firebase only can submit one of them. -->
        <!-- TODO: comment code for production -->
        <!-- <div class="col-span-2 mt-4">
          <h2 class="text-sm font-bold text-gray-800 before:content-['*'] before:ml-0.5 before:text-red-500">
            Target <em>(Wajib pilih salah satu)</em>
          </h2>
        </div>
        <div class="mt-1">
          <label class="message-notif-form__label">Target Platform</label>
          <jds-select
            v-model="fieldMessageNotif.target.platform"
            placeholder="Pilih Target Platform"
            :options="platformOptions"
            class="mt-1 !w-full"
            :disabled="isDisabledPlatform"
            @change="checkFormSelectPlatformDisabled"
          />
        </div>
        <div class="mt-1">
          <label class="message-notif-form__label">Topik</label>
          <jds-select
            v-model="fieldMessageNotif.target.topic"
            placeholder="Pilih Topik"
            :options="topicOptions"
            class="mt-1 !w-full"
            :disabled="isDisabledTopic"
            @change="checkFormSelectTopicDisabled"
          />
        </div> -->
        <small class="text-red-600">{{ errMessageTarget }}</small>
        <div class="col-span-2 mt-4">
          <h2 class="text-sm font-bold text-gray-800">Tombol Tautan</h2>
        </div>
        <div class="mt-1">
          <label class="message-notif-form__label">Teks Tombol</label>
          <jds-input-text
            v-model="fieldMessageNotif.actionTitle"
            placeholder="Masukkan teks tombol"
            class="mt-1"
          />
        </div>
        <div class="mt-1">
          <ValidationProvider v-slot="{ errors }" name="Tautan" rules="url">
            <label class="message-notif-form__label">Tautan</label>
            <jds-input-text
              v-model="fieldMessageNotif.actionUrl"
              placeholder="https://contohtautan.com"
              class="mt-1"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>

    <DialogConfirmationNew
      :dialog-modal="savedConfirmationPopup"
      :detail-item-modal="detailItem"
      :path="'/messages'"
      :params="fieldMessageNotif"
      @error="emitOpenModalInformation"
      @success="emitOpenModalInformation"
    />

    <DialogConfirmationNew
      :dialog-modal="publishedConfirmationPopup"
      :detail-item-modal="detailItem"
      :path="'/messages'"
      :params="fieldMessageNotif"
      @error="emitOpenModalInformation"
      @success="emitOpenModalInformation"
    />

    <DialogInformationNew
      :name-modal="modalNameInformation"
      :dialog-modal="dialogInformationPopup"
      :detail-item-modal="detailItem"
      :is-success="isSuccessConfirmation"
      :is-warning="isWarningInformation"
      @close-all-modal="closeAllModalSuccess()"
    />

    <BaseViewFile
      title="Cover Image"
      :show="dataImage.showDialog"
      :file="dataImage.fileId"
      :mime-type="dataImage.mimeType"
      @close="dataImage.showDialog = false"
    />
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import {
  savedConfirmationPopup,
  savedInformationPopup,
  publishedConfirmationPopup,
  publishedInformationPopup,
} from '~/constant/message-notif'

export default {
  name: 'MessageNotifForm',
  components: {
    Editor,
    ArrowLeft,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      fieldMessageNotif: {
        title: '',
        notificationBody: '',
        imageBackground: '',
        originalFilename: '',
        content: '',
        actionTitle: '',
        actionUrl: '',
        category: '',
        // TODO: comment code for production
        // target: {
        //   platform: '',
        //   topic: ''
        // }
      },
      detailDragAndDrop: {
        informationSizeCompatible:
          'Ukuran file dokumen SK tidak boleh melebihi 2 MB.',
        informationFormatCompatible:
          'Hanya file yang berformat JPG/JPEG/PNG yang dapat diupload.',
        formatTypeFile: ['image/jpeg', 'image/png', 'image/jpg'],
        maxSizeFile: 2097152,
        acceptFile: '.jpg,.jpeg,.png',
      },
      categoryOptions: [],
      // TODO: comment code for production
      // platformOptions: [{ label: 'Android OS', value: 'android' }, { label: 'Apple iOS', value: 'ios' }],
      // topicOptions: [{ label: 'RW', value: 'rw' }, { label: 'Publik', value: 'general' }],
      isInformationPopup: false,
      savedConfirmationPopup,
      savedInformationPopup,
      publishedConfirmationPopup,
      publishedInformationPopup,
      dataImage: {
        showDialog: false,
        fileId: '',
        mimeType: '',
      },
      tinymceApiKey: this.$config.tinymceApiKey,
      isDisabledPlatform: false,
      isDisabledTopic: false,
      errMessageTarget: '',
      detailItem: {
        id: '',
        title: '',
      },
      dialogInformationPopup: {},
      modalNameInformation: '',
      isSuccessConfirmation: false,
      isWarningInformation: false,
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get('/messages/category')
      response.data.data.forEach((item) => {
        this.categoryOptions.push({ label: item.name, value: item.name })
      })
    } catch (error) {
      this.categories = []
    }
  },
  methods: {
    previewFile() {
      this.dataImage.showDialog = true
      this.dataImage.fileId = 'loading'
      this.dataImage.fileId = this.$store.state.dataImage.data
      this.dataImage.mimeType = this.$store.state.dataImage.mimeType
    },
    getResponseImage(responseImage) {
      if (responseImage === 'error') {
        this.isError = true
        this.showInformationPopupHandle()
      } else {
        this.fieldMessageNotif.imageBackground = responseImage.path
      }
    },
    async validHandle(fileCorrect = true) {
      const isDataValid = await this.$refs.form.validate()
      // TODO:
      // if (this.fieldMessageNotif.target.platform === '' && this.fieldMessageNotif.target.topic === '') {
      //   this.errMessageTarget = 'wajib memilih salah satu target.'
      // }
      if (!isDataValid || !fileCorrect || this.errMessageTarget) {
        return false
      }
      return true
    },
    checkFormSelectPlatformDisabled(value) {
      if (value !== null) {
        this.isDisabledTopic = true
        this.errMessageTarget = ''
      }
    },
    checkFormSelectTopicDisabled(value) {
      if (value !== null) {
        this.isDisabledPlatform = true
        this.errMessageTarget = ''
      }
    },
    async submitForm(typeForm) {
      this.dataImage = this.$store.state.dataImage
      this.fieldMessageNotif.originalFilename = this.dataImage.name

      if (await this.validHandle(this.dataImage?.fileCorrect)) {
        // check type modal
        if (Object.keys(this.dataImage).length > 0) {
          await this.$refs.BaseDragAndDropFile.uploadFile()
          this.$refs.BaseDragAndDropFile.resetDataFile()
        }
        this.showConfirmation(typeForm)
      } else {
        this.openWarningInformationDialog()
      }
    },
    openWarningInformationDialog() {
      const modalName = 'warning'
      this.isWarningInformation = true
      this.modalNameInformation = modalName
      this.dialogInformationPopup =
        this.savedInformationPopup.warningInformation
      const modalFullName = `${modalName}-information`
      this.$store.commit('modals/OPEN', modalFullName)
    },
    goToBackHandle() {
      this.$router.push('/message-notif/')
    },
    closeAllModalSuccess() {
      if (this.isSuccessConfirmation) {
        this.goToBackHandle()
      }
    },
    showConfirmation(typeForm) {
      this.detailItem.title = this.fieldMessageNotif.title
      this.$store.commit('modals/OPEN', typeForm)
    },
    emitOpenModalInformation(modalNameEmitted, isSuccessEmitted, response) {
      this.modalNameInformation = modalNameEmitted

      if (modalNameEmitted === this.publishedConfirmationPopup.nameModal) {
        const idMessage = response.data.data.id
        this.handlePublishedMessage(idMessage)
      } else {
        this.dialogInformationPopup = isSuccessEmitted
          ? savedInformationPopup.successInformation
          : savedInformationPopup.failedInformation
        this.isSuccessConfirmation = isSuccessEmitted
      }

      // open modal information
      const modalFullName = `${modalNameEmitted}-information`
      this.$store.commit('modals/OPEN', modalFullName)
    },
    async handlePublishedMessage(id) {
      try {
        await this.$axios.post(`/messages/${id}/send`)
        this.dialogInformationPopup =
          publishedInformationPopup.successInformation
        this.isSuccessConfirmation = true
      } catch (error) {
        this.dialogInformationPopup =
          publishedInformationPopup.failedInformation
        this.isSuccessConfirmation = false
      }
    },
  },
}
</script>

<style>
.message-notif-form__label,
.message-notif-form__label-required {
  @apply mb-3 font-lato text-[15px] text-gray-800;
}

.message-notif-form__label-required::before {
  content: '*';
  color: red;
  margin-right: 4px;
}

.message-notif-form input[type='text'] {
  @apply h-[38px] w-full rounded-lg border border-gray-500 bg-gray-50 px-2 py-[11px] font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none;
}

.message-notif-form .jds-popover__activator {
  @apply !w-full;
}

.message-notif-form .jds-select {
  @apply !w-full;
}

.message-notif-form .jds-input-text__input-wrapper {
  @apply !h-[40px] !w-full;
}
.message-notif-form .jds-input-text {
  @apply !h-fit !w-full;
}

.message-notif-form .jds-options__option-list-item--selected {
  display: none !important;
}

.message-notif-form .tox-statusbar {
  display: none !important;
}
</style>
