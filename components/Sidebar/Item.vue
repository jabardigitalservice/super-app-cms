<template>
  <nuxt-link
    :to="{ path: link }"
    class="flex w-full min-w-[200px] items-center justify-between rounded-lg p-3 hover:bg-gray-50 hover:font-bold hover:text-gray-800"
    :class="{ 'nuxt-link-exact-active': getActivePage == label }"
  >
    <div class="flex items-center">
      <BaseIconSvg
        v-if="icon"
        :icon="`/icon/${icon}`"
        :size="16"
        fill-color="#EFEFF2"
        class="mr-3 flex-shrink-0"
      />
      <div class="font-lato text-sm text-gray-600">
        {{ label }}
      </div>
    </div>
    <ChevronRight v-if="isShowArrow" class="stroke-gray-500" />
  </nuxt-link>
</template>

<script>
import ChevronRight from '~/assets/icon/chevron-right.svg?inline'

export default {
  name: 'ItemSidebar',
  components: {
    ChevronRight
  },
  props: {
    label: {
      type: String,
      default: 'item'
    },
    icon: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    isShowArrow: {
      type: Boolean,
      default: true
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
