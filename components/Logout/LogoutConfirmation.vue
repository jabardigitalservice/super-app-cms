<template>
  <BaseCustomPopup title="Keluar Web Admin" :show-popup="showPopup" class="text-center">
    <template #body-popup>
      <div class="mt-6 px-6">
        <p class="text-[14px] text-gray-800 text-center pb-[24px]">
          Apakah Anda yakin akan keluar dari Web Admin Sapawarga?
        </p>
      </div>
    </template>
    <template #footer-popup>
      <div class="h-fit flex justify-center bg-gray-50">
        <div class="mr-[16px]">
          <jds-button label="Batal" variant="secondary" class="!text-sm !font-lato !font-bold" @click="$emit('close')" />
        </div>
        <jds-button label="Ya, saya yakin" variant="primary" class="!text-sm !font-lato !font-bold" @click="$emit('logout')" />
      </div>
    </template>
  </BaseCustomPopup>
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
