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
        <div
          v-for="(button, index) in listButton"
          v-show="showButtonDetail(button)"
          :key="index"
        >
          <div :class="{ 'mr-3': listButton.length > 1 }">
            <jds-button
              :label="button?.label"
              :variant="button?.variant"
              class="!text-[14px] !font-bold"
              :class="button?.classButton"
              @click="clickButtonConfirmationHandle(button.idButton)"
            />
          </div>
        </div>
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
          {{ `Detail Akun ${typeClaimPage.name}` }}
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
                      v-show="detail?.roleStatus"
                      :class="{
                        'mr-2 h-2 w-2 rounded-full': true,
                        'bg-green-600':
                          detail.roleStatus == userStatus.verified,
                        'bg-yellow-600':
                          detail.roleStatus == userStatus.waiting,
                        'bg-red-600': detail.roleStatus == userStatus.rejected,
                      }"
                    />
                    {{ detail.roleStatus || '-' }}
                  </div>
                </td>
                <td>
                  <BaseButton
                    v-show="detail.roleStatus !== userStatus.verified"
                    class="w-fit border border-green-600 py-[6px] font-medium text-green-600"
                    @click="showPopupEditStatusClaim(typeClaimPage, detail)"
                  >
                    Edit Status
                  </BaseButton>
                </td>
              </tr>
            </DetailTableComponent>
          </div>
          <div class="mb-[16px]">
            <DetailTableComponent :header="`Dokumen SK ${typeClaimPage.name}`">
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
                <td>{{ detail?.city?.name || '-' }}</td>
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
      :title="`Dokumen SK ${typeClaimPage.name}`"
      :show="documentDialog.showDialog"
      :file="documentDialog.fileId"
      :mime-type="documentDialog.mimeType"
      @close="documentDialog.showDialog = false"
    />
    <EditStatusPopup
      :show-popup="isPopupEditStatus"
      :title="`Edit Status Akun ${typeClaimPage.name}`"
      :type-claim-page="typeClaimPage"
      :account-name="detail?.name || '-'"
      :account-status="detail?.roleStatus || '-'"
      @close="isPopupEditStatus = false"
      @submit="actionEditStatusHandle"
    />
    <DialogConfirmationBasic
      v-if="isPopupConfirmationVerification"
      :dialog-modal="dataDialog"
      :detail-item-modal="{ title: user.name }"
      @confirmation-button="actionVerifyUser"
      @cancel="onClosePopupConfirmation"
    />
    <DialogConfirmationBasic
      v-if="isPopupConfirmationRejection"
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
    <PopupInformation
      :show-popup="informationDialog.show"
      :title="informationDialog.title"
      :description-text="informationDialog.info"
      :account-name="detail?.name || '-'"
      :message="informationDialog.message"
      :is-success="informationDialog.isSuccess"
      @close="onClosePopupInfo"
      @retry="onRetryAction"
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
import PopupInformation from '~/components/KlaimRW/Popup/Information.vue'
import EditStatusPopup from '~/components/KlaimRW/Popup/EditStatus.vue'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DetailTableComponent from '~/components/KlaimRW/KlaimRwDetail/DetailTableComponent'
import { formatDate } from '~/utils'
import { userStatus, typeClaim } from '~/constant/klaim-rw'
import popup from '~/mixins/klaim-rw'
import {
  ENDPOINT_KEPALA_DESA,
  ENDPOINT_LURAH,
  ENDPOINT_RW,
  ENDPOINT_CAMAT,
} from '~/constant/endpoint-api'

export default {
  name: 'KlaimRwDetail',
  components: {
    ArrowLeft,
    DetailTableComponent,
    PopupInformation,
    EditStatusPopup,
  },
  mixins: [popup],
  props: {
    typeClaimPage: {
      type: Object,
      default: () => ({}),
    },
    listButton: {
      type: Array,
      default: () => [],
    },
  },
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
      typeClaim,
    }
  },
  async fetch() {
    try {
      const urlApi = this.checkUrlApi()
      const detailAccount = await this.$axios.get(
        `${urlApi}/${this.$route.params.id}`
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
    checkUrlApi() {
      switch (this.typeClaimPage.props) {
        case typeClaim.klaimLurah.props:
          return ENDPOINT_LURAH
        case typeClaim.klaimKepalaDesa.props:
          return ENDPOINT_KEPALA_DESA
        case typeClaim.klaimCamat.props:
          return ENDPOINT_CAMAT
        default:
          return ENDPOINT_RW
      }
    },
    goBackHandle() {
      this.$router.push({
        path: this.typeClaimPage.link,
        query: this.$route.query,
      })
    },
    rejectConfirmationHandle() {
      this.confirmationDialog.showReject = true
    },
    showButtonDetail(button) {
      return button.claimStatus.includes(this.detail.roleStatus)
    },
    clickButtonConfirmationHandle(idButton) {
      if (idButton === 'button-claim-reject') {
        return this.showPopupConfirmation(
          this.detail,
          'reject-confirmation',
          this.typeClaimPage
        )
      }
      return this.showPopupConfirmation(
        this.detail,
        'verify-confirmation',
        this.typeClaimPage
      )
    },
    actionEditStatusHandle(value) {
      this.isPopupEditStatus = false
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
          `/file/view/${this.detail?.roleDecree}`,
          { headers: { 'x-file-id': this.detail.roleDecree } }
        )

        this.documentDialog.fileId = dataFile.data.data
        this.documentDialog.mimeType = dataFile.data.meta.mimeType
      } catch {
        this.documentDialog.fileId = ''
      }
    },
    informationEditSk(information) {
      this.documentEdit.showDialog = false
      this.informationDialog.title = `Edit Dokumen SK ${this.typeClaimPage.name}`
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
