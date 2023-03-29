<template>
  <div>
    <div class="flex justify-between mt-4 mb-8">
      <jds-button variant="secondary" class="!w-[126px] !text-[14px] !font-bold" @click="goToBackHandle">
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div class="flex">
        <div class="mr-3">
          <jds-button label="Simpan Pesan" variant="secondary" class="!font-lato !text-[14px] !font-bold" @click="showSaveMessageNotifPopupHandle" />
        </div>
        <jds-button label="Publikasikan Pesan" variant="primary" class="!font-lato !text-[14px] !font-bold !bg-green-600" @click="showPublishedPopupHandle(fieldMessageNotif)" />
      </div>
    </div>
    <ValidationObserver ref="form">
      <form class="message-notif-form grid grid-cols-2 bg-white py-4 px-6 gap-x-6 rounded-lg">
        <div>
          <ValidationProvider v-slot="{ errors }" name="Judul Pesan" rules="max:100|min:10|required">
            <label class="message-notif-form__label-required">Judul Pesan</label>
            <jds-input-text
              v-model="fieldMessageNotif.title"
              placeholder="Masukkan judul pesan"
              helper-text="Minimum 10 Karakter, maksimal 100 karakter"
              class="!mb-2"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <div class="mb-2">
            <ValidationProvider v-slot="{ errors }" name="Subtext Pesan" rules="required">
              <label class="message-notif-form__label-required">Subtext Pesan</label>
              <div class="mt-1">
                <textarea v-model="fieldMessageNotif.notificationBody" placeholder="Tulis isi subtext disini" class="border border-gray-500 rounded-lg w-full py-2 px-[14px] placeholder:text-sm font-lato resize-none focus:outline-none" :class="{'border border-red-600':errors.length>0}" rows="3" />
              </div>
              <small class="text-red-600">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <ValidationProvider v-slot="{errors}" name="Kategori Pesan" rules="requiredSelectForm">
            <label class="message-notif-form__label-required">Kategori Pesan</label>
            <jds-select
              v-model="fieldMessageNotif.category"
              placeholder="Pilih kategori"
              :options="categoryOptions"
              class="!w-full mt-1"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div>
          <label class="text-[15px]">Gambar Cover</label>
          <p class="my-1 text-[13px]">
            Tipe File JPG/JPEG/PNG dengan maksimal ukuran file 2 MB
          </p>
          <MessageNotifUploadDocument @preview-file="viewFileHandle" />
        </div>
        <div class="col-span-2 mt-5">
          <ValidationProvider v-slot="{errors}" name="Detail Pesan" rules="required">
            <label class="message-notif-form__label-required">Detail Pesan</label>
            <div class="mt-1">
              <Editor
                v-model="fieldMessageNotif.content"
                :api-key="`${$config.tinymceApiKey}`"
                :init="{
                  forced_root_block : '',
                  menubar: false,
                  selector: 'textarea',
                  branding: false,
                  resize:false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help'
                  ],
                  toolbar:
                    'bold italic underline backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | help'
                }"
              />
            </div>

            <small class="text-red-600">{{ errors[0] }}</small>
          </ValidationProvider>
        </div>
        <div class="mt-4 col-span-2">
          <h2 class="text-sm text-gray-800 font-bold">
            Tombol Tautan
          </h2>
        </div>
        <div class="mt-1">
          <label class="message-notif-form__label">Teks Tombol</label>
          <jds-input-text v-model="fieldMessageNotif.actionTitle" placeholder="Masukkan teks tombol" class="mt-1" />
        </div>
        <div class="mt-1">
          <ValidationProvider v-slot="{errors}" name="Tautan" rules="url">
            <label class="message-notif-form__label">Tautan</label>
            <jds-input-text v-model="fieldMessageNotif.actionUrl" placeholder="https://contohtautan.com" class="mt-1" :error-message="errors[0]" />
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>
    <MessageNotifPopupLoading :show-popup="isLoading" />
    <BasePopup :show-popup="showPopupConfirmationInformation" @submit="submitFormMessageNotifHandle" @close="closeFormPopupHandle" />
    <BaseViewImage :show-popup="showViewImagePopup" title="Cover Image" :image-url="dataImage.imageUrl" @close="showViewImagePopup=false" />
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import popup from '~/mixins/message-notif'
import { savedConfirmationPopup, savedInformationPopup } from '~/constant/message-notif'

