<template>
  <BaseDialog
    title="Edit Dokumen SK"
    :show-popup="showPopup"
    label-button="Simpan"
    confirmation-type="verify"
    dialog-type="confirmation"
    @submit="submitEditFileSK"
    @close="closeEdit"
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
          class="flex h-36 w-full flex-col justify-center rounded-lg border-2 border-dashed  px-4"
          :class="compatibleFiles ? 'border-green-300 bg-green-50': 'border-red-300 bg-red-50' "
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
              <BaseButton class="w-4" @click="resetDataEditSK">
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
    },
    accountId: {
      type: String,
      default: ''
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
      isChange: false,
      proggresBarIsSuccess: false,
      percentageProggres: 0,
      intervalPercentage: '',
      formatSizeFile: ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      formatTypeFile: [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf'
      ],
      maxSizeFile: 2097152,
      decreeFile: '',
      infromationSuccess: {
        info: 'Edit Dokumen SK RW telah berhasil dilakukan.',
        message: 'Silahkan cek kembali Dokumen SK yang diganti.'
      },
      informationFailedFile: {
        info: 'Periksa Kembali Format file dan ukuran file.',
        message: ''
      },
      informationError: {
        info: 'Gagal Edit Dokumen SK',
        message: ''
      },
      InformationFileExist: {
        info: 'Masukan File jika ingin mengubah Dokumen SK.',
        message: ''
      },
      compatibleFiles: false,
      filesExist: false
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

        this.checkFileValidation()
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
      const indexFileSize = parseInt(Math.floor(Math.log(sizeFile) / Math.log(1024)))
      if (indexFileSize === 0) {
        return sizeFile + ' ' + this.formatSizeFile[indexFileSize]
      }
      return (
        (sizeFile / Math.pow(1024, indexFileSize)).toFixed(1) + ' ' + this.formatSizeFile[indexFileSize]
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
    resetDataEditSK () {
      this.percentageProggres = 0
      this.proggresBarIsSuccess = false
      this.isChange = false
      this.files = ''
      this.decreeFile = ''
      this.compatibleFiles = false
    },
    previewFileSK () {
      this.$emit('preview-file-sk', this.dataFiles)
    },
    convertFileToBase64 (FileObject) {
      const reader = new FileReader()

      reader.onload = () => {
        this.dataFiles.data = reader.result.split(',')[1]
      }
      reader.readAsDataURL(FileObject)
    },
    closeEdit () {
      this.$emit('close')
      this.resetDataEditSK()
    },
    async submitEditFileSK () {
      this.checkFileValidation()
      if (this.filesExist) {
        if (this.compatibleFiles) {
          try {
            const response = await this.$axios.post(
              '/file/upload',
              this.dataFiles
            )
            if (response.data.status) {
              this.decreeFile = response.data.data.id
              this.updateFileDecreeSK()
            }
          } catch {
            this.$emit('submit-edit-file-sk', this.informationError)
          }
        } else {
          this.$emit('submit-edit-file-sk', this.informationFailedFile)
        }
      } else {
        this.$emit('submit-edit-file-sk', this.InformationFileExist)
      }
    },
    async updateFileDecreeSK () {
      try {
        const response = await this.$axios.patch(`/user/rw/${this.accountId}`, {
          decree: this.decreeFile
        })

        if (response.data.status) {
          this.resetDataEditSK()
          this.$emit('submit-edit-file-sk', this.infromationSuccess)
        }
      } catch {
        this.$emit('submit-edit-file-sk', this.informationError)
      }
    },
    checkFileValidation () {
      if (this.files) {
        /* return true */
        this.filesExist = true
        if (
          this.files.size <= this.maxSizeFile &&
          this.formatTypeFile.includes(this.files.type)
        ) {
          this.compatibleFiles = true
        } else {
          this.compatibleFiles = false
        }
      } else {
        this.filesExist = false
      }
    }
  }
}
</script>
