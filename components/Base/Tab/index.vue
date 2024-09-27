<template>
  <div
    class="h-[70px] min-w-[150px] rounded-t-lg bg-green-700 py-2 px-3"
    :class="{ '!bg-white': selected }"
  >
    <slot>
      <button
        class="items-center text-sm text-green-100"
        :class="{ '!text-gray-700': selected }"
      >
        {{ title }}
      </button>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'BaseTab',
  props: {
    title: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
