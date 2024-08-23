<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[600px]">
      <BaseDialogHeader title="Buat Instruksi Aduan Baru" />
      <div
        class="py-4 px-6"
        :class="{ '!pb-10': Object.keys(dataIkp).length === 0 }"
      >
        <BaseInformation :icon-popup="icon" :data-dialog="dataDialog" />
        <div v-if="Object.keys(dataIkp).length > 0" class="pl-[30px] pt-4">
          <label class="mb-1 text-sm"> ID Instruksi </label>
          <div class="mb-[13.5px] flex items-center">
            <p class="text-sm font-bold text-gray-900">
              {{ dataIkp.ikp_code }}
            </p>
            <button
              id="btn-copy"
              class="flex items-end px-1 py-[3px] text-sm font-bold text-green-700"
              @click="copyIkpCode()"
            >
              <BaseIconSvg
                icon="/icon/default/copy-file-icon.svg"
                :size="20"
                fill-color="#16A75C"
                class="ml-3 mr-1 flex-shrink-0"
              />
              Salin
            </button>
            <small class="text-xs font-semibold text-blue-gray-500">{{
              copiedInfoMessage
            }}</small>
          </div>
          <label class="mb-1 text-sm">Narasi Instruksi</label>
          <p class="text-sm">
            {{ dataIkp.narrative }}
          </p>
        </div>
      </div>
      <BaseDialogFooter
        :show-cancel-button="dataDialog.showCancelButton"
        :label-button-submit="dataDialog.labelButtonSubmit"
        @close="closePopup()"
        @submit="$emit('submit')"
      />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
export default {
  name: 'DialogInformation',
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    dataIkp: {
      type: Object,
      default: () => ({}),
    },
    dataDialog: {
      type: Object,
      default: () => ({}),
    },
    icon: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      copiedInfoMessage: '',
    }
  },
  mounted() {},
  methods: {
    async copyIkpCode() {
      this.copiedInfoMessage = ''
      try {
        await navigator.clipboard.writeText(this.dataIkp.ikp_code)
        this.copiedInfoMessage = 'ID Instruksi berhasil disalin!'
      } catch {
        this.copiedInfoMessage = 'ID Instruksi gagal disalin!'
      }
    },
    closePopup() {
      this.$emit('close')
      this.copiedInfoMessage = ''
    },
  },
}
</script>
