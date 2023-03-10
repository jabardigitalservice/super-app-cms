<template>
  <div>
    <SidebarHeader class="px-6 py-7 border-b" />
    <div class="h-[calc(100%-170px)] overflow-y-scroll sidebar-content p-6">
      <SidebarTitleMenu title="RW" />
      <div class="flex flex-col gap-2">
        <SidebarItem
          v-for="menu in mainMenu"
          :key="menu.path"
          :label="menu.name"
          :is-show-arrow="menu.arrow"
          :link="menu.path"
        />
      </div>
      <SidebarTitleMenu title="Pesan" />
      <div class="flex flex-col gap-2">
        <SidebarItem
          v-for="menu in messageNotifMenu"
          :key="menu.path"
          :label="menu.name"
          :is-show-arrow="menu.arrow"
          :link="menu.path"
        />
      </div>
      <SidebarTitleMenu title="Master Data" />
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
    <SidebarFooter class="p-6 border-t hover:bg-gray-50" :name-user="profileName" />
  </div>
</template>

<script>
import { mainMenu, messageNotifMenu, masterDataMenu } from '@/constant/menu'

export default {
  name: 'ComponentSidebar',
  data () {
    return {
      mainMenu,
      messageNotifMenu,
      masterDataMenu,
      profileName: ''
    }
  },
  mounted () {
    this.profileName = this.$auth?.user?.name
  }
}
</script>

<style>
  .sidebar-content{
    scrollbar-color: #e0e0e0 transparent;
    scrollbar-width: thin;
  }

  .sidebar-content::-webkit-scrollbar{
    @apply w-5 h-5;
  }

  .sidebar-content::-webkit-scrollbar-track {
    @apply bg-transparent;
  }

  .sidebar-content::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-xl border-solid border-[6px] border-transparent bg-clip-content;
  }

</style>
