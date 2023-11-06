<template>
  <div class="form-input-text">
    <label class="mb-1 font-lato text-[15px] text-gray-800">{{ label }}</label>
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      class="h-[38px] w-full rounded-lg border border-gray-500 bg-gray-50 px-2 py-[11px] font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none"
      :class="{ 'form-input-text--error' : errorMessage }"
      v-bind="$attrs"
      @input="onInput"
    >
    <small class="text-red-600">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: 'BaseInputText',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>
  .form-input-text--error{
    @apply !border !border-red-600
  }
</style>
