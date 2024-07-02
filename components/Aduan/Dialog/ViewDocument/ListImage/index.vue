<template>
  <div class="flex items-center justify-between">
    <jds-badge
      :value="`${listImage.length} Terlampir`"
      position="right"
      align="top"
      inline
      :dot="false"
      size="md"
      class="list-document"
    >
      <img
        src="~/assets/images/file-image.svg"
        alt="file image"
        height="32"
        width="25"
      >
      <span class="font-sans-2 ml-3">Gambar</span>
    </jds-badge>
    <div class="flex items-center">
      <div class="mr-3">
        <jds-button
          label="Lihat"
          variant="secondary"
          class="!w-[68px] !rounded-full !text-[14px] !font-bold"
          @click="isShowPopupViewImage = true"
        />
      </div>

      <jds-button
        variant="secondary"
        class="!w-[106px] !rounded-full !text-[14px] !font-bold"
        @click="downloadImage(listImage)"
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
    <DialogViewImage
      :list-photo="listImage"
      :show-popup="isShowPopupViewImage"
      @close="isShowPopupViewImage = false"
    />
  </div>
</template>

<script>
import axios from 'axios'
import JSZip from 'jszip'
import DialogViewImage from '~/components/Aduan/DialogViewImage'
import { formatDate } from '~/utils'
export default {
  name: 'ListImage',
  components: { DialogViewImage },
  props: {
    listImage: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      isShowPopupViewImage: false
    }
  },
  methods: {
    async downloadImage (imageArray) {
      const zip = new JSZip()

      const downloadPromises = imageArray.map(async (image) => {
        try {
          const response = await axios.get(image.url, { responseType: 'blob' })
          // menyimpan file gambar dengan nama file
          zip.file(image.name, response.data)
        } catch (error) {
          console.error(error)
        }
      })

      await Promise.all(downloadPromises)
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(zipBlob)
      link.download = `Dokumen Bukti Aduan ${formatDate(
        new Date(),
        'dd/MM/yyyy HH:mm'
      )}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style>
.list-document .jds-badge__indicator {
  @apply !w-fit !bg-gray-100 px-[5px] !text-gray-600;
}

.list-document .jds-badge__indicator span {
  @apply !font-roboto !text-xs !font-medium !leading-[18px];
}
</style>
