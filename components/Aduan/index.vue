<template>
  <div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarList
          :list-tab="listStatistic"
          :type-aduan="typeAduanPage.props"
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

              <BaseSelectSearch
                v-model="query.complaint_category_id"
                class="select-form-complaint !mx-2 flex-shrink-0"
                :options="listCategory"
                placeholder="Kategori Aduan"
                filterable
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
                  typeAduanPage.props ===
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
              v-show="
                typeAduan.aduanDariSpanLapor.props === typeAduanPage.props
              "
              label="Tambah Aduan"
              variant="primary"
              class="flex-shrink-0"
              @click="showPopupAddComplaint()"
            />
          </div>

          <BaseTable
            :headers="checkTypeHeaderAduan(typeAduanPage.props)"
            :items="listData"
            :loading="$fetchState.pending"
            :skeleton-row-count="pagination.itemsPerPage"
            @sort="sortChange"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #status="{ item }">
              <div class="flex items-center">
                <p
                  v-show="item?.status"
                  class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 !text-sm font-semibold"
                  :class="getColorText(item?.status_id)"
                >
                  {{ item.status }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #sp4n_created_at="{ item }">
              <div
                :class="{
                  'h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 !text-sm font-semibold text-[#FF7500]':
                    item.sp4n_created_at === 'Belum ada',
                }"
              >
                {{ item.sp4n_created_at }}
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #diverted_to_span_at="{ item }">
              <div
                :class="{
                  'h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 !text-sm font-semibold text-[#FF7500]':
                    item.diverted_to_span_at === 'Belum ada',
                }"
              >
                {{ item.diverted_to_span_at }}
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #sp4n_id="{ item }">
              <div
                :class="{
                  'h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 !text-sm font-semibold text-[#FF7500]':
                    item.sp4n_id === 'Belum ada',
                }"
              >
                {{ item.sp4n_id }}
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #action="{ item }">
              <BaseTableAction
                :list-menu-pop-over="menuTableActionHandle(item?.status_id)"
                :data-cy="dataCyButtonAction"
                @detail="goToPageDetailHandle(item)"
                @verify="showPopupConfirmationVerificationComplaintHandle(item)"
                @failed="
                  showPopupConfirmationComplaint(item, 'failedComplaint')
                "
                @redirect-hotline-jabar="
                  showPopupConfirmationComplaint(
                    item,
                    'redirectHotlineComplaint'
                  )
                "
                @followup-hotline-jabar="
                  $store.dispatch(
                    'popup-complaint/showPopupFollowupHotlineJabar',
                    {
                      dataComplaint: item,
                      dialogName: 'followupHotlineJabar',
                    }
                  )
                "
                @evidence-followup-hotline="
                  showPopupEvidenceFollowupHotline(item)
                "
                @add-span="showPopupInputIdSpanHandle(item)"
                @process-complaint="showPopupProcessComplaintHandle(item)"
                @change-authority="showPopupChangeAuthority(item)"
                @followup-complaint="showPopupFollowupComplaint(item)"
                @create-instruction="showPopupCreateInstruction(item)"
              />
            </template>
          </BaseTable>

          <BaseTablePagination
            :current-page="pagination.currentPage"
            :per-page="pagination.itemsPerPage"
            :total-items="pagination.totalRows"
            :total-pages="pagination.totalPage"
            :per-page-options="pagination.perPageOptions"
            @update:currentPage="pageChange"
            @update:perPage="perPageChange"
          />
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
    <DialogFollowupHotlineJabar @close-all-modal="refreshPage()" />
    <DialogEvidenceFollowupHotline @close-all-modal="refreshPage()" />
    <DialogInputTextArea
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationFailedVerification"
      @close="closePopupHandle()"
      @submit="submitPopupComplaintHandle"
    />
    <DialogAddComplaint
      v-if="isShowPopupAddComplaint"
      name-modal="addComplaint"
      @close="closePopupAddComplaint()"
    />
    <DialogAddIdSpan
      :data-dialog="dataDialog"
      name-modal="formAddIdSpan"
      @submit="submitInputIdSpanHandle"
    />
    <DialogProcessComplaint
      v-if="isShowPopupProcessComplaint"
      :data-dialog="dataDialog"
      :show-popup="isShowPopupProcessComplaint"
      @close="closePopupHandle()"
      @submit="submitProcessComplaint"
      @back-to-form="isShowPopupProcessComplaint = true"
    />
    <DialogProcessComplaint
      v-if="isShowPopupChangeAuthority"
      :data-dialog="dataDialog"
      :show-popup="isShowPopupChangeAuthority"
      @close="closePopupHandle()"
      @submit="submitProcessComplaint"
    />
    <DialogFollowupComplaint
      v-if="isPopupFollowupComplaint"
      :data-dialog="dataDialog"
      :complaint-type="typeAduanPage.props"
      @submit="submitFollowupComplaint"
    />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import 'vue2-datepicker/index.css'
