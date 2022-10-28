<template>
  <ul class="cursor-pointer w-full p-3 flex items-center rounded-lg hover:bg-gray-50 hover:text-gray-800 hover:font-bold">
    <li class="flex justify-between items-center min-w-[200px]">
      <div class="flex items-center">
        <component :is="icon" class="flex-shrink-0 mr-3" />
        <nuxt-link :to="link" class="font-lato text-gray-600 text-sm">
          {{ label }}
        </nuxt-link>
      </div>
      <ChevronRight class="stroke-gray-500" />
    </li>
  </ul>
</template>

<script>
import ChevronRight from '~/assets/icon/chevron-right.svg?inline'
import IconItem from '~/assets/icon/item.svg?inline'

export default {
  name: 'ItemSidebar',
  components: {
    ChevronRight, IconItem
  },
  props: {
    label: {
      type: String,
      default: 'item'
    },
    icon: {
      type: String,
      default: 'icon-item'
    },
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>
