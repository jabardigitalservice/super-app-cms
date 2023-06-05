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
            <label class="font-lato text-[15px] text-gray-800 mb-1" :class="{'before:content-[\'*\'] before:mr-0.5 before:text-red-500':required}" v-html="labelInput" />
            <input
              :type="inputType"
              :placeholder="placeholder"
              class="h-[38px] w-full rounded-lg border border-gray-500 bg-gray-50 px-2 py-[11px] font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none"
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
