<template>
  <!-- This page is temporarily not deleted, because the RW feature claim is still using it. This component will be deleted in parallel -->
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
            :class="{'text-center' : confirmationType=='logout'} "
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
        <div class="h-fit px-[24px] flex justify-end bg-gray-50 py-[16px]" :class="{'justify-center' : dialogType==='information' || confirmationType==='logout'}">
          <div class="mr-[16px]">
            <BaseButton v-show="dialogType=='confirmation'" class="border border-green-700 text-green-700 hover:bg-green-50" :class="{'w-[117px]':confirmationType==='logout'}" @click="closeHandle">
              Batal
            </BaseButton>
          </div>
          <BaseButton v-show="(dialogType==='confirmation' && confirmationType!=='reject') || dialogType== 'information'" class="bg-green-700 w-fit text-white hover:bg-green-600" :class="disabledButton ? 'disabled:opacity-25' : ''" :disabled="disabledButton" @click="submitHandle">
            <template #default>
              <div class="text-[14px] font-bold font-lato">
                {{ labelButton }}
              </div>
            </template>
          </BaseButton>
          <BaseButton v-show="dialogType=='confirmation' && confirmationType==='reject'" class="bg-[#EF5350] w-fit text-white hover:bg-red-500" @click="submitHandle">
            <template #default>
              <div class="text-[14px] font-bold font-lato">
                {{ labelButton }}
              </div>
            </template>
          </BaseButton>
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
    disabledButton: {
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
    /**
     * to select the type of dialog to display : 'information' or 'confirmation'
     */
    dialogType: {
      type: String,
      default: 'information',
      validator (value) {
        return ['information', 'confirmation'].includes(value)
      }
    },
    /**
     * to select the type of confirmation to display : 'logout' 'reject' 'verify'
     */
    confirmationType: {
      type: String,
      default: 'verify',
      validator (value) {
        return ['logout', 'reject', 'verify'].includes(value)
      }
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
