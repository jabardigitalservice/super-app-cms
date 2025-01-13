<template>
  <div class="relative min-w-[260px]">
    <button
      class="w-full rounded-md border border-gray-500 bg-white px-3 py-1 text-left focus:border-[#FEC802] focus:outline-none focus:ring-1 focus:ring-[#039550]"
      @click="toggleDropdown"
    >
      <span v-if="selectedOption">
        {{ selectedOption.label }}
      </span>
      <span v-else class="text-[#757575]">
        {{ placeholder }}
      </span>

      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <BaseIconSvg
          icon="/icon/arrow-right.svg"
          :size="16"
          :class="isOpen ? 'rotate-[-90deg]' : 'rotate-90'"
          class="transform font-bold transition-transform duration-300 ease-in-out"
          fill-color="#039550"
        />
      </span>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
    >
      <div class="relative w-full px-3 py-2">
        <div class="absolute inset-y-0 left-0 ml-2 flex items-center pl-3">
          <BaseIconSvg
            icon="/icon/search.svg"
            :size="18"
            fill-color="#757575"
          />
        </div>
        <input
          v-model="searchQuery"
          class="w-full rounded-md border border-gray-300 px-3 py-2 pl-8 text-sm text-gray-900 placeholder-gray-500 focus:border-[#FEC802] focus:outline-none focus:ring-1 focus:ring-[#039550]"
          placeholder="Cari data..."
          @input="filterOptions"
        />
      </div>

      <ul class="max-h-60 overflow-auto py-1 text-sm focus:outline-none">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          class="cursor-pointer py-2 pl-3 pr-9 font-normal text-gray-900 hover:bg-gray-100 hover:font-bold hover:text-[#039550]"
          :class="{
            '!font-bold text-[#039550]': option.value === selectedOption?.value,
          }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
        <li
          v-if="filteredOptions.length === 0"
          class="py-2 px-3 italic text-gray-500"
        >
          Tidak ada hasil ditemukan
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSelectSearch',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Pilih kategori...',
    },
  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      filteredOptions: [],
    }
  },
  computed: {
    selectedOption() {
      return this.options.find((option) => option.value === this.value)
    },
  },
  watch: {
    options: {
      immediate: true,
      handler() {
        this.filterOptions()
      },
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit('change', option.value)
      this.isOpen = false
    },
    filterOptions() {
      const query = this.searchQuery.toLowerCase()
      this.filteredOptions = this.options.filter((option) =>
        option.label.toLowerCase().includes(query)
      )
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
      }
    },
  },
}
</script>
