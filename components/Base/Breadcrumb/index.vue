<template>
  <nav class="flex h-[45px] flex-wrap items-center">
    <div class="inline-block">
      <NuxtLink
        v-for="(item, index) in navigations"
        :key="index"
        tag="button"
        :disabled="item?.disabled"
        :to="{ path: item.link, query: $route.query }"
        class="breadcrumb__item font-roboto text-[28px] font-medium text-blue-gray-300 disabled:cursor-not-allowed"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BaseBreadcrumb',
  props: {
    navigations: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.breadcrumb__item + .breadcrumb__item::before {
  content: '/';
}
.breadcrumb__item.nuxt-link-exact-active {
  color: #022b55;
}
</style>
