<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarListTahura
          :list-tab="listStatusTahura"
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
                  v-model="query.dateRange"
                  format="DD/MM/YYYY"
                  range
                  range-separator=" - "
                  :disabled-date="disabledRange"
                  @close="isShowPopupDate = false"
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
            @next-page="nextPage"
            @previous-page="previousPage"
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
import { formatDate, generateItemsPerPageOptions } from '~/utils'
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
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true
      },
      query: {
        forScan: true,
        page: 1,
        q: null,
        pageSize: 5,
        sortOrder: 'desc',
        sortBy: 'orderedAt',
        status: '',
        dateRange: [new Date().setMonth(new Date().getMonth() - 1), new Date()]
      },
      sortBy: '',
      sortOrder: '',
      q: '',
      selectedTabIndex: 0,
      // dateRange: [new Date().setMonth(new Date().getMonth() - 1), new Date()],
      isShowPopupDate: false,
      isShowPopupDateRange: false,

      statusTahura,
      listStatusTahura
    }
  },
  async fetch () {
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
      this.pagination.currentPage = meta?.page || 1
      this.pagination.totalRows = meta?.totalData || 0
      this.pagination.itemsPerPage = meta?.pageSize || this.query.pageSize

      const responseCountDaftarpesanan = await this.$axios.get(
        '/ticket/tahura/order/count',
        {
          params: this.query
        }
      )

      const { data: countData } = responseCountDaftarpesanan.data

      if (countData.length > 0) {
        this.combinedCountOrder(countData)
      } else {
        this.resetQuantity()
      }
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
    this.selectedTabHandle(0)
  },
  methods: {
    formatDate,
    selectedTabHandle (index) {
      this.selectedTabIndex = index
    },
    disabledRange: function (date, inputDate) {
      const endDate = new Date(
        inputDate[1] === undefined ? inputDate[0] : inputDate[1]
      )
      endDate.setMonth(endDate.getMonth() - 3)
      return date > new Date() || date < endDate
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
        startDate: formatDate(this.query.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.query.dateRange[1], 'yyyy-MM-dd')
      })
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    clearDateRangeHandle () {
      this.query.dateRange = [
        new Date().setMonth(new Date().getMonth() - 1),
        new Date()
      ]

      this.setQuery({
        startDate: formatDate(this.query.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.query.dateRange[1], 'yyyy-MM-dd')
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
      this.q = ''
      const query = {
        forScan: true,
        page: 1,
        q: null,
        pageSize: 5,
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
      this.$router.push(`/tahura/daftar-pesanan/detail/${item.invoice}`)
    }
  }
}
</script>
