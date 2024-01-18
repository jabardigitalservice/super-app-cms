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
        :headers="headerTable"
        :items="listData"
        :pagination="pagination"
        :loading="isLoading"
        @next-page="changePage"
        @previous-page="changePage"
        @page-change="changePage"
        @per-page-change="changePerPage"
        @change:sort="sortingData"
      >
        <template
          v-for="itemSlot in listSlot"
          #[getSlotName(itemSlot)]="{ item }"
        >
          <slot :name="`item.${itemSlot}`" :item="item" />
        </template>
      </JdsDataTable>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { generateItemsPerPageOptions } from '~/utils'

export default {
  name: 'BaseTableData',
  props: {
    headerTable: {
      type: Array,
      default: () => []
    },
    listData: {
      type: Array,
      default: () => []
    },
    listSlot: {
      type: Array,
      default: () => []
    },
    placeholderSearch: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 2
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    query () {
      return { ...this.$store.state['data-table'].query }
    },
    pagination () {
      return { ...this.$store.state['data-table'].pagination }
    }
  },
  watch: {
    search: debounce(function (value) {
      if (value.length > this.limit || value.length === 0) {
        this.query.page = 1
        this.query.search = value.length > this.limit ? value : null
        this.$store.commit('data-table/setQuery', { ...this.query, page: 1 })
        this.$store.commit('data-table/setSearch', value)
        this.$emit('search')
      }
    }, 500)
  },
  mounted () {
    this.$store.commit(
      'pagination/setPagination',
      generateItemsPerPageOptions(this.pagination.generateItemsPerPage)
    )
  },

  methods: {
    getSlotName (slot) {
      return `item.${slot}`
    },
    changePage (value) {
      this.$store.commit('data-table/setQuery', { ...this.query, page: value })
      this.$emit('pageChange')
    },
    changePerPage (value) {
      if (value) {
        this.$store.commit('data-table/setQuery', {
          ...this.query,
          pageSize: value
        })
        this.$store.commit('data-table/setPagination', {
          ...this.pagination,
          pageSize: value
        })
      }
      this.$store.commit('data-table/setQuery', { ...this.query, page: 1 })
      this.$store.commit('data-table/setPagination', {
        ...this.pagination,
        pageSize: value
      })
      this.$emit('perPageChange')
    },
    sortingData (value) {
      const key = Object.keys(value)[0]
      if (key && value[key] !== 'no-sort') {
        this.$store.commit('data-table/setQuery', {
          ...this.query,
          sortType: value[key],
          sortBy: key
        })
      } else {
        this.$store.commit('data-table/setQuery', {
          ...this.query,
          sortType: 'desc',
          sortBy: 'date'
        })
      }
      this.$emit('sort', key)
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
  @apply min-w-[170px] border-r border-white;
}

.jds-data-table:deep tr td {
  @apply min-w-[170px] border-r border-gray-200;
}
</style>
