<template>
  <div class="h-fit rounded-lg border border-blue-800 bg-blue-50 p-4">
    <div class="flex items-start">
      <BaseIconSvg
        :icon="icon.path"
        :size="20"
        class="flex-shrink-0"
        :fill-color="icon.fill"
      />
      <p class="ml-3 font-lato text-sm">
        {{ message }}
      </p>
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
    icon: {
      type: Object,
      default: () => ({
        path: '/icon/default/Info-icon.svg',
        fill: '#1E88E5',
      }),
    },
  },
}
</script>
