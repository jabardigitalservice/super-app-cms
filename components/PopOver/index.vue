<template>
  <div
    class="flex h-fit w-[460px] flex-col items-center rounded-lg border border-[#EAEAEF] bg-white p-10 drop-shadow-md"
  >
    <img
      :src="require(`~/assets/icon/${icon.fileName}`)"
      :alt="icon.name"
      :width="icon.size"
      :height="icon.size"
    />
    <h1 class="mt-6 font-roboto text-2xl font-bold">{{ title }}</h1>
    <p class="mt-2 text-center text-sm">
      {{ description }} <strong>{{ detailItem }}</strong>
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Object,
      default: () => ({
        name: '',
        fileName: '',
        size: '0',
      }),
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    detailItem: {
      type: String,
      default: '',
    },
  },
}
</script>
