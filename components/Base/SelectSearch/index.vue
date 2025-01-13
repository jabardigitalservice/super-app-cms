<template>
  <div class="relative w-full">
    <button
      class="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      @click="toggleDropdown"
    >
      {{ placeholder }}
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
          class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm leading-5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search option..."
          @input="filterOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSelectSearch',
  props: {
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
    }
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$nextTick(() => {
          this.$el.querySelector('input').focus()
        })
      }
    },
  },
}
</script>
