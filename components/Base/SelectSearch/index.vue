<template>
  <div class="relative">
    <button
      class="rounded-lg border border-gray-400 bg-white px-4 py-2 text-left focus:border-[#FEC802]"
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
      <div class="px-3 py-2">
        <input
          v-model="searchQuery"
          class="rounded-md border border-gray-300 px-3 py-2 text-sm leading-5 text-gray-900 placeholder-gray-500"
          placeholder="Cari data..."
          @input="filterOptions"
        />
      </div>
      <ul
        class="max-h-60 overflow-auto py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
      >
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
      default: '',
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
