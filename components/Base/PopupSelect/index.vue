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
          <form class="py-4 select__form" :class="{'mb-4':errorMessage!==''}">
            <label class="text-[15px] text-gray-800 mb-1" :class="{'before:content-[\'*\'] before:mr-0.5 before:text-red-500':required}" v-html="labelInput" />
            <jds-select
              :placeholder="placeholder"
              :options="options"
              class="mt-1 !w-full"
              :error-message="errorMessage"
            />
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
  name: 'PopupInputSelect',
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
    },
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
  .select__form .jds-select,
  .select__form .jds-input-text{
    width: 462px !important;
  }

  .select__form .jds-options__option-list-item--selected{
    display: none !important;
  }
</style>
