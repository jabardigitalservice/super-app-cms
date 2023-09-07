<template>
  <div>
    <div class="flex justify-between mt-4 mb-8">
      <jds-button variant="secondary" class="!w-[126px] !h-[38px] !py-1 !text-[14px] !font-bold" @click="goToBackHandle">
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div v-show="detailComplaint.complaint_status_id === 'unverified'" class="flex">
        <div class="mr-3">
          <jds-button
            label="Gagal Diverifikasi"
            variant="secondary"
            class="!h-[38px] !py-1 !text-[14px] !font-bold !text-red-400 !border-red-400"
            @click="showPopupVerificationHandle(detailComplaint, 'failed')"
          />
        </div>
        <jds-button
          label="Terverifikasi"
          variant="primary"
          class="!h-[38px] !py-1 !text-[14px] !font-bold"
          @click="showPopupVerificationHandle(detailComplaint, 'verification')"
        />
      </div>
    </div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarDetail :list-tab="listTab" />
      </template>
      <template #tab-panel>
        <BaseTabPanel class="px-6 py-4 layout-content h-[calc(100vh-280px)] overflow-y-auto px-[19px]">
          <h1 class="font-roboto text-[16px] font-bold text-blue-gray-800 my-4">
            Detail Aduan Warga
          </h1>
          <div class="table-content">
            <BaseTableDetail header="Informasi Umum" class="mb-4">
              <tr>
                <td class="w-[164px] text-lato">
                  <strong class="text-[10px]">ID Aduan </strong>
                </td>
                <td>{{ detailComplaint?.complaint_id || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Aduan Masuk</strong></td>
                <td>{{ detailComplaint?.created_at }} </td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>
                  <div class="flex items-center">
                    <div
                      v-show="detailComplaint?.complaint_status"
                      class=" mr-2 h-2 w-2 rounded-full"
                      :class="getStatusColorHandle(detailComplaint?.complaint_status?.id)"
                    />
                    {{ detailComplaint?.complaint_status?.name || '-' }}
                  </div>
                </td>
              </tr>
              <tr v-show="detailComplaint?.complaint_status_note">
                <td><strong>Alasan</strong></td>
                <td>{{ detailComplaint?.complaint_status_note }}</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Informasi Pelapor" class="mb-4">
              <tr>
                <td class="w-[180px]">
                  <strong class="text-[10px]">Nama Lengkap </strong>
                </td>
                <td>{{ detailComplaint?.user_name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>No. Kontak</strong></td>
                <td>{{ detailComplaint?.user_phone || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{{ detailComplaint?.user_email || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Jenis Media Sosial</strong></td>
                <td>{{ detailComplaint?.social_media?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Link Akun Media Sosial</strong></td>
                <td>{{ detailComplaint?.social_media_link || '-' }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <strong>Titik Lokasi Pelapor</strong>
                </td>
              </tr>
              <tr>
                <td>Koordinat</td>
                <td>{{ getCoordinatHandle() }}</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Detail Aduan" class="mb-4">
              <tr>
                <td class="w-[180px]">
                  <strong class="text-[10px]">Kategori Aduan </strong>
                </td>
                <td>{{ detailComplaint?.complaint_category?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Sub Kategori Aduan</strong></td>
                <td>{{ detailComplaint?.complaint_subcategory?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Judul Aduan</strong></td>
                <td>{{ detailComplaint?.title || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Detail Aduan</strong></td>
                <td>{{ detailComplaint?.description || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Lokasi Kejadian</strong></td>
              </tr>
              <tr>
                <td>Kabupaten / Kota </td>
                <td>{{ detailComplaint?.city?.name || '-' }}</td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>{{ detailComplaint?.district?.name || '-' }}</td>
              </tr>
              <tr>
                <td>Kelurahan</td>
                <td>{{ detailComplaint?.subdistrict?.name || '-' }}</td>
              </tr>
              <tr colspan="2">
                <td>Detail Lokasi Kejadian</td>
                <td>{{ detailComplaint?.address_detail || '-' }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <strong>Titik Lokasi Kejadian</strong>
                </td>
              </tr>
              <tr>
                <td>Latitude</td>
                <td>{{ detailComplaint?.latitude || '-' }}</td>
              </tr>
              <tr>
                <td>Longitude</td>
                <td>{{ detailComplaint?.longitude || '-' }}</td>
              </tr>
              <tr>
                <td class="align-top">
                  Map
                </td>
                <td>
                  <iframe
                    v-if="detailComplaint?.latitude && detailComplaint?.longitude"
                    class="rounded-lg"
                    width="389"
                    height="245"
                    frameborder="0"
                    style="border:0"
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="`https://www.google.com/maps/embed/v1/place?key=${$config.googleMapsApiKey}&q=${detailComplaint?.latitude},${detailComplaint?.longitude}`"
                  />
                  <div v-else>
                    -
                  </div>
                </td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Bukti Foto">
              <tr>
                <td class="px-2 w-1/4">
                  <strong>{{ listPhoto.length }} Foto</strong>
                </td>
                <td class="px-2 py-[6px]">
                  <jds-button
                    variant="secondary"
                    class="!font-medium w-[100px] !text-sm !border-green-600 !text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="listPhoto.length === 0"
                    @click="isShowPopupViewImage = true"
                  >
                    Lihat Foto
                  </jds-button>
                </td>
              </tr>
            </BaseTableDetail>
          </div>
        </BaseTabPanel>
      </template>
    </basetabgroup>
    <DialogViewImage :list-photo="listPhoto" :show-popup="isShowPopupViewImage" @close="closePopupHandle()" />
    <DialogConfirmation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationVerification"
      @close="closePopupHandle()"
      @submit="submitPopupVerificationHandle"
    />
    <DialogInformation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupInformation"
      :icon-popup="iconPopup"
      @close="closePopupInformationHandle()"
      @submit="submitPopupVerificationHandle"
    />
    <DialogInputTextArea
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationFailedVerification"
      @close="closePopupHandle()"
      @submit="submitPopupVerificationHandle"
    />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import { complaintStatus } from '~/constant/aduan-masuk'
import { formatDate } from '~/utils'
import DialogViewImage from '~/components/Aduan/DialogViewImage'
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'DetailAduanMasuk',
  components: { ArrowLeft, DialogViewImage, TabBarDetail },
  mixins: [popupAduanMasuk],
  data () {
    return {
      listTab: [{
        name: 'Detail Aduan',
        icon: '/icon/icon-aduan/complaint-detail.svg'
      }],
      selectedTabIndex: 0,
      detailComplaint: {},
      complaintStatus,
      listPhoto: []
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`/warga/complaints/${this.$route.params.id}`)
      this.detailComplaint = response.data.data
      this.detailComplaint.created_at = formatDate(this.detailComplaint?.created_at, 'dd/MM/yyyy - HH:mm')
      this.detailComplaint.complaint_status = this.complaintStatus[this.detailComplaint.complaint_status_id]
      this.listPhoto = this.detailComplaint.photos
    } catch {
      this.detailComplaint = {}
    }
  },
  mounted () {
    this.selectedTabHandle(0)
  },
  methods: {
    selectedTabHandle (index) {
      this.selectedTabIndex = index
    },
    goToBackHandle () {
      this.$router.push('/aduan/aduan-masuk')
    },
    getStatusHandle (id) {
      const result = this.complaintStatus.find(item => item.id === id)
      return result
    },
    getCoordinatHandle () {
      if (this.detailComplaint?.longitude && this.detailComplaint?.latitude) {
        return `${this.detailComplaint.latitude}, ${this.detailComplaint.longitude}`
      } else {
        return '-'
      }
    },
    getStatusColorHandle (id) {
      let result = ''
      switch (id) {
        case 'unverified':
          result = 'bg-[#FF7500]'
          break
        case 'verified':
          result = 'bg-green-600'
          break
        case 'failed':
          result = 'bg-red-400'
      }
      return result
    },
    showViewPhotoDialogHandle (url) {
      this.photo.showPopup = true
      this.photo.url = 'loading'
      this.photo.url = url
    }
  }
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
</style>
