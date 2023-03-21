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
      <div class="bg-white h-fit rounded-lg">
        <!-- HEADER -->
        <div class="h-[50px] bg-white py-[8px] px-[24px] rounded-t-lg">
          <h1
            class="font-roboto text-[21px] font-bold text-green-800"
          >
            {{ title }}
          </h1>
        </div>
        <!-- BODY -->
        <div class="px-[24px] overflow-y-auto min-h-min w-[800px]">
          <img :src="imageUrl" alt="image-cover">
        </div>
        <!-- FOOTER -->
        <div class="h-fit px-[24px] flex justify-center bg-gray-50 py-[16px]">
          <jds-button label="Oke" variant="primary" class="!h-[38px] !text-sm !font-bold py-[2px]" @click="closePopupHandle" />
        </div>
      </div>
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
    },
    title: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    closePopupHandle () {
      this.$emit('close')
    }
  }
}
</script>
