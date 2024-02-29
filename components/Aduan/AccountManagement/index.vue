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
                placeholder="Cari Nama atau Email"
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
                <jds-select
                  v-model="query.roleId"
                  placeholder="Pilih Role"
                  :options="listRole"
                  class="select-form-complaint !ml-2 mr-2 !w-[260px]"
                />
              </div>
            </div>
            <jds-button label="Tambah Akun" variant="primary" />
          </div>
          <JdsDataTable
            :headers="managementAccountComplaintHeader"
            :items="listData"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.status_name="{ item }">
              <div class="flex items-center">
                <p
                  v-show="item?.status_id"
                  class="h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
                  :class="getColorText(item?.status_id)"
                >
                  {{ getStatusText(item.status_id) }}
                </p>
              </div>
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{ item }">
              <BaseTableAction
                :list-menu-pop-over="filterTableAction(item?.status_id)"
                @non-active-account="
                  showPopupConfirmation(
                    confirmationDialog.nonActive.nameModal,
                    item
                  )
                "
                @active-account="
                  showPopupConfirmation(
                    confirmationDialog.active.nameModal,
                    item
                  )
                "
                @delete-account="
                  showPopupConfirmation(
                    confirmationDialog.delete.nameModal,
                    item
                  )
                "
              />
            </template>
          </JdsDataTable>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogConfirmationNew
      :dialog-modal="confirmationDialog.active"
      :detail-item-modal="detailItem"
    />
    <DialogConfirmationNew
      :dialog-modal="confirmationDialog.nonActive"
      :detail-item-modal="detailItem"
    />
    <DialogConfirmationNew
      :dialog-modal="confirmationDialog.delete"
      :detail-item-modal="detailItem"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { generateItemsPerPageOptions, resetQueryParamsUrl } from '~/utils'
import TabBarList from '~/components/Aduan/TabBar/List'
import {
  managementAccountComplaintHeader,
  managementAccountComplaintStatus,
  confirmationDialog,
} from '~/constant/management-user'

