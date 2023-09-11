<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[1240px] px-10">
      <BaseDialogHeader title="Bukti Foto" />
      <swiper
        :slides-per-view="3"
        :space-between="16"
        :centered-slides="true"
        observer
        observe-parents
        class="!pt-[50px]"
        @swiper="getSwipperRefHandle"
      >
        <swiper-slide v-for="(item,index) in listPhoto" :key="index" class="!h-[520px]">
          <img
            :src="item.url"
            alt="photo"
            class="w-full h-full rounded-[4px]"
            :class="{'opacity-20':index!==swiperRef?.activeIndex}"
            @click="downloadImageHandle(item.url)"
          >
        </swiper-slide>
      </swiper>
      <footer class="flex justify-center items-center pt-10 pb-5">
        <div class="mr-3">
          <jds-button class="!bg-green-600 !rounded-full" @click="swipperImageHandle('prev')">
            <jds-icon name="chevron-left" size="xs" fill="#FFFFFF" />
          </jds-button>
        </div>
        <div class="mr-3">
          <jds-button variant="secondary" class="!bg-white !border-2 !border-gray-200 !rounded-full" @click="$emit('close')">
            <BaseIconSvg icon="/icon/default/cross.svg" :size="20" fill-color="#757575" class="mt-[2px]" />
          </jds-button>
        </div>
        <div>
          <jds-button class="!bg-green-600 !rounded-full" @click="swipperImageHandle('next')">
            <jds-icon name="chevron-right" size="xs" fill="#FFFFFF" />
          </jds-button>
        </div>
      </footer>
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import { Navigation, Pagination, Autoplay } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Autoplay])
export default {
  name: 'PopupViewImage',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    listPhoto: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      swiperRef: null,
      isShowPopupInformation: false
    }
  },
  methods: {
    getSwipperRefHandle (swiper) {
      this.swiperRef = swiper
    },
    swipperImageHandle (pathButton) {
      if (this.swiperRef?.activeIndex < this.listPhoto.length) {
        if (pathButton === 'next') {
          this.swiperRef.slideTo(this.swiperRef?.activeIndex + 1)
        } else {
          this.swiperRef.slideTo(this.swiperRef?.activeIndex - 1)
        }
      }
    }
    /* To download images, but postpone it first and will use it if the image URL from the API is no longer subject to CORS
    downloadImageHandle (urlImage) {
      // this.dataDialog.title = 'Download Bukti Foto'
      // fetch('https://dvgddkosknh6r.cloudfront.net/live/media/img/1687855390-banner-mpp.jpg').then(response => console.log(response)).catch(error => console.log(error))
      // try {
      //   const response = await fetch(urlImage, {
      //     mode: 'no-cors'
      //   })
      //   console.log(response)
      //   const blobImage = await response.blob()
      //   console.log(blobImage)
      //   const href = URL.createObjectURL(blobImage)
      //   const anchorElement = document.createElement('a')
      //   anchorElement.href = href
      //   anchorElement.download = 'myimage.png'
      //   anchorElement.click()
      // } catch (error) {
      //   console.log(error)
      // }
    } */
  }
}
</script>

<style scoped>
/* .swiper-container{
  width: 100%;
  height: 100%;
  padding-top: 26px;
} */
</style>
