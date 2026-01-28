<template>
  <BaseCustomPopup title="Verifikasi Akun RT" :show-popup="showPopup">
    <template #body-popup>
      <div class="py-[16px] font-lato text-gray-800 px-6">
        <p class="text-[14px] text-gray-800 font-lato">
          Apakah Anda yakin ingin memverifikasi akun RT ini?
        </p>
        <div class="text-[16px] font-lato text-gray-800 mt-2">
          <strong>{{ accountName }}</strong>
        </div>
      </div>
    </template>
    <template #footer-popup>
      <div class="flex justify-end gap-4">
        <jds-button
          label="Batalkan"
          variant="secondary"
          class="!text-sm !font-lato !font-bold !border-green-700 !text-green-700"
          @click="$emit('close')"
        />
        <jds-button
          label="Ya, verifikasi akun RT ini"
          variant="primary"
          class="!text-sm !font-lato !font-bold !bg-green-700"
          @click="$emit('submit')"
        />
      </div>
    </template>
  </BaseCustomPopup>
</template>

<script>
export default {
  name: 'VerifyConfirmationRT',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    accountName: {
      type: String,
      default: ''
    }
  }
}
</script>
