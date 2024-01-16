<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!h-[38px] !w-[126px] !py-1 !text-[14px] !font-bold"
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
            label="Hapus Pesan"
            variant="secondary"
            class="!h-[38px] !border-red-400 !py-1 !text-[14px] !font-bold !text-red-400"
            @click="
              openModalConfirmation(
                deleteConfirmationPopup.nameModal,
                detailMessageNotif
              )
            "
          />
        </div>
        <jds-button
          v-show="detailMessageNotif.status !== messageStatus.published.id"
          label="Publikasikan"
          variant="primary"
          class="!h-[38px] !py-1 !text-[14px] !font-bold"
          @click="
            openModalConfirmation(
              publishedConfirmationPopup.nameModal,
              detailMessageNotif
            )
          "
        />
      </div>
    </div>
    <div
      class="relative h-[calc(100vh-220px)] rounded-lg bg-white py-[16px] px-[5px] font-lato text-gray-800"
    >
      <div
        class="layout-content h-[calc(100vh-250px)] overflow-y-auto px-[19px]"
      >
        <h1
          class="mb-[16px] font-roboto text-[16px] font-bold text-blue-gray-800"
        >
          Detail Pesan
        </h1>
        <div class="table-content mb-[16px] font-lato">
          <BaseTableDetail header="General" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Judul Pesan</strong>
              </td>
              <td>{{ detailMessageNotif?.title || "-" }}</td>
            </tr>
            <tr>
              <td class="align-top">
                <strong>Subtext Pesan</strong>
              </td>
              <td class="h-[65px] align-top">
                {{ detailMessageNotif?.notificationBody || "-" }}
              </td>
            </tr>
            <tr>
              <td><strong>Kategori</strong></td>
              <td>{{ detailMessageNotif?.category || "-" }}</td>
            </tr>
            <tr>
              <td><strong>Dibuat Pada</strong></td>
              <td>{{ detailMessageNotif?.createdAt || "-" }}</td>
            </tr>
            <tr>
              <td><strong>Dikirimkan Pada</strong></td>
              <td>{{ detailMessageNotif?.publishedAt || "-" }}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>
                <div class="flex items-center">
                  <div
                    v-show="detailMessageNotif?.status"
                    :class="{
                      'mr-2 h-2 w-2 rounded-full': true,
                      'bg-green-600':
                        detailMessageNotif.status == messageStatus.published.id,
                      'bg-yellow-600':
                        detailMessageNotif.status == messageStatus.waiting.id,
                    }"
                  />
                  {{
                    detailMessageNotif?.status
                      ? getStatusName(detailMessageNotif?.status)
                      : "-"
                  }}
                </div>
              </td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Cover Image" class="mb-4">
            <tr>
              <td class="w-1/4">
                <strong>{{
                  detailMessageNotif?.originalFilename || "-"
                }}</strong>
              </td>
              <td>
                <jds-button
                  v-show="detailMessageNotif?.imageBackground"
                  variant="secondary"
                  label="Lihat Gambar"
                  class="!h-[30px] !border-green-600 !py-[2px] !text-[14px] !font-medium !text-green-600"
                  @click="showImageCoverPopup = true"
                />
              </td>
            </tr>
          </BaseTableDetail>
          <BaseTableDetail header="Isi Pesan" class="mb-4">
            <tr>
              <td class="h-[65px]">
                <div v-html="detailMessageNotif?.content || '-'" />
              </td>
            </tr>
          </BaseTableDetail>
          <!-- TODO: comment code for production -->
          <!-- <BaseTableDetail header="Target" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Platform</strong>
              </td>
              <td>{{ detailMessageNotif?.targetPlatform || '-' }}</td>
            </tr>
            <tr>
              <td><strong>Topik</strong></td>
              <td>{{ detailMessageNotif?.topic|| '-' }}</td>
            </tr>
          </BaseTableDetail> -->
          <BaseTableDetail header="Tombol Tautan">
            <tr>
              <td class="w-[146px]">
                <strong>Teks Tombol</strong>
              </td>
              <td>{{ detailMessageNotif?.actionTitle || "-" }}</td>
            </tr>
            <tr>
              <td><strong>Tautan</strong></td>
              <td>{{ detailMessageNotif?.actionUrl || "-" }}</td>
            </tr>
          </BaseTableDetail>
        </div>
      </div>
    </div>
    <BaseViewFile
      :show="showImageCoverPopup"
      :file="detailMessageNotif.imageBackground"
      :with-url-path="true"
      title="Cover Image"
      @close="showImageCoverPopup = false"
    />

    <DialogConfirmationNew
      :dialog-modal="publishedConfirmationPopup"
      :detail-item-modal="detailItem"
      :path="`/messages/${detailItem.id}/send`"
      http-method="post"
      @error="emitOpenModalInformation"
      @success="emitOpenModalInformation"
    />
    <DialogConfirmationNew
      :dialog-modal="deleteConfirmationPopup"
      :detail-item-modal="detailItem"
      :path="`/messages/${detailItem.id}`"
      http-method="delete"
      @error="emitOpenModalInformation"
      @success="emitOpenModalInformation"
    />

    <DialogInformationNew
      :name-modal="modalNameInformation"
      :dialog-modal="dialogInformationPopup"
      :detail-item-modal="detailItem"
      :is-success="isSuccessConfirmation"
      @close-all-modal="emitHandleInformation"
    />
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import {
  messageStatus,
  deleteConfirmationPopup,
  deleteInformationPopup,
  publishedConfirmationPopup,
  publishedInformationPopup
} from '~/constant/message-notif'

export default {
  name: 'MessageNotifDetail',
  components: {
    ArrowLeft
  },
  props: {
    detailMessageNotif: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showImageCoverPopup: false,
      messageStatus,
      imageCover: '',
      deleteConfirmationPopup,
      deleteInformationPopup,
      publishedConfirmationPopup,
      publishedInformationPopup,
      detailItem: {
        id: '',
        title: ''
      },
      dialogInformationPopup: {},
      modalNameInformation: '',
      isSuccessConfirmation: false
    }
  },
  methods: {
    getStatusName (currentStatus) {
      return Object.values(this.messageStatus).find(
        item => item.id === currentStatus
      ).status
    },
    goToBackHandle () {
      this.$router.push({
        path: '/message-notif',
        query: this.$route.query
      })
    },
    openModalConfirmation (modalName, itemDetail) {
      this.detailItem.id = itemDetail.id
      this.detailItem.title = itemDetail.title
      this.$store.commit('modals/OPEN', modalName)
    },
    emitOpenModalInformation (modalNameEmitted, isSuccessEmitted) {
      this.modalNameInformation = modalNameEmitted
      // check type modal
      const popupConfig =
        modalNameEmitted === this.publishedConfirmationPopup.nameModal
          ? this.publishedInformationPopup
          : this.deleteInformationPopup

      const informationPopup = isSuccessEmitted
        ? popupConfig.successInformation
        : popupConfig.failedInformation

      this.dialogInformationPopup = informationPopup

      // check staus for open modal information
      this.isSuccessConfirmation = isSuccessEmitted

      // open modal information
      const modalFullName = `${modalNameEmitted}-information`
      this.$store.commit('modals/OPEN', modalFullName)
    },
    emitHandleInformation () {
      this.modalNameInformation === this.publishedConfirmationPopup.nameModal
        ? this.$emit('fetchData')
        : this.goToBackHandle()
    }
  }
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
