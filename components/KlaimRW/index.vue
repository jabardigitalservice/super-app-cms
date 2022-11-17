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
      />
    </div>
    <div class="rounded-lg overflow-hidden font-roboto">
      <JdsDataTable
        :headers="headerTableKlaimRW"
        :items="data"
        :pagination="pagination"
        @next-page="nextPage"
        @previous-page="previousPage"
        @page-change="pageChange"
        @per-page-change="perPageChange"
      />
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
import { headerTableKlaimRW } from '~/constant/klaim-rw'
import { generateItemsPerPageOptions } from '~/utils'

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
        page: 1
      },
      headerTableKlaimRW,
      showDetailAddress: false
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/user/rw', { params: this.query })
      console.log(response.data)
      const { data } = response.data
      this.data = data || []
      this.pagination.disabled = false
      this.pagination.currentPage = data?.page || 1
      this.pagination.totalRows = data?.totalData || 0
      this.pagination.itemsPerPage = data?.pageSize || this.query.pageSize
    } catch (error) {
      this.pagination.disabled = true
    }
  },
  mounted () {
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(this.pagination.itemsPerPage)
  },
  methods: {
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
    }
  }
}
</script>
