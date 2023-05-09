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
        <div class="h-[50px] bg-white py-[8px] px-[24px] rounded-t-lg">
          <h1
            class="font-roboto text-[21px] font-bold text-green-800"
          >
            {{ getTitle }}
          </h1>
        </div>
        <!-- BODY -->
        <div class="px-[24px]">
          <div class="pt-[16px] pb-10 font-lato text-gray-800">
            <div class="flex justify-start items-start">
              <jds-icon v-show="getIcon.name" :name="getIcon.name" size="16px" :fill="getIcon.fill" class="mt-1" />
              <div class="ml-[13px]">
                <p class="text-[14px] text-gray-800 font-lato">
                  {{ getMessage.detailPopup }}
                </p>
                <div class="text-[16px] font-lato text-gray-800">
                  <strong>{{ getMessage.titlePopup }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- FOOTER -->
        <div class="h-fit px-[24px] flex justify-end bg-gray-50 py-[16px] rounded-b-lg" :class="{'justify-center': getDialogType!=='confirmation'}">
          <div class="mr-[16px]">
            <jds-button v-show="getDialogType==='confirmation'" :label="getButtonLeft.label" :variant="getButtonLeft.variant" class="!text-sm !font-lato !font-bold" @click="closePopupHandle" />
          </div>
          <jds-button v-show="getDialogType==='confirmation'|| 'information'" :label="getButtonRight.label" :variant="getButtonRight.variant" class="!text-sm !font-lato !font-bold" @click="submitHandle" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseDialog',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('dialog', ['getIcon', 'getButtonLeft', 'getButtonRight', 'getMessage', 'getTitle', 'getDialogType'])
  },
  methods: {
    closePopupHandle () {
      this.$emit('close')
    },
    submitHandle () {
      if (this.getDialogType === 'confirmation') {
        this.$emit('submit')
      } else {
        this.$emit('close')
      }
    }
  }
}
</script>
