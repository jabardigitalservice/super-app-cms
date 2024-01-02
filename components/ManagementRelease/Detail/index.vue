<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!h-[38px] !w-[126px] !py-1 !text-[14px] !font-bold"
        @click="goToBackHandle"
      >
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div class="flex">
        <div class="mr-3">
          <jds-button label="Hapus Versi Ini" variant="secondary" class="!h-[38px] !py-1 !text-[14px] !font-bold !text-red-400 !border-red-400" @click="showDeleteManajemenRelease(dataDetailManagement)" />
        </div>
        <div class="mr-3">
          <jds-button label="Ubah Versi Ini" variant="secondary" class="!h-[38px] !py-1 !text-[14px] !font-bold" @click="goToEditHandle" />
        </div>
        <div class="mr-3">
          <jds-button label="Rilis Versi Ini" class="!h-[38px] !py-1 !text-[14px] !font-bold !bg-green-600" @click="showVerificationManajemenRelease(dataDetailManagement)" />
        </div>
      </div>
    </div>
    <div
      class="relative h-[calc(100vh-220px)] rounded-lg bg-white py-[16px] px-[5px] font-lato text-gray-800"
    >
      <div
        class="layout-content h-[calc(100vh-250px)] overflow-y-auto px-[19px]"
      >
        <div class="table-content mb-[16px] font-lato">
          <BaseTableDetail header="Versi Rilis" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Major Version Number</strong>
              </td>
              <td>{{ dataDetailManagement?.majorVersion }}</td>
            </tr>

            <tr>
              <td class="w-[146px]">
                <strong>Minor Version Number</strong>
              </td>
              <td>{{ dataDetailManagement?.minorVersion }}</td>
            </tr>

            <tr>
              <td class="w-[146px]">
                <strong>Patch Number</strong>
              </td>
              <td>{{ dataDetailManagement?.patchNumber }}</td>
            </tr>

            <tr>
              <td class="w-[146px]">
                <strong>Full Version Number</strong>
              </td>
              <td>{{ dataDetailManagement?.versiRilis }}</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Status Rilis" class="mb-4">
            <tr>
              <td>
                <div class="flex items-center">
                  <div
                    v-show="dataDetailManagement?.status"
                    class="mr-2 h-2 w-2 rounded-full"
                    :class="
                      getColorIconStatus(
                        statusTable[`${dataDetailManagement?.status}`]
                      )
                    "
                  />
                  {{ statusTable[`${dataDetailManagement?.status}`] }}
                </div>
              </td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Tanggal Rilis" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Major Version Number</strong>
              </td>
              <td>{{ dataDetailManagement?.date || "Belum ada" }}</td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Informasi Pembaruan" class="mb-4">
            <tr>
              <td class="w-[146px]">
                <strong>Pembaruan apa saja yang ada di versi ini ?</strong>
              </td>
              <td>
                <!-- eslint-disable-next-line vue/no-v-html --><span
                  v-html="dataDetailManagement?.content"
                />
              </td>
            </tr>
          </BaseTableDetail>

          <BaseTableDetail header="Force Update" class="mb-4">
            <tr>
              <td>
                {{
                  dataDetailManagement?.forceUpdate
                    ? "Ya, tampilkan"
                    : "Tidak perlu ditampilkan" || "-"
                }}
              </td>
            </tr>
          </BaseTableDetail>
        </div>
      </div>
    </div>

    <BasePopup :show-popup="showPopUp" @submit="submitHandle" @close="closePopupDetailHandle" />
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import {
  statusTable
} from '~/constant/manajemen-release'
import popup from '~/mixins/manajemen-release'
export default {
  name: 'ManagementReleaseDetail',
  components: {
    ArrowLeft
  },
  mixins: [popup],
  props: {
    dataDetailManagement: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      statusTable
    }
  },
  methods: {
    goToBackHandle () {
      this.$router.push({
        path: '/management-release',
        query: this.$route.query
      })
    },
    goToEditHandle () {
      this.$router.push({
        path: `/management-release/edit/${this.$route.params.id}`,
        query: this.$route.query
      })
    },
    closePopupDetailHandle () {
      const dataPopup = {
        popupName: this.popupName,
        dialogType: this.deleteInformationPopup.successInformation.dialogType
      }

      this.showPopUp = false
      this.$emit('close', dataPopup)
    }
  }
}
</script>

<style></style>
