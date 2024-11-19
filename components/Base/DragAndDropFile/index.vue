<template>
  <div class="font-lato text-gray-800">
    <slot name="header" />

    <div class="mt-2 flex w-full items-center justify-center">
      <div
        v-if="fileInputIsChange"
        class="flex w-full flex-col justify-center rounded-lg border-2 border-dashed px-4"
        :class="[
          fileIsCorrect
            ? 'border-green-300 bg-green-50'
            : 'border-red-300 bg-red-50',
          heightDragAndDrop,
        ]"
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
                <span class="font-lato text-[11px] font-normal text-gray-600"
                  >Diupload ... {{ percentageProggres }} %
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
              {{ detailDragAndDrop.informationSizeCompatible }}
            </p>

            <p
              v-if="!FormatFileIsCompatible()"
              class="font-lato text-[11px] font-bold text-red-600"
            >
              {{ detailDragAndDrop.informationFormatCompatible }}.
            </p>
          </div>

          <div class="flex flex-row">
            <BaseButton class="w-4" @click="resetDataFile">
              <TrashIcon class="h-4 w-4" />
            </BaseButton>
            <BaseButton class="w-4" @click.prevent="previewFile">
              <EyesIcon v-if="!proggresBarIsSuccess" class="h-4 w-4" />
            </BaseButton>
          </div>
        </div>
      </div>
      <label
        v-else
        :class="heightDragAndDrop"
        for="drag-and-drop-file"
        class="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 hover:bg-gray-200"
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
          :accept="detailDragAndDrop.acceptFile"
          @change="onChangeUpload"
        />
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
  name: 'BaseDragAndDropFile',
  components: {
    UploadIcon,
    DokumenIcon,
    TrashIcon,
    EyesIcon,
  },
  props: {
    detailDragAndDrop: {
      type: Object,
      default: () => ({}),
    },
    heightDragAndDrop: {
      type: String,
      default: 'h-40',
    },
  },
  data() {
    return {
      files: '',
      dataFiles: {
        name: '',
        isConfidental: false,
        mimeType: '',
        roles: ['admin', 'rw'],
        data: '',
        fileSize: 0,
      },
      fileInputIsChange: false,
      proggresBarIsSuccess: false,
      percentageProggres: 0,
      intervalPercentage: '',
      formatSizeFile: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      responseImage: '',
      fileIsCorrect: false,
      disabledButton: true,
      isUpload: false,
    }
  },
  methods: {
    onChangeUpload() {
      this.isUpload = true
      if (this.$refs.file.files[0]) {
        this.files = this.$refs.file.files[0]
        this.dataFiles.name = this.files.name
        this.dataFiles.mimeType = this.files.type

        this.dataFiles.fileSize = this.convertSize(this.files.size)
        this.fileInputIsChange = true
        this.convertFileToBase64(this.files)
        this.runProgressBar()
        this.checkFileValidation()
        this.dataFiles.fileCorrect = this.fileIsCorrect
        const imageFile = { ...this.dataFiles }
        imageFile.data = this.dataFiles.data
        this.$store.commit(
          'setDataImage',
          JSON.parse(JSON.stringify(this.dataFiles))
        )
      }
    },
    dragover(e) {
      // add style drag and drop
      if (!e.currentTarget.classList.contains('bg-gray-200')) {
        e.currentTarget.classList.remove('bg-gray-50')
        e.currentTarget.classList.add('bg-gray-200')
      }
      e.preventDefault()
    },
    dragleave(e) {
      // clear style drag and drop
      e.currentTarget.classList.add('bg-gray-50')
      e.currentTarget.classList.remove('bg-gray-200')
    },
    drop(e) {
      e.preventDefault()
      this.$refs.file.files = e.dataTransfer.files

      this.onChangeUpload()

      // clear style drag and drop
      e.currentTarget.classList.add('bg-gray-50')
      e.currentTarget.classList.remove('bg-gray-200')
    },
    convertSize(sizeFile) {
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
    runProgressBar() {
      if (this.percentageProggres === 0) {
        this.proggresBarIsSuccess = true
        this.percentageProggres = 1
        this.intervalPercentage = setInterval(this.setProggresBar, 10)
      }
    },
    setProggresBar() {
      if (this.percentageProggres >= 100) {
        clearInterval(this.intervalPercentage)
        this.percentageProggres = 0
        this.proggresBarIsSuccess = false
      } else {
        this.percentageProggres++
      }
    },
    resetDataFile() {
      this.percentageProggres = 0
      this.proggresBarIsSuccess = false
      this.fileInputIsChange = false
      this.files = ''
      this.responseImage = ''
      this.fileIsCorrect = false
      this.disabledButton = true
      this.$emit('disabled-button', this.disabledButton)
      this.$store.commit('setDataImage', {})
    },
    previewFile() {
      this.$emit('preview-file')
    },
    convertFileToBase64(FileObject) {
      const reader = new FileReader()
      reader.onload = () => {
        this.dataFiles.data = reader.result.split(',')[1]
        this.$store.commit('setDataImage', { ...this.dataFiles })
      }
      reader.readAsDataURL(FileObject)
    },
    checkFileValidation() {
      if (this.files) {
        if (this.FileSizeIsCompatible() && this.FormatFileIsCompatible()) {
          this.fileIsCorrect = true
          this.disabledButton = false
          this.$emit('disabled-button', this.disabledButton)
        } else {
          this.fileIsCorrect = false
        }
      } else {
        this.errorNoFiles =
          'Pengunggahan file wajib dilakukan. Harap pastikan untuk menyertakan file yang diperlukan.'
        this.fileIsCorrect = false
      }
    },
    FileSizeIsCompatible() {
      return this.files.size <= this.detailDragAndDrop.maxSizeFile
    },
    FormatFileIsCompatible() {
      return this.detailDragAndDrop.formatTypeFile.includes(this.files.type)
    },
    async uploadFile() {
      this.checkFileValidation()
      if (this.fileIsCorrect) {
        try {
          let response = {}
          response = await this.$axios.post('/file/upload', {
            ...this.dataFiles,
          })

          if (response.data.status) {
            this.responseImage = response.data.data
            this.$store.commit('setResponseFile', { ...this.responseImage })
            this.$emit('get-decree-file', this.responseImage)
          }
        } catch {
          this.resetDataFile()
          this.$emit('get-decree-file', 'error')
        }
      }
    },
  },
}
</script>
