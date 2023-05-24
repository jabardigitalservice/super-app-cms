<template>
  <div>
    <div class="flex justify-between mt-4 mb-8">
      <!-- <jds-button variant="secondary" class="!w-[126px] !h-[38px] !py-1 !text-[14px] !font-bold" @click="goToBackHandle">
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button> -->
      <div class="flex">
        <!-- <div class="mr-3">
          <jds-button label="Hapus Pesan" variant="secondary" class="!h-[38px] !py-1 !text-[14px] !font-bold !text-red-400 !border-red-400" @click="showDeletePopupHandle(detailMessageNotif)" />
        </div> -->
        <!-- <jds-button v-show="detailMessageNotif.status!==messageStatus.published.id" label="Publikasikan" variant="primary" class="!h-[38px] !py-1 !text-[14px] !font-bold" @click="showPublishedPopupHandle(detailMessageNotif)" /> -->
      </div>
    </div>
    <div
      class="relative h-[calc(100vh-220px)] rounded-lg bg-white py-[16px] px-[5px] font-lato text-gray-800"
    >
      <div
        class="layout-content h-[calc(100vh-250px)] overflow-y-auto px-[19px]"
      >
        <div class="mb-[16px] font-lato table-content">
          <BaseTableDetail header="Versi Rilis" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Major Version Number</strong>
              </td>
              <td>{{ dataDetail?.majorVersion }}</td>
            </tr>

            <tr>
              <td class="w-[146px]">
                <strong>Minor Version Number</strong>
              </td>
              <td>{{ dataDetail?.minorVersion }}</td>
            </tr>

            <tr>
              <td class="w-[146px]">
                <strong>Patch Number</strong>
              </td>
              <td>{{ dataDetail?.patchNumber }}</td>
            </tr>

            <tr>
              <td class="w-[146px]">
                <strong>Full Versio Number</strong>
              </td>
              <td>{{ dataDetail?.versiRilis }}</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Status Rilis" class="mb-4">
            <tr>
              <td>{{ dataDetail?.status }}</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Tanggal Rilis" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Major Version Number</strong>
              </td>
              <td>{{ dataDetail?.date || 'Belum ada' }}</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Informasi Pembaruan" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Pembaruan apa saja yang ada di versi ini ?</strong>
              </td>
              <td><span v-html="dataDetail?.detail" /></td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Force Update" class="mb-4">
            <tr>
              <td>{{ dataDetail?.forceUpdate ? 'Ya, tampilkan' : 'Tidak perlu ditampilkan' || '-' }}</td>
            </tr>
          </BaseTableDetail>
        </div>
      </div>
    </div>

    <!-- <BasePopup :show-popup="showPopupConfirmationInformation" @submit="submitHandle" @close="closePopupDetailHandle" /> -->
  </div>
</template>

<script>
// import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
export default {
  name: 'ManagementReleaseDetail',
  components: {
    // ArrowLeft
  },
  props: {
    dataDetail: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
