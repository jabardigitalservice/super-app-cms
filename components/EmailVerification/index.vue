<template>
  <div class="flex flex-col items-center text-center">
    <img
      :src="`/icon/icon-aduan/${icon}.svg`"
      width="72"
      height="72"
      alt="icon"
      class="text-center"
    />
    <h1 class="mt-6 mb-2 font-roboto text-2xl font-bold">
      {{ title }}
    </h1>
    <p class="text-[14px] leading-[23px]" :class="{ 'mb-2': detailItem }">
      {{ description }}
    </p>
    <div
      v-if="detailItem"
      class="w-fit rounded-lg border border-[#EFF1F3] bg-[#F9FBFC] py-[10px] px-3 text-[14px]"
    >
      {{ detailItem }}
    </div>
    <a
      v-if="button.linkPage !== '#'"
      :href="button.linkPage"
      class="mt-10 w-full rounded-lg bg-green-700 px-4 py-[14px] font-lato text-[14px] leading-[18px] text-white"
      >{{ button.label }}
    </a>
    <jds-button
      v-else-if="button.label"
      :label="button.label"
      variant="primary"
      class="mt-10 !w-full !text-[14px]"
    />
  </div>
</template>

<script>
export default {
  name: 'VerificationEmail',
  props: {
    description: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    detailItem: {
      type: String,
      default: '',
    },
    button: {
      type: Object,
      default: () => ({
        label: '',
        linkPage: '#',
      }),
    },
  },
}
</script>
