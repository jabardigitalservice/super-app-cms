<template>
  <BaseCustomPopup v-show="showPopup" :title="title">
    <template #body-popup>
      <div class="px-6 mt-4">
        <p class="text-sm">
          Nama
        </p>
        <p class="text-base font-bold">
          {{ accountName }}
        </p>
        <div class="my-4">
          <form class="global-form">
            <label class="global-form__label" :class="{'global-form__label-required':required}" v-html="labelInput" />
            <input
              :type="inputType"
              :placeholder="placeholder"
              :class="{ '!border !border-red-600': errorMessage!=='' }"
            >
            <small class="text-red-600">{{ errorMessage }}</small>
          </form>
        </div>
      </div>
    </template>
    <template #footer-popup>
      <div class="flex justify-end">
        <div class="mr-[16px]">
          <jds-button label="Batal" variant="secondary" class="!text-sm !font-lato !font-bold" @click="$emit('close')" />
        </div>
        <jds-button label="Simpan" variant="primary" class="!text-sm !font-lato !font-bold" @click="$emit('submit')" />
      </div>
    </template>
  </BaseCustomPopup>
</template>

<script>

export default {
  name: 'PopupInputText',
  props: {
    accountName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    labelInput: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      errorMessage: 'aaaaaa'
    }
  }
}
</script>
