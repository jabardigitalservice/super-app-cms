<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList
          :list-tab="listStatistic"
          :type-aduan="typeAduanPage"
          :tab-index="query.tabIndex"
          @selected="selectedTabHandle"
          @button-tab="listTabHandle"
        />
      </template>
      <template #tab-panel>
        <BaseTabPanel class="overflow-auto px-3 pt-6 pb-4">
          <div class="mb-4 flex w-full justify-between">
            <div class="flex w-full items-center justify-start">
              <jds-search
                v-model="search"
                placeholder="Cari ID atau nama lengkap"
                small
                icon
                :button="false"
                class="!w-[220px] 2xl:!w-[260px]"
              />
              <jds-icon
                name="filter-outline"
                size="sm"
                fill="#022B55"
                class="ml-4 flex-shrink-0"
              />
              <p class="ml-2 flex-shrink-0 text-[14px] text-blue-gray-700">
                Filter :
              </p>
              <jds-select
                v-model="query.complaint_category_id"
                placeholder="Kategori Aduan"
                :options="listCategory"
                class="select-form-complaint !mx-2 flex-shrink-0"
                @change="filterCategoryHandle"
              />
              <date-picker
                ref="datepicker"
                v-model="dateRange"
                format="DD/MM/YYYY"
                range
                range-separator=" - "
                class="!w-[210px] flex-shrink-0"
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
              <jds-select
                v-if="
                  typeAduanPage ===
                  typeAduan.instruksiKewenanganNonPemprov.props
                "
                v-model="query.complaint_status_id"
                placeholder="Status"
                :options="listNonGovComplaintStatus"
                class="select-form-complaint ml-2 flex-shrink-0"
                @change="filterNonGovComplaintStatusHandle"
              />
            </div>

            <jds-button
              v-show="typeAduan.aduanDariSpanLapor.props === typeAduanPage"
              label="Tambah Aduan"
              variant="primary"
              class="flex-shrink-0"
              @click="isShowPopupAddComplaint = true"
            />
          </div>
          <div>
            <JdsDataTable
              :headers="checkTypeHeaderAduan(typeAduanPage)"
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
                  @verify="
                    showPopupConfirmationVerificationComplaintHandle(item)
                  "
                  @failed="
                    showPopupConfirmationComplaint(item, 'failedComplaint')
                  "
                  @redirect-hotline-jabar="
                    showPopupConfirmationComplaint(
                      item,
                      'redirectHotlineComplaint'
                    )
                  "
                  @add-span="showPopupInputIdSpanHandle(item)"
                  @process-complaint="showPopupProcessComplaintHandle(item)"
                  @change-authority="showPopupChangeAuthority(item)"
                  @followup-complaint="showPopupFollowupComplaint(item)"
                  @create-instruction="showPopupCreateInstruction(item)"
                />
              </template>
            </JdsDataTable>
          </div>
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
    <!-- <DialogInputTextArea
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationRedirectHotlineJabar"
      @close="closePopupHandle()"
      @submit="submitRedirectHotlineJabar"
    /> -->
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
    <DialogProcessComplaint
      :data-dialog="dataDialog"
      :show-popup="isShowPopupChangeAuthority"
      @close="closePopupHandle()"
      @submit="submitProcessComplaint"
    />
    <DialogFollowupComplaint
      :data-dialog="dataDialog"
      :complaint-type="typeAduanPage"
      @submit="submitFollowupComplaint"
    />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
// import { parseISO, isWithinInterval } from 'date-fns'
import DialogFollowupComplaint from '~/components/Aduan/Dialog/FollowupComplaint'
import {
  formatDate,
  generateItemsPerPageOptions,
  formatNumberToUnit,
  convertToUnit,
  resetQueryParamsUrl,
  formatedStringDate,
} from '~/utils'
import 'vue2-datepicker/index.css'
import TabBarList from '~/components/Aduan/TabBar/List'
import DialogAddComplaint from '~/components/Aduan/Dialog/AddComplaint'
import DialogProcessComplaint from '~/components/Aduan/Dialog/ProcessComplaint'

