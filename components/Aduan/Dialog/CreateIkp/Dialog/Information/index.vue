<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[600px]">
      <BaseDialogHeader title="Buat IKP Baru" />
      <div
        class="py-4 px-6"
        :class="{ '!pb-10': Object.keys(dataIkp).length === 0 }"
      >
        <BaseInformation :icon-popup="icon" :data-dialog="dataDialog" />
        <div v-if="Object.keys(dataIkp).length > 0" class="pl-[30px] pt-4">
          <label class="mb-1 text-sm"> ID IKP </label>
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
            <small class="text-blue-gray-500 text-xs font-semibold">{{ copiedInfoMessage }}</small>
          </div>
          <label class="mb-1 text-sm">Narasi IKP</label>
          <p class="text-sm">
            {{ dataIkp.narrative }}
          </p>
        </div>
      </div>
      <BaseDialogFooter
        :show-cancel-button="dataDialog.showCancelButton"
        :label-button-submit="dataDialog.labelButtonSubmit"
        @close="$emit('close')"
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
      default: false
    },
    dataIkp: {
      type: Object,
      default: () => ({})
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    },
    icon: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      copiedInfoMessage: ''
    }
  },
  methods: {
    async copyIkpCode () {
      try {
        await navigator.clipboard.writeText(this.dataIkp.ikp_code)
        this.copiedInfoMessage = 'Kode IKP berhasil disalin!'
      } catch {
        this.copiedInfoMessage = 'Kode IKP gagal disalin!'
      }
    }
  }
}
</script>
