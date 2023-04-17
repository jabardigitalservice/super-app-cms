<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-75"
    >
      <div class="flex min-h-min min-w-[300px] w-[800px] flex-col gap-4 rounded-lg bg-white">
        <h1
          class="px-4 pt-4 font-roboto text-[21px] font-medium text-green-700"
        >
          {{ title }} {{ file.meta }}
        </h1>
        <div
          v-if="file === 'loading'"
          class="flex items-center justify-center p-4"
        >
          <jds-spinner size="72px" />
        </div>
        <div
          v-else-if="file !== 'loading'"
          class="max-h-[calc(100vh-64px-120px)]"
          :class="
            mimeType === 'application/pdf' ? 'overflow-scroll' : 'overflow-auto'
          "
        >
          <iframe
            v-if="mimeType === 'application/pdf'"
            :src="fileDocument"
            class="w-full min-h-[600px]"
          />

          <img v-else :src="fileDocument" class="w-full">
        </div>
        <div v-else class="px-4">
          Tidak ada data
        </div>
        <div class="flex justify-center rounded-lg bg-gray-50 p-4 px-6">
          <jds-button label="Oke" variant="primary" @click="onClose" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { base64ToBlobUrl } from '~/utils'
export default {
  name: 'BaseViewFile',
  props: {
    /**
     * make modal visible or not
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * title modal
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * data base64 encoded pdf
     */
    file: {
      type: String,
      default: ''
    },
    mimeType: {
      type: String,
      default: ''
    },
    urlPath: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    fileDocument () {
      if (this.urlPath) {
        return this.file
      } else {
        return this.file ? base64ToBlobUrl(this.file, this.mimeType) : ''
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
