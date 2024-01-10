<template>
  <BaseDialogFrame :name="nameModals">
    <BaseDialogPanel>
      <BaseDialogHeader :title="'asdsa'" />
      <BaseDialogDescription
        :description="'sdas'"
        :sub-description="'dsas'"
        class="p-6"
      />
      <!-- <BaseDialogFooter :label-button-submit="dataDialog.labelButtonSubmit" :label-button-cancel="dataDialog.labelButtonCancel" @close="$emit('close')" @submit="$emit('submit',dataDialog)" /> -->
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>

export default {
  name: 'DialogConfirmationReusable',
  props: {
    nameModals: { type: String, required: true }
  }

}
</script>
