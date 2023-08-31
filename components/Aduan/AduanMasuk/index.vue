<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList :list-tab="getListStatistic" :type-aduan="typeAduanPage" @selected="selectedTabHandle" @button-tab="listTabHandle" />
      </template>
      <template #tab-panel>
        <BaseTabPanel class="px-3 pt-6 pb-4">
          <div class="mb-4 flex">
            <jds-search
              value=""
              placeholder="Cari ID atau nama lengkap"
              small
              icon
              :button="false"
              class="w-[280px]"
              @input="onSearch"
            />
            <div class="ml-4 flex items-center">
              <jds-icon name="filter-outline" size="sm" fill="#022B55" />
              <p class="ml-2 text-sm text-blue-gray-700">
                Filter :
              </p>
              <jds-select placeholder="Kategori Aduan" :options="getListCategory" class="!ml-2 mr-2" @change="filterCategoryHandle" />
              <date-picker
                ref="datepicker"
                v-model="dateRange"
                format="DD/MM/YYYY"
                range
                range-separator=" - "
                @close="isShowPopupDate=false"
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
                  :class="getColorText(item?.status_id)"
                >
                  {{ item.status }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{item}">
              <BaseTableAction
                :list-menu-pop-over="menuTableActionHandle(item?.status_id)"
                @detail="goToPageDetailHandle(item)"
              />
            </template>
          </JdsDataTable>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <!-- component will use when it has integrates with API -->
    <!-- <DialogConfirmation :data-dialog="dataDialog" :show-popup="popup.confirmationVerification" @close="closePopupHandle()" /> -->
    <!-- <DialogInputTextArea :data-dialog="dataDialog" :show-popup="popup.confirmationFailedVerification" @close="closePopupHandle()" /> -->
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
// import DatePicker from 'vue2-datepicker'
import { formatDate, generateItemsPerPageOptions, formatNumberToUnit, convertToUnit } from '~/utils'
import aduanMasuk from '~/mixins/aduan-masuk'
import 'vue2-datepicker/index.css'
import TabBarList from '~/components/Aduan/TabBar/List'

import {
  complaintHeader,
  complaintStatus,
  aduanSpanHeader,
  typeAduan
} from '~/constant/aduan-masuk'

export default {
  name: 'AduanMasuk',
  components: { TabBarList },
  mixins: [aduanMasuk],
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
        page: 1
      },
      sortBy: '',
      sortOrder: '',
      search: '',
      complaintHeader,
      complaintStatus,
      selectedTabIndex: 0,
      aduanSpanHeader,
      typeAduan,
      isShowPopupDate: false,
      listValueStatusComplaint: [],
      listStatisticComplaint: [],
      dateRange: [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()]
    }
  },
  async fetch () {
    try {
      if (!JSON.stringify(Object.keys(this.query)).match('complaint_status_id')) {
        this.getComplaintStatusHandle()
      }
      const responseListComplaint = await this.$axios.get('/warga/complaints', {
        params: this.query
      })

      const responseListCategoryComplaint = await this.$axios.get('/warga/complaints/categories')
      const responseListStatisticComplaint = await this.$axios.get('/warga/complaints/statistics')

      this.listDataCategory = responseListCategoryComplaint.data.data
      this.listStatisticComplaint = responseListStatisticComplaint.data.data
      this.listStatisticComplaint = this.listStatisticComplaint.filter(({ id: idStatic }) => this.listValueStatusComplaint.some(({ id: idStatus }) => idStatus === idStatic))

      const data = responseListComplaint.data.data
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
    getListData () {
      return this.listDataComplaint.map((item) => {
        return {
          ...item,
          id: item.id,
          name: item?.user?.name || '-',
          category: item.complaint_category.name,
          status: this.complaintStatus[item.complaint_status.id].name,
          created_at: formatDate(item.created_at || '', 'dd/MM/yyyy HH:mm'),
          status_id: item.complaint_status.id
        }
      })
    },
    getListCategory () {
      return this.listDataCategory.map((item) => {
        return {
          value: item.id, label: item.name
        }
      })
    },
    getListStatistic () {
      return this.listStatisticComplaint.map((item) => {
        return {
          ...item,
          icon: this.complaintStatus[item.id].icon,
          name: this.complaintStatus[item.id].name,
          typeAduan: this.complaintStatus[item.id].typeAduan,
          value: formatNumberToUnit(item.value),
          unit: convertToUnit(item.value)
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
      this.$refs.datepicker.openPopup()
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
        this.query.sort_by = key
        this.query.sort_type = value[key]
        switch (key) {
          case 'category' :
            this.query.sort_by = 'complaint_category_id'
            this.query.sort_type = value[key]
            break
          case 'name' :
            this.query.sort_by = 'user_name'
            this.query.sort_type = value[key]
            break
          case 'status' :
            this.query.sort_by = 'complaint_status_id'
            this.query.sort_type = value[key]
            break
        }
      } else {
        delete this.query.sort_by
        delete this.query.sort_type
      }

      this.$fetch()
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
    filterCategoryHandle (value) {
      this.query.complaint_category_id = value
      this.$fetch()
    },
    goToPageDetailHandle (item) {
      this.$router.push(`/aduan/aduan-masuk/detail/${item.id}`)
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
    menuTableActionHandle (statusComplaint) {
      if (statusComplaint !== 'unverified') {
        return this.menuTableAction.filter(item => item.value === 'detail')
      } else {
        return this.menuTableAction
      }
    },
    getTotalStatistic () {
      const total = this.listStatisticComplaint.reduce((accumulator, object) => {
        return accumulator + object.value
      }, 0)
      return total
    },
    getComplaintStatusHandle () {
      this.listValueStatusComplaint = Object.values(this.complaintStatus)
      this.listValueStatusComplaint = this.listValueStatusComplaint.filter(item => item.typeAduan.includes(this.typeAduanPage))
      this.listValueStatusComplaint.forEach((item, index) => {
        this.query[`complaint_status_id[${index}]`] = item.id
      })
    },
    listTabHandle (status) {
      this.query.page = 1
      this.getComplaintStatusHandle()
      if (status !== 'total') {
        for (let i = 0; i < this.listStatisticComplaint.length; i++) {
          if (this.query[`complaint_status_id[${i}]`] !== status) {
            delete this.query[`complaint_status_id[${i}]`]
          }
        }
      }
      this.$fetch()
    },
    filterDateHandle () {
      this.query.start_date = formatDate(this.dateRange[0], 'yyyy-MM-dd')
      this.query.end_date = formatDate(this.dateRange[1], 'yyyy-MM-dd')
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    closePopupDateHandle () {
      this.$refs.datepicker.closePopup()
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

</style>
