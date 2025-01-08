<template>
  <div class="border-b py-3 font-roboto font-bold uppercase text-white">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'TitleMenu',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
