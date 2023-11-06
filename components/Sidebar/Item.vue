<template>
  <nuxt-link
    :to="{ path: link }"
    class="flex w-full min-w-[200px] items-center justify-between rounded-lg p-3 hover:bg-green-700 hover:font-bold hover:text-white"
    :class="{ 'nuxt-link-exact-active': getActivePage == label }"
  >
    <div class="flex items-center">
      <BaseIconSvg
        v-if="icon"
        :icon="`/icon/${icon}`"
        :size="16"
        fill-color="#FFFFFF"
        class="mr-3 flex-shrink-0"
      />
      <div class="font-lato text-sm text-white">
        {{ label }}
      </div>
    </div>
    <ChevronRight v-if="isShowArrow" class="stroke-white" />
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
  @apply bg-green-700 font-bold text-white p-3 !important;
}
</style>
