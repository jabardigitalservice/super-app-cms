<template>
  <BaseDialog
    :title="title"
    :show-popup="showPopup"
    :label-button="labelButton"
    :confirmation-type="confirmationType"
    dialog-type="confirmation"
    @submit="$emit('submit')"
    @close="$emit('close')"
  >
    <div class="pt-[16px] pb-[60px] font-lato text-gray-800">
      <p class="text-[14px] text-gray-800 font-lato">
        {{ descriptionText }}
      </p>
      <div class="text-[16px] font-lato text-gray-800">
        <strong>{{ dataPopup }}</strong>
      </div>
    </div>
  </BaseDialog>
</template>

<script>

export default {
  name: 'ConfirmationPopup',
  props: {
    title: {
      type: String,
      default: ''
    },
    labelButton: {
      type: String,
      default: ''
    },
    /* description text used to confirmation before user doing action
    example : 'Apakah Anda yakin ingin menghapus pesan ini?' */
    descriptionText: {
      type: String,
      default: ''
    },
    /* data popup used to get data which click popup.
    example: 'Asep Kumaha' got when clicked list which name 'Asep Kumaha'  */
    dataPopup: {
      type: String,
      default: ''
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    confirmationType: {
      type: String,
      default: ''
    }
  }
}
</script>
