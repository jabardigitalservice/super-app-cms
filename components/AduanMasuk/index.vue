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
            @input="onSearch"
          />
          <div class="ml-4 flex items-center">
            <jds-icon name="filter-outline" size="sm" fill="#022B55" />
            <p class="ml-2 text-sm text-blue-gray-700">
              Filter :
            </p>
          </div>
        </div>
        <JdsDataTable
          :headers="checkTypeHeaderAduan(typeAduanPage)"
          :items="getListData"
          :loading="$fetchState.pending"
          :pagination="pagination"
          @next-page="nextPage"
          @previous-page="previousPage"
          @page-change="pageChange"
          @per-page-change="perPageChange"
          @change:sort="sortChange"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.status="{ item }">
            <div class="flex items-center">
              <p
                v-show="item?.status"
                class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
              >
                {{ item.status }}
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
import debounce from 'lodash.debounce'
import { formatDate, generateItemsPerPageOptions } from '~/utils'

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
        itemsPerPageOptions: [],
        disabled: true
      },
      query: {
        limit: 5,
        page: 1
        // search: ''
        // start_date: '',
        // end_date: ''
        // sortType: 'desc',
        // sortBy: 'orderedAt'
      },
      sortBy: '',
      sortOrder: '',
      search: '',
      complaintHeader,
      complaintStatus,
      selectedTabIndex: 0,
      aduanSpanHeader,
      typeAduan
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/warga/complaints', {
        params: this.query
      })

      const data = response.data.data
      this.listDataComplaint = data?.data || []

      if (this.listDataComplaint.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }

      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.total_data || 0
      this.pagination.itemsPerPage = data?.page_size || this.query.limit
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    getListData () {
      return this.listDataComplaint.map((item) => {
        return {
          ...item,
          id: item.id,
          name: item?.user?.name || 'dummy',
          category: item.complaint_category.name,
          status: item.complaint_status.name,
          created_at: formatDate(item.created_at || '', 'dd/MM/yyyy HH:mm'),
          status_id: item.complaint_status.id
        }
      })
    }
  },
  watch: {
    query: {
      deep: true,
      handler () {
        this.$fetch()
      }
    }
  },
  mounted () {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
    this.selectedTabHandle(0)
  },
  methods: {
    selectedTabHandle (index) {
      this.selectedTabIndex = index
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

      return `text-${status?.statusColor}` || 'text-gray-100'
    },
    nextPage (value) {
      this.query.page = value
    },
    previousPage (value) {
      this.query.page = value
    },
    pageChange (value) {
      this.query.page = value
    },
    perPageChange (value) {
      if (value) {
        this.query.limit = value
      }
      this.query.page = 1
    },
    sortChange (value) {
      const key = Object.keys(value)[0]
      if (key && value[key] !== 'no-sort') {
        this.query.sortType = value[key]
        this.query.sortBy = key === 'status' ? 'status' : key
      } else {
        this.query.sortType = 'desc'
        this.query.sortBy = 'orderedAt'
      }
    },
    searchData: debounce(function (value) {
      if (value.length > 2) {
        this.query.page = 1
        this.query.search = value
        this.$fetch()
      } else if (value.length === 0) {
        this.query.search = null
        this.$fetch()
      }
    }, 500),
    onSearch (value) {
      this.searchData(value)
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
