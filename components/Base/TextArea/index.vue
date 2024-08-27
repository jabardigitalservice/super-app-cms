<template>
  <div class="form-text-area">
    <label :for="name">{{ label }}</label>
    <p class="my-1 text-[13px] text-gray-700">{{ helperText }}</p>
    <div
      class="input-wrapper mt-1 h-[100px] rounded-lg border border-gray-400 bg-gray-50 py-2 px-[14px]"
      :class="{ 'mb-[2px] !border-red-600': errorMessage }"
    >
      <textarea
        :value="value"
        class="h-full w-full resize-none bg-transparent font-lato placeholder:text-sm placeholder:text-gray-600 focus:outline-none"
        v-bind="$attrs"
        @input="onInput"
      />
    </div>
    <small class="text-red-600">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  name: 'BaseTextArea',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    helperText: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      mValue: '',
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
