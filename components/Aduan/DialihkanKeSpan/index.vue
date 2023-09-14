<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList :list-tab="listStatistic" :type-aduan="typeAduanPage" @selected="selectedTabHandle" @button-tab="listTabHandle" />
      </template>
      <template #tab-panel>
        <BaseTabPanel class="px-3 pt-6 pb-4">
          <div class="mb-4 flex">
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
              <jds-select placeholder="Kategori Aduan" :options="listCategory" class="!ml-2 mr-2" @change="filterCategoryHandle" />
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
            :headers="spanDivertedHeader"
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
            <template #item.span_id="{ item }">
              <div class="flex items-center">
                <p
                  :class="{'bg-gray-100 text-[#FF7500] h-fit w-fit rounded-[32px] px-[10px] py-1 text-xs font-semibold':item.span_id==='Belum ada'}"
                >
                  {{ item.span_id }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{item}">
              <BaseTableAction
                :list-menu-pop-over="menuTableActionHandle(item)"
                @detail="goToPageDetailHandle(item)"
              />
            </template>
          </JdsDataTable>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogInputText title="=" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { formatDate, generateItemsPerPageOptions, formatNumberToUnit, convertToUnit } from '~/utils'
import 'vue2-datepicker/index.css'
import TabBarList from '~/components/Aduan/TabBar/List'

import {
  complaintStatus,
  spanDivertedHeader,
  typeAduan
} from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'AduanDalihkanKeSpan',
  components: { TabBarList },
  mixins: [popupAduanMasuk],
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
        { menu: 'Tambahkan ID SP4N Lapor', value: 'add-span' }
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
      complaintStatus,
      selectedTabIndex: 0,
      spanDivertedHeader,
      typeAduan,
      isShowPopupDate: false,
      listValueStatusComplaint: [],
      listStatisticComplaint: [],
      dateRange: [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()]
    }
  },
  async fetch () {
    try {
      this.query['complaint_status_id[0]'] = 'diverted_to_span'
      const responseListComplaint = await this.$axios.get('/warga/complaints', {
        params: this.query
      })

      const responseListCategoryComplaint = await this.$axios.get('/warga/complaints/categories')
      const responseListStatisticComplaint = await this.$axios.get('/warga/complaints/statistics')

      this.listDataCategory = responseListCategoryComplaint.data.data
      const listDataStatisticComplaint = responseListStatisticComplaint.data.data
      this.listStatisticComplaint = listDataStatisticComplaint.filter(item => item.id === this.complaintStatus.diverted_to_span.id)
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
        return {
          ...item,
          category: item.complaint_category.name,
          created_at: formatDate(item.created_at || '', 'dd/MM/yyyy HH:mm'),
          status_id: item.complaint_status.id,
          span_id: item.sp4n_id || 'Belum ada',
          diverted_to_span_at: item.diverted_to_span_at ? formatDate(item.diverted_to_span_at || '', 'dd/MM/yyyy HH:mm') : 'Belum ada'
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
      this.$refs.datepicker.openPopup()
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
      this.query = { limit: 5, page: 1 }
      if (key && value[key] !== 'no-sort') {
        this.setQuery({ sort_by: key, sort_type: value[key] })
        switch (key) {
          case 'category' :
            this.setQuery({ sort_by: 'complaint_category_id' })
            break
          case 'status' :
            this.setQuery({ sort_by: 'complaint_status_id' })
            break
        }
      }
      this.$fetch()
    },
    filterCategoryHandle (value) {
      this.query.complaint_category_id = value
      this.$fetch()
    },
    goToPageDetailHandle (item) {
      this.$router.push(`/aduan/dialihkan-ke-span-lapor/detail/${item.id}`)
    },
    menuTableActionHandle (item) {
      if (item?.diverted_to_span_at !== 'Belum ada' && item?.span_id !== 'Belum ada') {
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
    listTabHandle (status) {
      this.query = { page: 1, limit: 5 }
      if (status !== 'total') {
        this.setQuery({ 'complaint_status_id[0]': status })
      }
      this.$fetch()
    },
    filterDateHandle () {
      this.setQuery({ start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'), end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd') })
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    closePopupDateHandle () {
      this.$refs.datepicker.closePopup()
    },
    setQuery (params) {
      this.query = { ...this.query, ...params }
    }
  }
}
</script>
