<template>
  <div
    class="mb-4 flex items-center rounded-lg border border-gray-400 py-2 px-2"
  >
    <BaseIconSvg
      icon="/icon/default/info-icon.svg"
      class="!h-[20px] !w-[20px]"
      fill-color="#1E88E5"
    />
    <p class="ml-2 text-sm">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>
