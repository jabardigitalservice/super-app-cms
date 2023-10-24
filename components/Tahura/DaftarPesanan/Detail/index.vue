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
        <TabBarDetail :list-tab="listTab" @selected="selectedTabHandle" />
      </template>
      <template #tab-panel>
        <BaseTabPanel
          class="layout-content h-[calc(100vh-280px)] overflow-y-auto py-4 px-[19px]"
        >
          <BaseTableDetail header="Informasi Order" class="text-lato mb-4">
            <tr>
              <td class="w-[180px]">
                <strong>Nama Pemesan</strong>
              </td>
              <td>{{ detailPesanan.orderBy }}</td>
            </tr>
            <tr>
              <td class="w-[180px]">
                <strong>No.Order</strong>
              </td>
              <td>{{ detailPesanan.invoice }}</td>
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
              <td>
                <strong>Status Order</strong>
              </td>
              <td>
                <p
                  v-show="detailPesanan?.statusCode"
                  class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
                  :class="statusTahura[detailPesanan.statusCode]?.color"
                >
                  {{ statusTahura[detailPesanan.statusCode]?.label }}
                </p>
              </td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Informasi Pengunjung" class="text-lato mb-4">
            <tr v-for="(item, index) in detailPesanan.categories" :key="index">
              <td class="w-[180px]">
                <strong>{{ item.name }}</strong>
              </td>
              <td>{{ item.quantity ? item.quantity : "-" }}</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail
            v-if="
              detailPesanan?.statusCode === 'scanned' &&
                detailScanned?.scannedStatus === 'success'
            "
            header="Informasi Scan"
            class="text-lato mb-4"
          >
            <tr>
              <td class="w-[180px]">
                <strong>Discan oleh</strong>
              </td>
              <td>{{ detailScanned?.scannedBy }}</td>
            </tr>
            <tr>
              <td>
                <strong>Di Pintu</strong>
              </td>
              <td>{{ detailScanned?.gateName }}</td>
            </tr>
            <tr>
              <td>
                <strong>Tanggal Scan</strong>
              </td>
              <td>{{ formatDate(detailScanned?.scannedAt, "eeee, dd MMMM yyyy") }}</td>
            </tr>
            <tr>
              <td>
                <strong>Waktu Scan</strong>
              </td>
              <td>{{ formatDate(detailScanned?.scannedAt, "HH:mm") }}</td>
            </tr>
          </BaseTableDetail>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import TabBarDetail from '~/components/Tahura/TabBar/Detail/index.vue'
import { statusTahura } from '@/constant/tahura.js'
import { formatDate } from '~/utils'
export default {
  name: 'TahuraDaftarPesananDetail',
  components: { ArrowLeft, TabBarDetail },
  props: {
    detailPesanan: {
      type: Object,
      default: () => {}
    },
    detailScanned: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      listTab: [
        {
          name: 'Detail Order',
          icon: '/icon/ticket.svg'
        },
        {
          name: 'QR Code',
          icon: '/icon/qr-code.svg'
        }
      ],
      selectedTabIndex: 0,
      statusTahura,
      dataScanned: {}
    }
  },
  methods: {
    goToBackHandle () {
      this.$router.back()
    },
    selectedTabHandle (index) {
      console.log(index)
      this.selectedTabIndex = index
    },
    formatDate
  }
}
</script>