import {
  complaintHeader,
  complaintStatus,
  complaintDivertedToSpanHeader,
  complaintFromSpanHeader,
  determiningAuthorityHeader,
  nonGovernmentAuthorityHeader,
  typeAduan,
  complaintSource,
} from '~/constant/aduan-masuk'
import {
  ENDPOINT_ADUAN,
  ENDPOINT_ADUAN_NON_PEMPROV,
} from '~/constant/endpoint-api'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'AduanMasuk',
  components: {
    TabBarList,
    DialogAddComplaint,
    DialogProcessComplaint,
    DialogFollowupComplaint,
  },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: String,
      default: '',
    },
    linkPageDetail: {
      type: String,
      default: '',
    },
    tabName: {
      type: String,
      default: 'complaint',
    },
  },
  data() {
    return {
      menuTableAction: [
        {
          menu: 'Lihat Detail Aduan',
          value: 'detail',
          complaintType: ['all'],
        },
        {
          menu: 'Terverifikasi',
          value: 'verify',
          complaintType: [typeAduan.aduanMasuk.props],
          complaintStatus: [complaintStatus.unverified.id],
        },
        {
          menu: 'Gagal Diverifikasi',
          value: 'failed',
          complaintType: [typeAduan.aduanMasuk.props],
          complaintStatus: [complaintStatus.unverified.id],
        },
        {
          menu: 'Dialihkan ke Hotline Jabar',
          value: 'redirect-hotline-jabar',
          complaintType: [typeAduan.aduanMasuk.props],
          complaintStatus: [complaintStatus.unverified.id],
        },
        {
          menu: 'Tambahkan ID SP4N Lapor',
          value: 'add-span',
          complaintType: [typeAduan.aduanDialihkanSpanLapor.props],
          complaintStatus: ['no-id-span'],
        },
        {
          menu: 'Proses Aduan',
          value: 'process-complaint',
          complaintType: [typeAduan.penentuanKewenangan.props],
          complaintStatus: [complaintStatus.verified.id],
        },
        {
          menu: 'Ubah Kewenangan',
          value: 'change-authority',
          complaintType: [typeAduan.penentuanKewenangan.props],
          complaintStatus: [
            complaintStatus.diverted_to_span.id,
            complaintStatus.coordinated.id,
          ],
        },
        {
          menu: 'Tindaklanjuti Aduan',
          value: 'followup-complaint',
          complaintType: [typeAduan.instruksiKewenanganPemprov.props],
          complaintStatus: [complaintStatus.coordinated.id],
        },
        {
          menu: 'Buat Instruksi',
          value: 'create-instruction',
          complaintType: [typeAduan.instruksiKewenanganNonPemprov.props],
          complaintStatus: [complaintStatus.not_yet_instructed.id],
        },
      ],
      listDataComplaint: [],
      listDataCategory: [],
      pagination: {
        currentPage: 1,
        totalRows: 10,
        itemsPerPage: 10,
        itemsPerPageOptions: [],
        disabled: true,
      },
      query: {
        limit: 10,
        page: 1,
        search: null,
        complaint_category_id: null,
        // complaint_status_id: null,
        tabIndex: 0,
        idTab: this.tabName,
      },
      search: '',
      complaintHeader,
      complaintDivertedToSpanHeader,
      complaintFromSpanHeader,
      determiningAuthorityHeader,
      nonGovernmentAuthorityHeader,
      typeAduan,
      isShowPopupDate: false,
      isShowPopupAddComplaint: false,
      listValueStatusComplaint: [],
      listStatisticComplaint: [],
      listDataNonGovComplaintStatus: [], // list status complaint for non government
      isShowPopupDateRange: false,
      isMockApi: false,
      complaintSource,
      dateRange: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
      ],
    }
  },
  async fetch() {
    try {
      const urlApi =
        this.typeAduanPage === typeAduan.instruksiKewenanganNonPemprov.props
          ? ENDPOINT_ADUAN_NON_PEMPROV
          : ENDPOINT_ADUAN
      if (
        !JSON.stringify(Object.keys(this.query)).match('complaint_status_id')
      ) {
        this.query = this.addComplaintStatusFilterHandle()
      }

      if (this.typeAduan.aduanDariSpanLapor.props === this.typeAduanPage) {
        this.setQuery({ complaint_source: 'sp4n' })
      }

      // default sort by updated date
      if (!this.query.sort_by) {
        this.setQuery({ sort_by: 'updated_at' })
      }

      // handle list data complaint
      const responseListComplaint = await this.$axios.get(urlApi, {
        params: { ...this.query, is_admin: 1 },
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
      this.getCount()
    } catch (error) {
      this.pagination.disabled = true
    }
  },
  computed: {
    listData() {
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
          status: this.getStatusText(item.complaint_status_id),
          created_at_format: formatDate(item.created_at, 'dd/MM/yyyy HH:mm'),
          created_at_api: item.created_at,
          status_id: item.complaint_status_id,
          sp4n_id: item.sp4n_id || 'Belum ada',
          diverted_to_span_at: item.diverted_to_span_at
            ? formatDate(item.diverted_to_span_at || '', 'dd/MM/yyyy HH:mm')
            : 'Belum ada',
          sp4n_added_at: formatDate(
            item.sp4n_added_at || '',
            'dd/MM/yyyy HH:mm'
          ),
          sp4n_created_at: item.sp4n_created_at
            ? formatDate(item.sp4n_created_at || '', 'dd/MM/yyyy HH:mm')
            : 'Belum ada',
          complaint_source_name: item?.complaint_source
            ? this.getComplaintSource(item).name
            : '',
          complaint_source_id: item?.complaint_source
            ? this.getComplaintSource(item).id
            : '',
          coverage_of_affairs: item?.coverage_of_affairs || '',
          authority: item?.authority || '',
          opd_name: item?.opd_name || '',
          deadline_date: item?.deadline_date || '',
        }
      })
    },
    listCategory() {
      return this.listDataCategory.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    },
    listNonGovComplaintStatus() {
      // list status complaint for non government
      return this.listDataNonGovComplaintStatus.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    },
    listStatistic() {
      return this.listStatisticComplaint.map((item) => {
        return {
          ...complaintStatus[item.id],
          value: formatNumberToUnit(item.value),
          unit: convertToUnit(item.value),
          icon: complaintStatus[item.id].icon,
          name: complaintStatus[item.id].name,
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
        this.$fetch()
      }
    }, 500),
  },
  mounted() {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
    this.isMockApi = true
    this.getCategory()
    this.getNonGovComplaintStatus()
  },
  methods: {
    selectedTabHandle(index) {
      this.query.tabIndex = index
    },
    checkTypeHeaderAduan(type) {
      switch (type) {
        case typeAduan.aduanMasuk.props:
          return this.complaintHeader
        case typeAduan.aduanDialihkanSpanLapor.props:
          return this.complaintDivertedToSpanHeader
        case typeAduan.aduanDariSpanLapor.props:
          return this.complaintFromSpanHeader
        case typeAduan.penentuanKewenangan.props:
          return this.determiningAuthorityHeader
        case typeAduan.instruksiKewenanganPemprov.props:
          return this.complaintHeader
        case typeAduan.instruksiKewenanganNonPemprov.props:
          return this.nonGovernmentAuthorityHeader
        default:
          return {}
      }
    },
    getColor(statusId) {
      const status = complaintStatus.find((item) => item.id === statusId)

      return `text-${status?.statusColor}` || 'text-gray-100'
    },
    pageChange(value) {
      this.query.page = value
    },
    perPageChange(value) {
      if (value) {
        this.query.limit = value
      }
      this.query.page = 1
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
        delete this.query.sort_by
        delete this.query.sort_type
      }

      this.$fetch()
    },
    filterCategoryHandle(value) {
      this.setQuery({
        complaint_category_id: null,
        'complaint_category_id[0]': null,
      })
      this.query.page = 1
      if (value) {
        this.query['complaint_category_id[0]'] = value
      }
      this.$fetch()
    },
    filterNonGovComplaintStatusHandle(value) {
      this.query.complaint_status_id = null
      this.query.page = 1
      if (value) {
        this.query.complaint_status_id = value
      }
      this.$fetch()
    },
    goToPageDetailHandle(item) {
      this.$router.push({
        path: `${this.linkPageDetail}/${item.id}`,
        query: this.query,
      })
    },
    getStatusText(statusId) {
      if (
        this.typeAduanPage === typeAduan.instruksiKewenanganNonPemprov.props &&
        statusId === 'coordinated'
      ) {
        return 'Sudah Dikoordinasikan'
      }
      return complaintStatus[statusId]?.name
    },
    getColorText(statusId) {
      const statusColor = complaintStatus[statusId].statusColor.find(
        (statusColor) => statusColor.typeAduan.includes(this.typeAduanPage)
      )
      switch (statusColor?.color) {
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
    menuTableActionHandle(complaintStatus) {
      return this.menuTableAction.filter(
        (item) =>
          item.complaintType.includes('all') ||
          (item.complaintType.includes(this.typeAduanPage) &&
            item.complaintStatus.includes(complaintStatus))
      )
    },
    getTotalStatistic() {
      const total = this.listStatisticComplaint.reduce(
        (accumulator, object) => {
          return accumulator + object.value
        },
        0
      )
      return total
    },
    addComplaintStatusFilterHandle() {
      if (
        this.typeAduanPage !== typeAduan.instruksiKewenanganNonPemprov.props
      ) {
        const listValueStatusComplaint =
          this.getStatusComplaintByComplaintType()
        for (let i = 0; i < listValueStatusComplaint.length; i++) {
          this.setQuery({
            [`complaint_status_id[${i}]`]: listValueStatusComplaint[i].id,
          })
        }
      }

      return this.query
    },
    listTabHandle(status) {
      const query = { page: 1, limit: 10 }
      // mock api
      // this.isFilterStatistic = false
      this.deletePropertiesWithPrefix(this.query, 'complaint_status_id[')

      if (status !== 'total') {
        // mock api
        // this.isFilterStatistic = true
        query['complaint_status_id[0]'] = status
      }
      this.setQuery(query)

      this.isShowPopupDateRange = false
      this.$fetch()
    },
    filterDateHandle() {
      this.setQuery({
        start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd'),
      })
      this.$fetch()

      this.$refs.datepicker.closePopup()
    },
    closePopupDateHandle() {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
    },
    closePopupAddComplaint() {
      this.isShowPopupAddComplaint = false
      this.$fetch()
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
    checkPropsSortByUpdatedDate() {
      const listPropsSortByUpdatedDate = [
        this.typeAduan.penentuanKewenangan.props,
        this.typeAduan.instruksiKewenanganPemprov.props,
      ]
      return listPropsSortByUpdatedDate.includes(this.typeAduanPage)
    },
    getStatusComplaintByComplaintType() {
      return Object.values(complaintStatus).filter((item) =>
        item.typeAduan.includes(this.typeAduanPage)
      )
    },
    getComplaintSource(dataComplaint) {
      if (dataComplaint.complaint_source === 'sp4n') {
        return this.complaintSource.span
      }
      return this.complaintSource[dataComplaint.complaint_source]
    },
    async getCount() {
      const queryCount = { ...this.query, is_admin: 1 }

      this.deletePropertiesWithPrefix(queryCount, 'complaint_status_id[')
      if (
        this.typeAduan.aduanDariSpanLapor.props === this.typeAduanPage ||
        typeAduan.instruksiKewenanganNonPemprov.props === this.typeAduanPage
      ) {
        complaintStatus.total.value = this.pagination.totalRows
      } else {
        try {
          // handle data statistic complaint
          const responseListStatisticComplaint = await this.$axios.get(
            `${ENDPOINT_ADUAN}/statistics`,
            {
              params: queryCount,
            }
          )
          const listDataStatisticComplaint =
            responseListStatisticComplaint.data.data
          const listComplaintStatus = this.getStatusComplaintByComplaintType()
          this.listStatisticComplaint = listDataStatisticComplaint.filter(
            (statisticComplaint) =>
              listComplaintStatus.find(
                (complaintStatus) =>
                  statisticComplaint.id === complaintStatus.id
              )
          )
          complaintStatus.total.value = this.getTotalStatistic()
        } catch (error) {
          console.error(error)
        }
      }
      this.listStatisticComplaint.unshift(complaintStatus.total)
      if (this.listStatisticComplaint.length === 2) {
        this.listStatisticComplaint.pop()
      }
    },
    async getCategory() {
      try {
        // handle list data category
        const responseListCategoryComplaint = await this.$axios.get(
          `${ENDPOINT_ADUAN}/categories`
        )

        this.listDataCategory = responseListCategoryComplaint.data.data
        this.listDataCategory = [
          {
            id: '',
            name: 'Semua Kategori Aduan',
          },
          ...this.listDataCategory,
        ]
      } catch (error) {
        console.error(error)
      }
    },
    async getNonGovComplaintStatus() {
      try {
        // handle list data non government complaint status
        const responseDataNonGovComplaintStatus = await this.$axios.get(
          '/aduan/non-pemprov-complaint-status'
        )

        this.listDataNonGovComplaintStatus =
          responseDataNonGovComplaintStatus.data.data
        this.listDataNonGovComplaintStatus = [
          {
            id: '',
            name: 'Semua Status',
          },
          ...this.listDataNonGovComplaintStatus,
        ]
      } catch (error) {
        console.error(error)
      }
    },
    deletePropertiesWithPrefix(obj, prefix) {
      for (const prop in obj) {
        if (prop.startsWith(prefix)) {
          delete obj[prop]
        }
      }
    },
  },
}
</script>

<style scoped>
.icon-tab rect {
  @apply !fill-[#008444];
}

.icon-tab path {
  @apply stroke-white;
}

.icon-tab-selected rect {
  @apply fill-[#f5f5f5];
}

.icon-tab-selected path {
  @apply stroke-[#16a75c];
}

.select-form-complaint::v-deep .jds-input-text__input-wrapper {
  @apply !w-fit 2xl:!w-[260px];
}

.select-form-complaint .jds-popover__content {
  @apply !w-fit 2xl:!w-[260px];
}
</style>
