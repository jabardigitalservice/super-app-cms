<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList :list-tab="listStatistic" :type-aduan="typeAduanPage" @selected="selectedTabHandle" @button-tab="listTabHandle" />
      </template>
      <template #tab-panel>
        <BaseTabPanel class="px-3 pt-6 pb-4">
          <div class="mb-4 flex justify-between">
            <div class="flex">
              <jds-search
                v-model="search"
                placeholder="Cari ID atau nama lengkap"
                small
                icon
                :button="false"
                class="w-[280px]"
              />
              <div class="ml-4 flex items-center">
                <jds-icon name="filter-outline" size="sm" fill="#022B55" />
                <p class="ml-2 text-sm text-blue-gray-700">
                  Filter :
                </p>
                <jds-select v-model="query.complaint_category_id" placeholder="Kategori Aduan" :options="listCategory" class="!ml-2 mr-2 select-form-complaint !w-[260px]" @change="filterCategoryHandle" />
                <date-picker
                  ref="datepicker"
                  v-model="dateRange"
                  format="DD/MM/YYYY"
                  range
                  range-separator=" - "
                  @close="isShowPopupDate=false"
                  @clear="clearDateRangeHandle"
                  @change="changeDateRangeHandle"
                >
                  <template #icon-calendar>
                    <jds-icon name="calendar-date-outline" size="sm" fill="#069550" />
                  </template>
                  <template #footer="{emit}">
                    <BaseDialogFooter label-button="Pilih" :show-cancel-button="true" @close="closePopupDateHandle()" @submit="filterDateHandle(emit)" />
                  </template>
                </date-picker>
              </div>
            </div>

            <jds-button v-show="typeAduan.aduanDariSpanLapor.props===typeAduanPage" label="Tambah Aduan" variant="primary" @click="isShowPopupAddComplaint=true" />
          </div>
          <JdsDataTable
            :headers="checkTypeHeaderAduan(typeAduanPage)"
            :items="listData"
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
                  :class="getColorText(item?.status_id)"
                >
                  {{ item.status }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.sp4n_created_at="{ item }">
              <div class="flex items-center">
                <p
                  :class="{'bg-gray-100 text-[#FF7500] h-fit w-fit rounded-[32px] px-[10px] py-1 text-xs font-semibold':item.sp4n_created_at==='Belum ada'}"
                >
                  {{ item.sp4n_created_at }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.diverted_to_span_at="{ item }">
              <div class="flex items-center">
                <p
                  :class="{'bg-gray-100 text-[#FF7500] h-fit w-fit rounded-[32px] px-[10px] py-1 text-xs font-semibold':item.diverted_to_span_at==='Belum ada'}"
                >
                  {{ item.diverted_to_span_at }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.sp4n_id="{ item }">
              <div class="flex items-center">
                <p
                  :class="{'bg-gray-100 text-[#FF7500] h-fit w-fit rounded-[32px] px-[10px] py-1 text-xs font-semibold':item.sp4n_id==='Belum ada'}"
                >
                  {{ item.sp4n_id }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{item}">
              <BaseTableAction
                :list-menu-pop-over="menuTableActionHandle(item?.status_id)"
                @detail="goToPageDetailHandle(item)"
                @verify="showPopupConfirmationVerificationComplaintHandle (item)"
                @failed="showPopupConfirmationFailedComplaintHandle(item)"
                @add-span="showPopupInputIdSpanHandle(item)"
              />
            </template>
          </JdsDataTable>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogConfirmation :data-dialog="dataDialog" :show-popup="isShowPopupConfirmationVerification" @close="closePopupHandle()" @submit="submitPopupComplaintHandle" />
    <DialogInformation :data-dialog="dataDialog" :show-popup="isShowPopupInformation" :icon-popup="iconPopup" @close="closePopupInformationHandle()" @submit="submitRetryHandle" />
    <DialogInputTextArea :data-dialog="dataDialog" :show-popup="isShowPopupConfirmationFailedVerification" @close="closePopupHandle()" @submit="submitPopupComplaintHandle" />
    <DialogInputText :data-dialog="dataDialog" :show-popup="isShowPopupInputIdSpan" @close="closePopupHandle()" @submit="submitInputIdSpanHandle" />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

import { formatDate, generateItemsPerPageOptions, formatNumberToUnit, convertToUnit } from '~/utils'
import 'vue2-datepicker/index.css'
import TabBarList from '~/components/Aduan/TabBar/List'

import {
  complaintHeader,
  complaintStatus,
  complaintDivertedToSpanHeader,
  complaintFromSpanHeader,
  typeAduan
} from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'AduanMasuk',
  components: { TabBarList },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: String,
      default: ''
    },
    linkPageDetail: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      menuTableAction: [
        { menu: 'Lihat Detail Aduan', value: 'detail', typeAduan: ['all'] },
        { menu: 'Terverifikasi', value: 'verify', typeAduan: [typeAduan.aduanMasuk.props], complaintStatus: 'unverified' },
        { menu: 'Gagal Diverifikasi', value: 'failed', typeAduan: [typeAduan.aduanMasuk.props], complaintStatus: 'unverified' },
        { menu: 'Tambahkan ID SP4N Lapor', value: 'add-span', typeAduan: [typeAduan.aduanDialihkanSpanLapor.props], complaintStatus: 'no-id-span' }
      ],
      listDataComplaint: [],
      listDataCategory: [],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true
      },
      query: {
        limit: 5,
        page: 1,
        search: null,
        complaint_category_id: null
      },
      sortBy: '',
      sortOrder: '',
      search: '',
      complaintHeader,
      complaintStatus,
      selectedTabIndex: 0,
      complaintDivertedToSpanHeader,
      complaintFromSpanHeader,
      typeAduan,
      isShowPopupDate: false,
      isShowPopupAddComplaint: false,
      listValueStatusComplaint: [],
      listStatisticComplaint: [],
      isShowPopupDateRange: false,
      dateRange: [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()]
    }
  },
  async fetch () {
    try {
      if (!JSON.stringify(Object.keys(this.query)).match('complaint_status_id')) {
        this.query = this.addComplaintStatusFilterHandle()
      }

      const responseListComplaint = await this.$axios.get('/warga/complaints', {
        params: { ...this.query, is_admin: 1 }
      })

      const responseListCategoryComplaint = await this.$axios.get('/warga/complaints/categories')
      const responseListStatisticComplaint = await this.$axios.get('/warga/complaints/statistics')

      this.listDataCategory = responseListCategoryComplaint.data.data
      const listDataStatisticComplaint = responseListStatisticComplaint.data.data
      this.listStatisticComplaint = listDataStatisticComplaint.filter(item => this.complaintStatus[item.id].typeAduan.includes(this.typeAduanPage) && item.id === this.complaintStatus[item.id].id)
      const { data } = responseListComplaint.data

      this.listDataComplaint = data?.data || []
      if (this.listDataComplaint.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }

      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.total_data || 0
      this.pagination.itemsPerPage = data?.page_size || this.query.limit

      this.complaintStatus.total.value = this.getTotalStatistic()
      this.listStatisticComplaint.unshift(this.complaintStatus.total)
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    listData () {
      return this.listDataComplaint.map((item) => {
        if (this.typeAduan.aduanDialihkanSpanLapor.props === this.typeAduanPage) {
          item.complaint_status_id = !item.sp4n_id ? 'no-id-span' : item.complaint_status_id
        }
        return {
          ...item,
          category: item.complaint_category.name,
          status: this.complaintStatus[item.complaint_status.id].name,
          created_at: formatDate(item.created_at || '', 'dd/MM/yyyy HH:mm'),
          status_id: item.complaint_status_id,
          sp4n_id: item.sp4n_id || 'Belum ada',
          diverted_to_span_at: item.diverted_to_span_at ? formatDate(item.diverted_to_span_at || '', 'dd/MM/yyyy HH:mm') : 'Belum ada',
          sp4n_created_at: item.sp4n_created_at ? formatDate(item.sp4n_created_at || '', 'dd/MM/yyyy HH:mm') : 'Belum ada'
        }
      })
    },
    listCategory () {
      return this.listDataCategory.map((item) => {
        return {
          value: item.id, label: item.name
        }
      })
    },
    listStatistic () {
      return this.listStatisticComplaint.map((item) => {
        return {
          ...this.complaintStatus[item.id],
          value: formatNumberToUnit(item.value),
          unit: convertToUnit(item.value),
          icon: this.complaintStatus[item.id].icon,
          name: this.complaintStatus[item.id].name
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
    },
    dateRange () {
      if (!this.isShowPopupDateRange) {
        this.$refs.datepicker.closePopup()
      } else {
        this.$refs.datepicker.openPopup()
      }
    },
    search: debounce(function (value) {
      if (value.length > 2 || value.length === 0) {
        this.query.page = 1
        this.query.search = value.length > 2 ? value : null
        this.$fetch()
      }
    }, 500)
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
          return this.complaintHeader
        case typeAduan.aduanDialihkanSpanLapor.props:
          return this.complaintDivertedToSpanHeader
        case typeAduan.aduanDariSpanLapor.props:
          return this.complaintFromSpanHeader
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
        this.query.sort_by = key
        this.query.sort_type = value[key]
      } else {
        delete this.query.sort_by
        delete this.query.sort_type
      }

      this.$fetch()
    },
    filterCategoryHandle (value) {
      this.query['complaint_category_id[0]'] = value
      this.$fetch()
    },
    goToPageDetailHandle (item) {
      this.$router.push(`${this.linkPageDetail}/${item.id}`)
    },
    getColorText (statusId) {
      switch (statusId) {
        case complaintStatus.unverified.id:
          return 'text-[#FF7500]'
        case complaintStatus.verified.id:
          return 'text-green-700'
        case complaintStatus.failed.id:
          return 'text-[#DD5E5E]'
        default:
          return 'text-gray-900'
      }
    },
    menuTableActionHandle (complaintStatus) {
      return this.menuTableAction.filter(item => item.typeAduan.includes('all') || (item.typeAduan.includes(this.typeAduanPage) && complaintStatus === item.complaintStatus))
    },
    getTotalStatistic () {
      const total = this.listStatisticComplaint.reduce((accumulator, object) => {
        return accumulator + object.value
      }, 0)
      return total
    },
    addComplaintStatusFilterHandle () {
      this.listValueStatusComplaint = Object.values(this.complaintStatus)
      for (let i = 0; i < this.listValueStatusComplaint.length; i++) {
        if (this.listValueStatusComplaint[i].typeAduan.includes(this.typeAduanPage)) {
          this.setQuery({ [`complaint_status_id[${i - 1}]`]: this.listValueStatusComplaint[i].id })
        }
      }
      return this.query
    },
    listTabHandle (status) {
      this.query = { page: 1, limit: 5 }
      if (status !== 'total') {
        this.search = ''
        this.dateRange = [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()]
        this.setQuery({ 'complaint_status_id[0]': status, search: null, complaint_category_id: null, sort_by: 'updated_at', sort_type: 'desc' })
        this.isShowPopupDateRange = false
      }
      this.$fetch()
    },
    filterDateHandle () {
      this.setQuery({ start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'), end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd') })
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    closePopupDateHandle () {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
    },

    setQuery (params) {
      this.query = { ...this.query, ...params }
    },
    clearDateRangeHandle () {
      this.dateRange = [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()]
      this.setQuery({ start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'), end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd') })
      this.isShowPopupDateRange = false
      this.$fetch()
    },
    changeDateRangeHandle () {
      this.isShowPopupDateRange = true
    }
  }
}
</script>

<style>
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

.select-form-complaint .jds-input-text{
  width: 260px !important;
}

.select-form-complaint .jds-popover__content{
  width: 260px !important;
}

</style>
