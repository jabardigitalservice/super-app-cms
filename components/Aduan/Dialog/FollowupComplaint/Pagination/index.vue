<template>
  <div
    class="form-followup-pagination flex w-full items-center justify-between pl-2"
  >
    <p>
      Menampilkan {{ pagination.itemsPerPage }} dari {{ pagination.totalRows }}
    </p>
    <div class="flex">
      <div>
        <span class="mr-2">Halaman</span>
        <jds-select
          :options="listOptions"
          :value="pagination.currentPage"
          @change="pageChanges"
        />
        <span class="mx-2">dari {{ pagination.totalPages }}</span>
      </div>
      <button
        class="h-[44px] w-[47px] disabled:cursor-not-allowed"
        :disabled="pagination.currentPage === 1"
        @click="$emit('previous-page')"
      >
        <jds-icon
          name="chevron-left"
          size="sm"
          :fill="pagination.currentPage === 1 ? '#bdbdbd' : '#008444'"
        />
      </button>
      <button
        class="h-[44px] w-[47px] disabled:cursor-not-allowed"
        :disabled="pagination.currentPage === pagination.totalPages"
        @click="$emit('next-page')"
      >
        <jds-icon
          name="chevron-right"
          size="sm"
          :fill="
            pagination.currentPage === pagination.totalPages
              ? '#bdbdbd'
              : '#008444'
          "
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationFollowup',
  props: {
    pagination: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return { dataListOptions: [] }
  },
  computed: {
    listOptions() {
      const listOptions = []
      for (let i = 1; i <= this.pagination.totalPages; i++) {
        listOptions.push({ value: i, label: i })
      }
      return listOptions
    },
  },
  methods: {
    pageChanges(value) {
      this.$emit('per-page-change', value)
    },
  },
}
</script>

<style>
.form-followup-pagination .jds-select .jds-input-text__input-wrapper {
  @apply !h-[44px] !w-[67px] !rounded-none !border !border-none !bg-white;
}

.form-followup-pagination .jds-select .jds-input-text__suffix-icon {
  @apply ml-[-20px];
}
</style>
