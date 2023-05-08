<template>
  <div>
    <div class="flex justify-between mt-4 mb-8">
      <jds-button variant="secondary" class="!w-[126px] !h-[38px] !py-1 !text-[14px] !font-bold" @click="goToBackHandle">
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div class="flex">
        <div class="mr-3">
          <jds-button label="Hapus Pesan" variant="secondary" class="!h-[38px] !py-1 !text-[14px] !font-bold !text-red-400 !border-red-400" @click="showDeletePopupHandle(detailMessageNotif)" />
        </div>
        <jds-button v-show="detailMessageNotif.status!==messageStatus.published.id" label="Publikasikan" variant="primary" class="!h-[38px] !py-1 !text-[14px] !font-bold" @click="showPublishedPopupHandle(detailMessageNotif)" />
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
        <div class="mb-[16px] font-lato table-content">
          <BaseTableDetail header="General" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Judul Pesan</strong>
              </td>
              <td>{{ detailMessageNotif?.title || '-' }}</td>
            </tr>
            <tr>
              <td class="align-top">
                <strong>Subtext Pesan</strong>
              </td>
              <td class="h-[65px] align-top">
                {{ detailMessageNotif?.notificationBody || '-' }}
              </td>
            </tr>
            <tr>
              <td><strong>Kategori</strong></td>
              <td>{{ detailMessageNotif?.category || '-' }}</td>
            </tr>
            <tr>
              <td><strong>Dibuat Pada</strong></td>
              <td>{{ detailMessageNotif?.createdAt || '-' }}</td>
            </tr>
            <tr>
              <td><strong>Dikirimkan Pada</strong></td>
              <td>{{ detailMessageNotif?.publishedAt || '-' }}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>
                <div class="flex items-center">
                  <div
                    v-show="detailMessageNotif?.status"
                    :class="{
                      'mr-2 h-2 w-2 rounded-full':true,
                      'bg-green-600': detailMessageNotif.status == messageStatus.published.id,
                      'bg-yellow-600': detailMessageNotif.status == messageStatus.waiting.id,
                    }"
                  />
                  {{ detailMessageNotif?.status ? getStatusName(detailMessageNotif?.status) : "-" }}
                </div>
              </td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Cover Image" class="mb-4">
            <tr>
              <td class="w-1/4">
                <strong>{{ detailMessageNotif?.originalFilename || '-' }}</strong>
              </td>
              <td>
                <jds-button v-show="detailMessageNotif?.imageBackground" variant="secondary" label="Lihat Gambar" class="!h-[30px] !py-[2px] !border-green-600 !text-[14px] !text-green-600 !font-medium" @click="showImageCoverPopup=true" />
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
          <BaseTableDetail header="Tombol Tautan">
            <tr>
              <td class="w-[146px]">
                <strong>Teks Tombol</strong>
              </td>
              <td>{{ detailMessageNotif?.actionTitle || '-' }}</td>
            </tr>
            <tr>
              <td><strong>Tautan</strong></td>
              <td>{{ detailMessageNotif?.actionUrl|| '-' }}</td>
            </tr>
          </BaseTableDetail>
        </div>
      </div>
    </div>
    <BaseViewFile :show="showImageCoverPopup" :file="detailMessageNotif.imageBackground" :with-url-path="true" title="Cover Image" @close="showImageCoverPopup=false" />
    <BasePopup :show-popup="showPopupConfirmationInformation" @submit="submitHandle" @close="closePopupDetailHandle" />
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import { messageStatus } from '~/constant/message-notif'
import popup from '~/mixins/message-notif'

export default {
  name: 'MessageNotifDetail',
  components: {
    ArrowLeft
  },
  mixins: [popup],
  props: {
    detailMessageNotif: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showImageCoverPopup: false,
      messageStatus,
      imageCover: ''
    }
  },
  methods: {
    getStatusName (currentStatus) {
      return Object.values(this.messageStatus).find(item => item.id === currentStatus).status
    },
    closePopupDetailHandle () {
      const dataPopup = {
        popupName: this.popupName,
        dialogType: this.deleteInformationPopup.successInformation.dialogType
      }
      this.showPopupConfirmationInformation = false
      this.$emit('close', dataPopup)
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
