<template>
  <div class="form-text-area">
    <label :for="name">{{ label }}</label>
    <div class="mt-1 input-wrapper h-[100px] bg-gray-50 rounded-lg border border-gray-400 py-2 px-[14px]" :class="{'mb-[2px] !border-red-600':errorMessage}">
      <textarea
        :value="value"
        class="h-full w-full bg-transparent resize-none font-lato placeholder:text-sm placeholder:text-gray-600 focus:outline-none"

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
    event: 'input'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mValue: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
