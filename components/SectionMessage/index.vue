<template>
  <div
    class="section-message h-fit rounded-lg border border-blue-800 bg-blue-50 p-4"
  >
    <div class="flex items-start justify-between">
      <div class="flex">
        <BaseIconSvg
          :icon="icon.path"
          :size="icon.size"
          class="flex-shrink-0"
          :fill-color="icon.fill"
        />
        <div class="description ml-3">
          <p class="font-lato text-sm">
            {{ message }}
          </p>
          <strong v-if="detailItem" class="text-sm">{{ detailItem }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionMessage',
  props: {
    message: {
      type: String,
      default: '',
    },
    detailItem: {
      type: String,
      default: '',
    },
    icon: {
      type: Object,
      default: () => ({
        path: '/icon/default/Info-icon.svg',
        size: 20,
        fill: '#1E88E5',
      }),
    },
  },
}
</script>
