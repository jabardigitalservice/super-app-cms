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
                  v-model="query.role_id"
                  placeholder="Pilih Role"
                  :options="listRole"
                  class="select-form-complaint !ml-2 mr-2 !w-[260px]"
                  @change="filterRole"
                />
              </div>
            </div>
            <jds-button
              label="Tambah Akun"
              variant="primary"
              @click="showPopupFormAccount(modalNameAddAccount)"
            />
          </div>
          <JdsDataTable
            :headers="managementAccountComplaintHeader"
            :items="listData"
            :pagination="pagination"
            @next-page="pageChange"
            @previous-page="pageChange"
            @page-change="pageChange"
            @per-page-change="perPageChange"
            @change:sort="sortChange"
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
                @detail-account="goToPageDetail(item.id)"
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
                @resend-email="showPopupFormAccount(modalNameResendEmail, item)"
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
    <DialogFormAccount
      :title="modalForm.title"
      :modal-name="modalForm.modalName"
      :id-account="idAccount"
      @close="$fetch()"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import { generateItemsPerPageOptions, resetQueryParamsUrl } from '~/utils'
import TabBarList from '~/components/Aduan/TabBar/List'
import {
  managementAccountComplaintHeader,
  managementAccountComplaintStatus,
  confirmationDialog,
} from '~/constant/management-user'
import DialogFormAccount from '~/components/Aduan/Dialog/Account'

export default {
  name: 'AcountManagementTable',
  components: { TabBarList, DialogFormAccount },
  data() {
    return {
      menuTableAction: [
        { menu: 'Detail Akun', value: 'detail-account', status: 'all' },
        {
          menu: 'Non-aktifkan Akun',
          value: 'non-active-account',
          status: managementAccountComplaintStatus.verified.id,
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
        {
          menu: 'Kirim Ulang Email Verifikasi',
          value: 'resend-email',
          status: managementAccountComplaintStatus.unverified.id,
        },
      ],
      listStatisticManagementAccount: [{}],
      listDataManagementAccount: [],
      listDataRole: [],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true,
      },
      query: {
        per_page: 10, // limit data
        page: 1, // current page
        q: null, // query params for search
        tabIndex: 0,
        idTab: this.tabName,
        role_id: null,
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
      idAccount: '',
      modalNameAddAccount: 'addAccount',
      modalNameResendEmail: 'resendEmail',
    }
  },
  async fetch() {
    try {
      // get data management account
      const responseDataManagementAccount = await this.$axios.get(
        '/users/admin/complaint',
        {
          params: { ...this.query },
        }
      )
      this.listDataManagementAccount = responseDataManagementAccount.data?.data
      this.pagination = {
        currentPage: responseDataManagementAccount.data.meta?.current_page || 1,
        totalRows: responseDataManagementAccount.data.meta?.total_count || 0,
        itemsPerPage:
          responseDataManagementAccount.data.meta?.per_page || this.query.limit,
      }

      // get data role
      const responseDataRole = await this.$axios.get(
        '/users/admin/complaint/roles'
      )
      this.listDataRole = responseDataRole.data?.data
      this.listDataRole.unshift({ id: null, name: 'Semua Role' })
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    listData() {
      return this.listDataManagementAccount.map((item) => {
        return {
          ...item,
          role_name: item.role.name,
          role_id: item.role.id,
          organization_name: item.organization.name,
          organization_id: item.organization.id,
          status_name: item.status.name,
          status_id: item.status.code,
          employee_number: item.employee_number,
          employee_status: item.employee_status.code,
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
    ...mapGetters('management-account', {
      modalForm: 'getModalForm',
    }),
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
          this.search = this.query.q || ''
        }
      },
    },
    search: debounce(function (value) {
      if (value.length > 2 || value.length === 0) {
        this.query.page = 1
        this.query.q = value.length > 2 ? value : null
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
    goToPageDetail(id) {
      this.$router.push({
        path: `management-akun/detail/${id}`,
        query: this.query,
      })
    },
    selectedTabHandle(index) {
      this.query.tabIndex = index
    },
    filterRole(value) {
      this.query.role_id = value
      this.$fetch()
    },
    filterTableAction(statusId) {
      return this.menuTableAction.filter((item) => {
        return item.status === 'all' || item.status === statusId
      })
    },
    pageChange(value) {
      this.query.page = value
      this.$fetch()
    },
    perPageChange(value) {
      if (value) {
        this.query.per_page = value
      }
      this.query.page = 1
      this.$fetch()
    },
    sortChange(value) {
      const key = Object.keys(value)[0]
      if (key && value[key] !== 'no-sort') {
        this.query.sort_by = key
        this.query.sort_order = value[key]
      } else {
        this.setQuery({ sort_by: null, sort_order: null })
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
        case managementAccountComplaintStatus.verified.id:
          return managementAccountComplaintStatus.verified.name
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
    // TO DO : if API already
    // listTabHandle(statusId) {
    //   const query = {
    //     page: 1,
    //   }

    //   if (statusId !== 'total') {
    //     query.status = statusId
    //   } else {
    //     delete this.query.status
    //   }

    //   this.isShowPopupDateRange = false
    //   this.setQuery(query)
    //   this.$fetch()
    // },
    // goToPageDetail(id) {
    //   this.$router.push({
    //     path: `${this.detailPage}/${id}`,
    //     query: this.query,
    //   })
    // },
    showPopupConfirmation(modalName, detailAccount) {
      this.detailItem.title = `${detailAccount.name} - ${detailAccount.email}`
      this.$store.commit('modals/OPEN', modalName)
    },
    showPopupFormAccount(modalName, dataAccount = null) {
      let payload = {}
      if (modalName === this.modalNameResendEmail) {
        payload = {
          name: dataAccount.name,
          email: dataAccount.email,
          roleId: dataAccount.role_id,
          organizationId: dataAccount.organization_id,
          employeeStatus: dataAccount.employee_status,
          employeeNumber: dataAccount.employee_number,
        }
        this.idAccount = dataAccount.id
      }
      this.$store.dispatch('management-account/showPopupFormAccount', {
        modalName,
        payload,
      })
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
