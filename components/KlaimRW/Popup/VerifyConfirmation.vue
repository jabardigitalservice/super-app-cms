<template>
  <BaseDialog
    title="Verifikasi Akun RW"
    :show-popup="showPopup"
    label-button="Ya, verifikasi akun RW ini"
    confirmation-type="verify"
    dialog-type="confirmation"
    @submit="$emit('submit')"
    @close="$emit('close')"
  >
    <div class="py-[16px] font-lato text-gray-800">
      <p class="text-[14px] text-gray-800 font-lato">
        Apakah Anda yakin ingin memverifikasi akun RW ini?
      </p>
      <div class="text-[16px] font-lato text-gray-800">
        <strong>{{ accountName }}</strong>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
export default {
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
