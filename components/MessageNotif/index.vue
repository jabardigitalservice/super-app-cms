<template>
  <div>
    <BaseHeader
      :navigations="navigations"
      description-page="Berisi semua daftar pesan yang dikirimkan ke aplikasi Sapawarga."
    />
    <div class="mt-8">
      <div class="flex justify-between mb-4">
        <jds-search
          value=""
          placeholder="Masukkan judul pesan"
          icon
          :button="false"
          small
          class="w-[275px] h-[38px] text-gray-500"
        />
        <BaseButton class="bg-green-600 w-[102px] text-white font-semibold">
          Buat Pesan
        </BaseButton>
      </div>
      <JdsDataTable
        :headers="messageNotifHeader"
        :items="getListMessageNotif"
        :loading="$fetchState.pending"
        :pagination="pagination"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.status="{item}">
          <div class="flex items-center">
            <div
              v-show="item?.status"
              :class="{
                'mr-2 h-2 w-2 rounded-full':true,
                'bg-green-600': item.status == messageStatus.published.id,
                'bg-yellow-600': item.status == messageStatus.waiting.id,
              }"
            />
            {{ getStatusName(item.status) || "-" }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <BaseTableAction :list-menu-pop-over="filterTableAction(item.messageStatus)" />
        </template>
      </JdsDataTable>
    </div>
  </div>
</template>

<script>
import { messageNotifHeader, messageStatus } from '~/constant/message-notif'
import { formatDate } from '~/utils'

export default {
  name: 'ListMessageNotif',
  data () {
    return {
      navigations: [
        {
          label: 'Pesan Broadcast',
          link: '/message-notif'
        }
      ],
      messageNotifList: [],
      messageNotifHeader,
      messageStatus,
      menuTableAction: [
        { menu: 'Lihat Detail', value: 'detail' },
        { menu: 'Publikasikan', value: 'publish' },
        { menu: 'Hapus', value: 'delete' }
      ],
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 10
      }
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`messages?page=${this.pagination.currentPage}&limit=${this.pagination.itemsPerPage}`)
      const dataMessageNotif = response.data
      this.messageNotifList = dataMessageNotif.data
      this.pagination = { ...this.pagination, currentPage: dataMessageNotif.meta.page, totalRows: dataMessageNotif.meta.totalCount, itemsPerPage: 10 }
    } catch {
      this.messageNotifList = []
    }
  },
  computed: {
    getListMessageNotif () {
      return this.messageNotifList.map((item) => {
        return { ...item, createdAt: formatDate('', item.createdAt), publishedAt: formatDate('', item.publishedAt) }
      })
    }
  },
  methods: {
    filterTableAction (currentUserStatus) {
      if (currentUserStatus === messageStatus.published.id) {
        return this.menuTableAction.filter(item => item.menu !== 'Publikasikan')
      } else {
        return this.menuTableAction
      }
    },
    getStatusName (currentStatus) {
      return Object.values(this.messageStatus).find(item => item.id === currentStatus).status
    }
  }
}
</script>

<style scoped>
  .jds-data-table:deep{
    border-spacing: 1px !important;
    @apply rounded-lg;
  }

  .jds-data-table:deep tr th:first-child{
    @apply min-w-[435px] rounded-tl-lg;
  }

  .jds-data-table:deep tr th:last-child{
    @apply rounded-tr-lg;
  }
  .jds-data-table:deep tr th {
    @apply min-w-[191px] h-[42px] border-r border-white bg-green-600;
  }

  .jds-data-table:deep tr td {
    @apply border-r border-gray-200;
  }
</style>
