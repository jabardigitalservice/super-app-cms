<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList :list-tab="listStatistic" @selected="selectedTabHandle" />
      </template>
      <template #tab-panel>
        <BaseTabPanel class="px-3 pt-6 pb-4">
          <div class="mb-4 flex justify-between">
            <div class="flex">
              <jds-search
                v-model="search"
                placeholder="Cari ID atau narasi IKP"
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
                <date-picker
                  ref="datepicker"
                  v-model="dateRange"
                  class="!ml-2 mr-2"
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
          </div>

          <JdsDataTable
            :headers="headerDaftarIkp"
            :loading="$fetchState.pending"
            :items="listData"
            :pagination="pagination"
            @next-page="nextPage"
            @previous-page="previousPage"
            @page-change="pageChange"
            @per-page-change="perPageChange"
            @change:sort="sortChange"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.narasi_ikp="{ item }">
              <div class="flex items-center">
                <span class="font-lato text-[14px]">
                  <strong>({{ item.id }})</strong> {{ item.narrative }}
                </span>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.complaint_status_id="{ item }">
              <div class="flex items-center">
                <p
                  v-show="item?.complaint_status_id"
                  class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
                  :class="getColorText(item?.complaint_status_id)"
                >
                  {{ getStatusText(item?.complaint_status_id) }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{ item }">
              <BaseTableAction
                :list-menu-pop-over="
                  filterTableAction(item?.complaint_status_id)"
                @detail="goToPageDetail(item.id)"
              />
            </template>
          </JdsDataTable>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
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
import TabBarList from '~/components/Aduan/TabBar/List'
import { headerDaftarIkp, ikpStatus } from '~/constant/daftar-ikp'
export default {
  name: 'DaftarIkpTable',
  components: { TabBarList },
  data () {
    return {
      dummyData: {
        code: 2000600,
        message: 'Success',
        data: {
          data: [
            {
              id: '9999',
              narrative: 'Perbaikan Terminal LP',
              complaint_total: 2,
              created_at: '2023-07-24T09:17:27.000000Z',
              deadline_at: '2023-07-24T09:17:27.000000Z',
              complaint_status_id: 'finished'
            },
            {
              id: '0993',
              narrative: 'Perbaikan Terminal Cicaheum',
              complaint_total: 15,
              created_at: '2023-07-24T09:17:27.000000Z',
              deadline_at: '2023-07-24T09:17:27.000000Z',
              complaint_status_id: 'followup'
            }
          ],
          page_size: 100,
          page: 1,
          total_pages: 1,
          total_data: 58
        }
      },
      dummyStatic: {
        code: 2000600,
        message: 'Success',
        data: [
          {
            id: 'followup',
            name: 'Ditindaklanjuti',
            value: 153
          },
          {
            id: 'finished',
            name: 'Selesai',
            value: 23
          }
        ]
      },
      menuTableAction: [
        { menu: 'Lihat Detail IKP', value: 'detail' },
        { menu: 'Tambah Aduan', value: 'add' }
      ],
      listDataIkp: [],
      listStatisticIkp: [],
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
      search: '',
      isShowPopupDate: false,
      isShowPopupDateRange: false,
      dateRange: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date()
      ],
      headerDaftarIkp
    }
  },
  async fetch () {
    try {
      const responseList = await this.$axios.get('/warga/ikp', {
        params: { ...this.query }
      })
      const { data } = responseList
      this.listDataIkp = data?.data || []
      if (this.listDataIkp.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }

      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.total_data || 0
      this.pagination.itemsPerPage = data?.page_size || this.query.limit

      const responseListStatisticIkp = await this.$axios.get(
        '/warga/ikp/statistics'
      )
      this.listStatisticIkp = responseListStatisticIkp.data.data
      ikpStatus.total.value = this.getTotalStatistic()
      this.listStatisticIkp.unshift(ikpStatus.total)
      if (this.listStatisticIkp.length === 2) {
        this.listStatisticIkp.pop()
      }
    } catch {
      this.pagination.disabled = true
      // dummy data, waiting API ready
      const { data } = this.dummyData
      this.listDataIkp = data?.data || []
      this.listStatisticIkp = this.dummyStatic.data
      ikpStatus.total.value = this.getTotalStatistic()
      this.listStatisticIkp.unshift(ikpStatus.total)
      if (this.listStatisticIkp.length === 2) {
        this.listStatisticIkp.pop()
      }
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
  computed: {
    listData () {
      return this.listDataIkp.map((item) => {
        return {
          ...item,
          created_at: formatDate(item.created_at, 'dd/MM/yyyy HH:mm'),
          deadline_at: formatDate(item.created_at, 'dd/MM/yyyy HH:mm')
        }
      })
    },
    listStatistic () {
      return this.listStatisticIkp.map((item) => {
        return {
          ...ikpStatus[item.id],
          value: formatNumberToUnit(item.value),
          unit: convertToUnit(item.value),
          icon: ikpStatus[item.id].icon,
          name: ikpStatus[item.id].name
        }
      })
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
    filterTableAction (status) {
      if (status === 'finished') {
        return this.menuTableAction.filter(item => item.value === 'detail')
      } else {
        return this.menuTableAction
      }
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
    getTotalStatistic () {
      const total = this.listStatisticIkp.reduce((accumulator, object) => {
        return accumulator + object.value
      }, 0)
      return total
    },
    getStatusText (status) {
      switch (status) {
        case ikpStatus.followup.id:
          return ikpStatus.followup.name
        case ikpStatus.finished.id:
          return ikpStatus.finished.name
        default:
          return '-'
      }
    },
    getColorText (status) {
      switch (status) {
        case ikpStatus.followup.id:
          return 'text-[#FF7500]'
        case ikpStatus.finished.id:
          return 'text-green-700'
        default:
          return 'text-gray-900'
      }
    },
    goToPageDetail (id) {
      this.$router.push(`/aduan/penginputan-ikp/detail-ikp/${id}`)
    }
  }
}
</script>

<style></style>
