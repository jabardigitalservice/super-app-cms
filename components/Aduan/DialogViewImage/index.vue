<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="h-[520px] w-[1240px]">
      <BaseDialogHeader title="Bukti Foto" class="mb-4 flex justify-between">
        <h1 class="font-roboto text-[21px] font-bold text-green-800">
          Bukti Foto
        </h1>
        <button @click="$emit('close')">
          <BaseIconSvg
            icon="/icon/default/cross.svg"
            class="!h-6 !w-6"
            fill-color="#212121"
          />
        </button>
      </BaseDialogHeader>
      <swiper
        :slides-per-view="3"
        :space-between="30"
        :centered-slides="true"
        observer
        observe-parents
        class="!pt-[50px]"
        @swiper="getSwipperRefHandle"
      >
        <swiper-slide
          v-for="(item, index) in listPhoto"
          :key="index"
          class="!h-[320px]"
        >
          <img
            :src="item.url"
            alt="photo"
            class="h-full w-full rounded-[4px]"
            :class="{ 'opacity-20': index !== swiperRef?.activeIndex }"
          >
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
            @click="downloadImageHandle()"
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
import axios from 'axios'
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
    },
    async downloadImageHandle () {
      if (this.swiperRef) {
        const activeIndex = this.swiperRef.activeIndex
        const activeItem = this.listPhoto[activeIndex]

        try {
          const imageUrl = activeItem.url
          const splitUrl = imageUrl.split('/')
          const imageName = splitUrl[splitUrl.length - 1]
          const response = await axios.get(imageUrl, { responseType: 'blob' })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(new Blob([response.data]))
          link.download = imageName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } catch (error) {
          console.error('Gagal mendownload gambar', error)
        }
      }
    }
  }
}
</script>
