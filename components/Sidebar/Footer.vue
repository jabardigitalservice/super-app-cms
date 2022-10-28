<template>
  <div class="flex items-center h-[42px]">
    <div class="mr-2">
      <img
        :src=" imageUrl == ''
          ? require('~/assets/images/profile.png')
          : imageUrl"
        alt="user"
        width="26"
        height="26"
        class="rounded-full"
      >
    </div>
    <div class="min-w-0 flex-1 font-lato text-[#666687] text-[14px] capitalize">
      {{ nameUser }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'FooterSidebar',
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
