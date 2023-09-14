<template>
  <div class="mt-auto p-6 hover:bg-green-700">
    <jds-popover ref="popover" :options="optionsPopover" :value="isPopupOpen">
      <template #activator>
        <div
          class="w-full h-full min-w-[200px] flex justify-between items-center cursor-pointer hover:text-white hover:font-bold"
          @click="toggleShowPopup"
        >
          <div class="flex gap-2 items-center">
            <div class="rounded-full bg-gray-300 p-1">
              <IconUser class="h-5 w-5 text-white" />
            </div>
            <div class="min-w-0 flex-1 font-lato text-white text-[14px] capitalize">
              {{ nameUser }}
            </div>
          </div>
          <ChevronRight class="stroke-white" />
        </div>
      </template>
      <div class="w-full bg-white rounded-lg shadow-xl p-2">
        <ul class="flex flex-col gap-2">
          <li class="rounded-md ">
            <button class="flex gap-2 items-center font-medium text-sm text-gray-800 hover:bg-green-50 w-full p-2 cursor-pointer" @click="isShowPopupLogout=true">
              <jds-icon
                name="door-exit"
                size="16px"
              />
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </jds-popover>
    <LogoutConfirmation :show-popup="isShowPopupLogout" @logout="logout" @close="isShowPopupLogout=false" />
  </div>
</template>

<script>

import LogoutConfirmation from '~/components/Logout/LogoutConfirmation.vue'
import optionsPopover from '@/constant/optionsPopover'
import ChevronRight from '~/assets/icon/chevron-right.svg?inline'
import IconUser from '~/assets/icon/user.svg?inline'

export default {
  name: 'FooterSidebar',
  components: {
    ChevronRight,
    IconUser,
    LogoutConfirmation
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
      isShowPopupLogout: false,
      optionsPopover
    }
  },
  methods: {
    toggleShowPopup () {
      this.isPopupOpen = !this.isPopupOpen
    },
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
