<template>
  <BaseCustomPopup :title="title" :show-popup="showPopup">
    <template #body-popup>
      <div class="py-4 px-6 font-lato text-gray-800">
        <div class="flex justify-start items-start">
          <jds-icon v-if="message" name="check-mark-circle" class="w-[16px] h-[16px] mt-1 text-green-700" />
          <jds-icon v-else name="times-circle" class="w-[16px] h-[16px] mt-1 text-red-600" />
          <div class="ml-[13px]">
            <p class="text-[14px] text-gray-800 font-lato">
              {{ descriptionText }}
            </p>
            <div class="text-[16px] font-lato text-gray-800">
              <strong>{{ accountName }}</strong>
            </div>
          </div>
        </div>
        <div v-if="message" class="bg-blue-50 border border-blue-500 h-fit w-full py-[8px] pr-[12px] pl-[14px] rounded-lg mt-[24px]">
          <div class="flex">
            <jds-icon name="exclamation-mark-circle" class="w-[16px] h-[16px] mt-1 mr-[18px]" fill="#1565C0" />
            <div class="text-[14px] font-lato">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer-popup>
      <div class="flex justify-center">
        <jds-button label="Saya mengerti" variant="primary" class="!text-sm !font-lato !font-bold" @click="$emit('close')" />
      </div>
    </template>
  </BaseCustomPopup>
</template>

<script>
export default {
  name: 'InformationPopupRT',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    accountName: {
      type: String,
      default: ''
    },
    descriptionText: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
