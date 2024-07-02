<template>
  <transition name="fade">
    <div
      v-if="isOpenForm"
      class="opacity-1 fixed inset-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-75 transition-opacity"
      @click.self="$emit('close-dialog')"
    >
      <div
        class="content absolute top-0 right-0 z-50 h-screen w-[510px] transition-all duration-700 ease-in-out"
      >
        <slot name="body" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpenForm: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter .content,
.fade-leave-to .content {
  @apply right-[-700px];
}
</style>
