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
            label="Tolak"
            variant="secondary"
            class="!h-[38px] !border-red-400 !py-1 !text-[14px] !font-bold !text-red-400"
            @click="showRejectTicketHandle(dataDetail)"
          />
        </div>
        <jds-button
          label="Verifikasi"
          variant="primary"
          class="!h-[38px] !py-1 !text-[14px] !font-bold"
          @click="showVerificationTicketHandle(dataDetail)"
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
          Detail Ticket
        </h1>
        <div class="table-content mb-[16px] font-lato">
          <BaseTableDetail header="General" class="mb-4">
            <tr>
              <td class="w-1/4">
                <strong>Invoice</strong>
              </td>
              <td>{{ dataDetail?.invoice || "-" }}</td>
            </tr>
            <tr>
              <td>
                <strong>Sesi</strong>
              </td>
              <td>
                {{ dataDetail?.sessionName || "-" }} Jam
                {{ dataDetail?.sessionHour || "-" }}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tanggal Reservasi</strong>
              </td>
              <td>{{ dataDetail?.reservationDate || "-" }}</td>
            </tr>
            <tr>
              <td>
                <strong>Jumlah Tiket</strong>
              </td>
              <td>{{ dataDetail?.ticketCount || "-" }}</td>
            </tr>
            <tr>
              <td>
                <strong>Jumlah Pembayaran</strong>
              </td>
              <td>{{ dataDetail?.amount || "-" }}</td>
            </tr>
            <tr>
              <td>
                <strong>Status</strong>
              </td>
              <td>
                <div class="flex items-center">
                  <div
                    v-show="dataDetail?.status"
                    class="mr-2 h-2 w-2 rounded-full"
                    :class="
                      getColorIconStatus(ticketStatus[`${dataDetail?.status}`])
                    "
                  />
                  {{ ticketStatus[`${dataDetail?.status}`] }}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tanggal Pemesanan</strong>
              </td>
              <td>{{ dataDetail?.orderedAt || "-" }}</td>
            </tr>
            <tr>
              <td>
                <strong>Bukti Pembayaran</strong>
              </td>
              <td>
                <button
                  class="rounded-lg border border-green-700 px-4 py-1 text-green-700 hover:bg-green-50"
                  @click="onClickDocument(dataDetail?.fileId)"
                >
                  Lihat Bukti Pembayaran
                </button>
              </td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Informasi Tiket" class="mb-4">
            <tr v-for="infoTicket in dataDetail?.tickets" :key="infoTicket.id">
              <td class="w-1/4">
                <strong> Ticket {{ infoTicket.name }}</strong>
              </td>
              <td>{{ infoTicket?.ticketNumber || 0 }}</td>
            </tr>
          </BaseTableDetail>
        </div>
      </div>
    </div>
    <BasePopup
      :show-popup="showPopUp"
      @submit="submitHandle"
      @close="closePopupDetailHandle"
    />

    <BaseViewFile
      title="Butki Pembayaran"
      :file="buktiPembayaranInfo.file"
      :mime-type="buktiPembayaranInfo.mimeType"
      :show="showFile"
      @close="showFile = false"
    />
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import { ticketStatus } from '~/constant/tiket-museum'
import popup from '~/mixins/tiket-museum'
export default {
  name: 'TicketMuseumDetail',
  components: {
    ArrowLeft
  },
  mixins: [popup],
  props: {
    dataDetail: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ticketStatus,
      showFile: false,
      buktiPembayaranInfo: {
        show: false,
        file: '',
        mimeType: ''
      }
    }
  },
  methods: {
    goToBackHandle () {
      this.$router.push('/ticket-museum')
    },
    closePopupDetailHandle () {
      const dataPopup = {
        popupName: this.popupName,
        dialogType: this.rejectInformationPopup.successInformation.dialogType
      }
      this.showPopUp = false
      this.$emit('close', dataPopup)
    },
    async onClickDocument (fileId) {
      this.showFile = true
      this.buktiPembayaranInfo.file = 'loading'
      try {
        const response = await this.$axios.get(`/file/view/${fileId}`, {
          headers: { 'x-file-id': fileId }
        })

        this.buktiPembayaranInfo.file = response.data.data || ''
        this.buktiPembayaranInfo.mimeType = response.data.meta.mimeType || ''
      } catch {
        this.buktiPembayaranInfo.file = ''
      }
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
