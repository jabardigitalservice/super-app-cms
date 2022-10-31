<template>
  <nuxt-link :to="{name: link}" class="flex justify-between items-center min-w-[200px] w-full p-3 rounded-lg hover:bg-gray-50 hover:text-gray-800 hover:font-bold">
    <div class="flex items-center">
      <component :is="icon" class="flex-shrink-0 mr-3" />
      <div class="font-lato text-gray-600 text-sm">
        {{ label }}
      </div>
    </div>
    <ChevronRight v-if="isShowArrow" class="stroke-gray-500" />
  </nuxt-link>
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
    },
    isShowArrow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
a.nuxt-link-exact-active {
  @apply bg-gray-50 text-gray-800 font-bold !important;
}
</style>
