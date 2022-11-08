<template>
  <BaseDialog
    title="Keluar Web Admin"
    confirmation-type="logout"
    dialog-type="confirmation"
    :show-popup="showPopup"
    label-button="Ya, saya yakin"
    @submit="$emit('logout')"
    @close="$emit('close')"
  >
    <p class="text-[14px] text-gray-800 text-center py-[24px]">
      Apakah Anda yakin akan keluar dari Web Admin Sapawarga?
    </p>
  </BaseDialog>
</template>

<script>

export default {
  name: 'LogoutConfirmation',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>
