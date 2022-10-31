<template>
  <div>
    <SidebarHeader class="px-6 py-7 border-b" />
    <div class="h-[calc(100%-170px)] overflow-y-scroll p-6">
      <div class="flex flex-col gap-2">
        <SidebarItem
          v-for="menu in mainMenu"
          :key="menu.path"
          :label="menu.name"
          :is-show-arrow="menu.arrow"
          :link="menu.path"
        />
      </div>
      <div class="mt-6 mb-4 py-3 font-roboto text-gray-600 uppercase font-bold border-b">
        Master Data
      </div>
      <div class="flex flex-col gap-2">
        <SidebarItem
          v-for="menu in masterDataMenu"
          :key="menu.path"
          :label="menu.name"
          :is-show-arrow="menu.arrow"
          :link="menu.path"
        />
      </div>
    </div>
    <SidebarFooter class="p-6 border-t" name-user="Superadmin" />
  </div>
</template>

<script>
import { mainMenu, masterDataMenu } from '@/constant/menu'

export default {
  name: 'ComponentSidebar',
  data () {
    return {
      mainMenu,
      masterDataMenu
    }
  }
}
</script>
