<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[510px]">
      <BaseDialogHeader :title="showTitleIkpNarrative()" />
      <p class="p-6">
        {{ dataIkp.narrative }}
      </p>
      <BaseDialogFooter :show-cancel-button="false" label-button-submit="Tutup" @close="$emit('close')" />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>

export default {
  name: 'DialogIkpNarrative',
  props: {
    showPopup: {
      type: Object,
      default: () => ({})
    },
    dataIkp: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    showTitleIkpNarrative () {
      if (this.dataIkp?.code) {
        return `Narasi IKP (${this.dataIkp.code})`
      }
      return 'Narasi IKP'
    }
  }
}
</script>
