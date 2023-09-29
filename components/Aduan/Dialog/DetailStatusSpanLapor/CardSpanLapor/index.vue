<template>
  <div class="border border-b-0 border-x-gray-300 rounded-t-lg last:!border-b last:border-b-gray-300 last:rounded-b-lg">
    <div class="bg-[#F4F6F6] h-11 rounded-t-lg flex items-center p-3">
      <jds-icon name="calendar-date-outline" size="sm" fill="#9E9E9E" />
      <p class="text-gray-800 text-xs font-roboto ml-2">
        {{ dataSpanLapor.dateSpanLapor }}
      </p>
    </div>
    <div class="p-3">
      <h1 class="text-sm text-gray-900 font-medium">
        {{ dataSpanLapor.deliverSpanLapor }}
      </h1>
      <h2 class="text-gray-600 mt-2 text-sm">
        Keterangan
      </h2>
      <p class="text-[14px] leading-[23px] text-gray-800 mt-1">
        {{ dataSpanLapor.notes }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSpanLapor',
  props: {
    dataSpanLapor: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
