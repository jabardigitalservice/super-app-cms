<template>
  <button
    class="h-fit w-full rounded-lg py-[10px] px-[16px] text-[14px] font-bold disabled:cursor-not-allowed disabled:!border disabled:!border-neutral-500 disabled:!bg-neutral-300 disabled:!text-neutral-500"
    v-on="$listeners"
  >
    <slot name="icon-right" />
    <slot name="icon-left" />
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
