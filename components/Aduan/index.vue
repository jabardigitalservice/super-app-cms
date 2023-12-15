<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList
          :list-tab="listStatistic"
          :type-aduan="typeAduanPage"
          @selected="selectedTabHandle"
          @button-tab="listTabHandle"
        />
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
                <jds-icon
                  name="filter-outline"
                  size="sm"
                  fill="#022B55"
                  class="flex-shrink-0"
                />
                <p class="ml-2 text-sm text-blue-gray-700">
                  Filter :
                </p>
                <jds-select
                  v-model="query.complaint_category_id"
                  placeholder="Kategori Aduan"
                  :options="listCategory"
                  class="select-form-complaint !ml-2 mr-2 !w-[260px]"
                  @change="filterCategoryHandle"
                />
                <date-picker
                  ref="datepicker"
                  v-model="dateRange"
                  format="DD/MM/YYYY"
                  range
                  range-separator=" - "
                  @close="isShowPopupDate = false"
                  @clear="clearDateRangeHandle"
                  @change="changeDateRangeHandle"
                >
                  <template #icon-calendar>
                    <jds-icon
                      name="calendar-date-outline"
                      size="sm"
                      fill="#069550"
                    />
                  </template>
                  <template #footer="{ emit }">
                    <BaseDialogFooter
                      label-button-submit="Pilih"
                      :show-cancel-button="true"
                      @close="closePopupDateHandle()"
                      @submit="filterDateHandle(emit)"
                    />
                  </template>
                </date-picker>
              </div>
            </div>

            <jds-button
              v-show="typeAduan.aduanDariSpanLapor.props === typeAduanPage"
              label="Tambah Aduan"
              variant="primary"
              @click="isShowPopupAddComplaint = true"
            />
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
                  :class="{
                    'h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold text-[#FF7500]':
                      item.sp4n_created_at === 'Belum ada',
                  }"
                >
                  {{ item.sp4n_created_at }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.diverted_to_span_at="{ item }">
              <div class="flex items-center">
                <p
                  :class="{
                    'h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold text-[#FF7500]':
                      item.diverted_to_span_at === 'Belum ada',
                  }"
                >
                  {{ item.diverted_to_span_at }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.sp4n_id="{ item }">
              <div class="flex items-center">
                <p
                  :class="{
                    'h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold text-[#FF7500]':
                      item.sp4n_id === 'Belum ada',
                  }"
                >
                  {{ item.sp4n_id }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{ item }">
              <BaseTableAction
                :list-menu-pop-over="menuTableActionHandle(item?.status_id)"
                @detail="goToPageDetailHandle(item)"
                @verify="showPopupConfirmationVerificationComplaintHandle(item)"
                @failed="showPopupConfirmationFailedComplaintHandle(item)"
                @add-span="showPopupInputIdSpanHandle(item)"
                @process-complaint="showPopupProcessComplaintHandle(item)"
                @followup-complaint="showPopupFollowupComplaint(item)"
              />
            </template>
          </JdsDataTable>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogConfirmation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationVerification"
      @close="closePopupHandle()"
      @submit="submitPopupComplaintHandle"
    />
    <DialogInformation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupInformation"
      :icon-popup="iconPopup"
      @close="closePopupInformationHandle()"
      @submit="submitRetryHandle"
    />
    <DialogInputTextArea
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationFailedVerification"
      @close="closePopupHandle()"
      @submit="submitPopupComplaintHandle"
    />
    <DialogInputText
      :data-dialog="dataDialog"
      :show-popup="isShowPopupInputIdSpan"
      @close="closePopupHandle()"
      @submit="submitInputIdSpanHandle"
    />
    <DialogAddComplaint
      :show-popup="isShowPopupAddComplaint"
      @close="closePopupAddComplaint()"
    />
    <DialogProcessComplaint
      :data-dialog="dataDialog"
      :show-popup="isShowPopupProcessComplaint"
      @close="closePopupHandle()"
      @submit="submitProcessComplaint"
    />
    <DialogFollowupComplaint
      :data-dialog="dataDialog"
      :show-popup="isShowPopupFollowupComplaint"
      @close="isShowPopupFollowupComplaint = false"
      @submit="submitFollowupComplaint"
      @open="isShowPopupFollowupComplaint=true"
    />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

import {
  formatDate,
  generateItemsPerPageOptions,
  formatNumberToUnit,
  convertToUnit
} from '~/utils'
import 'vue2-datepicker/index.css'
import TabBarList from '~/components/Aduan/TabBar/List'
import DialogAddComplaint from '~/components/Aduan/Dialog/AddComplaint'
import DialogProcessComplaint from '~/components/Aduan/Dialog/ProcessComplaint'
import DialogFollowupComplaint from '~/components/Aduan/Dialog/FollowupComplaint'

import {
  complaintHeader,
  complaintStatus,
  complaintDivertedToSpanHeader,
  complaintFromSpanHeader,
  determiningAuthorityHeader,
  typeAduan,
  complaintSource
} from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'AduanMasuk',
  components: {
    TabBarList,
    DialogAddComplaint,
    DialogProcessComplaint,
    DialogFollowupComplaint
  },
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
        {
          menu: 'Terverifikasi',
          value: 'verify',
          typeAduan: [typeAduan.aduanMasuk.props],
          complaintStatus: complaintStatus.unverified.id
        },
        {
          menu: 'Gagal Diverifikasi',
          value: 'failed',
          typeAduan: [typeAduan.aduanMasuk.props],
          complaintStatus: complaintStatus.unverified.id
        },
        {
          menu: 'Tambahkan ID SP4N Lapor',
          value: 'add-span',
          typeAduan: [typeAduan.aduanDialihkanSpanLapor.props],
          complaintStatus: 'no-id-span'
        },
        {
          menu: 'Proses Aduan',
          value: 'process-complaint',
          typeAduan: [typeAduan.penentuanKewenangan.props],
          complaintStatus: complaintStatus.verified.id
        },
        {
          menu: 'Tindaklanjuti Aduan',
          value: 'followup-complaint',
          typeAduan: [typeAduan.penginputanIkp.props],
          complaintStatus: complaintStatus.coordinated.id
        }
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
      selectedTabIndex: 0,
      complaintDivertedToSpanHeader,
      complaintFromSpanHeader,
      determiningAuthorityHeader,
      typeAduan,
      isShowPopupDate: false,
      isShowPopupAddComplaint: false,
      listValueStatusComplaint: [],
      listStatisticComplaint: [],
      isShowPopupDateRange: false,
      complaintSource,
      dateRange: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date()
      ]
    }
  },
  async fetch () {
    try {
      if (
        !JSON.stringify(Object.keys(this.query)).match('complaint_status_id')
      ) {
        this.query = this.addComplaintStatusFilterHandle()
      }

      if (this.typeAduan.aduanDariSpanLapor.props === this.typeAduanPage) {
        this.setQuery({ complaint_source: 'sp4n' })
      }

      // default sort by updated date
      if (this.checkPropsSortByUpdatedDate() && !this.query.sort_by) {
        this.setQuery({ sort_by: 'updated_at' })
      }

      // handle list data complaint
      const responseListComplaint = await this.$axios.get('/warga/complaints', {
        params: { ...this.query, is_admin: 1 }
      })
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

      // handle list data category
      const responseListCategoryComplaint = await this.$axios.get(
        '/warga/complaints/categories'
      )

      this.listDataCategory = responseListCategoryComplaint.data.data

      // handle data statistic complaint
      const responseListStatisticComplaint = await this.$axios.get(
        '/warga/complaints/statistics'
      )
      const listDataStatisticComplaint =
        responseListStatisticComplaint.data.data
      const listComplaintStatus = this.getStatusComplaintByComplaintType()
      this.listStatisticComplaint = listDataStatisticComplaint.filter(
        statisticComplaint =>
          listComplaintStatus.find(
            complaintStatus => statisticComplaint.id === complaintStatus.id
          )
      )
      complaintStatus.total.value =
        this.typeAduan.aduanDariSpanLapor.props === this.typeAduanPage
          ? this.pagination.totalRows
          : this.getTotalStatistic()
      this.listStatisticComplaint.unshift(complaintStatus.total)
      if (this.listStatisticComplaint.length === 2) {
        this.listStatisticComplaint.pop()
      }
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    listData () {
      return this.listDataComplaint.map((item) => {
        if (
          this.typeAduan.aduanDialihkanSpanLapor.props === this.typeAduanPage
        ) {
          item.complaint_status_id = !item.sp4n_id
            ? 'no-id-span'
            : item.complaint_status_id
        }
        return {
          ...item,
          category: item.complaint_category.name,
          status: complaintStatus[item.complaint_status.id].name,
          created_at_format: formatDate(item.created_at, 'dd/MM/yyyy HH:mm'),
          created_at_api: item.created_at,
          status_id: item.complaint_status_id,
          sp4n_id: item.sp4n_id || 'Belum ada',
          diverted_to_span_at: item.diverted_to_span_at
            ? formatDate(item.diverted_to_span_at || '', 'dd/MM/yyyy HH:mm')
            : 'Belum ada',
          sp4n_created_at: item.sp4n_created_at
            ? formatDate(item.sp4n_created_at || '', 'dd/MM/yyyy HH:mm')
            : 'Belum ada',
          complaint_source_name: item?.complaint_source
            ? this.getComplaintSource(item).name
            : '',
          complaint_source_id: item?.complaint_source
            ? this.getComplaintSource(item).id
            : ''
        }
      })
    },
    listCategory () {
      return this.listDataCategory.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    },
    listStatistic () {
      return this.listStatisticComplaint.map((item) => {
        return {
          ...complaintStatus[item.id],
          value: formatNumberToUnit(item.value),
          unit: convertToUnit(item.value),
          icon: complaintStatus[item.id].icon,
          name: complaintStatus[item.id].name
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
        case typeAduan.penentuanKewenangan.props:
          return this.determiningAuthorityHeader
        case typeAduan.penginputanIkp.props:
          return this.complaintHeader
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
        if (key === 'created_at_format') {
          this.query.sort_by = 'created_at'
        } else {
          this.query.sort_by = key
        }

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
      const statusColor = complaintStatus[statusId].statusColor.find(
        statusColor => statusColor.typeAduan === this.typeAduanPage
      )
      switch (statusColor.color) {
        case 'yellow':
          return 'text-[#FF7500]'
        case 'green':
          return 'text-green-700'
        case 'red':
          return 'text-[#DD5E5E]'
        case 'light-blue':
          return 'text-[#1E88E5]'
        case 'dark-blue':
          return 'text-blue-gray-500'
        case 'purple':
          return 'text-[#691B9A]'
        default:
          return 'text-gray-900'
      }
    },
    menuTableActionHandle (complaintStatus) {
      return this.menuTableAction.filter(
        item =>
          item.typeAduan.includes('all') ||
          (item.typeAduan.includes(this.typeAduanPage) &&
            complaintStatus === item.complaintStatus)
      )
    },
    getTotalStatistic () {
      const total = this.listStatisticComplaint.reduce(
        (accumulator, object) => {
          return accumulator + object.value
        },
        0
      )
      return total
    },
    addComplaintStatusFilterHandle () {
      const listValueStatusComplaint = this.getStatusComplaintByComplaintType()
      for (let i = 0; i < listValueStatusComplaint.length; i++) {
        this.setQuery({
          [`complaint_status_id[${i - 1}]`]: listValueStatusComplaint[i].id
        })
      }
      return this.query
    },
    listTabHandle (status) {
      this.query = { page: 1, limit: 5 }
      if (status !== 'total') {
        this.search = ''
        this.dateRange = [
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          new Date()
        ]
        this.setQuery({
          'complaint_status_id[0]': status,
          search: null,
          complaint_category_id: null,
          sort_by: 'updated_at',
          sort_type: 'desc'
        })
        this.isShowPopupDateRange = false
      }
      this.$fetch()
    },
    filterDateHandle () {
      this.setQuery({
        start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd')
      })
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    closePopupDateHandle () {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
    },
    closePopupAddComplaint () {
      this.isShowPopupAddComplaint = false
      this.$fetch()
    },
    setQuery (params) {
      this.query = { ...this.query, ...params }
    },
    clearDateRangeHandle () {
      this.dateRange = [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date()
      ]
      this.setQuery({
        start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd')
      })
      this.isShowPopupDateRange = false
      this.$fetch()
    },
    changeDateRangeHandle () {
      this.isShowPopupDateRange = true
    },
    checkPropsSortByUpdatedDate () {
      const listPropsSortByUpdatedDate = [
        this.typeAduan.penentuanKewenangan.props,
        this.typeAduan.penginputanIkp.props
      ]
      return listPropsSortByUpdatedDate.includes(this.typeAduanPage)
    },
    getStatusComplaintByComplaintType () {
      return Object.values(complaintStatus).filter(item =>
        item.typeAduan.includes(this.typeAduanPage)
      )
    },
    getComplaintSource (dataComplaint) {
      if (dataComplaint.complaint_source === 'sp4n') {
        return this.complaintSource.span
      }
      return this.complaintSource[dataComplaint.complaint_source]
    }
  }
}
</script>

<style>
.icon-tab rect {
  fill: #008444 !important;
}

.icon-tab path {
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

.select-form-complaint .jds-input-text {
  width: 260px !important;
}

.select-form-complaint .jds-popover__content {
  width: 260px !important;
}
</style>
