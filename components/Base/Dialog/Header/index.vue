<template>
  <div class="px-6 py-2">
    <slot>
      <h1 class="text-[21px] text-green-800 font-bold font-roboto">
        {{ title }}
      </h1>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'BaseDialogHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
