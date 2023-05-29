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
      class="fixed inset-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-75 transition-opacity"
    >
      <div class="h-fit w-[510px] rounded-lg bg-white">
        <!-- HEADER -->
        <div class="h-[50px] rounded-t-lg bg-white py-[8px] px-[24px]">
          <h1 class="font-roboto text-[21px] font-bold text-green-800">
            {{ getTitle }}
          </h1>
        </div>
        <!-- BODY -->
        <div class="px-[24px]">
          <div class="pt-[16px] pb-10 font-lato text-gray-800">
            <div class="flex items-start justify-start">
              <jds-icon
                v-show="getIcon.name"
                :name="getIcon.name"
                size="16px"
                :fill="getIcon.fill"
                class="mt-1"
              />
              <div :class="getIcon.name ? 'ml-[13px]' : ''">
                <p class="font-lato text-[14px] text-gray-800">
                  {{ getMessage.detailPopup }}
                </p>
                <div class="font-lato text-[16px] text-gray-800">
                  <strong>{{ getMessage.titlePopup }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- FOOTER -->
        <div
          class="flex h-fit justify-end rounded-b-lg bg-gray-50 px-[24px] py-[16px]"
          :class="{ 'justify-center': getDialogType !== 'confirmation' }"
        >
          <div class="mr-[16px]">
            <jds-button
              v-show="getDialogType === 'confirmation'"
              :label="getButtonLeft.label"
              :variant="getButtonLeft.variant"
              class="!font-lato !text-sm !font-bold"
              @click="closePopupHandle"
            />
          </div>
          <jds-button
            v-show="getDialogType === 'confirmation' || 'information'"
            :label="getButtonRight.label"
            :variant="getButtonRight.variant"
            class="!font-lato !text-sm !font-bold"
            @click="submitHandle"
          />
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
    ...mapGetters('dialog', [
      'getIcon',
      'getButtonLeft',
      'getButtonRight',
      'getMessage',
      'getTitle',
      'getDialogType'
    ])
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
