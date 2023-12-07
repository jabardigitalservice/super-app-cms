<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="`Narasi IKP (${dataIkp.ikp_code})`" />
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
  }
}
</script>
