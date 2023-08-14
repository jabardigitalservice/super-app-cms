<template>
  <BaseTabGroup>
    <template #tab-list>
      <BaseTabList
        class="bg-green-600"
        :list-tab="complaintStatus"
        @selected="selectedTabHandle"
      >
        <template #default="{ dataTab, indexTab }">
          <BaseTab
            v-if="
              dataTab.typeAduan.includes(typeAduanPage) ||
                dataTab.typeAduan.includes('all')
            "
            :class="{ 'ml-2': indexTab > 0 }"
            :selected="indexTab === selectedTabIndex"
            :title="dataTab.name"
          >
            <button class="flex items-start text-sm text-green-100">
              <div
                class="h-[28px] w-[28px] rounded-full"
                :class="
                  indexTab === selectedTabIndex ? 'bg-gray-100' : 'bg-green-800'
                "
              >
                <BaseIconSvg
                  :icon="dataTab.icon"
                  class="icon-tab-content mt-1 !h-[14px] !w-[14px] !shadow-lg"
                  :fill-color="
                    indexTab === selectedTabIndex ? '#16A75C' : '#FFFFFF'
                  "
                  :class="{
                    'icon-tab-selected': indexTab === selectedTabIndex,
                  }"
                />
              </div>

              <div
                class="ml-2 !font-roboto text-green-100"
                :class="{ '!text-gray-700': indexTab === selectedTabIndex }"
              >
                {{ dataTab.name }}
                <p
                  class="text-left !font-roboto text-xl font-medium text-white"
                  :class="{
                    '!text-blue-gray-800': indexTab === selectedTabIndex,
                  }"
                >
                  {{ dataTab.value }}
                  <span
                    class="!font-roboto text-sm font-medium capitalize text-white"
                    :class="{
                      '!text-blue-gray-800': indexTab === selectedTabIndex,
                    }"
                  >{{ dataTab.unit }}</span>
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
          <button class="h-6 w-6 hover:bg-green-600">
            <jds-icon
              name="chevron-left"
              size="xs"
              class="text-green-600 hover:text-white"
            />
          </button>
          <button class="h-6 w-6 hover:bg-green-600 focus:bg-green-600">
            <jds-icon
              name="chevron-right"
              size="xs"
              class="text-green-600 hover:text-white"
            />
          </button>
          <h1
            class="!text-roboto ml-1 text-[21px] font-bold text-blue-gray-800"
          >
            Mei <span class="font-medium text-blue-gray-300">2023</span>
          </h1>
        </div>
        <div class="mt-4 mb-4 flex">
          <jds-search
            value=""
            placeholder="Cari aduan"
            small
            icon
            :button="false"
          />
          <div class="ml-4 flex items-center">
            <jds-icon name="filter-outline" size="sm" fill="#022B55" />
            <p class="ml-2 text-sm text-blue-gray-700">
              Filter :
            </p>
          </div>
        </div>
        <JdsDataTable
          show-select
          :headers="checkTypeHeaderAduan(typeAduanPage)"
          :items="listDataComplaint"
          :pagination="pagination"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.status="{ item }">
            <div class="flex items-center">
              <p
                v-show="item?.status"
                class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
                :class="getColor(item?.status_id)"
              >
                {{ item.status }}
              </p>
            </div>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.action>
            <BaseTableAction :list-menu-pop-over="menuTableAction" />
          </template>
        </JdsDataTable>
      </BaseTabPanel>
    </template>
  </BaseTabGroup>
</template>

<script>
import {
  complaintHeader,
  complaintStatus,
  aduanSpanHeader,
  typeAduan
} from '~/constant/aduan-masuk'
export default {
  name: 'AduanMasuk',
  props: {
    typeAduanPage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      listTab: [
        {
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
        },
        {
          name: 'Dikoordinasikan',
          icon: 'icon-coordination',
          count: 50,
          unit: 'ribu',
          data: [
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Dikoordinasikan'
            },
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Dikoordinasikan'
            },
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Dikoordinasikan'
            }
          ]
        },
        {
          name: 'Dialihkan ke SP4N Lapor',
          icon: 'icon-span',
          count: 1,
          unit: 'juta',
          data: [
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Dialihkan ke SP4N Lapor'
            },
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Dialihkan ke SP4N Lapor'
            },
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Dialihkan ke SP4N Lapor'
            }
          ]
        },
        {
          name: 'Ditolak',
          icon: 'icon-failed',
          count: 25,
          unit: 'ribu',
          data: [
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Ditolak'
            },
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Ditolak'
            },
            {
              complaintId: 'JBR0501202200012',
              fullName: 'Kumaha',
              complaintCategory: 'Kependudukan',
              createdAt: '05/01/2023 - 18:00',
              complaintStatus: 'Ditolak'
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
      selectedTabIndex: 0,
      aduanSpanHeader,
      typeAduan
    }
  },
  async fetch () {
    try {
      let query = {
        // search: this.search,
        page: this.pagination.currentPage,
        limit: this.pagination.totalRows
      }
      if (this.search !== '') {
        query = { search: this.search, ...query }
      }
      const response = await this.$axios.get('/warga/complaints', {
        params: query
      })
      const dataComplaint = response.data.data
      this.listDataComplaint = dataComplaint.data.map((item) => {
        return {
          id: item.id,
          name: item.user.name,
          category: item.complaint_category.name,
          status: item.complaint_status.name,
          created_at: item.created_at,
          status_id: item.complaint_status.id
        }
      })
      this.pagination.currentPage = dataComplaint.page
      this.pagination.totalRows = dataComplaint.total_data
    } catch {
      this.listDataComplaint = []
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
    checkTypeHeaderAduan (type) {
      switch (type) {
        case typeAduan.aduanMasuk.props:
        case typeAduan.aduanDiProses.props:
          return complaintHeader
        case typeAduan.aduanSpanLapor.props:
          return aduanSpanHeader
        default:
          return {}
      }
    },
    getColor (statusId) {
      const status = complaintStatus.find(item => item.id === statusId)

      return status?.statusColor ? status.statusColor : ''
    }
  }
}
</script>

<style sco>
.icon-tab rect {
  fill: #008444 !important;
}

.icon-tab path {
  stroke: white;
}

.icon-tab-selected rect {
  fill: #f5f5f5;
}

.icon-tab-selected path {
  stroke: #16a75c;
}
.jds-data-table {
  border-spacing: 1px !important;
  @apply rounded-lg;
}

.jds-data-table tr th:first-child {
  @apply rounded-tl-lg;
}

.jds-data-table tr th:last-child {
  @apply rounded-tr-lg;
}
.jds-data-table tr th {
  @apply h-[42px] border-r border-white !bg-green-700;
}

.jds-data-table tr td {
  @apply max-w-[435px] border-r border-gray-200;
}
</style>
