<template>
  <button class="h-fit w-full rounded-lg py-[10px] px-[16px] text-[14px] font-bold" v-on="$listeners">
    <slot name="icon-right" />
    <slot name="icon-left" />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
