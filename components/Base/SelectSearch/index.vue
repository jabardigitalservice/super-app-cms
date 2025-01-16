<template>
  <div class="relative inline-block text-left">
    <button
      ref="dropdownButton"
      :style="{ width: widthButton }"
      class="rounded-md border border-gray-500 bg-white px-3 py-1 text-left focus:border-[#FEC802] focus:outline-none focus:ring-1 focus:ring-[#039550]"
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
      ref="dropdownOpen"
      class="fixed z-50 rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      :style="dropdownStyles"
    >
      <div v-if="filterable" class="relative w-full px-3 py-2">
        <div class="absolute inset-y-0 left-0 ml-2 flex items-center pl-3">
          <BaseIconSvg
            icon="/icon/search.svg"
            :size="18"
            fill-color="#757575"
          />
        </div>
        <input
          v-model="searchQuery"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 pl-8 text-sm text-gray-900 placeholder-gray-500 focus:border-[#FEC802] focus:outline-none focus:ring-1 focus:ring-[#039550]"
          placeholder=""
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
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    widthButton: {
      type: String,
      default: '260px',
    },
    widthOption: {
      type: String,
      default: '260px',
    },
  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      filteredOptions: [],
      dropdownStyles: {},
    }
  },
  computed: {
    selectedOption() {
      return this.options.find(
        (option) => String(option.value) === String(this.value)
      )
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
    window.addEventListener('scroll', this.handleScroll, true)
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$nextTick(() => {
          this.calculateDropdownPosition()
        })
      }
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
    calculateDropdownPosition() {
      const button = this.$refs.dropdownButton.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const maxDropdownHeight = Math.min(viewportHeight * 0.4, 300)
      const dropdownHeight = Math.min(
        maxDropdownHeight,
        this.filteredOptions.length * 40
      )

      const minDropdownHeight = 120
      const finalDropdownHeight = Math.max(dropdownHeight, minDropdownHeight)

      let top = button.bottom
      const left = button.left

      if (button.bottom + finalDropdownHeight > viewportHeight) {
        top = button.top - finalDropdownHeight
      }

      this.dropdownStyles = {
        width: this.widthOption,
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        maxHeight: `${finalDropdownHeight}px`,
        overflow: 'auto',
      }
    },
    handleScroll() {
      if (this.isOpen) {
        this.calculateDropdownPosition()
      }
    },
  },
}
</script>
