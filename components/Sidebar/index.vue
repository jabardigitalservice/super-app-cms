<template>
  <div class="sticky top-0 flex h-screen flex-col">
    <SidebarHeader class="px-6 py-7" />
    <div class="sidebar-content overflow-y-auto px-6">
      <div v-for="(menuList, index) in menu" :key="index" class="mb-3">
        <SidebarTitleMenu
          v-show="
            menuList?.showTitleMenuForRoles?.some((value) =>
              $role.includes(value)
            ) && isUnleashEnabled(menuList.unleashVariable)
          "
          :title="menuList.titleMenu"
        />
        <div class="flex flex-col gap-2">
          <SidebarItem
            v-for="menuSidebar in menuList.menu"
            v-show="
              menuSidebar?.showMenuAndAccessForRoles?.some((value) =>
                $role.includes(value)
              ) && isUnleashEnabled(menuSidebar.unleashVariable)
            "
            :key="menuSidebar.path"
            :label="menuSidebar.name"
            :is-show-arrow="menuSidebar.arrow"
            :link="menuSidebar.path"
            :icon="menuSidebar.icon"
          />
        </div>
      </div>
    </div>
    <SidebarFooter :name-user="profileName" />
  </div>
</template>

<script>
import { menu } from '@/constant/menuList.js'

export default {
  name: 'ComponentSidebar',
  data() {
    return {
      menu,
      profileName: '',
    }
  },
  mounted() {
    this.profileName = this.$auth?.user?.name
    console.log('auth', this.$auth?.user)
  },
  methods: {
    isUnleashEnabled(unleashVariable) {
      if (!unleashVariable) {
        return true
      }

      return this.$unleash.isEnabled(unleashVariable)
    },
  },
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
