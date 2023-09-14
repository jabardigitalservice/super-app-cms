<template>
  <div class="flex items-center">
    <div
      class="mr-3 h-[32px] w-[32px] rounded-full bg-[#F6F6F9] px-[8px] py-[5px]"
    >
      <Logo class="h-[22px] w-[16px]" />
    </div>
    <div>
      <h1
        class="font-roboto text-[16px] font-bold uppercase text-white"
      >
        Sapawarga
      </h1>
      <h2 class="font-roboto text-[12px] text-white font-normal">
        Web Admin
      </h2>
    </div>
  </div>
</template>

<script>
import Logo from '~/assets/logo/sapawarga.svg?inline'
export default {
  name: 'HeaderSidebar',
  components: { Logo }
}
</script>
