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
      v-if="isOpen"
      class="fixed inset-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-75 transition-opacity"
      @click.self="close()"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseDialogFrame',
  props: {
    name: { type: String, required: true }
  },
  computed: {
    isOpen () {
      return this.$store.state.modals.open.includes(this.name)
    }
  },
  beforeDestroy () {
    if (this.isOpen) {
      this.close()
    }
  },
  methods: {
    close () {
      this.$store.commit('modals/CLOSE', this.name)
    }
  }
}
</script>
