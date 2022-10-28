<template>
  <div>
    <div class="flex justify-center">
      <div class="bg-[#F6F6F9] h-[72px] w-[72px] px-[18px] py-[10px] rounded-lg">
        <Logo class="h-[52px] w-[37px] " />
      </div>
    </div>
    <h1 class="text-[24px] mt-[24px] font-bold font-roboto text-center text-blue-gray-900">
      Selamat Datang!
    </h1>
    <p class="font-lato text-center text-gray-700">
      Silakan login ke akun admin Anda.
    </p>
  </div>
</template>

<script>
import Logo from '~/assets/logo/sapawarga.svg?inline'
export default {
  name: 'HeaderLogin',
  components: { Logo }
}
</script>
