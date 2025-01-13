<template>
  <div
    class="flex items-center justify-between border border-t-[#069550] bg-[#fafafa] px-3 py-1 text-[#424242]"
  >
    <div class="flex items-center text-sm">
      <span>Tampilkan</span>
      <select
        v-model="paginationPerPage"
        class="mx-2 flex w-[50px] rounded border-gray-300 py-2 font-bold focus:border-emerald-500 focus:ring-emerald-500"
        @change="handlePerPageChange"
      >
        <option
          v-for="size in perPageOptions"
          :key="size"
          :value="size"
          class="font-bold"
        >
          {{ size }}
        </option>
      </select>
      <span>
        Item dari total <span class="font-bold"> {{ totalItems }}</span>
      </span>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center text-sm">
        <span>Halaman</span>
        <select
          v-model="paginationCurrentPage"
          class="mx-2 w-[50px] rounded border-gray-300 py-2 font-bold focus:border-emerald-500 focus:ring-emerald-500"
          @change="handlePageChange"
        >
          <option v-for="page in totalPages" :key="page" :value="page">
            {{ page }}
          </option>
        </select>
        <span>
          dari <span class="font-bold">{{ totalPages }}</span>
        </span>
      </div>

      <div class="flex space-x-1">
        <button
          class="w-[40px] rounded border-r p-1 hover:bg-gray-100"
          :class="{
            'cursor-not-allowed': currentPage === 1,
          }"
          :disabled="currentPage === 1"
          @click="handlePreviousPage"
        >
          <BaseIconSvg
            icon="/icon/arrow-left.svg"
            :size="16"
            class="mt-[2px]"
            :fill-color="currentPage === 1 ? '#BDBDBD' : '#069550'"
          />
        </button>
        <button
          class="w-[40px] rounded p-1 hover:bg-gray-100"
          :class="{
            'cursor-not-allowed': currentPage === totalPages,
          }"
          :disabled="currentPage === totalPages"
          @click="handleNextPage"
        >
          <BaseIconSvg
            icon="/icon/arrow-right.svg"
            :size="16"
            class="mt-[2px]"
            :fill-color="currentPage === totalPages ? '#BDBDBD' : '#069550'"
          />
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
    currentPage(page) {
      this.paginationCurrentPage = page
    },
    perPage(page) {
      this.paginationPerPage = page
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
