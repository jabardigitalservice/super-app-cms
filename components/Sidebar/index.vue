<template>
  <div class="sticky top-0 flex h-screen flex-col">
    <SidebarHeader class="px-6 py-7" />
    <div class="sidebar-content overflow-y-auto px-4">
      <template v-for="(menuList, index) in menu">
        <SidebarTitleMenu
          v-if="
            menuList?.showTitleMenuForRoles?.some((value) =>
              $role.includes(value)
            ) && isUnleashEnabled(menuList.unleashVariable)
          "
          :key="`title-${index}`"
          class="mb-3"
          :title="menuList.titleMenu"
        />
        <div :key="`child-${index}`" class="flex flex-col gap-2">
          <template v-for="menuSidebar in menuList.menu">
            <SidebarItem
              v-if="
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
          </template>
        </div>
      </template>
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
