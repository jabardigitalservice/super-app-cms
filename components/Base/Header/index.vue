<template>
  <div class="pb-[16px]">
    <BaseBreadcrumb :navigations="navigations" />
    <p class="mt-1 font-roboto text-[16px] text-blue-gray-400">
      {{ descriptionPage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    navigations: {
      type: Array,
      default: () => [],
    },
    descriptionPage: {
      type: String,
      default: '',
    },
  },
}
</script>
