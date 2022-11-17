<template>
  <div>
    <h1 class="font-roboto text-[38px] text-blue-gray-800 mb-4">
      Klaim Akun RW
    </h1>
    <p class="font-roboto text-blue-gray-400 mb-8">
      Berisi semua daftar terkait klaim yang dilakukan oleh RW di aplikasi Sapawarga.
    </p>
    <div class="flex justify-between mb-6">
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
    <div class="rounded-lg overflow-x-scroll font-roboto table-content">
      <JdsDataTable
        :headers="headerTableKlaimRW"
        :items="dataRW"
        :pagination="pagination"
        :loading="$fetchState.pending"
        @next-page="nextPage"
        @previous-page="previousPage"
        @page-change="pageChange"
        @per-page-change="perPageChange"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.address="{}">
          <button
            class="border border-green-700 text-green-700 hover:bg-green-50 rounded-lg px-4 py-1"
            @click="openModalDetailAddress"
          >
            Lihat Alamat
          </button>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.document="{}">
          <button
            class="border border-green-700 text-green-700 hover:bg-green-50 rounded-lg px-4 py-1"
          >
            Lihat Dokumen
          </button>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.customStatus="{item}">
          <div class="flex items-center">
            <span
              :class="{
                'rounded-full w-2 h-2 mr-2' : true,
                'bg-green-600' : item.rwStatus === userStatus.verified,
                'bg-yellow-600' : item.rwStatus === userStatus.waiting,
                'bg-red-600' : item.rwStatus === userStatus.rejected,
              }"
            />
            {{ item.rwStatus }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{item}">
          <KlaimRWTableAction
            @detail="$router.push(`/detail/${item.id}`)"
            @verify="verifyUser(item)"
            @reject="rejectUser(item)"
          />
        </template>
      </JdsDataTable>
    </div>
    <KlaimRWDetailAddress
      title="Alamat RW"
      :data="detailData"
      :show="showDetailAddress"
      @close="showDetailAddress = false"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { headerTableKlaimRW, userStatus } from '~/constant/klaim-rw'
import { generateItemsPerPageOptions, formatDate } from '~/utils'

export default {
  name: 'ComponentKlaimRW',
  data () {
    return {
      search: '',
      data: [],
      detailData: {},
      pagination: {
        currentPage: 1,
        totalRows: 0,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true
      },
      query: {
        pageSize: 5,
        page: 1,
        nameFilter: ''
      },
      headerTableKlaimRW,
      userStatus,
      showDetailAddress: false
    }
  },
  async fetch () {
    try {
      const response = await this.$api.get('/user/rw', { params: this.query })
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
    dataRW () {
      return this.data.map((item) => {
        return {
          ...item,
          date: formatDate(item.createdAt)
        }
      })
    }
  },
  mounted () {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(this.pagination.itemsPerPage)
  },
  methods: {
    searchTitle: debounce(function (value) {
      if (value.length > 2) {
        this.query.nameFilter = value
        this.$fetch()
      } else if (value.length === 0) {
        this.query.nameFilter = null
        this.$fetch()
      }
    }, 500),
    onSearch (value) {
      this.searchTitle(value)
    },
    nextPage (value) {
      this.query.page = value
    },
    previousPage (value) {
      this.query.page = value
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
    openModalDetailAddress () {
      this.showDetailAddress = true
    }
  }
}
</script>

<style scoped>
  .jds-data-table::v-deep {
    border-spacing: 1px !important;
    @apply !bg-[#EDEFF3];
  }

  .jds-data-table::v-deep tr th {
    @apply w-min border-r border-white;
  }

  .jds-data-table::v-deep tr td {
    @apply w-min border-r border-gray-200;
  }

</style>
