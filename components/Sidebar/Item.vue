<template>
  <nuxt-link
    v-if="roleUser === role"
    :to="{ name: link }"
    class="flex w-full min-w-[200px] items-center justify-between rounded-lg p-3 hover:bg-gray-50 hover:font-bold hover:text-gray-800"
    :class="{ 'nuxt-link-exact-active': getActivePage == label }"
  >
    <div class="flex items-center">
      <component :is="icon" class="mr-3 flex-shrink-0" />
      <div class="font-lato text-sm text-gray-600">
        {{ label }}
      </div>
    </div>
    <ChevronRight v-if="isShowArrow" class="stroke-gray-500" />
  </nuxt-link>
</template>

<script>
import ChevronRight from '~/assets/icon/chevron-right.svg?inline'
import IconItem from '~/assets/icon/item.svg?inline'
import { isAdmin } from '~/utils'

export default {
  name: 'ItemSidebar',
  components: {
    ChevronRight,
    IconItem
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
    },
    role: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      roleUser: isAdmin(this.$auth)
    }
  },
  computed: {
    getActivePage () {
      return this.$store.state.page
    }
  }
}
</script>

<style scoped>
a.nuxt-link-exact-active {
  @apply bg-gray-50 font-bold text-gray-800 !important;
}
</style>
