<template>
  <transition
    name="fade"
    enter-active-class="transition base-out-up duration-300 z-50"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="showPopup" class="z-50">
      <div
        class="
          fixed
          inset-0
          bg-black bg-opacity-70
          transition-opacity
          flex
          justify-center
          items-center
          w-full
        "
        @click.self="close"
      >
        <div class="bg-white w-[510px] h-fit rounded-lg">
          <!-- HEADER -->
          <div class="h-[50px] bg-white py-[8px] px-[24px] rounded-t-lg">
            <h1
              class="font-roboto text-[21px] font-bold text-green-800"
              :class="{'text-center' : isLogoutDialog} "
            >
              {{ title }}
            </h1>
          </div>
          <!-- BODY -->
          <div class="px-[24px]">
            <slot />
            <slot name="verify-content" />
            <slot name="reject-content" />
          </div>
          <!-- FOOTER -->
          <div class="h-fit px-[24px] flex justify-end bg-gray-50 py-[16px]" :class="{'justify-center' : isLogoutDialog}">
            <div class="mr-[16px]">
              <BaseButton class="border border-green-700 text-green-700 hover:bg-green-50" :class="{'w-[117px]':isLogoutDialog}" @click="closeHandle">
                Batal
              </BaseButton>
            </div>
            <BaseButton class="bg-green-700 w-fit text-white hover:bg-green-600" @click="submitHandle">
              <template #default>
                <div class="text-[14px] font-bold font-lato">
                  {{ labelButton }}
                </div>
              </template>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseButton from '~/components/Base/Button/BaseButton.vue'

export default {
  name: 'BaseDialog',
  components: { BaseButton },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    labelButton: {
      type: String,
      default: ''
    },
    isLogoutDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataFilter: {}
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

<style>
.modal-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
