<template>
  <ul class="w-full">
    <li class="flex justify-between items-center h-[32px]">
      <div class="flex items-center">
        <component :is="icon" class="flex-shrink-0 mr-3" />
        <nuxt-link :to="link" class="font-lato text-gray-600 text-[14px]">
          {{ label }}
        </nuxt-link>
      </div>
      <ChevronRight class="stroke-gray-500" />
    </li>
  </ul>
</template>

<script>
import ChevronRight from '~/assets/icon/arrow-right.svg?inline'
import IconAdmin from '~/assets/icon/icon-admin.svg?inline'

export default {
  name: 'ItemSidebar',
  components: {
    ChevronRight, IconAdmin
  },
  props: {
    label: {
      type: String,
      default: 'item'
    },
    icon: {
      type: String,
      default: 'icon-admin'
    },
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>
