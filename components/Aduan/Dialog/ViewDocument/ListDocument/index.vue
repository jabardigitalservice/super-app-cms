<template>
  <div class="flex items-center justify-between">
    <div class="flex">
      <img
        :src="require(`~/assets/images/${getImageFileType()}`)"
        :alt="`file ${fileDocument.type}`"
        height="32"
        width="25"
        class="flex-shrink-0"
      />
      <span class="font-sans-2 ml-3">{{ fileDocument.name }}</span>
    </div>

    <jds-button
      variant="secondary"
      class="!w-[106px] !rounded-full !text-[14px] !font-bold"
      @click="downloadFile(fileDocument.url, fileDocument.type)"
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
      default: () => ({}),
    },
  },
  methods: {
    getImageFileType() {
      switch (this.fileDocument.type) {
        case 'pdf':
          return 'file-pdf.svg'
        case 'doc':
        case 'docx':
          return 'file-doc.svg'
        case 'xls':
        case 'xlsx':
          return 'file-excel.svg'
        case 'ppt':
        case 'pptx':
          return 'file-ppt.svg'
        default:
          return ''
      }
    },
    downloadFile(url, typeFile) {
      if (typeFile === 'pdf') {
        window.open(url, '_blank')
      } else {
        window.location.href = url
      }
    },
  },
}
</script>

<style>
.list-document .jds-badge__indicator {
  @apply !h-[18px] !w-fit !bg-gray-100 !font-roboto !text-xs !font-semibold !text-gray-600;
}
</style>
