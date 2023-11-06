<template>
  <transition
    name="fade"
    enter-active-class="transition ease-out duration-75"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="showPopup"
      class="
          fixed
          inset-0
          bg-black bg-opacity-75
          transition-opacity
          flex
          justify-center
          items-center
          w-full
          z-10
        "
    >
      <slot />
    </div>
  </transition>
</template>

<script>

export default {
  name: 'BaseDialog',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeHandle () {
      this.$emit('close')
    },
    submitHandle () {
      this.$emit('submit')
    }
  }
}
</script>