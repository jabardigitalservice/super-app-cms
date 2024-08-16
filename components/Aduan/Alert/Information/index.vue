<template>
  <div class="flex items-start">
    <BaseIconSvg
      icon="/icon/default/Info-icon.svg"
      class="!h-[20px] !w-[20px] flex-shrink-0"
      fill-color="#1E88E5"
    />
    <p class="ml-2 text-sm">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AlertInformation',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
