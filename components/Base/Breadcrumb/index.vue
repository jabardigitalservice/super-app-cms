<template>
  <nav class="flex flex-wrap items-center h-[45px]">
    <div class="inline-block">
      <NuxtLink
        v-for="(item,index) in navigations"
        :key="index"
        :to="item.link"
        class="font-roboto text-[28px] font-medium text-blue-gray-300 breadcrumb__item"
        :class="{'text-[#022B55]':isActiveLink(item.link)}"
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
  },
  methods: {
    isActiveLink (link) {
      return link === this.$route.path
    }
  }
}
</script>

<style scoped>
  .breadcrumb__item+.breadcrumb__item::before{
    content: '/';
    padding-left: 5px;
  }
</style>
