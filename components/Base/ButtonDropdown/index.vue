<template>
  <jds-popover :value="isShowPopOver" :options="popoverOptions">
    <template #activator>
      <BaseButton
        v-on-clickaway="closePopupOverHandle"
        class="h-fit w-full border border-green-600 bg-green-700 py-[8px] px-[16px] text-[14px] font-medium text-white"
        @click="isShowPopOver = !isShowPopOver"
      >
        <slot>
          <div class="flex items-center justify-between">
            {{ label }}
            <jds-icon
              name="chevron-down"
              fill="#FFFFFF"
              size="14px"
              class="ml-[10px]"
              :class="{ 'rotate-180': isShowPopOver }"
            />
          </div>
        </slot>
      </BaseButton>
    </template>
    <div
      class="mt-1 mr-6 w-fit rounded-lg border border-gray-400 bg-white p-[16px] shadow-xl"
    >
      <div
        v-for="(menuPopOver, index) in listMenuPopOver"
        :key="index"
        :class="{ 'mb-4': index !== listMenuPopOver.length - 1 }"
      >
        <button :key="index" @click="$emit(`${menuPopOver.value}`)">
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
    label: {
      type: String,
      default: '',
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
