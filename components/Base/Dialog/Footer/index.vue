<template>
  <div
    class="bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg"
    :class="{'justify-center':showCancelButton===false}"
  >
    <div class="mr-4">
      <jds-button v-show="showCancelButton" label="Batalkan" variant="secondary" class="!text-[14px] !font-bold" @click="$emit('close')" />
    </div>
    <div>
      <jds-button :label="labelButton" :variant="variant" class="!text-[14px] !font-bold" @click="submitButtonHandle()" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDialogFooter',
  props: {
    labelButton: {
      type: String,
      default: ''
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    submitButtonHandle () {
      if (!this.showCancelButton) {
        this.$emit('close')
      } else {
        this.$emit('submit')
      }
    }
  }
}
</script>
