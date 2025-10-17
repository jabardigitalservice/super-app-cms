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
                'bg-green-600': item.rwStatus === userStatus.verified,
                'bg-yellow-600': item.rwStatus === userStatus.waiting,
                'bg-red-600': item.rwStatus === userStatus.rejected,
              }"
            />
            {{ item.rwStatus }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <KlaimRWTableAction
            :status="item.rwStatus"
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
      :title="`Alamat ${this.getHeadeTitleByTypeClaim()}`"
      :loading="isLoadingDetailData"
      :detail-data="detailData"
      :data-user="dataUser"
      :show="showDetailAddress"
      @close="showDetailAddress = false"
    />
    <BaseViewFile
      :title="`Dokumen SK ${this.getHeadeTitleByTypeClaim()}`"
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
  headerTableKlaimKepalaDesa,
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
      headerTableKlaimKepalaDesa,
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
      this.data = [
        {
          id: '53eec3fc-f5ae-4c00-8ac7-8fe6ba623c96',
          email: 'kmkranchbandung@gmail.com',
          name: 'CHIVAS ',
          rwStatus: 'Ditolak',
          rwDecree: '41418e5b-61f4-438a-b64e-7183d3ad0def',
          createdAt: '2025-07-08T11:06:57Z',
        },
        {
          id: 'e888b236-0013-435d-983b-0a425cf55f79',
          email: 'tromolmio@yopmail.com',
          name: 'Tromol MIO ',
          rwStatus: 'Terverifikasi',
          rwDecree: '25db2128-941d-489f-a533-b5b45d1ff52a',
          createdAt: '2023-05-24T10:06:15Z',
        },
        {
          id: 'eb8f7e85-9e05-44db-bee2-c2e0e4ce0971',
          email: 'rungkad002@yopmail.com',
          name: 'Eman si pasi',
          rwStatus: 'Terverifikasi',
          rwDecree: '6a937780-866f-4525-9317-56589e681acb',
          createdAt: '2023-03-30T07:33:06Z',
        },
      ]
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
        case typeClaim.klaimKepalaDesa.props:
          return this.headerTableKlaimKepalaDesa
        default:
          return {}
      }
    },
    getHeadeTitleByTypeClaim() {
      switch (this.typeClaimPage.props) {
        case typeClaim.klaimLurah?.props:
          return 'Lurah'
        case typeClaim.klaimKepalaDesa?.props:
          return 'Kepala Desa'
        default:
          return 'RW'
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
        this.query.sortBy = key === 'status' ? 'rwStatus' : key
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
