<template>
  <div class="mt-6 mb-4 py-3 font-roboto text-gray-600 uppercase font-bold border-b">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'TitleMenu',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
