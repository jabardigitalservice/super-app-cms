<template>
  <div class="p-6">
    <div class="flex mb-10">
      <div class="p-[6px] bg-green-50 rounded-full">
        <IconLogo class="h-8 w-8" />
      </div>
      <span class="ml-2 font-roboto font-bold text-lg text-gray-900 flex justify-center items-center">
        Sapawarga
      </span>
    </div>
    <div class="h-[calc(100%-100px)] overflow-y-scroll">
      <div class="flex flex-col gap-2">
        <div class="cursor-pointer text-body h-[50px] w-full p-[15px] flex items-center rounded-lg hover:bg-green-50 hover:!text-green-700">
          <IconUser class="h-4 w-4 text-gray-700" />
          <span class="ml-2 font-medium text-sm text-gray-700">
            Daftar User
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconLogo from '~/assets/logo/sapawarga.svg?inline'
import IconUser from '~/assets/icon/user.svg?inline'

export default {
  name: 'ComponentSidebar',
  components: { IconLogo, IconUser }
}
</script>
