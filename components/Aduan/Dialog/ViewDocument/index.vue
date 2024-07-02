<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel class="max-h-[332px] w-[640px] overflow-y-auto">
      <BaseDialogHeader title="Dokumen Bukti" class="mb-4 flex justify-between">
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

      <div class="px-6 pt-2 pb-8">
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
    ListImage
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    listFileDocument: {
      type: Array,
      default: () => ([])
    },
    listFileImage: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
