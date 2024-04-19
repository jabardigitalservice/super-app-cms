<template>
  <div class="mt-3 animate-pulse">
    <div v-for="n in 11" :key="n" class="mb-6 h-4 rounded bg-gray-200"></div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoadingKalender',
}
</script>
