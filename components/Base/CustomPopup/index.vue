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
      <div class="bg-white w-[510px] h-fit rounded-lg">
        <!-- HEADER -->
        <header class="h-[50px] bg-white py-[8px] px-[24px] rounded-t-lg">
          <h1
            class="font-roboto text-[21px] font-bold text-green-800"
          >
            {{ title }}
          </h1>
        </header>
        <!-- BODY -->
        <content>
          <slot name="body-popup" />
        </content>
        <!-- FOOTER -->
        <footer class="h-fit px-6 bg-gray-50 py-4 rounded-b-lg">
          <slot name="footer-popup" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CustomDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>
