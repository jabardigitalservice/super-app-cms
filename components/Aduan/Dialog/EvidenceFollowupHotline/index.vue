<template>
  <BaseDialogFrame name="evidenceFollowupHotline" @close="handleCancelButton()">
    <BaseDialogPanel class="w-[520px]">
      <BaseDialogHeader title="Upload Bukti Tindaklanjut" />
      <div class="px-6">
        <BaseDragAndDropFile
          ref="BaseDragAndDropFile"
          height-drag-and-drop="h-[226px]"
          :detail-drag-and-drop="detailDragAndDrop"
        />
      </div>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
export default {
  data() {
    return {
      detailDragAndDrop: {
        informationSizeCompatible:
          'Ukuran file dokumen SK tidak boleh melebihi 2 MB.',
        informationFormatCompatible:
          'Hanya file yang berformat JPG/JPEG/PNG yang dapat diupload.',
        formatTypeFile: ['image/jpeg', 'image/png', 'image/jpg'],
        maxSizeFile: 2097152,
        acceptFile: '.jpg,.jpeg,.png',
      },
    }
  },
}
</script>
