<template>
  <jds-popover ref="popover" :options="optionsPopover" :value="isPopupOpen">
    <template #activator>
      <div
        class="w-full h-full min-w-[200px] flex justify-between items-center cursor-pointer hover:text-gray-800 hover:font-bold"
        @click="toggleShowPopup"
      >
        <div class="flex gap-2 items-center">
          <div class="rounded-full bg-gray-100 p-1">
            <IconUser class="h-5 w-5 text-gray-600" />
          </div>
          <div class="min-w-0 flex-1 font-lato text-[#666687] text-[14px] capitalize">
            {{ nameUser }}
          </div>
        </div>
        <ChevronRight class="stroke-gray-500" />
      </div>
    </template>
    <div class="w-full bg-white rounded-lg shadow-xl p-2">
      <ul class="flex flex-col gap-2">
        <li class="cursor-pointer p-2 rounded-md hover:bg-green-50">
          <div class="flex gap-2 items-center font-medium text-sm text-gray-800">
            <jds-icon
              name="door-exit"
              size="16px"
            />
            Keluar
          </div>
        </li>
      </ul>
    </div>
  </jds-popover>
</template>

<script>
import optionsPopover from '@/constant/optionsPopover'
import ChevronRight from '~/assets/icon/chevron-right.svg?inline'
import IconUser from '~/assets/icon/user.svg?inline'

export default {
  name: 'FooterSidebar',
  components: {
    ChevronRight, IconUser
  },
  props: {
    nameUser: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isPopupOpen: false,
      optionsPopover
    }
  },
  methods: {
    toggleShowPopup () {
      this.isPopupOpen = !this.isPopupOpen
    }
  }
}
</script>