import DialogEvidenceFollowupHotline from '~/components/Aduan/Dialog/EvidenceFollowupHotline'
import DialogFollowupComplaint from '~/components/Aduan/Dialog/FollowupComplaint'
import DialogAddIdSpan from '~/components/Aduan/Dialog/AddIdSpan'
import DialogAddComplaint from '~/components/Aduan/Dialog/AddComplaint'
import DialogFollowupHotlineJabar from '~/components/Aduan/Dialog/FollowupHotlineJabar'
import DialogProcessComplaint from '~/components/Aduan/Dialog/ProcessComplaint'
import TabBarList from '~/components/Aduan/TabBar/List'
import {
  convertToUnit,
  formatDate,
  formatedStringDate,
  formatNumberToUnit,
  generateItemsPerPageOptions,
  resetQueryParamsUrl,
} from '~/utils'

import {
  complaintDivertedToSpanHeader,
  complaintFromSpanHeader,
  complaintHeader,
  complaintSource,
  complaintStatus,
  determiningAuthorityHeader,
  nonGovernmentAuthorityHeader,
  typeAduan,
} from '~/constant/aduan-masuk'

import {
  ENDPOINT_ADUAN,
  ENDPOINT_ADUAN_HOTLINE_JABAR,
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
    DialogFollowupHotlineJabar,
    DialogEvidenceFollowupHotline,
    DialogAddIdSpan,
  },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: Object,
      default: () => ({}),
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
      dataCyFormat: `daftar-${this.typeAduanPage.props}`,
      dataMenuTableAction: [
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
          menu: 'Tindaklanjuti Aduan',
          value: 'followup-hotline-jabar',
          complaintType: [typeAduan.aduanDialihkanHotlineJabar.props],
          complaintStatus: [complaintStatus.verified.id],
        },
        {
          menu: 'Upload Bukti Tindaklanjut',
          value: 'evidence-followup-hotline',
          complaintType: [typeAduan.aduanDialihkanHotlineJabar.props],
          complaintStatus: [complaintStatus.followup.id],
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
        totalPage: 1,
        itemsPerPageOptions: [],
      },
      query: {
        limit: 10,
        page: 1,
        search: null,
        complaint_category_id: null,
        complaint_status_id: null,
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
      complaintSource,
      dateRange: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
      ],
      dataCyButtonAction: `daftar-${this.typeAduanPage.props}__tab__button-action--total`,
      isFilterStatus: false,
    }
  },
  async fetch() {
    try {
      const urlApi = this.checkUrlApi()

      if (
        this.typeAduan.aduanDariSpanLapor.props === this.typeAduanPage.props
      ) {
        this.setQuery({ complaint_source: 'sp4n' })
      }

      if (!this.$store.state.backPage && !this.isFilterStatus) {
        this.query = this.addComplaintStatusFilterHandle()
      }
      // default sort by updated date
      if (!this.query.sort_by) {
        this.setQuery({ sort_by: 'updated_at' })
      }

      // handle list data complaint
      const responseListComplaint = await this.$axios.get(urlApi, {
        params: { ...this.query, is_admin: 1, phase: this.typeAduanPage.phase },
      })

      const { data } = responseListComplaint.data
      this.listDataComplaint = data?.data || []
      if (this.listDataComplaint.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }

      this.pagination.totalPage = data?.total_pages || 1
      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.total_data || 0
      this.pagination.itemsPerPage = data?.page_size || this.query.limit
      this.getCount()
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    menuTableAction() {
      return this.dataMenuTableAction.map((menu) => {
        return {
          ...menu,
          dataCy: `${this.dataCyFormat}__dropdown--${menu.value}`,
        }
      })
    },
    listData() {
      return this.listDataComplaint.map((item) => {
        if (
          this.typeAduan.aduanDialihkanSpanLapor.props ===
          this.typeAduanPage.props
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
            ? formatDate(item.sp4n_created_at || '', 'dd/MM/yyyy')
            : 'Belum ada',
          complaint_source_name: item?.complaint_source?.name || '-',
          complaint_source_id: item?.complaint_source?.id,
          complaint_source: item?.complaint_source,
          coverage_of_affairs: item?.coverage_of_affairs || '',
          authority: item?.authority || '',
          opd_name: item?.opd_name || '',
          deadline_date: item?.deadline_date || '',
        }
      })
    },
    listCategory() {
      return this.$store.state['utilities-complaint'].listCategory.map(
        (item) => {
          return {
            value: item.id || '',
            label: item.name,
          }
        }
      )
    },
    listNonGovComplaintStatus() {
      // list status complaint for non government
      return this.$store.state[
        'utilities-complaint'
      ].listNonGovComplaintStatus.map((item) => {
        return {
          value: item.id || '',
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
          dataCy: `${this.dataCyFormat}__tab--${item.id}`,
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
        this.$fetch()
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
        this.query.search = value.length > 2 ? value.trim() : null
        this.$fetch()
      }
    }, 500),
  },
  async created() {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
    await this.$store.dispatch('utilities-complaint/getDataCategory')
    const listCategory = [
      { id: '', name: 'Semua Kategori' },
      ...this.$store.state['utilities-complaint'].listCategory,
    ]
    this.$store.commit('utilities-complaint/setListCategory', listCategory)
    if (
      this.typeAduanPage.props === typeAduan.instruksiKewenanganNonPemprov.props
    ) {
      await this.$store.dispatch('utilities-complaint/getNonGovComplaintStatus')
      const listNonGovComplaintStatus = [
        { id: '', name: 'Semua Status Aduan' },
        ...this.$store.state['utilities-complaint'].listNonGovComplaintStatus,
      ]
      this.$store.commit(
        'utilities-complaint/setListNonGovComplaintStatus',
        listNonGovComplaintStatus
      )
    }
  },
  methods: {
    getStyleComplaintType() {
      switch (this.typeAduanPage.props) {
        case typeAduan.penentuanKewenangan.props:
          return 'table-determining-authority'
        case typeAduan.aduanDialihkanSpanLapor.props:
          return 'table-diverted-to-span'
        case typeAduan.instruksiKewenanganPemprov.props:
          return 'table-instruction-authority-gov'
        case typeAduan.instruksiKewenanganNonPemprov.props:
          return 'table-instruction-authority-non-gov'
        default:
          return ''
      }
    },
    checkUrlApi() {
      switch (this.typeAduanPage.props) {
        case typeAduan.aduanDialihkanHotlineJabar.props:
          return ENDPOINT_ADUAN_HOTLINE_JABAR
        case typeAduan.instruksiKewenanganNonPemprov.props:
          return ENDPOINT_ADUAN_NON_PEMPROV
        default:
          return ENDPOINT_ADUAN
      }
    },
    refreshPage() {
      this.query.page = 1
      this.$fetch()
    },
    selectedTabHandle(index) {
      this.query.tabIndex = index
    },
    checkTypeHeaderAduan(type) {
      switch (type) {
        case typeAduan.aduanMasuk.props:
        case typeAduan.aduanDialihkanHotlineJabar.props:
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
      if (value.key && value.order !== null) {
        if (value.key === 'created_at_format') {
          this.query.sort_by = 'created_at'
        } else {
          this.query.sort_by = value.key
        }

        this.query.sort_type = value.order
      } else {
        const { sort_by: sortBy, sort_type: sortType, ...newQuery } = this.query // menghilangkan atribut sort by dan sort type
        this.query = newQuery
      }

      this.$fetch()
    },
    filterCategoryHandle(value) {
      this.query.page = 1

      this.query.complaint_category_id = value
      this.query['complaint_category_id[0]'] = value

      this.$fetch()
    },

    filterNonGovComplaintStatusHandle(value) {
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
      this.$fetch()
    },
    getStatusText(statusId) {
      if (
        this.typeAduanPage.props ===
          typeAduan.instruksiKewenanganNonPemprov.props &&
        statusId === 'coordinated'
      ) {
        return 'Sudah Dikoordinasikan'
      }
      return complaintStatus[statusId]?.name
    },
    getColorText(statusId) {
      const statusColor = complaintStatus[statusId].statusColor.find(
        (statusColor) =>
          statusColor.typeAduan.includes(this.typeAduanPage.props)
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
          (item.complaintType.includes(this.typeAduanPage.props) &&
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
        this.typeAduanPage.props !==
        typeAduan.instruksiKewenanganNonPemprov.props
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
      this.isFilterStatus = true
      const query = { page: 1, limit: 10 }
      this.dataCyButtonAction = `${this.dataCyFormat}__tab__button-action--${status}`
      this.deletePropertiesWithPrefix(this.query, 'complaint_status_id[')
      if (status !== 'total') {
        query['complaint_status_id[0]'] = status
      } else {
        this.addComplaintStatusFilterHandle()
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
      this.query.page = 1
      this.$refs.datepicker.closePopup()
    },
    closePopupDateHandle() {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
      this.query.page = 1
    },
    closePopupAddComplaint() {
      this.isShowPopupAddComplaint = false
      this.$fetch()
    },
    showPopupEvidenceFollowupHotline(item) {
      this.$store.commit('popup-complaint/setDataComplaint', item)
      this.$store.commit('modals/OPEN', 'evidenceFollowupHotline')
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
      this.query.page = 1
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
      return listPropsSortByUpdatedDate.includes(this.typeAduanPage.props)
    },
    getStatusComplaintByComplaintType() {
      return Object.values(complaintStatus).filter((item) =>
        item.typeAduan.includes(this.typeAduanPage.props)
      )
    },
    getComplaintSource(dataComplaint) {
      if (dataComplaint.complaint_source === 'sp4n') {
        return this.complaintSource.span
      }
      return this.complaintSource[dataComplaint.complaint_source]
    },
    async getCount() {
      const queryCount = {
        ...this.query,
        is_admin: 1,
        phase: this.typeAduanPage.phase,
      }

      this.deletePropertiesWithPrefix(queryCount, 'complaint_status_id[')
      if (
        this.typeAduan.aduanDariSpanLapor.props === this.typeAduanPage.props ||
        typeAduan.instruksiKewenanganNonPemprov.props ===
          this.typeAduanPage.props
      ) {
        complaintStatus.total.value = this.pagination.totalRows
      } else {
        try {
          // handle data statistic complaint

          const urlApi = this.checkUrlApi()
          const responseListStatisticComplaint = await this.$axios.get(
            `${urlApi}/statistics`,
            {
              params: queryCount,
            }
          )
          const listDataStatisticComplaint =
            responseListStatisticComplaint.data.data
          const listComplaintStatus = this.getStatusComplaintByComplaintType()
          this.listStatisticComplaint = listComplaintStatus.map(
            (complaintStatus) => {
              const dataStatistic = listDataStatisticComplaint.find(
                (statisticComplaint) =>
                  statisticComplaint.id === complaintStatus.id
              )
              return { ...complaintStatus, value: dataStatistic?.value || 0 }
            }
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

    deletePropertiesWithPrefix(obj, prefix) {
      for (const prop in obj) {
        if (prop.startsWith(prefix)) {
          delete obj[prop]
        }
      }
    },
    showPopupAddComplaint() {
      this.isShowPopupAddComplaint = true
      this.$store.commit('modals/OPEN', 'addComplaint')
    },
  },
}
</script>

<style lang="scss" scoped>
.select-form-complaint::v-deep {
  .jds-input-text__input-wrapper,
  .jds-popover__content {
    @media (min-width: 1536px) {
      width: 260px !important;
    }
  }
}

.jds-data-table::v-deep {
  td,
  div {
    @media (max-width: 1472px) {
      font-size: 12px;
    }
  }
}

// class instruksi kewenangan non pemprov
.table-instruction-authority-non-gov::v-deep {
  @media (max-width: 1472px) {
    td:nth-child(5),
    td:nth-child(6) {
      width: 130px;
    }
    td:nth-child(7) {
      width: 163px;
    }
  }
}

// dialihkan ke span
.table-diverted-to-span::v-deep {
  @media (max-width: 1472px) {
    td:nth-child(4),
    td:nth-child(5) {
      width: 130px;
    }
    td:nth-child(6) {
      width: 140px;
    }
    td:nth-child(7) {
      width: 100px;
    }
  }
}

// instruksi kewenangan pemprov
.table-instruction-authority-gov::v-deep {
  @media (max-width: 1472px) {
    td:nth-child(3) {
      width: 204px;
    }
    td:nth-child(4) {
      width: 135px;
    }
    td:nth-child(5) {
      width: 150px;
    }
  }
}

// penentu kewenangan
.table-determining-authority::v-deep {
  @media (max-width: 1472px) {
    td:nth-child(6) {
      width: 170px;
    }
    td:nth-child(5) {
      width: 130px;
    }
  }
}
</style>
