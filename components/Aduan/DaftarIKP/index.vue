<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList
          :list-tab="listStatistic"
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
                v-model="search"
                placeholder="Cari ID atau narasi instruksi"
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
                <p class="ml-2 text-sm text-blue-gray-700">Filter :</p>
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
            @next-page="pageChange"
            @previous-page="pageChange"
            @page-change="pageChange"
            @per-page-change="perPageChange"
            @change:sort="sortChange"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.narrative="{ item }">
              <p class="line-clamp-1">
                {{ item.narrative }}
              </p>
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
                  filterTableAction(item?.complaint_status_id)
                "
                @detail="goToPageDetail(item.ikp_code)"
                @app-trk="goToAppTrk()"
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
  convertToUnit,
  formatedStringDate,
  resetQueryParamsUrl,
} from '~/utils'
import TabBarList from '~/components/Aduan/TabBar/List'
import { headerDaftarIkp, ikpStatus, ikpType } from '~/constant/daftar-ikp'
import { ENDPOINT_IKP } from '~/constant/endpoint-api'
import { typeAduan } from '~/constant/aduan-masuk'

export default {
  name: 'DaftarIkpTable',
  components: { TabBarList },
  props: {
    tabName: {
      type: String,
      default: 'ikp',
    },
    ikpTypePage: {
      type: String,
      default: '',
    },
    detailPage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      menuTableAction: [
        { menu: 'Lihat Detail Instruksi', value: 'detail', ikpType: ['all'] },
        {
          menu: 'Lihat Instruksi di Aplikasi TRK',
          value: 'app-trk',
          ikpType: [ikpType.instruksiNonPemprov.props],
        },
      ],
      listDataIkp: [],
      listStatisticIkp: [],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true,
      },
      query: {
        limit: 10,
        page: 1,
        search: null,
        tabIndex: 0,
        idTab: this.tabName,
      },
      search: '',
      isShowPopupDate: false,
      isShowPopupDateRange: false,
      dateRange: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
      ],
      headerDaftarIkp,
      ikpStatus,
      listIkpDisplayed: [],
    }
  },
  async fetch() {
    const isProvResponsibility =
      this.typeAduanPage.props === typeAduan.instruksiKewenanganPemprov.props ||
      typeAduan.instruksiAduanWarga.props
    try {
      const responseList = await this.$axios.get(ENDPOINT_IKP, {
        params: { ...this.query, is_prov_responsibility: isProvResponsibility },
      })
      this.listDataIkp = responseList.data?.data?.data || []
      if (this.listDataIkp.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }
      this.pagination.currentPage = responseList.data?.meta?.current_page || 1
      this.pagination.totalRows = responseList.data?.meta?.total_count || 0
      this.pagination.itemsPerPage =
        responseList.data?.meta?.per_page || this.query.limit
      this.getCount()
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    listData() {
      return this.listDataIkp.map((item) => {
        return {
          ...item,
          created_at: item?.created_at
            ? formatDate(item?.created_at, 'dd/MM/yyyy HH:mm')
            : '-',
          deadline_at: item?.deadline_at
            ? formatDate(item?.deadline_at, 'dd/MM/yyyy')
            : '-',
        }
      })
    },
    listStatistic() {
      return this.listStatisticIkp.map((item) => {
        return {
          ...ikpStatus[item.id],
          value: formatNumberToUnit(item.value),
          unit: convertToUnit(item.value),
          icon:
            this.ikpTypePage === ikpType.instruksiNonPemprov.props &&
            item.id === 'coordinated'
              ? ikpStatus.followup.icon
              : this.ikpStatus[item.id].icon,
          name:
            this.ikpTypePage === ikpType.instruksiNonPemprov.props &&
            item.id === 'coordinated'
              ? 'Sudah Dikoordinasikan'
              : ikpStatus[item.id].name,
        }
      })
    },
  },
  watch: {
    query: {
      deep: true,
      handler() {
        resetQueryParamsUrl(this)
        this.$fetch()
      },
    },
    '$route.query': {
      deep: true,
      immediate: true,
      handler(newQuery) {
        if (Object.keys(newQuery).length > 0) {
          this.query = { ...newQuery }
          this.query.tabIndex = parseInt(this.query.tabIndex)

          this.search = this.query.search || ''
          if (newQuery.start_date && newQuery.end_date) {
            this.dateRange = [
              formatedStringDate(newQuery.start_date),
              formatedStringDate(newQuery.end_date),
            ]
          }
        }
      },
    },
    dateRange() {
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
        this.query.search = this.normalizeText(this.query.search)
        this.$fetch()
      }
    }, 500),
  },
  mounted() {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
  },
  methods: {
    normalizeText(text) {
      // /\s+/g => regrex untuk mengubah spasi berlebih dengan satu spasi.
      return text.replace(/\s+/g, ' ').trim().toLowerCase()
    },
    selectedTabHandle(index) {
      this.query.tabIndex = index
    },
    filterTableAction(status) {
      return this.menuTableAction.filter(
        (item) =>
          item.ikpType.includes('all') ||
          item.ikpType.includes(this.ikpTypePage)
      )
    },
    pageChange(value) {
      this.query.page = value
      // TO DO : if api has already
      // if (isNaN(value)) {
      //   this.query.page = this.currentPageLocal
      // } else {
      //   this.currentPageLocal = value
      //   this.query.page = value
      // }
      this.$fetch()
    },
    perPageChange(value) {
      if (value) {
        this.query.limit = value
      }
      this.query.page = 1
      this.$fetch()
    },
    sortChange(value) {
      const key = Object.keys(value)[0]
      if (key && value[key] !== 'no-sort') {
        if (key === 'created_at_format') {
          this.query.sort_by = 'created_at'
        } else {
          this.query.sort_by = key
        }
        this.query.sort_type = value[key]
      } else {
        const { sort_by: sortBy, sort_type: sortType, ...newQuery } = this.query // menghilangkan atribut sort by dan sort type
        this.query = newQuery
      }

      this.$fetch()
    },
    filterDateHandle() {
      this.setQuery({
        start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd'),
      })
      this.$fetch()
      this.$refs.datepicker.closePopup()
      this.query.page = 1
    },
    closePopupDateHandle() {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
    },
    setQuery(params) {
      this.query = { ...this.query, ...params }
    },
    clearDateRangeHandle() {
      this.dateRange = [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
      ]
      this.setQuery({
        start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd'),
      })

      this.isShowPopupDateRange = false
      this.$fetch()
    },
    changeDateRangeHandle() {
      this.isShowPopupDateRange = true
    },
    getTotalStatistic() {
      const total = this.listStatisticIkp.reduce((accumulator, object) => {
        return accumulator + object.value
      }, 0)
      return total
    },
    getStatusText(status) {
      switch (status) {
        case ikpStatus.coordinated.id:
          return this.ikpTypePage === ikpType.instruksiNonPemprov.props
            ? 'Sudah Dikoordinasikan'
            : ikpStatus.coordinated.name
        case ikpStatus.followup.id:
          return ikpStatus.followup.name
        case ikpStatus.postponed.id:
          return ikpStatus.postponed.name
        case ikpStatus.review.id:
          return ikpStatus.review.name
        case ikpStatus.finished.id:
          return ikpStatus.finished.name
        case ikpStatus.not_yet_coordinated.id:
          return ikpStatus.not_yet_coordinated.name
        default:
          return '-'
      }
    },
    getColorText(status) {
      const ikpStatusColor = this.ikpStatus[status]?.statusColor
      let statusColor = {}
      if (Array.isArray(ikpStatusColor)) {
        statusColor = ikpStatusColor.find((statusColor) =>
          statusColor.ikpType.includes(this.ikpTypePage)
        )
      }

      const colorText = statusColor?.color || ikpStatusColor

      switch (colorText) {
        case 'yellow':
          return 'text-[#FF7500]'
        case 'green':
          return 'text-green-700'
        case 'red':
          return 'text-[#DD5E5E]'
        case 'light-blue':
          return 'text-[#1E88E5]'
        case 'dark-blue':
          return 'text-[#1A4373]'
        case 'purple':
          return 'text-[#691B9A]'
        default:
          return 'text-gray-900'
      }
    },
    listTabHandle(statusId) {
      const query = {
        page: 1,
      }

      if (statusId !== 'total') {
        query.status = statusId
      } else {
        delete this.query.status
      }

      this.isShowPopupDateRange = false
      this.setQuery(query)
      this.$fetch()
    },
    goToPageDetail(id) {
      this.$router.push({
        path: `${this.detailPage}/${id}`,
        query: this.query,
      })
    },
    goToAppTrk() {
      window.open(
        'https://kinerja.jabarprov.go.id/lim/bukan-urusan-pemprov',
        '_blank'
      )
    },
    getCountNonPemProv() {
      if (this.ikpTypePage === ikpType.instruksiNonPemprov.props) {
        const listDataIkp = this.listDataIkp
        const listNotYetCoordinated = listDataIkp.filter(
          (item) => item.complaint_status_id === 'not_yet_coordinated'
        )
        const listCoordinated = listDataIkp.filter(
          (item) => item.complaint_status_id === 'coordinated'
        )
        this.listStatisticIkp = [
          {
            id: 'coordinated',
            name: 'Sudah Dikoordinasikan',
            value: listCoordinated.length,
          },
          {
            id: 'not_yet_coordinated',
            name: 'Belum Dikoordinasikan',
            value: listNotYetCoordinated.length,
          },
        ]
      }
      ikpStatus.total.value = this.getTotalStatistic()
      this.listStatisticIkp.unshift(ikpStatus.total)
      if (this.listStatisticIkp.length === 2) {
        this.listStatisticIkp.pop()
      }
    },
    async getCount() {
      const queryCount = { ...this.query }
      queryCount.status = ''
      try {
        const responseListStatisticIkp = await this.$axios.get(
          `${ENDPOINT_IKP}/statistics`,
          {
            params: queryCount,
          }
        )
        this.listStatisticIkp = responseListStatisticIkp.data.data
        ikpStatus.total.value = this.getTotalStatistic()
        this.listStatisticIkp.unshift(ikpStatus.total)
        if (this.listStatisticIkp.length === 2) {
          this.listStatisticIkp.pop()
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
.jds-data-table::v-deep td:nth-child(2) {
  @apply !w-[237px];
}

.jds-data-table::v-deep td:nth-child(3) {
  @apply !w-[137px];
}
</style>
