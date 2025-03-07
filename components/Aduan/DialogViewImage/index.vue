<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="dialog-image max-h-[720px] w-[1240px]">
      <BaseDialogHeader class="flex justify-between py-2 pl-6 pr-2">
        <h1 class="h-[34px] font-roboto text-[21px] font-bold text-green-800">
          Bukti Foto
        </h1>
        <button class="p-2" @click="$emit('close')">
          <BaseIconSvg
            icon="/icon/default/cross.svg"
            class="!h-6 !w-6"
            fill-color="#212121"
          />
        </button>
      </BaseDialogHeader>
      <swiper
        :slides-per-view="3"
        :space-between="16"
        :centered-slides="true"
        observer
        observe-parents
        class="ma-h-[584px] !px-[43px] !py-[26px]"
        @swiper="getSwipperRefHandle"
      >
        <swiper-slide
          v-for="(item, index) in listPhoto"
          :key="index"
          class="max-h-[532px]"
        >
          <img
            :src="item.url"
            alt="photo"
            class="max-h-[520px] w-full rounded-[4px] object-contain"
            :class="{ 'opacity-20': index !== swiperRef?.activeIndex }"
          />
        </swiper-slide>
      </swiper>
      <footer class="flex items-center justify-center pt-7 pb-5">
        <div class="mr-3">
          <jds-button
            class="!rounded-full !bg-green-600"
            @click="swipperImageHandle('prev')"
          >
            <jds-icon name="chevron-left" size="xs" fill="#FFFFFF" />
          </jds-button>
        </div>
        <div class="mr-3">
          <jds-button
            variant="secondary"
            class="!rounded-full !border-2 !border-gray-200 !bg-white"
            @click="downloadImage()"
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
        <div>
          <jds-button
            class="!rounded-full !bg-green-600"
            @click="swipperImageHandle('next')"
          >
            <jds-icon name="chevron-right" size="xs" fill="#FFFFFF" />
          </jds-button>
        </div>
      </footer>
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
// import axios from 'axios'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay])
export default {
  name: 'PopupViewImage',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    listPhoto: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperRef: null,
      isShowPopupInformation: false,
    }
  },
  methods: {
    getSwipperRefHandle(swiper) {
      this.swiperRef = swiper
    },
    swipperImageHandle(pathButton) {
      if (this.swiperRef?.activeIndex < this.listPhoto.length) {
        if (pathButton === 'next') {
          this.swiperRef.slideTo(this.swiperRef?.activeIndex + 1)
        } else {
          this.swiperRef.slideTo(this.swiperRef?.activeIndex - 1)
        }
      }
    },
    downloadImage() {
      if (this.swiperRef) {
        const activeIndex = this.swiperRef.activeIndex
        const activeItem = this.listPhoto[activeIndex]
        const imageUrl = activeItem.url
        const splitUrl = imageUrl.split('/')
        const imageName = splitUrl[splitUrl.length - 1]
        const downloadLink = document.createElement('a')
        downloadLink.href = imageUrl
        downloadLink.target = '_blank'
        // Memberikan nama file untuk didownload
        downloadLink.download = imageName
        downloadLink.click()
      }
    },
    // TODO: integration with url Fix from API
    // async downloadImageHandle () {
    //   if (this.swiperRef) {
    //     const activeIndex = this.swiperRef.activeIndex
    //     const activeItem = this.listPhoto[activeIndex]

    //     try {
    //       const imageUrl = activeItem.url
    //       const splitUrl = imageUrl.split('/')
    //       const imageName = splitUrl[splitUrl.length - 1]
    //       const response = await axios.get(imageUrl, { responseType: 'blob' })
    //       const link = document.createElement('a')
    //       link.href = window.URL.createObjectURL(new Blob([response.data]))
    //       link.download = imageName
    //       document.body.appendChild(link)
    //       link.click()
    //       document.body.removeChild(link)
    //     } catch (error) {
    //       console.error('Gagal mendownload gambar', error)
    //     }
    //   }
    // }
  },
}
</script>

<style>
.swiper-wrapper {
  max-height: 532px;
}

@media (max-height: 720px) {
  .dialog-image {
    @apply max-h-full;
  }

  .swiper-container {
    @apply !p-4;
  }

  .swiper-wrapper {
    @apply max-h-[300px];
  }

  .swiper-slide {
    @apply max-h-[300px];
  }

  img {
    @apply !max-h-[250px];
  }
}
</style>
