<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarListTahura
          :list-tab="listTab"
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
                      label-button="Pilih"
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
            <template #item.action>
              <BaseButton class="w-4">
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
import TabBarListTahura from '~/components/Tahura/TabBar/index.vue'
import { statusTahura } from '@/constant/tahura.js'
export default {
  name: 'DaftarPesananTahura',
  components: {
    EyesIcon,
    TabBarListTahura
  },
  data () {
    return {
      dummyData: {
        status: true,
        message: 'Success',
        code: '2000800',
        data: [
          {
            id: 403,
            userId: '44975f8b-dd21-4f06-b9cf-dde342e10df8',
            orderBy: 'JSA Testing',
            reservationDate: '2023-10-10',
            paymentMethod: 'qris',
            statusCode: 'scanned',
            statusName: 'Scan Berhasil',
            invoice: 'THR-10102302003',
            ticketCount: 2,
            amount: 114000,
            countdownMinutes: 0,
            destination:
              '00020101021226620017ID.CO.BANKBJB.WWW01189360011030001226780208001226780303UMI51470017ID.CO.BANKBJB.WWW0215ID12312312938450303UMI52049399530336054061140005802ID5916Ticketing Tahura6007Bandung61051232262490124QRIS20231010151635007458021008118449960703C0263046A41',
            orderedAt: '2023-10-10T08:16:33.796698Z',
            expiredAt: '2023-10-10T09:16:33Z',
            categories: [
              {
                code: 'wna',
                name: 'Wisatawan Asing',
                price: 57000,
                series: 'B',
                quantity: 2
              }
            ]
          },
          {
            id: 402,
            userId: '44975f8b-dd21-4f06-b9cf-dde342e10df8',
            orderBy: 'JSA Testing',
            reservationDate: '2023-10-10',
            paymentMethod: 'qris',
            statusCode: 'paid',
            statusName: 'Sukses',
            invoice: 'THR-10102325002',
            ticketCount: 25,
            amount: 1425000,
            countdownMinutes: 0,
            destination:
              '00020101021226620017ID.CO.BANKBJB.WWW01189360011030001226780208001226780303UMI51470017ID.CO.BANKBJB.WWW0215ID12312312938450303UMI520493995303360540714250005802ID5916Ticketing Tahura6007Bandung61051232262490124QRIS20231010103126007455021008118449960703C026304ABB8',
            orderedAt: '2023-10-10T03:31:25.412813Z',
            expiredAt: '2023-10-10T04:31:25Z',
            categories: [
              {
                code: 'wna',
                name: 'Wisatawan Asing',
                price: 57000,
                series: 'B',
                quantity: 25
              }
            ]
          },
          {
            id: 401,
            userId: '44975f8b-dd21-4f06-b9cf-dde342e10df8',
            orderBy: 'JSA Testing',
            reservationDate: '2023-10-10',
            paymentMethod: 'qris',
            statusCode: 'paid',
            statusName: 'Sukses',
            invoice: 'THR-10102315001',
            ticketCount: 15,
            amount: 255000,
            countdownMinutes: 0,
            destination:
              '00020101021226620017ID.CO.BANKBJB.WWW01189360011030001226780208001226780303UMI51470017ID.CO.BANKBJB.WWW0215ID12312312938450303UMI52049399530336054062550005802ID5916Ticketing Tahura6007Bandung61051232262490124QRIS20231010100805007452021008118449960703C0263049D5E',
            orderedAt: '2023-10-10T03:08:04.23285Z',
            expiredAt: '2023-10-10T04:08:04Z',
            categories: [
              {
                code: 'wni',
                name: 'Wisatawan Lokal',
                price: 17000,
                series: 'A',
                quantity: 15
              }
            ]
          }
        ]
      },
      dummydataTab: {
        status: true,
        message: 'Success',
        code: '2000800',
        data: [
          {
            statusCode: 'all',
            quantity: 500
          },
          {
            statusCode: 'scanned',
            quantity: 300
          },
          {
            statusCode: 'paid',
            quantity: 200
          }
        ]
      },
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
        sortType: 'desc',
        sortBy: 'orderedAt',
        status: ''
      },
      sortBy: '',
      sortOrder: '',
      q: '',
      selectedTabIndex: 0,
      dateRange: [new Date(), new Date()],
      isShowPopupDate: false,
      isShowPopupDateRange: false,
      listTab: [],
      statusTahura
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/ticket/tahura/orders', {
        params: this.query
      })

      const data = response.data.data
      this.daftarPesananList = data?.data || []

      if (this.daftarPesananList.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }
      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.totalData || 0
      this.pagination.itemsPerPage = data?.pageSize || this.query.pageSize

      const responseCountDaftarpesanan = await this.$axios.get(
        '/ticket/tahura/order/count'
      )
      this.listTab = responseCountDaftarpesanan.data
    } catch {
      // TODO : used dummy data, remove after API ready
      this.daftarPesananList = this.dummyData.data
      this.listTab = this.dummydataTab.data
      //   this.this.pagination.disabled = true
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
        startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd')
      })
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    clearDateRangeHandle () {
      this.dateRange = [new Date(), new Date()]

      this.setQuery({
        startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd')
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
        this.query.sortType = value[key]
        this.query.sortBy = key === 'status' ? 'status' : key
      } else {
        this.query.sortType = 'desc'
        this.query.sortBy = 'orderedAt'
      }

      this.$fetch()
    },
    listTabHandle (status) {
      this.q = ''
      this.dateRange = [new Date(), new Date()]
      const query = {
        forScan: true,
        page: 1,
        q: null,
        pageSize: 5,
        sortType: 'desc',
        sortBy: 'orderedAt',
        status: status === 'all' ? '' : status
      }

      this.isShowPopupDateRange = false
      this.setQuery(query)
      this.$fetch()
    }
  }
}
</script>
