<template>
  <div class="flex items-center justify-between">
    <div class="flex">
      <img
        :src="require(`~/assets/images/${getImageFileType()}`)"
        :alt="`file ${fileDocument.type}`"
        height="32"
        width="25"
        class="flex-shrink-0"
      >
      <span class="font-sans-2 ml-3">{{ fileDocument.name }}</span>
    </div>

    <jds-button
      variant="secondary"
      class="!w-[106px] !rounded-full !text-[14px] !font-bold"
    >
      <div class="flex items-center">
        <BaseIconSvg
          :icon="`/icon/default/download.svg`"
          :size="20"
          fill-color="#069550"
          class="mr-[10px] flex-shrink-0"
        />
        Unduh
      </div>
    </jds-button>
  </div>
</template>

<script>
export default {
  name: 'ListImage',
  props: {
    fileDocument: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getImageFileType () {
      if (this.fileDocument.type === 'pdf') {
        return 'file-pdf.svg'
      }

      if (this.fileDocument.type === 'doc' || this.fileDocument.type === 'docx') {
        return 'file-doc.svg'
      }

      if (this.fileDocument.type === 'xls' || this.fileDocument.type === 'xlsx') {
        return 'file-excel.svg'
      }
    }
  }
}
</script>

<style>
.list-document .jds-badge__indicator {
  @apply !h-[18px] !w-fit !bg-gray-100 !font-roboto !text-xs !font-semibold !text-gray-600;
}
</style>
