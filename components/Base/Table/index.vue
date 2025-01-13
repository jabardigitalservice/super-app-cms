<template>
  <div class="w-full overflow-x-auto">
    <table class="min-w-full table-fixed border-collapse">
      <thead>
        <tr class="bg-[#069550]">
          <th
            v-for="(header, index) in headers"
            :key="header.key"
            class="h-[42px] border-r border-white px-[6px] py-[8px] text-left text-sm font-bold capitalize text-white last:border-r-0"
            :class="{
              'cursor-pointer': header.sortable,
              'rounded-tl-lg': index === 0,
              'rounded-tr-lg': index === headers.length - 1,
              'w-auto': header.key === 'action',
              'min-w-[120px]': header.key !== 'action',
            }"
            @click="header.sortable ? handleSort(header.key) : null"
          >
            <div class="flex items-center justify-between">
              <span>{{ header.text }}</span>

              <span v-if="header.sortable" class="text-white">
                <span v-if="sortKey === header.key && sortOrder === 'asc'">
                  <BaseIconSvg
                    icon="/icon/arrow-default.svg"
                    :size="14"
                    class="rotate-90"
                    fill-color="#FFFFFF"
                  />
                </span>
                <span
                  v-else-if="sortKey === header.key && sortOrder === 'desc'"
                >
                  <BaseIconSvg
                    icon="/icon/arrow-default.svg"
                    :size="14"
                    class="rotate-[270deg]"
                    fill-color="#FFFFFF"
                  />
                </span>

                <span v-else class="opacity-50">
                  <BaseIconSvg
                    icon="/icon/arrow-default.svg"
                    :size="14"
                    class="rotate-90"
                    fill-color="#FFFFFF"
                  />
                </span>
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white text-[#424242]">
        <template v-if="loading">
          <tr
            v-for="i in skeletonRowCount"
            :key="i"
            class="odd:bg-white even:bg-[#FAFAFA]"
          >
            <td
              v-for="header in headers"
              :key="header.key"
              class="border border-[#eee] px-[8px] py-[10px] text-sm"
            >
              <div class="h-[26px] animate-pulse rounded bg-gray-200" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-if="items.length === 0" class="border-b border-gray-200">
            <td :colspan="headers.length" class="px-4 py-3 text-center">
              {{ emptyMessage }}
            </td>
          </tr>

          <template v-else>
            <tr
              v-for="(row, rowIndex) in items"
              :key="'row-' + rowIndex"
              class="odd:bg-white even:bg-[#FAFAFA]"
            >
              <td
                v-for="(header, colIndex) in headers"
                :key="'cell-' + colIndex"
                class="w-5 border border-[#eee] px-[8px] py-[10px] text-sm"
              >
                <slot
                  v-if="$scopedSlots[header.key]"
                  :name="header.key"
                  :index="rowIndex"
                  :item="row"
                  :value="row[header.key]"
                />

                <template v-else>
                  {{ row[header.key] || '-' }}
                </template>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseTableComponent',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    emptyMessage: {
      type: String,
      default: 'Tidak ada data',
    },
    skeletonRowCount: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      sortKey: null,
      sortOrder: null,
    }
  },
  methods: {
    handleSort(key) {
      if (this.sortKey === key) {
        if (this.sortOrder === 'asc') {
          this.sortOrder = 'desc'
        } else if (this.sortOrder === 'desc') {
          this.sortOrder = null
        } else {
          this.sortOrder = 'asc'
        }
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }

      this.$emit('sort', { key: this.sortKey, order: this.sortOrder })
    },
  },
}
</script>
