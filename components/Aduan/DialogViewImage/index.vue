<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="w-[1240px] px-10">
      <BaseDialogHeader title="Bukti Foto" />
      <swiper
        :slides-per-view="2"
        :space-between="30"
        :centered-slides="true"
        observer
        observe-parents
        @swiper="getSwipperRefHandle"
      >
        <swiper-slide v-for="(item,index) in listPhoto" :key="index">
          <img :src="item.url" alt="photo" :class="{'opacity-20':index!==swiperRef.activeIndex}">
        </swiper-slide>
      </swiper>
      <footer class="flex justify-center items-center pt-10 pb-5">
        <div class="mr-3">
          <jds-button class="!bg-green-600 !rounded-full" @click="buttonSwipperHandle('prev')">
            <jds-icon name="chevron-left" size="xs" fill="#FFFFFF" />
          </jds-button>
        </div>
        <div class="mr-3">
          <jds-button variant="secondary" class="!bg-white !border-2 !border-gray-200 !rounded-full" @click="$emit('close')">
            <BaseIconSvg icon="/icon/default/cross.svg" :size="20" fill-color="#757575" class="mt-[2px]" />
          </jds-button>
        </div>
        <div>
          <jds-button class="!bg-green-600 !rounded-full" @click="buttonSwipperHandle('next')">
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
      swiperRef: null
    }
  },
  methods: {
    getSwipperRefHandle (swiper) {
      this.swiperRef = swiper
    },
    buttonSwipperHandle (pathButton) {
      if (this.swiperRef.activeIndex < this.listPhoto.length) {
        if (pathButton === 'next') {
          this.swiperRef.slideTo(this.swiperRef.activeIndex + 1)
        } else {
          this.swiperRef.slideTo(this.swiperRef.activeIndex - 1)
        }
      }
    }
  }
}
</script>

<style scoped>
.swiper-container{
  width: 100%;
  padding-top: 26px;
}
 .swiper-slide {
  text-align: center;
  width: auto;
}

.slide-image {
  height: 400px;
  width: auto;
}
</style>
