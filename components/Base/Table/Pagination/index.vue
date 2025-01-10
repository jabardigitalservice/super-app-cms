<template>
  <div class="flex items-center justify-between bg-white px-4 py-3">
    <div class="flex items-center text-sm text-gray-700">
      <span>Tampilkan</span>
      <select
        v-model="paginationPerPage"
        class="mx-2 rounded border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
        @change="handlePerPageChange"
      >
        <option v-for="size in perPageOptions" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <span>Item dari total {{ totalItems }}</span>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center text-sm text-gray-700">
        <span>Halaman</span>
        <select
          v-model="paginationCurrentPage"
          class="mx-2 rounded border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          @change="handlePageChange"
        >
          <option v-for="page in totalPages" :key="page" :value="page">
            {{ page }}
          </option>
        </select>
        <span>dari {{ totalPages }}</span>
      </div>

      <div class="flex space-x-1">
        <button
          class="rounded p-1 hover:bg-gray-100"
          :disabled="currentPage === 1"
          @click="handlePreviousPage"
        >
          <span class="text-gray-500">◀</span>
        </button>
        <button
          class="rounded p-1 hover:bg-gray-100"
          :disabled="currentPage === totalPages"
          @click="handleNextPage"
        >
          <span class="text-gray-500">▶</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    perPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100],
    },
  },
  data() {
    return {
      paginationCurrentPage: this.currentPage,
      paginationPerPage: this.perPage,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage)
    },
  },
  watch: {
    currentPage(newVal) {
      this.paginationCurrentPage = newVal
    },
    perPage(newVal) {
      this.paginationPerPage = newVal
    },
  },
  methods: {
    handlePageChange() {
      this.$emit('update:currentPage', this.paginationCurrentPage)
    },
    handlePerPageChange() {
      this.$emit('update:perPage', this.paginationPerPage)
    },
    handlePreviousPage() {
      if (this.paginationCurrentPage > 1) {
        this.paginationCurrentPage--
        this.handlePageChange()
      }
    },
    handleNextPage() {
      if (this.paginationCurrentPage < this.totalPages) {
        this.paginationCurrentPage++
        this.handlePageChange()
      }
    },
  },
}
</script>
