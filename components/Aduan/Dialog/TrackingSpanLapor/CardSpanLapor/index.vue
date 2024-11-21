<template>
  <div
    class="rounded-t-lg border border-b-0 border-x-gray-300 last:rounded-b-lg last:!border-b last:border-b-gray-300"
  >
    <div class="flex h-11 items-center rounded-t-lg bg-[#F4F6F6] p-3">
      <jds-icon name="calendar-date-outline" size="sm" fill="#9E9E9E" />
      <p class="ml-2 font-roboto text-xs text-gray-800">
        {{ spanLapor.tracking_at }}
      </p>
    </div>
    <div class="p-3">
      <h1 class="text-sm font-medium text-gray-900">
        {{ spanLapor.tracking_by }}
      </h1>
      <h2 class="mt-2 text-sm text-gray-600">Keterangan</h2>
      <p class="mt-1 text-[14px] leading-[23px] text-gray-800">
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
