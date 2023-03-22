<template>
  <div class="sticky top-0 flex h-screen flex-col">
    <SidebarHeader class="border-b px-6 py-7" />
    <div class="sidebar-content overflow-y-auto p-4">
      <SidebarTitleMenu title="RW" />
      <div class="flex flex-col gap-2">
        <SidebarItem
          v-for="menu in mainMenu"
          :key="menu.path"
          :label="menu.name"
          :is-show-arrow="menu.arrow"
          :link="menu.path"
          :role="menu.role"
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
          :role="menu.role"
        />
      </div>
      <SidebarTitleMenu title="Tiket Museum" />
      <div class="flex flex-col gap-2">
        <SidebarItem
          v-for="menu in tiketMuseumMenu"
          :key="menu.path"
          :label="menu.name"
          :is-show-arrow="menu.arrow"
          :link="menu.path"
          :role="menu.role"
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
          :role="menu.role"
        />
      </div>
    </div>
    <SidebarFooter
      class="mt-auto border-t p-6 hover:bg-gray-50"
      :name-user="profileName"
    />
  </div>
</template>

<script>
import {
  mainMenu,
  messageNotifMenu,
  masterDataMenu,
  tiketMuseumMenu
} from '@/constant/menu'

export default {
  name: 'ComponentSidebar',
  data () {
    return {
      mainMenu,
      messageNotifMenu,
      masterDataMenu,
      tiketMuseumMenu,
      profileName: ''
    }
  },
  mounted () {
    this.profileName = this.$auth?.user?.name
  }
}
</script>

<style>
.sidebar-content {
  scrollbar-color: #e0e0e0 transparent;
  scrollbar-width: thin;
}

.sidebar-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.sidebar-content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.sidebar-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
</style>
