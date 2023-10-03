<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[600px]">
      <BaseDialogHeader title="Status Aduan SP4N Lapor" />
      <div v-if="isLoading">
        <div class="flex flex-col items-center justify-center h-[300px]">
          <jds-spinner class="mb-4" size="56" />
          <p class="text-green-700 text-2xl font-lato font-bold">
            Loading....
          </p>
        </div>
      </div>
      <div v-else-if="listTrackingSpanLapor.length>0" class="pl-6 pr-4">
        <BaseDialogDescription
          description="No.Aduan"
          :sub-description="dataDialog.subDescription"
          class="mt-2 pb-3"
        />
        <div class="max-h-[412px] mb-[25px] overflow-y-auto dialog-content border border-gray-300 rounded-lg">
          <CardSpanLapor v-for="(itemSpanLapor,index) in listTrackingSpanLapor" :key="index" :data-span-lapor="itemSpanLapor" />
        </div>
      </div>
      <div v-else class="p-6">
        <p>No data available</p>
      </div>
      <BaseDialogFooter label-button="Tutup" :show-cancel-button="false" @close="$emit('close')" />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import CardSpanLapor from '~/components/Aduan/Dialog/TrackingSpanLapor/CardSpanLapor'
export default {
  name: 'DialogDetailStatusSpanLapor',
  components: { CardSpanLapor },
  props: {
    showPopup: {
      type: Boolean,
      default: true
    },
    idApi: {
      type: String,
      default: ''
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      listTrackingSpanLapor: [],
      isLoading: false
    }
  },
  async fetch () {
    this.isLoading = true
    try {
      const response = await this.$axios.get(`/warga/complaints/${this.$route.params.id}/tracking-sp4n`)
      const dataTrackingSpan = response.data.data
      this.listTrackingSpanLapor = dataTrackingSpan
    } catch {
      this.listTrackingSpanLapor = []
    } finally {
      this.isLoading = false
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
