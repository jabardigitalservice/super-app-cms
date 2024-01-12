<template>
  <div>
    <div class="mt-2">
      <div class="flex justify-between mb-4">
        <jds-search
          v-model="search"
          placeholder="Masukkan judul pesan"
          icon
          :button="false"
          small
          class="w-[275px] h-[38px] text-gray-500"
          @input="searchHandle"
        />
        <jds-button class="!bg-green-600 !w-[102px] !text-sm" @click.prevent="goToFormAddMessageNotifHandle">
          Buat Pesan
        </jds-button>
      </div>
      <div class=" overflow-x-auto overflow-y-hidden">
        <JdsDataTable
          :headers="messageNotifHeader"
          :items="listMessageNotif"
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
            <BaseTableAction :list-menu-pop-over="filterTableAction(item.status)" @detail="goToDetailPageHandle(item)" @delete="showDeletePopupHandle(item)" @publish="showPublishedPopupHandle(item)" />
          </template>
        </JdsDataTable>
      </div>
    </div>
    <BasePopup :show-popup="showPopupConfirmationInformation" @submit="submitHandle" @close="closeHandle" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { messageNotifHeader, messageStatus, deleteConfirmationPopup, deleteInformationPopup, publishedConfirmationPopup, publishedInformationPopup } from '~/constant/message-notif'
import { iconPopup } from '~/constant/icon-popup'
import { formatDate, generateItemsPerPageOptions, resetQueryParamsUrl } from '~/utils'
import popup from '~/mixins/message-notif'

export default {
  name: 'ListMessageNotif',
  mixins: [popup],
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
      iconPopup,
      publishedInformationPopup,
      publishedConfirmationPopup,
      search: ''
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/messages', { params: this.query })
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
    listMessageNotif () {
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
    isError () {
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
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(this.pagination.itemsPerPage)
  },
  methods: {
    filterTableAction (currentMessageStatus) {
      if (currentMessageStatus === messageStatus.published.id) {
        return this.menuTableAction.filter(item => item.menu !== 'Publikasikan')
      } else {
        return this.menuTableAction
      }
    },
    getStatusName (currentStatus) {
      return Object.values(this.messageStatus).find(item => item.id === currentStatus).status
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
    @apply border-r border-gray-200 max-w-[435px];
  }
</style>
