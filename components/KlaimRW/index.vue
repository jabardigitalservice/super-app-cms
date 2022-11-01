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
  </div>
</template>

<script>
import { headerTableKlaimRW } from '~/constant/klaim-rw'
export default {
  name: 'ComponentKlaimRW',
  data () {
    return {
      search: '',
      data: [],
      pagination: {
        currentPage: 1,
        totalRows: 0,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: true
      },
      query: {
        per_page: 5,
        current_page: 1
      },
      headerTableKlaimRW
    }
  },
  methods: {
    nextPage (value) {
      this.query.current_page = value
    },
    previousPage (value) {
      this.query.current_page = value
    },
    pageChange (value) {
      this.query.current_page = value
    },
    perPageChange (value) {
      if (value) {
        this.query.per_page = value
      }
      this.query.current_page = 1
    }
  }
}
</script>
