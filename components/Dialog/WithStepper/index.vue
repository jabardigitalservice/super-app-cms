<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[640px]">
      <BaseDialogHeader :title="title" />
      <ProgressStepper class="pt-4 px-6" :index-current-active="indexCurrentActive" />
      <slot name="form-complaint" />
      <BaseDialogFooter>
        <template #default>
          <div class="flex justify-between">
            <jds-button label="Batal" variant="tertiary" class="!font-bold !text-green-700" @click="$emit('close')" />
            <div class="flex">
              <div class="mr-3">
                <jds-button label="Kembali" variant="secondary" class="!font-bold !border-green-700 !text-green-700" @click="$emit('prev')" />
              </div>
              <jds-button :label="labelButton" variant="primary" @click="$emit('submit')" />
            </div>
          </div>
        </template>
      </BaseDialogFooter>
    </basedialogpanel>
  </basedialog>
</template>

<script>
import ProgressStepper from '~/components/Dialog/WithStepper/ProgressStepper'

export default {
  name: 'DialogWithStepper',
  components: { ProgressStepper },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    indexCurrentActive: {
      type: Number,
      default: 0
    },
    labelButton: {
      type: String,
      default: ''
    }
  },
  methods: {
    submitButtonHandle () {
      this.$emit('submit')
    }
  }
}
</script>
