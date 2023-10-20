<template>
  <div
    class="bg-gray-50 px-6 py-4 rounded-b-lg"
  >
    <slot>
      <div class="flex justify-end" :class="{'justify-center':showCancelButton===false}">
        <div class="mr-4">
          <jds-button v-show="showCancelButton" :label="labelButtonCancel" variant="secondary" class="!text-[14px] !font-bold" @click="$emit('close')" />
        </div>
        <div>
          <jds-button :label="labelButtonSubmit" :variant="variant" class="!text-[14px] !font-bold" @click="submitButtonHandle()" />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'BaseDialogFooter',
  props: {
    labelButtonSubmit: {
      type: String,
      default: ''
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    labelButtonCancel: {
      type: String,
      default: 'Batalkan'
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
