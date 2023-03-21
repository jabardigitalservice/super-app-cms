<template>
  <div>
    <div class="mb-6 flex justify-between">
      <jds-search
        value=""
        placeholder="Masukkan id pembayaran"
        icon
        :button="false"
        small
        class="h-[38px] w-[275px] text-gray-500"
      />
    </div>
    <div class="overflow-x-auto rounded-lg font-roboto">
      <JdsDataTable
        :headers="headerTicketMuseum"
        :items="getListTicket"
        :loading="$fetchState.pending"
        :pagination="pagination"
        class="w-full"
        @next-page="pageChangeHandle"
        @previous-page="pageChangeHandle"
        @page-change="pageChangeHandle"
        @per-page-change="perPageChangeHandle"
        @change:sort="sortHandle"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.fileId="{ item }">
          <button
            class="rounded-lg border border-green-700 px-4 py-1 text-green-700 hover:bg-green-50"
            @click="onClickDocument(item?.fileId)"
          >
            Lihat Bukti Pembayaran
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
            @reject="showRejectTicketHandle(item)"
            @verification="showVerificationTicketHandle(item)"
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

    <BasePopup :show-popup="showPopup" @submit="submitHandle" @close="closeHandle" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { iconPopup } from '~/constant/icon-popup'
import {
  headerTicketMuseum, ticketStatus, rejectConfirmationPopup,
  rejectInformationPopup,
  verificationConfirmationPopup,
  verificationInformationPopup
} from '~/constant/tiket-museum'
import {
  formatDate,
  convertToRupiah,
  generateItemsPerPageOptions
} from '~/utils'
import popup from '~/mixins/tiket-museum'
export default {
  name: 'ListTicketMuseum',
  mixins: [popup],
  data () {
    return {
      // todo: if API ready, i wil delete array items
      items: [
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '1',
          status: 'confirmed',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '2',
          status: 'verified',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '3',
          status: 'rejected',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '4',
          status: 'canceled',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '5',
          status: 'expired',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '6',
          status: 'ordered',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '5',
          status: 'expired',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '6',
          status: 'ordered',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '5',
          status: 'expired',
          orderedAt: '2023-03-20 02:24:56.961784'
        },
        {
          fileId: 'e1f975e6-c4a7-4c7c-8414-900113ffd0b9',
          invoice: 'MRAJ-23032324001',
          amount: 50000,
          sessionName: 'Sesi 2',
          sessionHour: '15:30 - 17.30 WIB',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '6',
          status: 'ordered',
          orderedAt: '2023-03-20 02:24:56.961784'
        }
      ],
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
      sortBy: '',
      sortOrder: '',
      showPopup: false,
      search: '',

      buktiPembayaranInfo: {
        show: false,
        file: '',
        mimeType: ''
      },
      showFile: false,
      menuTableAction: [
        { menu: 'Lihat Detail', value: 'detail' },
        { menu: 'Verification', value: 'verification' },
        { menu: 'Reject', value: 'reject' }
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
      const queryParams = {
        q: this.search, // query params search from backend
        page: this.pagination.currentPage,
        limit: this.pagination.itemsPerPage,
        sortBy: this.sortBy,
        sortOrder: this.pagination.sortOrder
      }

      const response = await this.$axios.get('/ticket/aljabbar/orders', {
        params: queryParams
      })

      const { data } = response.data
      this.data = data?.data || []
      if (this.data.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }
      this.ticketList = data?.data
      this.pagination.currentPage = data?.meta.page
      this.pagination.totalRows = data?.meta.totalCount
      this.pagination.itemsPerPage = data?.meta.limit
    } catch {
      // todo : api not ready and me make dummy data , if API ready i fix it on this code
      // this.ticketList = []

      this.ticketList = this.items
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
  mounted () {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
  },
  methods: {
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
          item => item.menu !== 'Verification' && item.menu !== 'Reject'
        )
      }
    },
    getColorIconStatus (status) {
      if (status === ticketStatus.verified) {
        return 'bg-green-600'
      } else if (
        status === ticketStatus.rejected ||
        status === ticketStatus.canceled ||
        status === ticketStatus.expired
      ) {
        return 'bg-red-600'
      } else if (
        status === ticketStatus.ordered ||
        status === ticketStatus.confirmed
      ) {
        return 'bg-yellow-600'
      } else {
        return 'bg-black'
      }
    },
    pageChangeHandle (value) {
      this.pagination.currentPage = value
      this.$fetch()
    },
    perPageChangeHandle (value) {
      this.pagination.itemsPerPage = value
      this.pagination.currentPage = 1
      this.$fetch()
    },
    sortHandle (value) {
      // replace createdAt & publishedAt to created_at & published_at, because in firebase is using snake case & json using camel case
      this.sortBy = Object.keys(value)[0].replace('At', '_at')
      this.sortOrder = Object.values(value)[0]
      this.$fetch()
    }
  },
  searchDebounce: debounce(function (value) {
    if (value.length > 2) {
      this.search = value
    } else if (value.length === 0) {
      this.search = ''
    }
    this.pagination.currentPage = 1
    this.$fetch()
  }, 500),
  searchHandle (value) {
    this.searchDebounce(value)
  }
}
</script>

<style scoped>
.jds-data-table:deep {
  border-spacing: 1px !important;
  @apply !bg-[#EDEFF3];
}

.jds-data-table:deep tr th {
  @apply min-w-[170px] border-r border-white;
}

.jds-data-table:deep tr td {
  @apply min-w-[170px] border-r border-gray-200;
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
