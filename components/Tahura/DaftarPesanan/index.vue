<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarListTahura
          :list-tab="listStatusTahura"
          :tab-index="query.tabIndex"
          @selected="selectedTabHandle"
          @button-tab="listTabHandle"
        />
      </template>
      <template #tab-panel>
        <BaseTabPanel class="px-3 pt-6 pb-4">
          <div class="mb-4 flex justify-between">
            <div class="flex">
              <jds-search
                v-model="q"
                placeholder="Cari nomor order"
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

                <date-picker
                  ref="datepicker"
                  v-model="dateRange"
                  format="DD/MM/YYYY"
                  range
                  range-separator=" - "
                  :disabled-date="disabledRange"
                  @clear="clearDateRangeHandle"
                  @change="changeDateRangeHandle"
                  @input="checkMaxDate"
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
          </div>

          <JdsDataTable
            :headers="headerTableList"
            :items="listData"
            :loading="$fetchState.pending"
            :pagination="pagination"
            @next-page="pageChange"
            @previous-page="pageChange"
            @page-change="pageChange"
            @per-page-change="perPageChange"
            @change:sort="sortChange"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.statusCode="{ item }">
              <div class="flex items-center">
                <p
                  v-show="item?.statusCode"
                  class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
                  :class="statusTahura[item.statusCode].color"
                >
                  {{ statusTahura[item.statusCode].label }}
                </p>
              </div>
            </template>

            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{ item }">
              <BaseButton class="w-4" @click="goToDetail(item)">
                <EyesIcon class="h-4 w-4" />
              </BaseButton>
            </template>
          </JdsDataTable>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { formatDate, generateItemsPerPageOptions, resetQueryParamsUrl, formatedStringDate } from '~/utils'
