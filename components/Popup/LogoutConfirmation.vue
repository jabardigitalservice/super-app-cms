<template>
  <BaseDialog
    title="Keluar Web Admin"
    :is-logout-dialog="true"
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
import BaseDialog from '~/components/Popup/BaseDialog.vue'

export default {
  components: {
    BaseDialog
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>
