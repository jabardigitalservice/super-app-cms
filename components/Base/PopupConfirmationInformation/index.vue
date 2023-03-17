<template>
  <BaseDialog
    :title="title"
    :show-popup="showPopup"
    :label-button="labelButton"
    :dialog-type="dialogType"
    :confirmation-type="confirmationType"
    @submit="submitHandle"
    @close="$emit('close')"
  >
    <div class="pt-[16px] pb-10 font-lato text-gray-800">
      <div class="flex justify-start items-start">
        <jds-icon v-show="informationType==='success' && dialogType==='information'" name="check-mark-circle" class="w-[16px] h-[16px] mt-1 text-green-700" />
        <jds-icon v-show="informationType==='failed'" name="times-circle" class="w-[16px] h-[16px] mt-1 text-red-600" />
        <div class="ml-[13px]">
          <p class="text-[14px] text-gray-800 font-lato">
            {{ descriptionText }}
          </p>
          <div class="text-[16px] font-lato text-gray-800">
            <strong>{{ dataPopup }}</strong>
          </div>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
export default {
  name: 'ConfirmationInformationPopup',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    /* data popup used to get data which click popup.
    example: 'Asep Kumaha' got when clicked list which name 'Asep Kumaha'  */
    dataPopup: {
      type: String,
      default: ''
    },
    descriptionText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    dialogType: {
      type: String,
      default: ''
    },
    confirmationType: {
      type: String,
      default: ''
    },
    /**
     * to select the type of information to display : 'success' 'failed'
     */
    informationType: {
      type: String,
      default: 'success',
      validator (value) {
        return ['success', 'failed'].includes(value)
      }
    },
    labelButton: {
      type: String,
      default: ''
    }
  },
  methods: {
    submitHandle () {
      if (this.dialogType === 'information') {
        return this.$emit('close')
      }
      return this.$emit('submit')
    }
  }
}
</script>
