<template>
  <div class="flex items-center">
    <div class="bg-[#F6F6F9] h-[32px] w-[32px] px-[8px] py-[5px] rounded-md mr-3">
      <Logo class="h-[22px] w-[16px] " />
    </div>
    <div>
      <h1 class="font-roboto uppercase text-blue-gray-800 font-bold text-[16px]">
        Sapawarga
      </h1>
      <h2 class="font-roboto text-[12px] text-blue-gray-300">
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