export default {
  name: 'AcountManagementTable',
  components: { TabBarList },
  data() {
    return {
      menuTableAction: [
        { menu: 'Detail Akun', value: 'detail-account', status: 'all' },
        {
          menu: 'Non-aktifkan Akun',
          value: 'non-active-account',
          status: managementAccountComplaintStatus.active.id,
        },
        {
          menu: 'Aktifkan Akun',
          value: 'active-account',
          status: managementAccountComplaintStatus.not_active.id,
        },
        {
          menu: 'Hapus',
          value: 'delete-account',
          status: managementAccountComplaintStatus.not_active.id,
        },
      ],
      listStatisticManagementAccount: [{}],
      listDataManagementAccount: [
        {
          id: '13i41g3rv1i3y4gr139r13r',
          name: 'Budi Samsudin',
          email: 'timrespon@yopmail.com',
          role: {
            id: 1,
            name: 'Tim Respon dan Verifikator',
          },
          opd: {
            id: 1,
            name: 'Diskominfo -JDS',
          },
          status: {
            id: 'unverified',
            name: 'Belum Verifikasi',
          },
        },
        {
          id: '13i41g3rv1i3y4gr139r13r',
          name: 'Heru Handoko',
          email: 'timpenentu@yopmail.com',
          role: {
            id: 1,
            name: 'Tim Penentu Kewenangan',
          },
          opd: {
            id: 1,
            name: 'Diskominfo-Bidang IKP',
          },
          status: {
            id: 'not_active',
            name: 'Tidak Aktif',
          },
        },
        {
          id: '13i41g3rv1i3y4gr139r13r',
          name: 'Hendra Gunawan',
          email: 'timpengendali@yopmail.com',
          role: {
            id: 1,
            name: 'Tim Pengendali Aduan',
          },
          opd: {
            id: 1,
            name: 'Tim Sekertariat Daerah',
          },
          status: {
            id: 'active',
            name: 'Aktif',
          },
        },
        {
          id: '13i41g3rv1i3y4gr139r13r',
          name: 'Agus Sutisna',
          email: 'perangkatdaerah@yopmail.com',
          role: {
            id: 1,
            name: 'Perangkat Daerah',
          },
          opd: {
            id: 1,
            name: 'Dinas Kesehatan Provinsi Jawa Barat',
          },
          status: {
            id: 'unverified',
            name: 'Belum Verifikasi',
          },
        },
      ],
      listDataRole: [
        {
          id: '-',
          name: 'Semua Role',
        },
        {
          id: 'respon-verifikator',
          name: 'Tim Respon dan Verifikator',
        },
        {
          id: 'penentu-Kewenangan',
          name: 'Tim Penentu Kewenangan',
        },
        {
          id: 'pengendali-aduan',
          name: 'Tim Pengendali Aduan',
        },
        {
          id: 'perangkat-daerah',
          name: 'Perangkat Daerah',
        },
      ],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true,
      },
      query: {
        limit: 5,
        page: 1,
        search: null,
        tabIndex: 0,
        idTab: this.tabName,
        roleId: '-',
      },
      search: '',
      isShowPopupDate: false,
      isShowPopupDateRange: false,
      dateRange: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
      ],
      managementAccountComplaintHeader,
      confirmationDialog,
      detailItem: {
        id: '',
        title: '',
      },
    }
  },
  // TO DO : if API already
  // async fetch() {
  //   try {
  //     const responseList = await this.$axios.get('/users/admin', {
  //       params: { ...this.query },
  //     })
  //     const { data } = responseList.data
  //     this.listDataManagementAccount = data?.data || []
  //     if (this.listDataManagementAccount.length) {
  //       this.pagination.disabled = false
  //     } else {
  //       this.pagination.disabled = true
  //     }

  //     this.pagination.currentPage = data?.page || 1
  //     this.pagination.totalRows = data?.total_data || 0
  //     this.pagination.itemsPerPage = data?.page_size || this.query.limit

  //     this.getCount()
  //   } catch {
  //     this.pagination.disabled = true
  //   }
  // },
  computed: {
    listData() {
      return this.listDataManagementAccount.map((item) => {
        return {
          ...item,
          role: item.role.name,
          instance: item.opd.name,
          status_id: item.status.id,
        }
      })
    },
    listStatistic() {
      return [
        { ...managementAccountComplaintStatus.total, value: 2 },
        { ...managementAccountComplaintStatus.unverified, value: 2 },
        { ...managementAccountComplaintStatus.active, value: 2 },
        { ...managementAccountComplaintStatus.not_active, value: 2 },
      ]
    },
    listRole() {
      return this.listDataRole.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    },
  },
  watch: {
    query: {
      deep: true,
      handler() {
        resetQueryParamsUrl(this)
        // TODO : if API already
        // this.$fetch()
      },
    },
    // TODO : if API already
    // '$route.query': {
    //   deep: true,
    //   immediate: true,
    //   handler(newQuery) {
    //     if (Object.keys(newQuery).length > 0) {
    //       this.query = { ...newQuery }
    //       this.query.tabIndex = parseInt(this.query.tabIndex)
    //       this.search = this.query.search || ''
    //     }
    //   },
    // },
    search: debounce(function (value) {
      if (value.length > 2 || value.length === 0) {
        this.query.page = 1
        this.query.search = value.length > 2 ? value : null
        // TODO : if API already
        // this.$fetch()
      }
    }, 500),
  },
  mounted() {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
  },
  methods: {
    selectedTabHandle(index) {
      this.query.tabIndex = index
    },
    filterTableAction(statusId) {
      return this.menuTableAction.filter((item) => {
        return item.status === 'all' || item.status === statusId
      })
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
    setQuery(params) {
      this.query = { ...this.query, ...params }
    },
    getTotalStatistic() {
      const total = this.listStatisticManagementAccount.reduce(
        (accumulator, object) => {
          return accumulator + object.value
        },
        0
      )
      return total
    },
    getStatusText(status) {
      switch (status) {
        case managementAccountComplaintStatus.active.id:
          return managementAccountComplaintStatus.active.name
        case managementAccountComplaintStatus.not_active.id:
          return managementAccountComplaintStatus.not_active.name
        case managementAccountComplaintStatus.unverified.id:
          return managementAccountComplaintStatus.unverified.name
        default:
          return '-'
      }
    },
    getColorText(status) {
      const statusColor = managementAccountComplaintStatus[status]?.statusColor
      switch (statusColor) {
        case 'yellow':
          return 'text-[#FF7500]'
        case 'green':
          return 'text-green-700'
        case 'red':
          return 'text-[#DD5E5E]'
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
    showPopupConfirmation(modalName, detailAccount) {
      this.detailItem.title = `${detailAccount.name} - ${detailAccount.email}`
      this.$store.commit('modals/OPEN', modalName)
    },
    // TO DO : if API already
    // async getCount() {
    //   const queryCount = { ...this.query }
    //   queryCount.status = ''
    //   try {
    //     const responseDataStatistics = await this.$axios.get(
    //       '/users/admin/statistic',
    //       {
    //         params: queryCount,
    //       }
    //     )
    //     this.listStatisticManagementAccount = responseDataStatistics.data.data
    //     managementAccountStatus.total.value = this.getTotalStatistic()
    //     this.listStatisticManagementAccount.unshift(managementAccountStatus.total)
    //     if (this.listStatisticManagementAccount.length === 2) {
    //       this.listStatisticManagementAccount.pop()
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
  },
}
</script>

<style scoped>
.jds-data-table::v-deep td:nth-child(3) {
  @apply !w-[210px];
}

.jds-data-table::v-deep td:nth-child(4) {
  @apply !w-[260px];
}
</style>
