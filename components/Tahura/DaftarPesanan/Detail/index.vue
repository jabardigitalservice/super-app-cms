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
                <strong>No.Order</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Jumlah Order</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Tanggal Dipesan</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Tanggal Kunjungan</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Status Order</strong>
              </td>
              <td>adsad</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Informasi Pengunjung" class="text-lato mb-4">
            <tr>
              <td class="w-[180px]">
                <strong>Total Wisatawan Lokal</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Total Wisatawan Asing</strong>
              </td>
              <td>adsad</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Informasi Scan" class="text-lato mb-4">
            <tr>
              <td class="w-[180px]">
                <strong>Discan oleh</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Di Pintu</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Tanggal Scan</strong>
              </td>
              <td>adsad</td>
            </tr>
            <tr>
              <td>
                <strong>Waktu Scan</strong>
              </td>
              <td>adsad</td>
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
export default {
  name: 'TahuraDaftarPesananDetail',
  components: { ArrowLeft, TabBarDetail },
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
      selectedTabIndex: 0
    }
  },
  methods: {
    goToBackHandle () {
      this.$router.back()
    },
    selectedTabHandle (index) {
      this.selectedTabIndex = index
    }
  }
}
</script>
