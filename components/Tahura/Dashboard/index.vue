<template>
  <div class="flex h-fit w-full items-center rounded-lg bg-green-600 p-[2px]">
    <div class="w-full rounded-lg bg-white">
      <!-- <tableau-viz id="tableauViz" :src="$config.linkTableu" /> -->
      <TableauViz :src="$config.linkTableu" />
    </div>
  </div>
</template>

<script>
import { TableauViz } from 'vue-tableau'
export default {
  name: 'DashboardTahura',
  components: {
    TableauViz
  }
}
</script>
