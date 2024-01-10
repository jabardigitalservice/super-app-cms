<template>
  <div class="pb-[16px]">
    <BaseBreadcrumb :navigations="navigations" />
    <p class="text-[16px] font-roboto mt-1 text-blue-gray-400">
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
      default: () => ([])
    },
    descriptionPage: {
      type: String,
      default: ''
    }
  }
}
</script>
