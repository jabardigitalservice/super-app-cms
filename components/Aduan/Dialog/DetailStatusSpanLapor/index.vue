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
        <div class="h-[412px] mb-[25px] overflow-y-auto dialog-content border border-gray-300 rounded-lg">
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
  display: none;
}

.dialog-content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>
