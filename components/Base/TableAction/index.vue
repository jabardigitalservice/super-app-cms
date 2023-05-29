<template>
  <jds-popover :value="isShowPopOver" :options="popoverOptions">
    <template #activator>
      <BaseButton v-on-clickaway="closePopupOverHandle" class="border border-green-600 h-fit py-[4px] px-[16px] w-full text-[14px] font-medium text-green-600" @click="isShowPopOver=!isShowPopOver">
        <div class="flex items-center justify-between">
          Aksi
          <jds-icon name="chevron-down" fill="#16A75C" size="14px" class="ml-[10px]" :class="{'rotate-180':isShowPopOver}" />
        </div>
      </Basebutton>
    </template>
    <div class="bg-white w-[120px] p-[16px] mt-1 shadow-xl border border-gray-400 rounded-lg">
      <div v-for="(menuPopOver,index) in listMenuPopOver" :key="index" :class="{'mb-4':index!==listMenuPopOver.length-1}">
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
  name: 'TableAction',
  directives: {
    onClickaway
  },
  props: {
    listMenuPopOver: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isShowPopOver: false,
      popoverOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 6]
            }
          }
        ]
      }
    }
  },
  methods: {
    closePopupOverHandle () {
      this.isShowPopOver = false
    }
  }

}
</script>
