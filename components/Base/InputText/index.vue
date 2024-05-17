<template>
  <div class="form-input-text">
    <div class="pb-1">
      <label class="font-lato text-[15px] text-gray-800">{{ label }}</label>
    </div>

    <div class="flex" :class="{ 'form-input-text--error': errorMessage }">
      <slot name="icon-left" />
      <input
        :value="value"
        class="h-[38px] w-full rounded-lg border border-gray-500 bg-gray-50 px-2 py-[11px] font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none"
        :class="{ 'form-input-text--error': errorMessage }"
        v-bind="$attrs"
        @input="onInput"
      />
      <slot name="icon-right" />
    </div>
    <small class="text-red-600">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: 'BaseInputText',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style scoped>
.form-input-text--error {
  @apply rounded-lg !border !border-red-600;
}
</style>
