<template>
  <div>
    <div class="mb-6 flex justify-between">
      <jds-search
        value=""
        placeholder="Masukkan versi rilis"
        icon
        :button="false"
        small
        class="h-[38px] w-[275px] text-gray-500"
        @input="onSearch"
      />

      <jds-button
        class=" !bg-green-600 !text-sm"
        @click.prevent="goToForm"
      >
        Tambah Versi Rilis
      </jds-button>
    </div>
    <div class="onverflow-x-auto rounded-lg font-roboto">
      <JdsDataTable
        :headers="headerTable"
        :items="listManagementRelease"
        :pagination="pagination"
        @next-page="pageChange"
        @previous-page="pageChange"
        @page-change="pageChange"
        @per-page-change="perPageChange"
        @change:sort="sortChange"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.status="{ item }">
          <div class="flex items-center">
            <div
              v-show="item?.status"
              class="mr-2 h-2 w-2 rounded-full"
              :class="getColorIconStatus(statusTable[`${item?.status}`])"
            />
            {{ statusTable[`${item?.status}`] }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <BaseTableAction
            :list-menu-pop-over="
              filterTableAction(statusTable[`${item?.status}`])
            "
            @hapus="showDeleteManajemenRelease(item)"
            @rilis="showVerificationManajemenRelease(item)"
            @detail="goToPageDetail(item)"
            @ubah="goToPageEdit(item)"
          />
        </template>
      </JdsDataTable>
    </div>
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
  headerTable,
  dummmyData,
  statusTable,
  deleteConfirmationPopup,
  deleteInformationPopup,
  verificationConfirmationPopup,
  verificationInformationPopup
} from '~/constant/manajemen-release'
import { generateItemsPerPageOptions, formatDate, resetQueryParamsUrl } from '~/utils'
import popup from '~/mixins/manajemen-release'
export default {
  name: 'ListManajemenRelease',
  mixins: [popup],
  data () {
    return {
      listDataManagementRelease: [],
      dummmyData,
      statusTable,
      headerTable,
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
      menuTableAction: [
        { menu: 'Lihat Detail', value: 'detail' },
        { menu: 'Rilis Versi Ini', value: 'rilis' },
        { menu: 'Ubah', value: 'ubah' },
        { menu: 'Hapus', value: 'hapus' }
      ],
      iconPopup,
      deleteConfirmationPopup,
      deleteInformationPopup,
      verificationConfirmationPopup,
      verificationInformationPopup
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/release/list', {
        params: this.query
      })

      const dataManagementRelease = response.data.data
      this.listDataManagementRelease = dataManagementRelease?.data || []

      if (this.listDataManagementRelease.length) {
        this.pagination.disabled = false
      } else {
        this.pagination.disabled = true
      }
      this.pagination.currentPage = dataManagementRelease?.page || 1
      this.pagination.totalRows = dataManagementRelease?.totalData || 0
      this.pagination.itemsPerPage = dataManagementRelease?.pageSize || this.query.pageSize
    } catch {
      this.listData = this.dummmyData
      this.pagination.disabled = true
    }
  },
  computed: {
    listManagementRelease () {
      return this.listDataManagementRelease.map((item) => {
        return {
          ...item,
          date: formatDate(item.date || '', 'dd/MM/yyyy HH:mm'),
          forceUpdate: item.forceUpdate === 'Ya'
            ? 'Ya, tampilkan'
            : 'Tidak perlu ditampilkan'
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
    filterTableAction (status) {
      if (status === statusTable.released) {
        return this.menuTableAction.filter(
          item => item.menu !== 'Rilis Versi Ini' && item.menu !== 'Ubah'
        )
      } else if (status === statusTable.deleted) {
        return this.menuTableAction.filter(
          item =>
            item.menu !== 'Rilis Versi Ini' &&
            item.menu !== 'Ubah' &&
            item.menu !== 'Hapus'
        )
      } else {
        return this.menuTableAction
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
    },
    goToForm () {
      this.$router.push({
        path: '/management-release/create',
        query: this.query
      })
    },
    goToPageDetail (item) {
      this.$router.push({
        path: `/management-release/detail/${item.versiRilis}`,
        query: this.query
      })
    },
    goToPageEdit (item) {
      this.$router.push({
        path: `/management-release/edit/${item.versiRilis}`,
        query: this.query
      })
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
