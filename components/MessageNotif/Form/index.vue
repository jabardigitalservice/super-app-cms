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
        <jds-button label="Publikasikan Pesan" variant="primary" class="!font-lato !text-[14px] !font-bold !bg-green-600" />
      </div>
    </div>
    <form class="message-notif__form grid grid-cols-2 bg-white py-4 px-6 gap-x-6 rounded-lg">
      <div>
        <jds-input-text v-model="dataMessageNotif.title" placeholder="Masukkan judul pesan" label="Judul Pesan" helper-text="Minimum 10 Karakter, maksimal 100 karakter" class="!mb-2" />
        <div class="mb-2">
          <label>Subtext Pesan</label>
          <div>
            <textarea v-model="dataMessageNotif.notificationBody" placeholder="Tulis isi subtext disini" class="border border-gray-500 rounded-lg w-full py-2 px-[14px] placeholder:text-sm font-lato resize-none focus:outline-none" rows="3" />
          </div>
        </div>
        <jds-select label="Kategori Pesan" placeholder="Pilih kategori" class="!w-full" />
      </div>
      <div>
        <label class="text-[15px]">Gambar Cover</label>
        <p class="my-1 text-[13px]">
          Tipe File JPG/JPEG/PNG dengan maksimal ukuran file 2 MB
        </p>
        <MessageNotifUploadDocument />
        <!-- <div class="border border-2 border-dashed rounded-lg border-gray-300 min-h-[240px] w-full" @dragover="dragover" @dragleave="dragleave" @drop="drop">
          <div class="flex flex-col justify-center items-center min-h-[240px] w-full">
            <UploadFile class="h-[33px] w-[33px]" />
            <p class="mt-[11.33px] text-sm">
              Drag file ke sini atau <span class="text-green-600 font-bold">Pilih File</span>
            </p>
          </div>
        </div> -->
      </div>
      <div class="col-span-2 mt-4">
        <label>Detail Pesan</label>
        <Editor
          v-model="dataMessageNotif.content"
          api-key="bc9fyz4qkr92d8xh4ca8yuk06i4lm0pzn1w0md1lsd9t20mk"
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
              'undo redo | formatselect | bold italic underline backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
          }"
        />
      </div>
      <div class="mt-4 col-span-2">
        <h2 class="text-sm text-gray-800 font-bold">
          Tombol Tautan
        </h2>
      </div>
      <div class="mt-1">
        <jds-input-text v-model="dataMessageNotif.actionTitle" placeholder="Masukkan teks tombol" label="Teks Tombol" />
      </div>
      <div class="mt-1">
        <jds-input-text v-model="dataMessageNotif.actionUrl" placeholder="https://contohtautan.com" label="Tautan" />
      </div>
    </form>
    <BasePopup :show-popup="showPopupConfirmationInformation" @submit="saveMessageNotificationHandle" @close="closeFormPopupHandle" />
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
// import UploadFile from '~/assets/icon/upload-file.svg?inline'
import popup from '~/mixins/message-notif'
import { savedConfirmationPopup, savedInformationPopup } from '~/constant/message-notif'

export default {
  name: 'MessageNotifForm',
  components: {
    // UploadFile,
    Editor,
    ArrowLeft
  },
  mixins: [popup],
  data () {
    return {
      dataMessageNotif: {
        title: '',
        notificationBody: '',
        imageBacground: '',
        originalFilename: 'jsa.png',
        content: '',
        actionTitle: '',
        actionUrl: '',
        category: 'informasi'
      },
      category: [],
      idMessageNotif: '',
      isInformationPopup: false,
      savedConfirmationPopup,
      savedInformationPopup
    }
  },
  methods: {
    dragover (e) {
      e.preventDefault()
      this.isDragging = true
    },
    dragleave () {
      this.isDragging = false
    },
    drop (e) {
      e.preventDefault()
      console.log(e.dataTransfer.files)
    },
    showSaveMessageNotifPopupHandle () {
      this.confirmationPopupHandle(this.savedConfirmationPopup, this.dataMessageNotif)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopupConfirmationInformation = true
    },
    async saveMessageNotificationHandle () {
      this.popupMessage = {}
      this.popupMessage.detail = this.dataMessageNotif.title
      this.dataPopup = {
        title: this.savedInformationPopup.title,
        buttonLeft: this.savedInformationPopup.buttonLeft
      }
      try {
        const response = await this.$axios.post('/messages', { ...this.dataMessageNotif })
        this.idMessageNotif = response.data.data.id
        this.isInformationPopup = true
      } catch (error) {
        this.isError = true
      }
      this.informationPopupHandle(this.savedInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
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
  .message-notif__form label{
    @apply text-[15px] text-gray-800 mb-1 font-lato
  }

  .message-notif__helper-text{
    @apply text-[13px] text-gray-700
  }

  .message-notif__form input[type='text']{
    @apply h-[38px] border border-gray-500 rounded-lg bg-gray-50 w-full px-2 py-[11px] placeholder:text-sm font-lato text-gray-600 focus:outline-none
  }

  .message-notif__form .jds-popover__activator{
    @apply !w-full
  }

  .message-notif__form .jds-select{
    @apply !w-full
  }

  .message-notif__form .jds-input-text__input-wrapper{
    @apply !w-full !h-[40px]
  }
  .message-notif__form .jds-input-text{
     @apply !w-full !h-fit;
  }

  .message-notif__form .jds-options__option-list-item--selected{
    display: none !important;
  }
</style>
