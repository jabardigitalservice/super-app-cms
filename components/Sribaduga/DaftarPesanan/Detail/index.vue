<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!text-[14px] !font-bold"
        @click="goToBackHandle()"
      >
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
    </div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarListDetail
          :list-tab="listTab"
          @button-tab="showViewDetailPage"
        />
      </template>
      <template #tab-panel>
        <BaseTabPanel
          class="layout-content h-[calc(100vh-280px)] overflow-y-auto py-4 px-[19px]"
        >
          <template v-if="viewDetail === 'detail-page'">
            <BaseTableDetail header="Informasi Order" class="text-lato mb-4">
              <tr>
                <td class="w-[180px]">
                  <strong>No.Order</strong>
                </td>
                <td>{{ detailPesanan.invoice }}</td>
              </tr>
              <tr>
                <td class="w-[180px]">
                  <strong>Nama Pemesan</strong>
                </td>
                <td>{{ detailPesanan.customerName }}</td>
              </tr>
              <tr>
                <td class="w-[180px]">
                  <strong>Nama Instansi</strong>
                </td>
                <td>{{ '-' }}</td>
              </tr>
              <tr>
                <td class="w-[180px]">
                  <strong>Kunjungan</strong>
                </td>
                <td>{{ detailPesanan.visitType?.name }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Jumlah Order</strong>
                </td>
                <td>{{ detailPesanan.ticketCount }} Tiket</td>
              </tr>
              <tr>
                <td>
                  <strong>Tanggal Dipesan</strong>
                </td>
                <td>{{ detailPesanan.orderedAt }} WIB</td>
              </tr>
              <tr>
                <td>
                  <strong>Tanggal Kunjungan</strong>
                </td>
                <td>{{ detailPesanan.reservationDate }} WIB</td>
              </tr>
              <tr>
                <td class="w-[226px]">
                  <strong>Sesi Kunjungan</strong>
                </td>
                <td>{{ detailPesanan.session?.name }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status Order</strong>
                </td>
                <td>
                  <p
                    v-show="detailPesanan?.orderStatus"
                    class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
                    :class="
                      showColorStatus(
                        detailPesanan?.orderStatus?.code,
                        listStatusSribaduga
                      )
                    "
                  >
                    {{
                      showLabelStatus(
                        detailPesanan?.orderStatus?.code,
                        listStatusSribaduga
                      )
                    }}
                  </p>
                </td>
              </tr>
            </BaseTableDetail>

            <BaseTableDetail
              header="Informasi Pengunjung"
              class="text-lato mb-4"
            >
              <tr v-for="(item, index) in detailPesanan.tickets" :key="index">
                <td class="w-[226px]">
                  <strong>{{ `Total Pengunjung ${item?.name}` }}</strong>
                </td>
                <td>{{ item.qty ? `${item.qty} orang` : '-' }}</td>
              </tr>
            </BaseTableDetail>

            <BaseTableDetail
              v-if="detailPesanan?.scanner?.scanned"
              header="Informasi Scan"
              class="text-lato mb-4"
            >
              <tr>
                <td class="w-[226px]">
                  <strong>Discan oleh</strong>
                </td>
                <td>{{ detailPesanan?.scanner?.scannedBy }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Di Pintu</strong>
                </td>
                <td>{{ detailPesanan?.scanner?.gateName }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Tanggal Scan</strong>
                </td>
                <td>
                  {{
                    formatDate(
                      detailPesanan?.scanner?.scannedAt,
                      'eeee, dd MMMM yyyy'
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Waktu Scan</strong>
                </td>
                <td>
                  {{ formatDate(detailPesanan?.scanner?.scannedAt, 'HH:mm') }}
                </td>
              </tr>
            </BaseTableDetail>
          </template>

          <template v-else>
            <BaseQRGenerator :base64-string="base64String" />
          </template>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import TabBarListDetail from '~/components/Sribaduga/TabBar/Detail/index.vue'
import { statusSribaduga, listStatusSribaduga } from '@/constant/sribaduga.js'
import { formatDate } from '~/utils'
export default {
  name: 'SribadugaDaftarPesananDetail',
  components: {
    ArrowLeft,
    TabBarListDetail,
  },
  props: {
    detailPesanan: {
      type: Object,
      default: () => ({}),
    },
    detailScanned: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      listTab: [
        {
          detailPage: 'detail-page',
          name: 'Detail Order',
          icon: '/icon/ticket.svg',
        },
      ],
      selectedTabIndex: 0,
      statusSribaduga,
      listStatusSribaduga,
      dataScanned: {},
      viewDetail: 'detail-page',
      base64String: '',
    }
  },
  watch: {
    detailPesanan: {
      handler: 'generateQRCode',
      immediate: true,
    },
  },
  methods: {
    goToBackHandle() {
      this.$router.push({
        path: '/sribaduga/daftar-pesanan',
        query: this.$route.query,
      })
    },
    formatDate,
    showViewDetailPage(namePage) {
      this.viewDetail = namePage
    },
    showColorStatus(resStatus, statusHardCode) {
      const getColorStatus = statusHardCode.find(
        (status) => status.statusCode === resStatus
      )
      return getColorStatus?.color
    },
    showLabelStatus(resStatus, statusHardCode) {
      const getLabelStatus = statusHardCode.find(
        (status) => status.statusCode === resStatus
      )
      return getLabelStatus?.label
    },
    generateQRCode() {
      if (this.detailPesanan?.invoice) {
        const jsonString = JSON.stringify(this.detailPesanan?.invoice)
        const encodedString = Buffer.from(jsonString).toString('base64')
        this.base64String = encodedString
      }
    },
  },
}
</script>
