<template>
  <JdsPopover
    class="z-10"
    :value="isDropdownOpen"
    :options="popoverOptions"
  >
    <template #activator>
      <button
        v-on-clickaway="closeDropdown"
        class="border border-green-700 text-green-700 hover:bg-green-50 rounded-lg px-4 py-1"
        @click="toggleDropdown"
      >
        Aksi
        <JdsIcon
          name="chevron-down"
          size="14px"
          fill="#069550"
          class="ml-[10px] transition-all ease-in duration-200"
          :class="isDropdownOpen ? '-rotate-180' : null"
        />
      </button>
    </template>

    <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-xl">
      <div class="flex flex-col gap-3">
        <button class="text-sm leading-4 text-gray-800 hover:text-green-700" @click="$emit('detail')">
          Lihat Detail
        </button>
        <button class="text-sm leading-4 text-gray-800 hover:text-green-700" @click="$emit('verify')">
          Verifikasi
        </button>
        <button class="text-sm leading-4 text-gray-800 hover:text-green-700" @click="$emit('reject')">
          Tolak
        </button>
      </div>
    </div>
  </JdsPopover>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'KlaimRWTableAction',
  directives: {
    onClickaway
  },
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isDropdownOpen: false,
      popoverOptions: {
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 8] }
          }
        ]
      }
    }
  },
  methods: {
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown () {
      this.isDropdownOpen = false
    }
  }
}
</script>

<style>
.jds-popover__content {
  z-index: 10 !important;
}
</style>
