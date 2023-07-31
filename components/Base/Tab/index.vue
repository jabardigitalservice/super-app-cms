<template>
  <div class="h-[70px] bg-green-700 py-2 px-3 min-w-[180px] rounded-t-lg" :class="{'!bg-white':selected}">
    <slot>
      <button v-if="title!==''" class="text-sm text-green-100 items-center" :class="{'!text-gray-700':selected}">
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
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>
