<template>
  <div>
    <div class="flex justify-between pt-[16px] pb-[32px]">
      <BaseButton
        class="w-[126px] border border-green-700 text-green-700 hover:bg-green-50"
        @click="goBackHandle"
      >
        <template #icon-left>
          <div class="flex items-center">
            <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
            Kembali
          </div>
        </template>
      </BaseButton>
      <div class="flex">
        <BaseButton
          v-show="detail.rwStatus == userStatus.waiting"
          class="mr-[12px] w-fit border border-red-400 text-red-400 hover:bg-red-50"
          @click="showPopupConfirmationRw(detail, 'reject-confirmation-rw')"
        >
          Tolak Akun RW Ini
        </BaseButton>
        <BaseButton
          v-show="
            detail.rwStatus == userStatus.waiting ||
            detail.rwStatus == userStatus.rejected
          "
          class="w-fit bg-green-700 text-white hover:bg-green-600"
          @click="showPopupConfirmationRw(detail, 'verify-confirmation-rw')"
        >
          Verifikasi Akun RW Ini
        </BaseButton>
      </div>
    </div>
    <div
      class="container relative mx-auto h-[calc(100vh-220px)] rounded-lg bg-white py-[16px] px-[5px] font-lato text-gray-800"
    >
      <div
        class="layout-content h-[calc(100vh-250px)] overflow-y-auto px-[19px]"
      >
        <h1
          class="mb-[16px] font-roboto text-[16px] font-bold text-blue-gray-800"
        >
          Detail Akun RW
        </h1>
        <div class="table-content">
          <div class="mb-[16px] font-lato">
            <DetailTableComponent header="Informasi Umum">
              <tr>
                <td class="w-[164px]">
                  <strong>Nama</strong>
                </td>
                <td colspan="2">
                  {{ detail?.name || '-' }}
                </td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td colspan="2">
                  {{ detail?.email || '-' }}
                </td>
              </tr>
              <tr>
                <td><strong>No.Tlp</strong></td>
                <td colspan="2">
                  {{ detail?.phone || '-' }}
                </td>
              </tr>
              <tr>
                <td><strong>Tanggal Registrasi</strong></td>
                <td colspan="2">
                  {{ detail?.date || '-' }}
                </td>
              </tr>
              <tr>
                <td class="w-[164px]">
                  <strong>Status</strong>
                </td>
                <td class="w-[214px]">
                  <div class="flex items-center">
                    <div
                      v-show="detail?.rwStatus"
                      :class="{
                        'mr-2 h-2 w-2 rounded-full': true,
                        'bg-green-600': detail.rwStatus == userStatus.verified,
                        'bg-yellow-600': detail.rwStatus == userStatus.waiting,
                        'bg-red-600': detail.rwStatus == userStatus.rejected,
                      }"
                    />
                    {{ detail.rwStatus || '-' }}
                  </div>
                </td>
                <td>
                  <BaseButton
                    v-show="detail.rwStatus !== userStatus.verified"
                    class="w-fit border border-green-600 py-[6px] font-medium text-green-600"
                    @click="confirmationDialog.showEditStatus = true"
                  >
                    Edit Status
                  </BaseButton>
                </td>
              </tr>
            </DetailTableComponent>
          </div>
          <div class="mb-[16px]">
            <DetailTableComponent header="Dokumen SK RW">
              <tr>
                <td class="w-[376px]">
                  <strong>{{ detail.fileName || '-' }}</strong>
                </td>
                <td>
                  <BaseButton
                    class="mr-2 w-fit border border-green-600 py-[6px] font-medium text-green-600"
                    @click="editDocumentHandle"
                  >
                    Edit Dokumen
                  </BaseButton>
                  <BaseButton
                    class="w-fit border border-green-600 bg-green-600 py-[6px] font-medium text-white"
                    @click="documentHandle"
                  >
                    Lihat Dokumen
                  </BaseButton>
                </td>
              </tr>
            </DetailTableComponent>
          </div>
          <div class="mb-[16px]">
            <DetailTableComponent header="Alamat Sesuai KTP" class="table-">
              <tr>
                <td class="w-[164px]">
                  <strong>Kota/kabupaten</strong>
                </td>
                <td>{{ detail?.dataKtp?.city || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>{{ detail?.dataKtp?.district || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>{{ detail?.dataKtp?.village || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>{{ detail?.dataKtp?.subVillage || '-' }}</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>{{ detail?.dataKtp?.rtRw || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>{{ detail?.dataKtp?.address || '-' }}</td>
              </tr>
            </DetailTableComponent>
          </div>
          <div>
            <DetailTableComponent header="Alamat Sesuai Domisili">
              <tr>
                <td class="w-[164px]">
                  <strong>Kota/kabupaten</strong>
                </td>
                <td>{{ detail?.cty?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>{{ detail?.district?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>{{ detail?.village?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>{{ detail?.subVillage || '-' }}</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>{{ detail?.rtRw || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>{{ detail?.address || '-' }}</td>
              </tr>
            </DetailTableComponent>
          </div>
        </div>
      </div>
    </div>
    <BaseViewFile
      title="Dokumen SK RW"
      :show="documentDialog.showDialog"
      :file="documentDialog.fileId"
      :mime-type="documentDialog.mimeType"
      @close="documentDialog.showDialog = false"
    />
    <EditStatusPopup
      :show-popup="confirmationDialog.showEditStatus"
      :account-name="detail?.name || '-'"
      :account-status="detail?.rwStatus || '-'"
      @close="confirmationDialog.showEditStatus = false"
      @submit="actionEditStatusHandle"
    />
    <DialogConfirmationBasic
      v-if="isPopupConfirmationVerificationRw"
      :dialog-modal="dataDialog"
      :detail-item-modal="{ title: user.name }"
      @confirmation-button="actionVerifyUser"
      @cancel="onClosePopupConfirmation"
    />
    <DialogConfirmationBasic
      v-if="isPopupConfirmationRejectionRw"
      :dialog-modal="dataDialog"
      @confirmation-button="actionRejectUser"
      @cancel="onClosePopupConfirmation"
    >
      <div class="font-lato text-[16px] text-gray-800">
        <strong>{{ user.name }}</strong>
      </div>
      <div class="mt-[22px]">
        <label class="font-lato text-[14px]">Alamat Email</label>
        <div class="font-lato text-[16px] text-gray-800">
          <strong>{{ user.email }}</strong>
        </div>
      </div>
    </DialogConfirmationBasic>
    <InformationPopup
      :show-popup="informationDialog.show"
      :account-name="detail?.name || '-'"
      :title="informationDialog.title"
      :description-text="informationDialog.info"
      :message="informationDialog.message"
      @close="closeInformationDialogHandle"
    />

    <BaseDialogDragAndDropFile
      :api-update-file="`/user/rw/${detail?.id}`"
      :show-popup="documentEdit.showDialog"
      :detail-drag-and-drop="DragAndDropComponentInformation"
      @close="closeEditDialogHandle"
      @submit-edit-file="informationEditSk"
      @preview-file="previewFile"
    >
      <template #header>
        <p class="font-lato text-[14px] text-gray-800">Nama</p>
        <div class="font-lato text-[16px] text-gray-800">
          <strong>{{ detail?.name }}</strong>
        </div>

        <div class="mt-[22px]">
          <p class="font-lato text-[14px] text-gray-800">Upload Dokumen SK</p>
          <div class="font-lato text-[13px] text-gray-600">
            Tipe File PDF/JPG/JPEG/PNG dengan maksimal ukuran file 2 MB
          </div>
        </div>
      </template>
    </BaseDialogDragAndDropFile>
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import InformationPopup from '~/components/KlaimRW/Popup/Information.vue'
import EditStatusPopup from '~/components/KlaimRW/Popup/EditStatus.vue'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DetailTableComponent from '~/components/KlaimRW/KlaimRwDetail/DetailTableComponent'
import { formatDate } from '~/utils'
import { userStatus } from '~/constant/klaim-rw'
import popup from '~/mixins/klaim-rw'

export default {
  name: 'KlaimRwDetail',
  components: {
    ArrowLeft,
    DetailTableComponent,
    InformationPopup,
    EditStatusPopup,
  },
  mixins: [popup],
  data() {
    return {
      confirmationDialog: {
        showReject: false,
        showEditStatus: false,
      },
      documentDialog: {
        showDialog: false,
        fileId: '',
        mimeType: '',
      },
      documentEdit: {
        showDialog: false,
      },
      DragAndDropComponentInformation: {
        titleModal: 'Edit Dokumen SK',
        informationSizeCompatible:
          'Ukuran file dokumen SK tidak boleh melebihi 2 MB.',
        informationFormatCompatible:
          'Hanya file yang berformat PDF/JPG/JPEG/PNG yang dapat diupload.',
        infromationSuccess: {
          info: 'Edit Dokumen SK RW telah berhasil dilakukan.',
          message: 'Silahkan cek kembali Dokumen SK yang diganti.',
        },
        informationError: {
          info: 'Gagal Edit Dokumen SK',
          message: '',
        },
        formatTypeFile: [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'application/pdf',
        ],
        maxSizeFile: 2097152,
        acceptFile: '.pdf,.jpg,.jpeg,.png',
      },

      detail: {},
      userStatus,
    }
  },
  async fetch() {
    try {
      const detailAccount = await this.$axios.get(
        `/user/rw/${this.$route.params.id}`
      )
      this.detail = detailAccount.data.data
      this.detail.date = detailAccount.data.data
        ? formatDate(detailAccount.data.data.createdAt)
        : ''
    } catch {
      this.detail = {}
    }
  },
  methods: {
    goBackHandle() {
      this.$router.push({
        path: '/',
        query: this.$route.query,
      })
    },
    rejectConfirmationHandle() {
      this.confirmationDialog.showReject = true
    },
    actionEditStatusHandle(value) {
      this.confirmationDialog.showEditStatus = false
      this.user.id = this.detail.id
      if (value === userStatus.rejected) {
        this.actionRejectUser()
      } else if (value === userStatus.verified) {
        this.actionVerifyUser()
      }
    },
    async documentHandle() {
      this.documentDialog.showDialog = true
      this.documentDialog.fileId = 'loading'
      try {
        const dataFile = await this.$axios.get(
          `/file/view/${this.detail?.rwDecree}`,
          { headers: { 'x-file-id': this.detail.rwDecree } }
        )

        this.documentDialog.fileId = dataFile.data.data
        this.documentDialog.mimeType = dataFile.data.meta.mimeType
      } catch {
        this.documentDialog.fileId = ''
      }
    },
    informationEditSk(information) {
      this.documentEdit.showDialog = false
      this.informationDialog.title = 'Edit Dokumen SK RW'
      this.informationDialog.showDialog = true

      this.informationDialog.info = information.info
      this.informationDialog.message = information.message
      this.$fetch()
    },
    closeInformationDialogHandle() {
      this.informationDialog.show = false
      this.documentDialog.fileId = ''
      this.documentDialog.mimeType = ''
      this.$fetch()
    },
    editDocumentHandle() {
      this.documentEdit.showDialog = true
    },
    previewFile() {
      this.documentDialog.showDialog = true
      this.documentDialog.fileId = 'loading'
      this.documentDialog.fileId = this.$store.state.dataImage.data
      this.documentDialog.mimeType = this.$store.state.dataImage.mimeType
    },
    closeEditDialogHandle() {
      this.documentEdit.showDialog = false
    },
  },
}
</script>

<style scoped>
.layout-content {
  scrollbar-color: #e0e0e0 white;
  scrollbar-width: thin;
  scroll-margin-right: 10px;
}
.layout-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.layout-content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.layout-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
.table-content tr td {
  @apply px-[8px] pt-[10px] pb-[9px] !important;
}
</style>
