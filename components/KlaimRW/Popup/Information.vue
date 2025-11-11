<template>
  <BaseCustomPopup :title="title" :show-popup="showPopup">
    <template #body-popup>
      <div class="py-4 px-6 font-lato text-gray-800">
        <div class="flex items-start justify-start">
          <jds-icon
            v-if="message"
            name="check-mark-circle"
            class="mt-1 h-[16px] w-[16px] text-green-700"
          />
          <jds-icon
            v-else
            name="times-circle"
            class="mt-1 h-[16px] w-[16px] text-red-600"
          />
          <div class="ml-[13px]">
            <p class="font-lato text-[14px] text-gray-800">
              {{ descriptionText }}
            </p>
            <div class="font-lato text-[16px] text-gray-800">
              <strong>{{ accountName }}</strong>
            </div>
          </div>
        </div>
        <div
          v-if="message"
          class="mt-[24px] h-fit w-full rounded-lg border border-blue-500 bg-blue-50 py-[8px] pr-[12px] pl-[14px]"
        >
          <div class="flex">
            <jds-icon
              name="exclamation-mark-circle"
              class="mt-1 mr-[18px] h-[16px] w-[16px]"
              fill="#1565C0"
            />
            <div class="font-lato text-[14px]">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer-popup>
      <div v-if="isSuccess" class="flex justify-center">
        <div>
          <jds-button
            label="Saya mengerti"
            type="button"
            variant="primary"
            class="!text-[14px] !font-bold"
            @click="closeModal()"
          />
        </div>
      </div>
      <div v-else class="flex justify-end">
        <div class="mr-4">
          <jds-button
            label="Batal"
            type="button"
            variant="secondary"
            class="!text-[14px] !font-bold"
            @click="closeModal()"
          />
        </div>
        <jds-button
          label="Coba Lagi"
          type="button"
          variant="danger"
          class="!text-[14px] !font-bold"
          @click="handleRetryButton()"
        />
      </div>
    </template>
  </BaseCustomPopup>
</template>

<script>
export default {
  name: 'InformationPopup',
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    accountName: {
      type: String,
      default: '',
    },
    descriptionText: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    isSuccess: { type: Boolean, default: false },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    handleRetryButton() {
      this.$emit('retry')
    },
  },
}
</script>
