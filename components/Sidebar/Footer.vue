<template>
  <div class="flex justify-between cursor-pointer hover:bg-gray-50 hover:text-gray-800 hover:font-bold">
    <div class="flex items-center">
      <img
        :src=" imageUrl == ''
          ? require('~/assets/images/profile.png')
          : imageUrl"
        alt="user"
        width="26"
        height="26"
        class="rounded-full mr-3"
      >
      <div class="min-w-0 flex-1 font-lato text-[#666687] text-[14px] capitalize">
        {{ nameUser }}
      </div>
    </div>
    <ChevronRight class="stroke-gray-500" />
  </div>
</template>

<script>
import ChevronRight from '~/assets/icon/chevron-right.svg?inline'

export default {
  name: 'FooterSidebar',
  components: {
    ChevronRight
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
  }
}
</script>
