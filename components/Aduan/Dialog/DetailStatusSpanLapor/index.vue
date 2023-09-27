<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[600px]">
      <BaseDialogHeader title="Status Aduan SP4N Lapor" />
      <div class="pl-6 pr-4">
        <BaseDialogDescription
          description="No.Aduan"
          :sub-description="dataDialog.subDescription"
          class="mt-2 pb-3"
        />
        <div class="h-[412px] overflow-y-auto dialog-content mb-[25px]">
          <CardSpanLapor v-for="(itemSpanLapor,index) in listTrackingSpanLapor" :key="index" :data-span-lapor="itemSpanLapor" :is-last-index="index === listTrackingSpanLapor.length-1" />
        </div>
      </div>
      <BaseDialogFooter label-button="Tutup" :show-cancel-button="false" @close="$emit('close')" />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import CardSpanLapor from '~/components/Aduan/Dialog/DetailStatusSpanLapor/CardSpanLapor'
export default {
  name: 'DialogDetailStatusSpanLapor',
  components: { CardSpanLapor },
  props: {
    showPopup: {
      type: Boolean,
      default: true
    },
    listTrackingSpanLapor: {
      type: Array,
      default: () => ([])
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.dialog-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.dialog-content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.dialog-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
</style>
