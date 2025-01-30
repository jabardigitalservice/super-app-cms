<template>
  <div
    class="flex items-center justify-between border border-t-[#069550] bg-[#fafafa] px-3 py-1 text-[#424242]"
  >
    <div class="flex items-center text-sm">
      <span>Tampilkan</span>

      <BaseSelectSearch
        v-model="paginationPerPage"
        class="mx-2 flex w-[70px] rounded border-gray-300 py-2 font-bold focus:border-emerald-500 focus:ring-emerald-500"
        width-button="70px"
        width-option="70px"
        :options="perPageOptions"
        @change="handlePerPageChange"
      />

      <span>
        Item dari total <span class="font-bold"> {{ totalItems }}</span>
      </span>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center text-sm">
        <span>Halaman</span>

        <BaseSelectSearch
          v-model="paginationCurrentPage"
          class="!mx-2 flex-shrink-0"
          width-button="65px"
          width-option="120px"
          :options="getOptionsPages"
          filterable
          @change="handlePageChange"
        />

        <span>
          dari <span class="font-bold">{{ totalPages }}</span>
        </span>
      </div>

      <div class="flex space-x-1">
        <button
          class="w-[40px] rounded border-r p-1 hover:bg-gray-100"
          :class="{
            'cursor-not-allowed': paginationCurrentPage === 1,
          }"
          :disabled="paginationCurrentPage === 1"
          @click="handlePreviousPage"
        >
          <BaseIconSvg
            icon="/icon/arrow-left.svg"
            :size="16"
            class="mt-[2px]"
            :fill-color="paginationCurrentPage === 1 ? '#BDBDBD' : '#069550'"
          />
        </button>
        <button
          class="w-[40px] rounded p-1 hover:bg-gray-100"
          :class="{
            'cursor-not-allowed': paginationCurrentPage === totalPages,
          }"
          :disabled="paginationCurrentPage === totalPages"
          @click="handleNextPage"
        >
          <BaseIconSvg
            icon="/icon/arrow-right.svg"
            :size="16"
            class="mt-[2px]"
            :fill-color="
              paginationCurrentPage === totalPages ? '#BDBDBD' : '#069550'
            "
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
    totalPages: {
      type: Number,
      required: true,
    },
    perPageOptions: {
      type: Array,
      default: () => [
        {
          value: 10,
          label: '10',
        },
        {
          value: 25,
          label: '25',
        },
        {
          value: 50,
          label: '50',
        },
        {
          value: 100,
          label: '100',
        },
      ],
    },
  },
  data() {
    return {
      paginationCurrentPage: this.currentPage,
      paginationPerPage: this.perPage,
    }
  },
  computed: {
    getOptionsPages() {
      const options = []
      for (let i = 1; i <= this.totalPages; i++) {
        options.push({ value: i, label: `${i}` })
      }

      return options
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
    handlePageChange(value) {
      this.paginationCurrentPage = value
      this.$emit('update:currentPage', this.paginationCurrentPage)
    },
    handlePerPageChange(value) {
      this.paginationPerPage = value
      this.$emit('update:perPage', this.paginationPerPage)
    },
    handlePreviousPage() {
      if (this.paginationCurrentPage > 1) {
        const newPage = this.paginationCurrentPage - 1
        this.handlePageChange(newPage)
      }
    },
    handleNextPage() {
      if (this.paginationCurrentPage < this.totalPages) {
        const newPage = this.paginationCurrentPage + 1
        this.handlePageChange(newPage)
      }
    },
  },
}
</script>
