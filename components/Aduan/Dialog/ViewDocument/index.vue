<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="max-h-[393px] w-[640px] px-3 pb-8">
      <BaseDialogHeader title="Dokumen Bukti" class="flex justify-between">
        <h1 class="font-roboto text-[21px] font-bold text-green-800">
          Dokumen Bukti
        </h1>
        <button @click="$emit('close')">
          <BaseIconSvg
            icon="/icon/default/cross.svg"
            class="!h-6 !w-6"
            fill-color="#212121"
          />
        </button>
      </BaseDialogHeader>

      <div class="layout-content max-h-[337px] overflow-y-auto px-3 pt-4">
        <ListDocument
          v-for="(document, index) in listFileDocument"
          :key="index"
          :file-document="document"
          class="mb-4"
        />
        <ListImage :list-image="listFileImage" />
      </div>
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import ListDocument from '~/components/Aduan/Dialog/ViewDocument/ListDocument'
import ListImage from '~/components/Aduan/Dialog/ViewDocument/ListImage'

export default {
  name: 'DialogViewDocument',
  components: {
    ListDocument,
    ListImage,
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    listFileDocument: {
      type: Array,
      default: () => [],
    },
    listFileImage: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.layout-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.layout-content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.layout-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
</style>
