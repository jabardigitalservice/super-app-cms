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
      <div class="bg-white w-[510px] py-4 px-6 h-[300px] rounded-lg">
        <div class="flex flex-col items-center justify-center h-[300px]">
          <jds-spinner class="mb-4" size="56" />
          <p class="text-green-700 text-2xl font-lato font-bold">
            Loading....
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'BasePopupLoading',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>
