<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[510px]">
      <BaseDialogHeader title="Buat IKP Baru" />
      <div class="pb-4 pt-2 px-6">
        <jds-section-message
          show
          variant="warning"
          :dismissible="false"
          message="Pastikan data yang diisi telah sesuai dan benar"
          class="!h-[55px] !p-4"
        />
        <BaseDialogDescription description="Apakah Anda yakin ingin membuat IKP baru? " class="mt-3" />
      </div>

      <BaseDialogFooter
        :show-cancel-button="true"
        label-button-submit="Lanjutkan"
        label-button-cancel="Kembali"
        @submit="$emit('submit')"
        @close="$emit('back')"
      />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
export default {
  name: 'DialogConfirmation',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>
