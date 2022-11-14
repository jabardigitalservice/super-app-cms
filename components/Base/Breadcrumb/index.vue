<template>
  <nav class="flex flex-wrap items-center h-[45px]">
    <div class="inline-block">
      <NuxtLink
        v-for="(item,index) in navigations"
        :key="index"
        :to="item.link"
        class="font-roboto text-[28px] font-medium text-blue-gray-300 breadcrumb__item"
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
      default: () => []
    }
  }
}
</script>

<style scoped>
  .breadcrumb__item+.breadcrumb__item::before{
    content: '/';
  }
  .breadcrumb__item.nuxt-link-exact-active{
    color: #022B55
  }
</style>
