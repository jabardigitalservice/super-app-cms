<template>
  <div>
    <div class="mt-2">
      <div class="flex justify-between mb-4">
        <jds-search
          placeholder="Masukkan judul pesan"
          icon
          :button="false"
          small
          value=""
          class="w-[275px] h-[38px] text-gray-500"
          @input="searchHandle"
        />
        <jds-button class="!bg-green-600 !w-[102px] !h-[38px] !text-sm !hidden">
          Buat Pesan
        </jds-button>
      </div>
      <div class=" overflow-x-auto">
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
            <BaseTableAction :list-menu-pop-over="filterTableAction(item.messageStatus)" @detail="goToDetailPageHandle(item)" @delete="showDeletePopupHandle(item)" @publish="showPublishedPopupHandle(item)" />
          </template>
        </JdsDataTable>
      </div>
    </div>
    <BasePopupConfirmation
      :show-popup="confirmationDialog.showPublished"
      :title="publishedConfirmationPopup.title"
      :description-text="publishedConfirmationPopup.descriptionText"
      :data-popup="dataMessageNotif.title"
      :label-button="publishedConfirmationPopup.labelButton"
      :confirmation-type="publishedConfirmationPopup.confirmationType"
      @close="confirmationDialog.showPublished=false"
      @submit="publishedMessageNotifHandle"
    />
    <BasePopupConfirmation
      :show-popup="confirmationDialog.showDelete"
      :title="deleteConfirmationPopup.title"
      :description-text="deleteConfirmationPopup.descriptionText"
      :data-popup="dataMessageNotif.title"
      :label-button="deleteConfirmationPopup.labelButton"
      :confirmation-type="deleteConfirmationPopup.confirmationType"
      @close="confirmationDialog.showDelete=false"
      @submit="deleteMessageNotifHandle(dataMessageNotif.id)"
    />
    <BasePopupInformation
      :show-popup="showInformationDialog"
      :is-error="getIsError"
      :title="publishedInformationPopup.title"
      :description-text="!getIsError ? publishedInformationPopup.descriptionSuccessText : publishedInformationPopup.descriptionFailedText"
      :data-popup="dataMessageNotif.title"
      :label-button="!getIsError ? publishedInformationPopup.labelSuccessButton : publishedInformationPopup.labelFailedButton"
      :information-type="!getIsError ? 'success' : 'failed'"
      @submit="publishedMessageNotifHandle(dataMessageNotif.id)"
      @close="closeInformationPopupHandle"
    />
    <BasePopupInformation
      :show-popup="showInformationDialog"
      :is-error="getIsError"
      :title="deleteInformationPopup.title"
      :description-text="!getIsError ? deleteInformationPopup.descriptionSuccessText : deleteInformationPopup.descriptionFailedText"
      :data-popup="dataMessageNotif.title"
      :label-button="!getIsError ? deleteInformationPopup.labelSuccessButton : deleteInformationPopup.labelFailedButton"
      :information-type="!getIsError ? 'success' : 'failed'"
      @submit="deleteMessageNotifHandle(dataMessageNotif.id)"
      @close="closeInformationPopupHandle"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { messageNotifHeader, messageStatus, deleteConfirmationPopup, deleteInformationPopup, publishedConfirmationPopup, publishedInformationPopup } from '~/constant/message-notif'
import { formatDate, generateItemsPerPageOptions } from '~/utils'

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
      pagination: {
        currentPage: 1,
        totalRows: 5,
        itemsPerPage: 5,
        itemsPerPageOptions: []
      },
      sortBy: '',
      sortOrder: '',
      deleteConfirmationPopup,
      deleteInformationPopup,
      publishedInformationPopup,
      publishedConfirmationPopup,
      confirmationDialog: {
        showPublished: false,
        showDelete: false
      },
      showInformationDialog: false,
      dataMessageNotif: {
        id: '',
        title: ''
      },
      search: '',
      isError: false
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
      const response = await this.$axios.get('/messages', { params: queryParams })
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
        return { ...item, createdAt: formatDate(item.createdAt || '', 'dd/MM/yyyy HH:mm'), publishedAt: formatDate(item.publishedAt || '', 'dd/MM/yyyy HH:mm') }
      })
    },
    getIsError () {
      return this.$store.state.isError
    }
  },
  mounted () {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(this.pagination.itemsPerPage)
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
    },
    goToDetailPageHandle (item) {
      this.$router.push(`/message-notif/detail/${item.id}`)
    },
    showPublishedPopupHandle (item) {
      this.dataMessageNotif.id = item.id
      this.dataMessageNotif.title = item.title
      this.confirmationDialog.showPublished = true
    },
    async publishedMessageNotifHandle (id) {
      this.confirmationDialog.showPublished = false
      try {
        await this.$axios.post(`/messages/${id}/send`)
      } catch {
        this.isError = true
      }
      this.showInformationDialog = true
    },
    showDeletePopupHandle (item) {
      this.dataMessageNotif.id = item.id
      this.dataMessageNotif.title = item.title
      this.confirmationDialog.showDelete = true
    },
    deleteMessageNotifHandle (id) {
      this.confirmationDialog.showDelete = false
      this.$store.dispatch('deleteMessageNotifHandle', id)
      this.showInformationDialog = true
    },
    closeInformationPopupHandle () {
      this.showInformationDialog = false
      this.$fetch()
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
    @apply rounded-tl-lg;
  }

  .jds-data-table:deep tr th:last-child{
    @apply rounded-tr-lg;
  }
  .jds-data-table:deep tr th {
    @apply h-[42px] border-r border-white bg-green-600;
  }

  .jds-data-table:deep tr td {
    @apply border-r border-gray-200;
  }
</style>
