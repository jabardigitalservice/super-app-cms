<template>
  <jds-popover :value="isShowPopOver" :options="popoverOptions">
    <template #activator>
      <BaseButton
        v-on-clickaway="closePopupOverHandle"
        class="h-fit w-full border border-green-600 bg-green-700 py-[8px] px-[16px] text-[14px] font-medium text-white"
        @click="isShowPopOver = !isShowPopOver"
      >
        <div class="flex items-center justify-between">
          <slot />
          <jds-icon
            name="chevron-down"
            fill="#FFFFFF"
            size="14px"
            class="ml-[10px]"
            :class="{ 'rotate-180': isShowPopOver }"
          />
        </div>
      </BaseButton>
    </template>
    <div
      class="mt-1 w-fit rounded-lg border border-gray-400 bg-white p-[16px] shadow-xl"
    >
      <div class="mb-2 border-b">
        <h5 class="text-center font-lato text-[16px] font-bold">
          Pilih Tipe File
        </h5>
      </div>

      <div
        v-for="(menuPopOver, index) in listMenuPopOver"
        :key="index"
        :class="{ 'mb-4': index !== listMenuPopOver.length - 1 }"
      >
        <button
          :key="index"
          class="font-lato text-[14px] font-normal"
          @click="$emit(`${menuPopOver.value}`)"
        >
          {{ menuPopOver.menu }}
        </button>
      </div>
    </div>
  </jds-popover>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
export default {
  name: 'ButtonDropdown',
  directives: {
    onClickaway,
  },
  props: {
    listMenuPopOver: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowPopOver: false,
      popoverOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 6],
            },
          },
        ],
      },
    }
  },
  methods: {
    closePopupOverHandle() {
      this.isShowPopOver = false
    },
  },
}
</script>
