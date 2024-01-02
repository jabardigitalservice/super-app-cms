<template>
  <div>
    <div class="mb-6 flex justify-between">
      <jds-search

        v-model="search"
        placeholder="Masukkan id pembayaran"
        icon
        :button="false"
        small
        class="h-[38px] w-[275px] text-gray-500"
        @input="onSearch"
      />
    </div>
    <div class="overflow-x-auto rounded-lg font-roboto">
      <JdsDataTable
        :headers="headerTicketMuseum"
        :items="getListTicket"
        :loading="$fetchState.pending"
        :pagination="pagination"
        @next-page="pageChange"
        @previous-page="pageChange"
        @page-change="pageChange"
        @per-page-change="perPageChange"
        @change:sort="sortChange"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.fileId="{ item }">
          <button
            class="rounded-lg border border-green-700 px-4 py-1 text-green-700 hover:bg-green-50"
            @click="onClickDocument(item?.fileId)"
          >
            Bukti Pembayaran
          </button>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.status="{ item }">
          <div class="flex items-center">
            <div
              v-show="item?.status"
              class="mr-2 h-2 w-2 rounded-full"
              :class="getColorIconStatus(ticketStatus[`${item?.status}`])"
            />
            {{ ticketStatus[`${item?.status}`] }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <BaseTableAction
            :list-menu-pop-over="
              filterTableAction(ticketStatus[`${item?.status}`])
            "
            @tolak="showRejectTicketHandle(item)"
            @verification="showVerificationTicketHandle(item)"
            @detail="goToDetailPageHandle(item)"
          />
        </template>
      </JdsDataTable>
    </div>

    <BaseViewFile
      title="Butki Pembayaran"
      :file="buktiPembayaranInfo.file"
      :mime-type="buktiPembayaranInfo.mimeType"
      :show="showFile"
      @close="showFile = false"
    />

    <BasePopup
      :show-popup="showPopUp"
      @submit="submitHandle"
      @close="closeHandle"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { iconPopup } from '~/constant/icon-popup'
import {
  headerTicketMuseum,
  ticketStatus,
  rejectConfirmationPopup,
  rejectInformationPopup,
  verificationConfirmationPopup,
  verificationInformationPopup
} from '~/constant/tiket-museum'
import {
  formatDate,
  convertToRupiah,
  generateItemsPerPageOptions,
  resetQueryParamsUrl
} from '~/utils'
import popup from '~/mixins/tiket-museum'
export default {
  name: 'ListTicketMuseum',
  mixins: [popup],
  data () {
    return {
      headerTicketMuseum,
      ticketStatus,
      ticketList: [],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true
      },
      search: '',
      query: {
        pageSize: 5,
        page: 1,
        search: '',
        sortType: 'desc',
        sortBy: 'orderedAt'
      },
      buktiPembayaranInfo: {
        show: false,
        file: '',
        mimeType: ''
      },
      showFile: false,
      menuTableAction: [
        { menu: 'Lihat Detail', value: 'detail' },
        { menu: 'Verifikasi', value: 'verification' },
        { menu: 'Tolak', value: 'tolak' }
      ],
      iconPopup,
      rejectConfirmationPopup,
      rejectInformationPopup,
      verificationConfirmationPopup,
      verificationInformationPopup
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/ticket/aljabbar/admin/orders', {
        params: this.query
      })

      const data = response.data.data
      this.ticketList = data?.data || []

      if (this.ticketList.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }
      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.totalData || 0
      this.pagination.itemsPerPage = data?.pageSize || this.query.pageSize
    } catch {
      this.pagination.disabled = true
    }
  },
  computed: {
    getListTicket () {
      return this.ticketList.map((item) => {
        return {
          ...item,
          orderedAt: formatDate(item.orderedAt || '', 'dd/MM/yyyy HH:mm'),
          amount: convertToRupiah(item.amount || 0),
          sessionName: `${item.sessionName} Jam ${item.sessionHour}`
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
          this.search = this.query.search || ''
        }
      }

    }
  },
  mounted () {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
  },
  methods: {
    goToDetailPageHandle (item) {
      this.$router.push({
        path: `/ticket-museum/detail/${item.invoice}`,
        query: this.query
      })
    },
    async onClickDocument (fileId) {
      this.showFile = true
      this.buktiPembayaranInfo.file = 'loading'
      try {
        const response = await this.$axios.get(`/file/view/${fileId}`, {
          headers: { 'x-file-id': fileId }
        })

        this.buktiPembayaranInfo.file = response.data.data || ''
        this.buktiPembayaranInfo.mimeType = response.data.meta.mimeType || ''
      } catch {
        this.buktiPembayaranInfo.file = ''
      }
    },
    filterTableAction (status) {
      if (status === ticketStatus.confirmed) {
        return this.menuTableAction
      } else {
        return this.menuTableAction.filter(
          item => item.menu !== 'Verifikasi' && item.menu !== 'Tolak'
        )
      }
    },
    searchInvoice: debounce(function (value) {
      if (value.length > 2) {
        this.query.page = 1
        this.query.search = value
        this.$fetch()
      } else if (value.length === 0) {
        this.query.search = null
        this.$fetch()
      }
    }, 500),
    onSearch (value) {
      this.searchInvoice(value)
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
    }
  }
}
</script>

<style scoped>
.jds-data-table:deep {
  border-spacing: 1px !important;
  @apply !bg-[#EDEFF3];
}

.jds-data-table:deep tr th {
  @apply border-r border-white;
}

.jds-data-table:deep tr td {
  @apply border-r border-gray-200;
}
.jds-pagination:deep {
  @apply !bg-red-600;
}

.table-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.table-content::-webkit-scrollbar-track {
  @apply rounded-b-lg border-none bg-gray-50;
}

.table-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
</style>
