<template>
  <div class="font-lato text-gray-800">
    <div class="mt-2 flex w-full items-center justify-center">
      <div
        v-if="fileInputIsChange"
        class="flex h-60 w-full flex-col justify-center rounded-lg border-2 border-dashed px-4"
        :class="
          fileIsCorrect
            ? 'border-green-300 bg-green-50'
            : 'border-red-300 bg-red-50'
        "
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

            <p
              v-if="!FileSizeIsCompatible()"
              class="font-lato text-[11px] font-bold text-red-600"
            >
              Ukuran file tidak boleh melebihi 2 MB.
            </p>

            <p
              v-if="!FormatFileIsCompatible()"
              class="font-lato text-[11px] font-bold text-red-600"
            >
              Hanya file yang berformat JPG/JPEG/PNG yang dapat diupload.
            </p>
          </div>

          <div class="flex flex-row">
            <BaseButton class="w-4" @click="resetFile">
              <TrashIcon class="h-4 w-4" />
            </BaseButton>
            <BaseButton class="w-5">
              <EyesIcon v-if="!proggresBarIsSuccess" class="h-4 w-4" @click.prevent="previewFile" />
            </BaseButton>
          </div>
        </div>
      </div>
      <label
        v-else
        for="drag-and-drop-file"
        class="flex h-[240px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[#FEFEFE] px-4 hover:bg-gray-200"
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
          :v-model="value"
          type="file"
          class="hidden"
          accept=".jpg,.jpeg,.png"
          @change="onChangeUpload"
        >
      </label>
    </div>
  </div>
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
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      files: '',
      dataFiles: {
        name: '',
        isConfidental: true,
        mimeType: '',
        roles: ['admin', 'rw'],
        data: '',
        fileSize: 0
      },
      fileInputIsChange: false,
      proggresBarIsSuccess: false,
      percentageProggres: 0,
      intervalPercentage: '',
      formatSizeFile: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      formatTypeFile: [
        'image/jpeg',
        'image/png',
        'image/jpg'
      ],
      maxSizeFile: 2097152,
      decreeFile: '',
      fileIsCorrect: false
    }
  },
  methods: {
    onChangeUpload () {
      if (this.$refs.file.files[0]) {
        this.files = this.$refs.file.files[0]
        this.dataFiles.name = this.files.name
        this.dataFiles.mimeType = this.files.type
        this.dataFiles.fileSize = this.convertSize(this.files.size)
        this.fileInputIsChange = true
        this.dataFiles.imageUrl = URL.createObjectURL(this.files)
        this.runProgressBar()
        this.convertFileToBase64(this.files)
        this.checkFileValidation()
        this.dataFiles.fileCorrect = this.fileIsCorrect
        const imageFile = { ...this.dataFiles }
        imageFile.data = this.dataFiles.data
        this.$store.commit('setDataImage', JSON.parse(JSON.stringify(this.dataFiles)))
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
      const indexFileSize = parseInt(
        Math.floor(Math.log(sizeFile) / Math.log(1024))
      )
      if (indexFileSize === 0) {
        return sizeFile + ' ' + this.formatSizeFile[indexFileSize]
      }
      return (
        (sizeFile / Math.pow(1024, indexFileSize)).toFixed(1) +
        ' ' +
        this.formatSizeFile[indexFileSize]
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
    resetFile () {
      this.percentageProggres = 0
      this.proggresBarIsSuccess = false
      this.fileInputIsChange = false
      this.files = ''
      this.decreeFile = ''
      this.fileIsCorrect = false
      this.disabledButton = true
    },
    previewFile () {
      this.$emit('preview-file', this.dataFiles)
    },
    convertFileToBase64 (FileObject) {
      const reader = new FileReader()
      reader.onload = () => {
        this.dataFiles.data = reader.result.split(',')[1]
        this.$store.commit('setDataImage', { ...this.dataFiles })
      }
      reader.readAsDataURL(FileObject)
    },
    checkFileValidation () {
      if (this.files) {
        if (this.FileSizeIsCompatible() && this.FormatFileIsCompatible()) {
          this.fileIsCorrect = true
          this.disabledButton = false
        } else {
          this.fileIsCorrect = false
        }
      } else {
        this.fileIsCorrect = false
      }
    },
    FileSizeIsCompatible () {
      if (this.files.size <= this.maxSizeFile) {
        return true
      } else {
        return false
      }
    },
    FormatFileIsCompatible () {
      if (this.formatTypeFile.includes(this.files.type)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
