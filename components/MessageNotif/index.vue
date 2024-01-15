<template>
  <div>
    <div class="mt-2">
      <div class="mb-4 flex justify-between">
        <jds-search
          v-model="search"
          placeholder="Masukkan judul pesan"
          icon
          :button="false"
          small
          class="h-[38px] w-[275px] text-gray-500"
          @input="searchHandle"
        />
        <jds-button
          class="!w-[102px] !bg-green-600 !text-sm"
          @click.prevent="goToFormAddMessageNotifHandle"
        >
          Buat Pesan
        </jds-button>
      </div>
      <div class="overflow-x-auto overflow-y-hidden">
        <JdsDataTable
          :headers="messageNotifHeader"
          :items="getListMessageNotif"
          :loading="$fetchState.pending"
          :pagination="pagination"
          @next-page="pageChangeHandle"
          @previous-page="pageChangeHandle"
          @page-change="pageChangeHandle"
          @per-page-change="perPageChangeHandle"
          @change:sort="sortHandle"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.status="{ item }">
            <div class="flex items-center">
              <div
                v-show="item?.status"
                :class="{
                  'mr-2 h-2 w-2 rounded-full': true,
                  'bg-green-600': item.status == messageStatus.published.id,
                  'bg-yellow-600': item.status == messageStatus.waiting.id,
                }"
              />
              {{ getStatusName(item.status) || "-" }}
            </div>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template #item.action="{ item }">
            <BaseTableAction
              :list-menu-pop-over="filterTableAction(item.status)"
              @detail="goToDetailPageHandle(item)"
              @delete="openModalConfirmation('delete-confirmation', item)"
              @publish="openModalConfirmation('publish-confirmation', item)"
            />
          </template>
        </JdsDataTable>
      </div>
    </div>

    <DialogConfirmationNew
      :dialog-modal="publishedConfirmationPopup"
      :detail-item-modal="detailItem"
      :path="`/messages/${detailItem.id}/send`"
      http-method="post"
      @error="openModalInformation"
      @success="openModalInformation"
    />
    <DialogConfirmationNew
      :dialog-modal="deleteConfirmationPopup"
      :detail-item-modal="detailItem"
      :path="`/messages/${detailItem.id}`"
      http-method="delete"
      @error="openModalInformation"
      @success="openModalInformation"
    />

    <DialogInformationNew
      :name-modal="modalNameInformation"
      :dialog-modal="dialogInformationPopup"
      :detail-item-modal="detailItem"
      :is-success="isSuccessConfirmation"
      @close-all-modal="$fetch()"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import {
  messageNotifHeader,
  messageStatus,
  deleteConfirmationPopup,
  deleteInformationPopup,
  publishedConfirmationPopup,
  publishedInformationPopup
} from '~/constant/message-notif'
import {
  formatDate,
  generateItemsPerPageOptions,
  resetQueryParamsUrl
} from '~/utils'

export default {
  name: 'ListMessageNotif',
  data () {
    return {
      messageNotifList: [],
      messageNotifHeader,
      messageStatus,
      menuTableAction: [
        { menu: 'Lihat Detail', value: 'detail' },
        { menu: 'Publikasikan', value: 'publish' },
        { menu: 'Hapus', value: 'delete' }
      ],
      query: {
        q: '',
        page: 1,
        limit: 5,
        sortBy: '',
        sortOrder: ''
      },
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: []
      },
      deleteConfirmationPopup,
      deleteInformationPopup,
      publishedInformationPopup,
      publishedConfirmationPopup,
      search: '',
      detailItem: {
        id: '',
        title: ''
      },
      dialogInformationPopup: {},
      modalNameInformation: '',
      isSuccessConfirmation: false
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/messages', {
        params: this.query
      })
      const dataMessageNotif = response.data
      this.messageNotifList = dataMessageNotif.data
      this.pagination.currentPage = dataMessageNotif.meta.page
      this.pagination.totalRows = dataMessageNotif.meta.totalCount
      this.pagination.itemsPerPage = dataMessageNotif.meta.limit
    } catch {
      this.messageNotifList = []
    }
  },
  computed: {
    getListMessageNotif () {
      return this.messageNotifList.map((item) => {
        return {
          ...item,
          // TODO: comment code for production
          // targetPlatform: item.targetPlatform || '-',
          // topic: item.topic || '-',
          createdAt: formatDate(item.createdAt || '', 'dd/MM/yyyy HH:mm'),
          publishedAt: formatDate(item.publishedAt || '', 'dd/MM/yyyy HH:mm')
        }
      })
    },
    getIsError () {
      return this.$store.state.isError
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
          this.search = this.query.q || ''
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
    filterTableAction (currentMessageStatus) {
      if (currentMessageStatus === messageStatus.published.id) {
        return this.menuTableAction.filter(
          item => item.menu !== 'Publikasikan'
        )
      } else {
        return this.menuTableAction
      }
    },
    getStatusName (currentStatus) {
      return Object.values(this.messageStatus).find(
        item => item.id === currentStatus
      ).status
    },
    pageChangeHandle (value) {
      this.query.page = value
      this.$fetch()
    },
    perPageChangeHandle (value) {
      if (value) {
        this.query.limit = value
      }
      this.pagination.page = 1
      this.$fetch()
    },
    sortHandle (value) {
      // replace createdAt & publishedAt to created_at & published_at, because in firebase is using snake case & json using camel case
      this.query.sortBy = Object.keys(value)[0].replace('At', '_at')
      this.query.sortOrder = Object.values(value)[0]
      if (this.query.sortOrder === 'no-sort') {
        this.query.sortBy = ''
        this.query.sortOrder = ''
      }
      this.$fetch()
    },
    searchDebounce: debounce(function (value) {
      if (value.length > 2) {
        this.query.page = 1
        this.query.q = value
        this.$fetch()
      } else if (value.length === 0) {
        this.query.q = ''
        this.$fetch()
      }
    }, 500),
    searchHandle (value) {
      this.searchDebounce(value)
    },
    goToDetailPageHandle (item) {
      this.$router.push({
        path: `/message-notif/detail/${item.id}`,
        query: this.query
      })
    },
    goToFormAddMessageNotifHandle () {
      this.$router.push('/message-notif/create')
    },
    openModalConfirmation (modalName, itemDetail) {
      this.detailItem.id = itemDetail.id
      this.detailItem.title = itemDetail.title
      this.$store.commit('modals/OPEN', modalName)
    },
    openModalInformation (modalName, isSuccess) {
      this.modalNameInformation = modalName
      // check type modal
      if (modalName === this.publishedConfirmationPopup.nameModal) {
        this.dialogInformationPopup = isSuccess
          ? this.publishedInformationPopup.successInformation
          : this.publishedInformationPopup.failedInformation
      } else {
        this.dialogInformationPopup = isSuccess
          ? this.deleteInformationPopup.successInformation
          : this.deleteInformationPopup.failedInformation
      }

      this.isSuccessConfirmation = isSuccess

      const modalFullName = `${modalName}-information`
      this.$store.commit('modals/OPEN', modalFullName)
    }
  }
}
</script>

<style scoped>
.jds-data-table:deep {
  border-spacing: 1px !important;
  @apply rounded-lg;
}

.jds-data-table:deep tr th:first-child {
  @apply rounded-tl-lg;
}

.jds-data-table:deep tr th:last-child {
  @apply rounded-tr-lg;
}
.jds-data-table:deep tr th {
  @apply h-[42px] border-r border-white bg-green-600;
}

.jds-data-table:deep tr td {
  @apply max-w-[435px] border-r border-gray-200;
}
</style>
