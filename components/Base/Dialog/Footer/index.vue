<template>
  <div class="rounded-b-lg bg-gray-50 px-6 py-4">
    <slot>
      <div
        class="flex justify-end"
        :class="{ 'justify-center': showCancelButton === false }"
      >
        <div class="mr-4">
          <jds-button
            v-show="showCancelButton"
            :data-cy="dataCy?.buttonCancel"
            :label="labelButtonCancel"
            type="button"
            variant="secondary"
            class="!text-[14px] !font-bold"
            :disabled="isDisabledButtonCancel"
            @click.prevent="$emit('close')"
          />
        </div>
        <div>
          <jds-button
            :data-cy="dataCy?.buttonSubmit"
            :label="labelButtonSubmit"
            type="button"
            :variant="variant"
            :disabled="isDisabledButtonSubmit"
            @click.prevent="submitButtonHandle"
          />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'BaseDialogFooter',
  props: {
    dataCy: {
      type: Object,
      default: () => ({}),
    },
    labelButtonSubmit: {
      type: String,
      default: '',
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    labelButtonCancel: {
      type: String,
      default: 'Batalkan',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    isDisabledButtonSubmit: {
      type: Boolean,
      default: false,
    },
    isDisabledButtonCancel: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitButtonHandle() {
      if (!this.showCancelButton) {
        this.$emit('close')
      } else {
        this.$emit('submit')
      }
    },
  },
}
</script>

<style scoped>
.jds-button::v-deep {
  @apply !text-[14px] !font-bold disabled:pointer-events-none disabled:!bg-neutral-300 disabled:!text-neutral-500;
}
</style>
