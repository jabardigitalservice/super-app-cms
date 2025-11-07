<template>
  <div>
    <div class="mb-6 flex justify-between">
      <jds-search
        v-model="search"
        small
        icon
        :button="false"
        placeholder="Masukkan nama akun"
        class="w-[275px] text-gray-500"
        @input="onSearch"
      />
    </div>
    <div class="overflow-x-auto rounded-lg font-roboto">
      <JdsDataTable
        :headers="checkTypeHeaderClaim(typeClaimPage.props)"
        :items="dataClaim"
        :pagination="pagination"
        :loading="$fetchState.pending"
        @next-page="pageChange"
        @previous-page="pageChange"
        @page-change="pageChange"
        @per-page-change="perPageChange"
        @change:sort="sortChange"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.address="{ item }">
          <button
            class="rounded-lg border border-green-700 px-4 py-1 text-green-700 hover:bg-green-50"
            @click="openModalDetailAddress(item)"
          >
            Lihat Alamat
          </button>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.document="{ item }">
          <button
            class="rounded-lg border border-green-700 px-4 py-1 text-green-700 hover:bg-green-50"
            @click="onClickDocument(item?.rwDecree)"
          >
            Lihat Dokumen
          </button>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.status="{ item }">
          <div class="flex items-center">
            <span
              :class="{
                'mr-2 h-2 w-2 rounded-full': true,
                'bg-green-600': item.roleStatus === userStatus.verified,
                'bg-yellow-600': item.roleStatus === userStatus.waiting,
                'bg-red-600': item.roleStatus === userStatus.rejected,
              }"
            />
            {{ item.roleStatus }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <KlaimRWTableAction
            :status="item.roleStatus"
            @detail="goToDetail(item.id)"
            @verify="
              showPopupConfirmation(item, 'verify-confirmation', typeClaimPage)
            "
            @reject="
              showPopupConfirmation(item, 'reject-confirmation', typeClaimPage)
            "
          />
        </template>
      </JdsDataTable>
    </div>
    <KlaimRWDetailAddress
      title="Alamat RW"
      :loading="isLoadingDetailData"
      :detail-data="detailData"
      :data-user="dataUser"
      :show="showDetailAddress"
      @close="showDetailAddress = false"
    />
    <BaseViewFile
      title="Dokumen SK RW"
      :file="informationDialog.file"
      :mime-type="informationDialog.mimeType"
      :show="showDocument"
      @close="showDocument = false"
    />

    <DialogConfirmationBasic
      v-if="isPopupConfirmationVerificationRw"
      :dialog-modal="dataDialog"
      :detail-item-modal="{ title: user.name }"
      @confirmation-button="actionVerifyUser"
      @cancel="onClosePopupConfirmation"
    />
    <DialogConfirmationBasic
      v-if="isPopupConfirmationRejectionRw"
      :dialog-modal="dataDialog"
      @confirmation-button="actionRejectUser"
      @cancel="onClosePopupConfirmation"
    >
      <div class="font-lato text-[16px] text-gray-800">
        <strong>{{ user.name }}</strong>
      </div>
      <div class="mt-[22px]">
        <label class="font-lato text-[14px]">Alamat Email</label>
        <div class="font-lato text-[16px] text-gray-800">
          <strong>{{ user.email }}</strong>
        </div>
      </div>
    </DialogConfirmationBasic>
    <PopupInformation
      :show-popup="informationDialog.show"
      :title="informationDialog.title"
      :description-text="informationDialog.info"
      :account-name="dataUser.name"
      :message="informationDialog.message"
      @close="onClosePopupInfo"
    />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import PopupInformation from './Popup/Information.vue'
import popup from '~/mixins/klaim-rw'
import {
  headerTableKlaimRW,
  headerTableKlaimLurah,
  userStatus,
  typeClaim,
} from '~/constant/klaim-rw'
import {
  ENDPOINT_RW,
  ENDPOINT_LURAH,
  ENDPOINT_KEPALA_DESA,
} from '~/constant/endpoint-api'
import {
  generateItemsPerPageOptions,
  formatDate,
  resetQueryParamsUrl,
} from '~/utils'

export default {
  name: 'ComponentKlaimRW',
  components: {
    PopupInformation,
  },
  mixins: [popup],
  props: {
    typeClaimPage: {
      type: Object,
      default: () => ({}),
    },
    linkPageDetail: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: '',
      data: [],
      detailData: {},
      isLoadingDetailData: false,
      pagination: {
        currentPage: 1,
        totalRows: 0,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true,
      },
      query: {
        pageSize: 5,
        page: 1,
        nameFilter: '',
        sortType: 'desc',
        sortBy: 'date',
      },
      headerTableKlaimRW,
      headerTableKlaimLurah,
      userStatus,
      showDetailAddress: false,
      showDocument: false,
      showRejectRw: false,
      dataUser: {
        id: null,
        name: '',
        email: '',
      },
    }
  },
  async fetch() {
    try {
      const urlApi = this.checkUrlApi()
      const response = await this.$axios.get(urlApi, {
        params: this.query,
      })

      const { data } = response.data
      this.data = data?.data || []

      if (this.data.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }
      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.totalData || 0
      this.pagination.itemsPerPage = data?.pageSize || this.query.pageSize
    } catch (error) {
      this.pagination.disabled = true
    }
  },
  computed: {
    dataClaim() {
      return this.data.map((item) => {
        return {
          ...item,
          date: formatDate(item.createdAt || ''),
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
          this.search = this.query.nameFilter || ''
        }
      },
    },
  },
  mounted() {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
  },
  methods: {
    checkUrlApi() {
      switch (this.typeClaimPage.props) {
        case typeClaim.klaimLurah.props:
          return ENDPOINT_LURAH
        case typeClaim.klaimKepalaDesa.props:
          return ENDPOINT_KEPALA_DESA
        default:
          return ENDPOINT_RW
      }
    },
    checkTypeHeaderClaim(props) {
      switch (props) {
        case typeClaim.klaimRw.props:
          return this.headerTableKlaimRW
        case typeClaim.klaimLurah.props:
          return this.headerTableKlaimLurah
        default:
          return {}
      }
    },
    searchTitle: debounce(function (value) {
      if (value.length > 2) {
        this.query.page = 1
        this.query.nameFilter = value
        this.$fetch()
      } else if (value.length === 0) {
        this.query.nameFilter = null
        this.$fetch()
      }
    }, 500),
    onSearch(value) {
      this.searchTitle(value)
    },
    pageChange(value) {
      this.query.page = value
    },
    perPageChange(value) {
      if (value) {
        this.query.pageSize = value
      }
      this.query.page = 1
    },
    sortChange(value) {
      const key = Object.keys(value)[0]
      if (key && value[key] !== 'no-sort') {
        this.query.sortType = value[key]
        this.query.sortBy = key === 'status' ? 'roleStatus' : key
      } else {
        this.query.sortType = 'desc'
        this.query.sortBy = 'date'
      }
    },
    async openModalDetailAddress(item) {
      const { name, email } = item
      this.dataUser.name = name || '-'
      this.dataUser.email = email || '-'
      this.showDetailAddress = true
      this.isLoadingDetailData = true
      try {
        const response = await this.$axios.get(`/user/rw/${item.id}`)
        const { data } = response.data
        this.detailData = {
          dataKtp: data?.dataKtp,
          dataDomicile: {
            address: data?.address,
            city: data?.city?.name,
            district: data?.district?.name,
            village: data?.village?.name,
            subVillage: data?.subVillage?.name,
            rtRw: data?.rtRw?.name,
          },
        }
        this.isLoadingDetailData = false
      } catch (error) {
        this.detailData = {
          dataKtp: {},
          dataDomicile: {},
        }
        this.isLoadingDetailData = false
      }
    },
    async onClickDocument(fileId) {
      this.showDocument = true
      this.informationDialog.file = 'loading'
      try {
        const response = await this.$axios.get(`/file/view/${fileId}`, {
          headers: { 'x-file-id': fileId },
        })

        this.informationDialog.file = response.data.data || ''
        this.informationDialog.mimeType = response.data.meta.mimeType || ''
      } catch {
        this.informationDialog.file = ''
      }
    },
    goToDetail(id) {
      this.$router.push({
        path: `${this.linkPageDetail}/${id}`,
        query: this.query,
      })
    },
  },
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
</style>
