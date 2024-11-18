<template>
  <BaseDialogFrame :name="nameModal">
    <BaseDialogPanel class="w-[640px]">
      <BaseDialogHeader :title="title" />
      <ProgressStepper
        class="px-6 pt-4"
        :index-current-active="indexCurrentActive"
      />
      <slot name="form-complaint" />
      <BaseDialogFooter>
        <template #default>
          <div class="flex justify-between">
            <jds-button
              label="Batal"
              variant="tertiary"
              class="!font-bold !text-green-700"
              @click="$emit('close')"
            />
            <div class="flex">
              <div class="mr-3">
                <jds-button
                  v-show="indexCurrentActive !== 1"
                  label="Kembali"
                  variant="secondary"
                  class="!border-green-700 !font-bold !text-green-700"
                  @click="$emit('prev')"
                />
              </div>
              <jds-button
                :label="labelButton"
                variant="primary"
                @click="$emit('submit')"
              />
            </div>
          </div>
        </template>
      </BaseDialogFooter>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
import ProgressStepper from '~/components/Dialog/WithStepper/ProgressStepper'

export default {
  name: 'DialogWithStepper',
  components: { ProgressStepper },
  props: {
    nameModal: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    indexCurrentActive: {
      type: Number,
      default: 0,
    },
    labelButton: {
      type: String,
      default: '',
    },
  },
  methods: {
    submitButtonHandle() {
      this.$emit('submit')
    },
  },
}
</script>
