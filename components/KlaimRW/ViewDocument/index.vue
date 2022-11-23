<template>
  <transition name="fade">
    <div v-if="show" class="fixed h-screen w-screen bg-black bg-opacity-75 z-50 inset-0 flex justify-center items-center">
      <div class="w-[600px] min-h-min rounded-lg bg-white flex flex-col gap-4">
        <h1 class="text-green-700 font-roboto font-medium text-[21px] px-4 pt-4">
          Dokumen SK RW
        </h1>
        <div v-if="file" class="max-h-[calc(100vh-64px-120px)] overflow-scroll">
          <embed
            :src="'data:application/pdf;base64,' + file"
            type="application/pdf"
            class="min-h-[600px] w-full"
          >
        </div>
        <div v-else>
          Tidak ada data
        </div>
        <div class="flex justify-center p-4 bg-gray-50 px-6 rounded-lg">
          <jds-button label="Oke" variant="primary" @click="onClose" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ViewDocument',
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
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
