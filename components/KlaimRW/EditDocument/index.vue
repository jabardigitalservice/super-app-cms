<template>
  <BaseDialog
    title="Edit Dokumen SK"
    :show-popup="showPopup"
    label-button="Simpan"
    confirmation-type="verify"
    dialog-type="confirmation"
    @submit="$emit('submit')"
    @close="$emit('close')"
  >
    <div class="py-[16px] font-lato text-gray-800">
      <p class="font-lato text-[14px] text-gray-800">
        Nama
      </p>
      <div class="font-lato text-[16px] text-gray-800">
        <strong>{{ accountName }}</strong>
      </div>

      <div class="mt-[22px]">
        <p class="font-lato text-[14px] text-gray-800">
          Upload Dokumen SK
        </p>
        <div class="font-lato text-[13px] text-gray-600">
          Tipe File PDF/JPG/JPEG/PNG dengan maksimal ukuran file 2 MB
        </div>
      </div>

      <div class="mt-2 flex w-full items-center justify-center">
        <div
          v-if="isChange"
          class="flex h-36 w-full flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4"
        >
          <div class="mb-3 flex items-center justify-center">
            <DokumenIcon class="h-9 w-9" />
          </div>

          <div class="flex w-full flex-row items-center justify-between">
            <div class="w-[85%]">
              <p
                class="mb-2 truncate font-lato text-[14px] font-normal text-black"
              >
                {{ dataFiles.name }}
              </p>
              <template v-if="proggresBarIsSuccess">
                <div class="mb-1 h-1.5 w-full rounded-full bg-gray-200">
                  <div
                    class="h-1.5 rounded-full bg-green-500"
                    :style="{ width: percentageProggres + '%' }"
                  />
                </div>
                <div class="mb-1">
                  <span class="font-lato text-[11px] font-normal text-gray-600">Diupload ... {{ percentageProggres }} %
                  </span>
                </div>
              </template>
              <template v-else>
                <p class="mb-2 font-lato text-[11px] font-normal text-gray-600">
                  Ukuran {{ dataFiles.fileSize }}
                </p>
              </template>
            </div>

            <div class="flex flex-row">
              <BaseButton class="w-4" @click="cancelEditSK">
                <TrashIcon class="h-4 w-4" />
              </BaseButton>
              <BaseButton class="w-4" @click="previewFileSK">
                <EyesIcon v-if="!proggresBarIsSuccess" class="h-4 w-4" />
              </BaseButton>
            </div>
          </div>
        </div>
        <label
          v-else
          for="drag-and-drop-file"
          class="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 hover:bg-gray-200"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
        >
          <div class="flex flex-col items-center justify-center">
            <UploadIcon class="mb-3 h-9 w-9 text-gray-300" />
            <p class="mb-2 font-lato text-[14px] text-gray-700">
              <span>Drag File kesini</span>
              <span class="text-gray-500">atau</span>
              <span class="text-green-600 underline">Pilih File</span>
            </p>
          </div>
          <input
            id="drag-and-drop-file"
            ref="file"
            type="file"
            class="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            @change="onChangeUpload"
          >
        </label>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
import UploadIcon from '~/assets/icon/upload-file.svg?inline'
import DokumenIcon from '~/assets/icon/document.svg?inline'
import TrashIcon from '~/assets/icon/trash.svg?inline'
import EyesIcon from '~/assets/icon/eyes.svg?inline'
export default {
  name: 'EditDocument',
  components: {
    UploadIcon,
    DokumenIcon,
    TrashIcon,
    EyesIcon
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    accountName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      files: '',
      dataFiles: {
        name: '',
        fileSize: 0,
        mimeType: '',
        isConfidental: true,
        roles: ['admin', 'rw'],
        data: ''
      },
      isChange: false,
      proggresBarIsSuccess: false,
      percentageProggres: 0,
      intervalPercentage: '',
      formatSizeFile: ['Bytes', 'KB', 'MB', 'GB', 'TB']
    }
  },
  methods: {
    onChangeUpload () {
      if (this.$refs.file.files[0]) {
        this.files = this.$refs.file.files[0]
        this.dataFiles.name = this.files.name
        this.dataFiles.mimeType = this.files.type

        this.dataFiles.fileSize = this.convertSize(this.files.size)
        this.isChange = true
        this.convertFileToBase64(this.files)
        this.runProgressBar()
      }
    },
    dragover (e) {
      // add style drag and drop
      if (!e.currentTarget.classList.contains('bg-gray-200')) {
        e.currentTarget.classList.remove('bg-gray-50')
        e.currentTarget.classList.add('bg-gray-200')
      }
      e.preventDefault()
    },
    dragleave (e) {
      // clear style drag and drop
      e.currentTarget.classList.add('bg-gray-50')
      e.currentTarget.classList.remove('bg-gray-200')
    },
    drop (e) {
      e.preventDefault()
      this.$refs.file.files = e.dataTransfer.files

      this.onChangeUpload()

      // clear style drag and drop
      e.currentTarget.classList.add('bg-gray-50')
      e.currentTarget.classList.remove('bg-gray-200')
    },
    convertSize (sizeFile) {
      if (sizeFile === 0) {
        return 'n/a'
      }
      const i = parseInt(Math.floor(Math.log(sizeFile) / Math.log(1024)))
      if (i === 0) {
        return sizeFile + ' ' + this.formatSizeFile[i]
      }
      return (
        (sizeFile / Math.pow(1024, i)).toFixed(1) + ' ' + this.formatSizeFile[i]
      )
    },
    runProgressBar () {
      if (this.percentageProggres === 0) {
        this.proggresBarIsSuccess = true
        this.percentageProggres = 1
        this.intervalPercentage = setInterval(this.setProggresBar, 10)
      }
    },
    setProggresBar () {
      if (this.percentageProggres >= 100) {
        clearInterval(this.intervalPercentage)
        this.percentageProggres = 0
        this.proggresBarIsSuccess = false
      } else {
        this.percentageProggres++
      }
    },
    cancelEditSK () {
      this.percentageProggres = 0
      this.proggresBarIsSuccess = false
      this.isChange = false
      this.files = ''
    },
    previewFileSK () {
      this.$emit('preview-file', this.dataFiles)
    },
    convertFileToBase64 (FileObject) {
      const reader = new FileReader()

      reader.onload = () => {
        this.dataFiles.data = reader.result.split(',')[1]
      }
      reader.readAsDataURL(FileObject)
    }
  }
}
</script>
