<template>
  <div class="table-content">
    <h1 class="mb-4 font-roboto text-[16px] font-bold text-blue-gray-800">
      Bukti Tindaklanjut
    </h1>
    <BaseTableDetail header="Keterangan" class="mb-4">
      <tr>
        <td width="460px">Keterangan Tindaklanjut</td>
        <td>{{ detailComplaint?.evidence?.description || '-' }}</td>
      </tr>
    </BaseTableDetail>
    <BaseTableDetail
      v-if="detailComplaint?.evidence"
      header="Bukti Foto dan Dokumen"
    >
      <tr v-if="listPhoto.length > 0" class="table-file-image-title">
        <td class="px-2" colspan="2">
          <strong>Foto</strong>
        </td>
      </tr>
      <tr v-if="listPhoto.length > 0" class="table-file-image-content">
        <td width="460px">Terlampir {{ listPhoto?.length }} foto</td>
        <td class="px-2 py-[6px]">
          <jds-button
            variant="secondary"
            class="w-[100px] !border-green-600 !text-sm !font-medium !text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="listPhoto?.length === 0"
            @click="isShowPopupViewImage = true"
          >
            Lihat Foto
          </jds-button>
        </td>
      </tr>
      <tr>
        <td
          v-if="listFile.length > 0"
          class="table-file-image-title px-2"
          colspan="2"
        >
          <strong>Dokumen</strong>
        </td>
      </tr>
      <tr v-for="file in listFile" :key="file" class="table-file-image-content">
        <td width="460px">{{ file?.name || '-' }}</td>
        <td class="px-2 py-[6px]">
          <jds-button
            variant="secondary"
            class="w-[138px] !border-green-600 !text-sm !font-medium !text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="listFile.length === 0"
            @click="downloadFile(file.url, file.type)"
          >
            Unduh Dokumen
          </jds-button>
        </td>
      </tr>
    </BaseTableDetail>
    <DialogViewImage
      :list-photo="listPhoto"
      :show-popup="isShowPopupViewImage"
      @close="isShowPopupViewImage = false"
    />
  </div>
</template>

<script>
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'
import DialogViewImage from '~/components/Aduan/DialogViewImage'
import { downloadFile } from '~/utils'

export default {
  name: 'DetailBuktiTindaklanjut',
  components: { DialogViewImage },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: String,
      default: '',
    },
    detailComplaint: {
      type: Object,
      default: () => ({}),
    },
    listPhoto: {
      type: Array,
      default: () => [],
    },
    listFile: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowPopupViewImage: false,
      downloadFile,
    }
  },
  methods: {
    getFile(dataUrl) {
      return { type: dataUrl.split('.')[1], url: dataUrl }
    },
  },
}
</script>

<style scoped>
.layout-content {
  scrollbar-color: #e0e0e0 white;
  scrollbar-width: thin;
  scroll-margin-right: 10px;
}

.layout-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.layout-content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.layout-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}

.table-content tr td {
  @apply px-[8px] pt-[10px] pb-[9px] !important;
}

.table-file-image-title {
  @apply !bg-gray-50;
}
.table-file-image-content {
  @apply !bg-white;
}
</style>
