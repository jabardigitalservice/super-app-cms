<template>
  <div>
    <div
      v-if="qrCode && !isLoading"
      class="flex flex-col items-center justify-center"
    >
      <img class="mt-2 !h-[280px] !w-[280px]" :src="qrCode" alt="QR Code">
      <a :href="qrCode" :download="`qrcode-${$route.params.invoice}.png`">
        <jds-button class="!w-full!text-sm mt-[16px] !bg-green-600">
          Unduh QR Code
        </jds-button>
      </a>
    </div>
    <div v-else>
      <div class="flex h-[300px] flex-col items-center justify-center">
        <jds-spinner class="mb-4" size="56" />
        <p class="font-lato text-2xl font-bold text-green-700">
          Loading....
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode-generator'
export default {
  name: 'BaseQRGenerator',
  props: {
    base64String: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      qrCode: null,
      isLoading: false
    }
  },
  watch: {
    base64String: {
      handler: 'changeBase64ToQRImage',
      immediate: true
    }
  },
  methods: {
    changeBase64ToQRImage () {
      this.isLoading = true
      if (this.base64String) {
        const qr = QRCode(0, 'M')
        qr.addData(this.base64String)
        qr.make()
        const qrCodeDataURL = qr.createDataURL(8, 0)

        this.qrCode = qrCodeDataURL
        this.isLoading = false
      } else {
        this.qrCode = null
      }
    }
  }
}
</script>
