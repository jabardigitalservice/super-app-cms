<template>
  <div
    class="flex h-[calc(100vh-72px-52px)] w-full flex-col items-center justify-center"
  >
    <img
      width="363"
      height="229"
      src="~/assets/images/maintenance.svg"
      alt="Image Maintenance Sapawarga"
    >
    <span
      class="mt-8 mb-2 font-serif text-[21px] font-bold leading-[34px] text-green-700"
    >
      {{ title }}
    </span>
    <span
      class="w-[317px] text-center text-sm leading-[23px] text-blue-gray-800"
    >
      {{ description }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ComponentMaintenance',
  props: {
    title: {
      type: String,
      default: 'Oops, fitur ini sedang dalam tahap pengembangan'
    },
    description: {
      type: String,
      default:
        'Silakan menuju halaman lain untuk memanfaatkan fitur di CMS Sapawarga.'
    }
  }
}
</script>