export default {
  name: 'MessageNotifForm',
  components: {
    Editor,
    ArrowLeft,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [popup],
  data () {
    return {
      fieldMessageNotif: {
        title: '',
        notificationBody: '',
        imageBackground: '',
        originalFilename: '',
        content: '',
        actionTitle: '',
        actionUrl: '',
        category: ''
      },
      categoryOptions: [],
      isInformationPopup: false,
      savedConfirmationPopup,
      savedInformationPopup,
      dataImage: {},
      showViewImagePopup: false,
      isLoading: false,
      isPublished: false,
      tinymceApiKey: this.$config.tinymceApiKey
    }
  },
  async fetch () {
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
    viewFileHandle (value) {
      this.dataImage = value
      this.showViewImagePopup = true
    },
    showSaveMessageNotifPopupHandle () {
      this.$store.commit('dialog/clearState')
      this.confirmationPopupHandle(this.savedConfirmationPopup, this.fieldMessageNotif, this.fieldMessageNotif.title)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopupConfirmationInformation = true
      this.popupName = 'saveNotifMessage'
    },
    async uploadFileHandle () {
      try {
        let responseImage = {}
        this.fieldMessageNotif.originalFilename = this.dataImage.name
        const dataUpload = {
          name: this.dataImage.name,
          isConfidental: false,
          mimeType: this.dataImage.mimeType,
          roles: ['admin'],
          data: this.dataImage.data
        }
        responseImage = await this.$axios.post('/file/upload', { ...dataUpload })
        this.fieldMessageNotif.imageBackground = responseImage.data.data.path
      } catch (error) {
        this.isError = true
        this.showInformationPopupHandle()
      }
    },
    async validHandle (fileCorrect = true) {
      const isDataValid = await this.$refs.form.validate()
      if (!isDataValid || !fileCorrect) {
        return false
      }
      return true
    },
    async submitFormMessageNotifHandle () {
      this.$store.commit('dialog/clearState')
      this.isPublished = false
      this.showPopupConfirmationInformation = false
      this.isLoading = true
      this.dataImage = this.$store.state.dataImage
      if (await this.validHandle(this.dataImage?.fileCorrect)) {
        if (this.popupName === 'saveNotifMessage') {
          await this.saveMessageNotificationHandle()
        } else {
          this.publishedFormMessageNotifHandle()
        }
      } else {
        this.isLoading = false
        this.dataPopup = {
          title: 'Data Belum Benar',
          buttonLeft: this.savedInformationPopup.buttonLeft
        }
        this.showPopupConfirmationInformation = true
        this.showInformationPopupHandle(this.savedInformationPopup, true)
      }
    },
    async saveMessageNotificationHandle () {
      this.showPopupConfirmationInformation = false
      this.popupMessage = {}
      try {
        if (Object.keys(this.dataImage).length > 0) {
          await this.uploadFileHandle()
        }
        const response = await this.$axios.post('/messages', { ...this.fieldMessageNotif })
        this.dataDetail.id = response.data.data.id
        this.isInformationPopup = true
        this.showPopupConfirmationInformation = !this.isPublished
      } catch (error) {
        this.isError = true
      } finally {
        this.isLoading = !!this.isPublished
      }
      if (!this.isPublished) {
        this.showInformationPopupHandle(this.savedInformationPopup, this.isError)
      }
    },
    showInformationPopupHandle (informationPopup, warning = false) {
      this.dataPopup = {
        title: informationPopup.title,
        buttonLeft: informationPopup.buttonLeft
      }
      this.informationPopupHandle(informationPopup, this.isError, warning)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },
    async publishedFormMessageNotifHandle () {
      this.isPublished = true
      await this.saveMessageNotificationHandle()
      await this.publishedMessageNotifHandle()
      this.isLoading = false
      this.showPopupConfirmationInformation = true
    },
    closeFormPopupHandle () {
      this.$store.commit('dialog/clearState')
      this.showPopupConfirmationInformation = false
      if (this.isInformationPopup) {
        this.$router.push('/message-notif')
      }
    }
  }
}
</script>

<style>
  .message-notif-form__label , .message-notif-form__label-required{
    @apply text-[15px] text-gray-800 mb-3 font-lato
  }

  .message-notif-form__label-required::before{
    content: '*';
    color: red;
    margin-right: 4px;
  }

  .message-notif-form__helper-text{
    @apply text-[13px] text-gray-700
  }

  .message-notif-form input[type='text']{
    @apply h-[38px] border border-gray-500 rounded-lg bg-gray-50 w-full px-2 py-[11px] placeholder:text-sm font-lato text-gray-600 focus:outline-none
  }

  .message-notif-form .jds-popover__activator{
    @apply !w-full
  }

  .message-notif-form .jds-select{
    @apply !w-full
  }

  .message-notif-form .jds-input-text__input-wrapper{
    @apply !w-full !h-[40px]
  }
  .message-notif-form .jds-input-text{
     @apply !w-full !h-fit;
  }

  .message-notif-form .jds-options__option-list-item--selected{
    display: none !important;
  }

  .message-notif-form .tox-statusbar{
    display: none !important;
  }
</style>
