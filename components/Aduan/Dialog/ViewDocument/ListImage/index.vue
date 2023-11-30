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
        @click="goToBackHandle()"
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
import DialogViewImage from '~/components/Aduan/DialogViewImage'
export default {
  name: 'ListImage',
  components: { DialogViewImage },
  props: {
    listImage: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isShowPopupViewImage: false
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