import 'vue2-datepicker/index.css'
import EyesIcon from '~/assets/icon/eyes.svg?inline'
import TabBarListTahura from '~/components/Tahura/TabBar/List/index.vue'
import { statusTahura, listStatusTahura } from '@/constant/tahura.js'
export default {
  name: 'DaftarPesananTahura',
  components: {
    EyesIcon,
    TabBarListTahura
  },
  data () {
    const today = new Date()
    const sevenDaysLater = new Date(today)
    sevenDaysLater.setDate(today.getDate() + 7)
    const oneMonthAgo = new Date(today)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    return {
      headerTableList: [
        {
          text: 'no. order',
          key: 'invoice',
          sortable: true
        },
        {
          text: 'nama pemesan',
          key: 'orderBy',
          sortable: true
        },
        {
          text: 'jml. order',
          key: 'ticketCount',
          sortable: true
        },
        {
          text: 'tanggal dipesan',
          key: 'orderedAt',
          sortable: true
        },
        {
          text: 'tanggal kunjungan',
          key: 'reservationDate',
          sortable: true
        },
        {
          text: 'status scan',
          key: 'statusCode',
          sortable: true
        },
        {
          key: 'action',
          text: 'Aksi'
        }
      ],
      daftarPesananList: [],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 25,
        itemsPerPageOptions: [],
        disabled: true
      },
      query: {
        forScan: true,
        page: 1,
        q: null,
        pageSize: 25,
        sortOrder: 'desc',
        sortBy: 'orderedAt',
        status: '',
        tabIndex: 0
      },
      q: '',
      dateRange: [oneMonthAgo, today],
      isShowPopupDateRange: false,
      today,
      oneMonthAgo,
      sevenDaysLater,
      statusTahura,
      listStatusTahura
    }
  },
  async fetch () {
    this.setQuery({
      startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
      endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd')
    })
    try {
      const response = await this.$axios.get('/ticket/tahura/orders', {
        params: this.query
      })

      const { data, meta } = response.data
      this.daftarPesananList = data || []

      if (this.daftarPesananList.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }
      this.pagination.currentPage = meta?.pageNumber || 1
      this.pagination.totalRows = meta?.totalData || 0
      this.pagination.itemsPerPage = meta?.pageSize || this.query.pageSize

      this.getCount()
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    listData () {
      return this.daftarPesananList.map((item) => {
        return {
          ...item,
          orderedAt: formatDate(item.orderedAt || '', 'dd MMMM yyyy HH:mm'),
          reservationDate: formatDate(
            item.reservationDate || '',
            'dd MMMM yyyy'
          )
        }
      })
    }
  },
  watch: {
    query: {
      deep: true,
      handler () {
        resetQueryParamsUrl(this)
        this.$fetch()
      }
    },
    '$route.query': {
      deep: true,
      immediate: true,
      handler (newQuery) {
        if (Object.keys(newQuery).length > 0) {
          this.query = { ...newQuery }
          this.q = this.query.q || ''
          this.query.tabIndex = parseInt(this.query.tabIndex)

          if (newQuery.startDate && newQuery.endDate) {
            this.dateRange = [
              formatedStringDate(newQuery.startDate),
              formatedStringDate(newQuery.endDate)
            ]
          }
        }
      }
    },
    dateRange () {
      if (!this.isShowPopupDateRange) {
        this.$refs.datepicker.closePopup()
      } else {
        this.$refs.datepicker.openPopup()
      }
    },
    q: debounce(function (value) {
      if (value.length > 2 || value.length === 0) {
        this.query.page = 1
        this.query.q = value.length > 2 ? value : null
        this.$fetch()
      }
    }, 500)
  },
  mounted () {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
  },
  methods: {
    formatDate,
    selectedTabHandle (index) {
      this.query.tabIndex = index
    },
    disabledRange: function (date, inputDate) {
      const endDate = new Date(
        inputDate[1] === undefined ? inputDate[0] : inputDate[1]
      )
      endDate.setMonth(endDate.getMonth() - 3)
      return date > this.sevenDaysLater || date < endDate
    },
    checkMaxDate (date) {
      const endDate = new Date(date[1])
      endDate.setMonth(endDate.getMonth() - 3)
      if (date[0] < endDate) {
        date[0] = endDate
      }
    },
    closePopupDateHandle () {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
    },
    filterDateHandle () {
      this.setQuery({
        startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd')
      })
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    clearDateRangeHandle () {
      this.dateRange = [this.oneMonthAgo, this.today]

      this.setQuery({
        startDate: this.dateRange[0],
        endDate: this.dateRange[1]
      })
      this.isShowPopupDateRange = false
      this.$fetch()
    },
    changeDateRangeHandle () {
      this.isShowPopupDateRange = true
    },
    setQuery (params) {
      this.query = { ...this.query, ...params }
    },
    pageChange (value) {
      this.query.page = value
    },
    perPageChange (value) {
      if (value) {
        this.query.pageSize = value
      }
      this.query.page = 1
    },
    sortChange (value) {
      const key = Object.keys(value)[0]
      if (key && value[key] !== 'no-sort') {
        this.query.sortOrder = value[key]
        this.query.sortBy = key === 'status' ? 'status' : key
      } else {
        this.query.sortOrder = 'desc'
        this.query.sortBy = 'orderedAt'
      }

      this.$fetch()
    },
    listTabHandle (status) {
      const query = {
        forScan: true,
        page: 1,
        pageSize: 25,
        sortOrder: 'desc',
        sortBy: 'orderedAt',
        status: status === 'all' ? '' : status
      }

      this.isShowPopupDateRange = false
      this.setQuery(query)
      this.$fetch()
    },
    combinedCountOrder (countFromApi) {
      this.listStatusTahura.forEach((status) => {
        const { statusCode } = status
        if (statusCode !== 'all') {
          const matchingStatus = countFromApi.find(
            apiStatus => apiStatus.statusCode === statusCode
          )
          if (matchingStatus) {
            status.quantity = matchingStatus.quantity
          }
        } else {
          status.quantity = countFromApi.reduce(
            (total, apiStatus) => total + apiStatus.quantity,
            0
          )
        }
      })
    },
    resetQuantity () {
      this.listStatusTahura.forEach((status) => {
        status.quantity = 0
      })
    },
    goToDetail (item) {
      this.$router.push({
        path: `/tahura/daftar-pesanan/detail/${item.invoice}`,
        query: this.query
      })
    },
    async getCount () {
      const queryCount = { ...this.query }
      queryCount.status = ''
      try {
        const responseCountDaftarpesanan = await this.$axios.get(
          '/ticket/tahura/order/count',
          {
            params: queryCount
          }
        )

        const { data: countData } = responseCountDaftarpesanan.data
        this.resetQuantity()
        this.combinedCountOrder(countData)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
