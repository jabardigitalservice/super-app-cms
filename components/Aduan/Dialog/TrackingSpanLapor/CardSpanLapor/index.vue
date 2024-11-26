<template>
  <div
    class="border border-b-0 border-x-gray-300 last:rounded-b-lg last:!border-b last:border-b-gray-300"
  >
    <div class="flex h-11 items-center bg-[#F4F6F6] p-3">
      <jds-icon name="calendar-date-outline" size="sm" fill="#9E9E9E" />
      <p class="ml-2 font-roboto text-[12px] leading-5 text-gray-800">
        {{ spanLapor.tracking_at }}
      </p>
    </div>
    <div class="min-h-[128px] p-3">
      <h1
        class="text-shadow font-lato text-[14px] font-medium leading-[23px] !text-gray-900"
      >
        {{ spanLapor.tracking_by }}
      </h1>
      <h2 class="mt-3 h-[23px] text-sm text-gray-600">Keterangan</h2>
      <p class="mt-1 text-[14px] font-normal leading-[23px] text-gray-800">
        {{ spanLapor.tracking_note }}
      </p>
    </div>
  </div>
</template>

<script>
import { formatDate } from '~/utils'
export default {
  name: 'CardSpanLapor',
  props: {
    dataSpanLapor: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    spanLapor() {
      return {
        ...this.dataSpanLapor,
        tracking_at: formatDate(
          this.dataSpanLapor?.tracking_at || '',
          'dd MMMM yyyy'
        ),
      }
    },
  },
}
</script>

<style scoped>
.text-shadow {
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
}
</style>
