<template>
  <BaseTabGroup>
    <template #tab-list>
      <BaseTabList class="bg-green-600" :list-tab="listTab" @selected="selectedTabHandle">
        <template #default="{dataTab,indexTab}">
          <BaseTab :class="{'ml-2':indexTab>0}" :selected="(indexTab===selectedTabIndex)" :title="dataTab.name">
            <button class="flex items-start text-sm text-green-100 ">
              <component :is="dataTab.icon" class="mt-1 icon-tab-content" :class="{'icon-tab-selected':(indexTab===selectedTabIndex)}" />
              <div class="ml-2 text-green-100 !font-roboto" :class="{'!text-gray-700':(indexTab===selectedTabIndex)}">
                {{ dataTab.name }}<p class="text-xl !font-roboto text-white font-medium text-left" :class="{'!text-blue-gray-800':(indexTab===selectedTabIndex)}">
                  {{ dataTab.count }} <span class="text-sm !font-roboto text-white font-medium capitalize" :class="{'!text-blue-gray-800':(indexTab===selectedTabIndex)}">{{ dataTab.unit }}</span>
                </p>
              </div>
            </button>
          </BaseTab>
        </template>
      </BaseTabList>
    </template>
    <template #tab-panel>
      <BaseTabPanel class="px-3 pt-6 pb-4">
        <div class="flex items-center">
          <button class="w-6 h-6 hover:bg-green-600">
            <jds-icon name="chevron-left" size="xs" class="text-green-600 hover:text-white" />
          </button>
          <button class="w-6 h-6 hover:bg-green-600 focus:bg-green-600">
            <jds-icon name="chevron-right" size="xs" class="text-green-600 hover:text-white" />
          </button>
          <h1 class="text-[21px] !text-roboto text-blue-gray-800 font-bold ml-1">
            Mei <span class="text-blue-gray-300 font-medium">2023</span>
          </h1>
        </div>
        <div class="flex mt-4 mb-4">
          <jds-search value="" placeholder="Cari aduan" small icon :button="false" />
          <div class="ml-4 flex items-center">
            <jds-icon name="filter-outline" size="sm" fill="#022B55" />
            <p class="text-sm text-blue-gray-700 ml-2">
              Filter :
            </p>
          </div>
        </div>
        <JdsDataTable
          show-select
          :headers="complaintHeader"
          :items="listDataComplaint"
          :pagination="pagination"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.complaintStatus="{item}">
            <div class="flex items-center">
              <p
                v-show="item?.complaintStatus"
                :class="{
                  'h-fit w-fit rounded-[32px] bg-gray-100 text-xs font-semibold px-[10px] py-1':true,
                  'text-[#FF9500]': item.complaintStatus == complaintStatus.waiting.status,
                  'text-[#1E88E5]': item.complaintStatus == complaintStatus.success.status,
                  'text-[#DD5E5E]' : item.complaintStatus == complaintStatus.failed.status
                }"
              >
                {{ item.complaintStatus || "-" }}
              </p>
            </div>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.action="{item}">
            <BaseTableAction :list-menu-pop-over="menuTableAction" @detail="goToPageDetailHandle(item)" />
          </template>
        </JdsDataTable>
      </BaseTabPanel>
    </template>
  </BaseTabGroup>
</template>

<script>
import IconAllComplaint from '~/assets/icon/complaint-icon.svg?inline'
import IconWaitVerification from '~/assets/icon/complaint-wait-verify-icon.svg?inline'
import IconVerification from '~/assets/icon/complaint-verify-icon.svg?inline'
import IconFailed from '~/assets/icon/complaint-failed-icon.svg?inline'
import { complaintHeader, complaintStatus } from '~/constant/aduan-masuk'
export default {
  name: 'AduanMasuk',
  components: { IconAllComplaint, IconWaitVerification, IconVerification, IconFailed },
  data () {
    return {
      listTab: [{
        name: 'Semua Aduan',
        icon: 'icon-all-complaint',
        count: 1.25,
        unit: 'juta',
        selected: false,
        data: [
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Asep Kumaha',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Menunggu Verifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Asep Kumaha',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Terverifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Asep Kumaha',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Gagal Diverifikasi'
          }
        ]
      },
      {
        name: 'Menunggu Verifikasi',
        icon: 'icon-wait-verification',
        count: 50,
        unit: 'ribu',
        data: [
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Budi Aja',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Menunggu Verifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Budi aja',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Menunggu Verifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Budi aja',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Menunggu Verifikasi'
          }
        ]
      },
      {
        name: 'Terverifikasi',
        icon: 'icon-verification',
        count: 1,
        unit: 'juta',
        data: [
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Asep',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Terverifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Asep',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Terverifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Asep',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Terverifikasi'
          }
        ]
      },
      {
        name: 'Gagal Diverifikasi',
        icon: 'icon-failed',
        count: 25,
        unit: 'ribu',
        data: [
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Kumaha',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Gagal Diverifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Kumaha',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Gagal Diverifikasi'
          },
          {
            complaintId: 'JBR0501202200012',
            fullName: 'Kumaha',
            complaintCategory: 'Kependudukan',
            createdAt: '05/01/2023 - 18:00',
            complaintStatus: 'Gagal Diverifikasi'
          }
        ]
      }
      ],
      menuTableAction: [
        { menu: 'Lihat Detail Aduan', value: 'detail' },
        { menu: 'Terverifikasi', value: 'verify' },
        { menu: 'Gagal Diverifikasi', value: 'failed' }
      ],
      listDataComplaint: [],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: [5, 10, 20]
      },
      sortBy: '',
      sortOrder: '',
      complaintHeader,
      complaintStatus,
      selectedTabIndex: 0
    }
  },
  mounted () {
    this.selectedTabHandle(0)
  },
  methods: {
    selectedTabHandle (index) {
      this.selectedTabIndex = index
      this.listDataComplaint = this.listTab[index].data
    },
    goToPageDetailHandle (item) {
      this.$router.push(`/daftar-aduan-masuk/detail-aduan/${item.complaintId}`)
    }
  }
}
</script>

<style scoped>
  .icon-tab rect{
    fill: #008444 !important;
  }

  .icon-tab path{
    stroke: white;
  }

  .icon-tab-selected rect{
    fill: #F5F5F5;
  }

  .icon-tab-selected path{
    stroke: #16A75C;
  }
  .jds-data-table{
    border-spacing: 1px !important;
    @apply rounded-lg;
  }

  .jds-data-table tr th:first-child{
    @apply rounded-tl-lg;
  }

  .jds-data-table tr th:last-child{
    @apply rounded-tr-lg;
  }
  .jds-data-table tr th {
    @apply h-[42px] border-r border-white !bg-green-700;
  }

  .jds-data-table tr td {
    @apply border-r border-gray-200 max-w-[435px];
  }

</style>
