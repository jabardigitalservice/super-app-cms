<template>
  <div>
    <div class="flex justify-between mt-4 mb-8">
      <jds-button variant="secondary" class="!w-[126px] !h-[38px] !py-1 !text-[14px] !font-bold" @click="goToBackHandle">
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <jds-button
        v-show="!detailComplaintDiverted?.sp4n_id"
        label="Tambahkan ID SP4N Lapor"
        variant="primary"
        class="!h-[38px] !py-1 !text-[14px] !font-bold"
        @click="showPopupVerificationHandle(detailComplaint, 'verification')"
      />
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
                <td class="w-[180px] text-lato">
                  <strong class="text-[10px]">ID Aduan </strong>
                </td>
                <td>{{ detailComplaintDiverted?.complaint_id || '-' }}</td>
              </tr>
              <tr>
                <td class="text-lato">
                  <strong class="text-[10px]">ID SP4N Lapor </strong>
                </td>
                <td>
                  <div class="flex items-center">
                    <div
                      v-show="!detailComplaintDiverted?.sp4n_id"
                      :class="{' mr-2 h-2 w-2 rounded-full bg-[#FFB900]': !detailComplaintDiverted?.sp4n_id}"
                    />
                    {{ detailComplaintDiverted?.sp4n_id || 'Belum ada' }}
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Tanggal Aduan Masuk</strong></td>
                <td>{{ detailComplaintDiverted?.created_at }} </td>
              </tr>
              <tr>
                <td><strong>Tanggal Diinput ke SP4N</strong></td>
                <td>
                  <div class="flex items-center">
                    <div
                      v-show="!detailComplaintDiverted?.sp4n_created_at"
                      :class="{' mr-2 h-2 w-2 rounded-full bg-[#FFB900]': !detailComplaintDiverted?.sp4n_created_at}"
                    />
                    {{ detailComplaintDiverted?.diverted_to_span_at || 'Belum ada' }}
                  </div>
                </td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail v-show="detailComplaintDiverted?.sp4n_id" header="Status SPAN Lapor" class="mb-4">
              <tr>
                <td class="px-2 w-[180px]">
                  Data Table
                </td>
                <td class="px-2 py-[6px]">
                  <jds-button
                    variant="secondary"
                    class="!font-medium !text-sm !border-green-600 !text-green-600"
                  >
                    Lihat Semua Status
                  </jds-button>
                </td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Informasi Pelapor" class="mb-4">
              <tr>
                <td class="w-[180px]">
                  <strong class="text-[10px]">Nama Lengkap </strong>
                </td>
                <td>{{ detailComplaintDiverted?.user_name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>No. Kontak</strong></td>
                <td>{{ detailComplaintDiverted?.user_phone || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{{ detailComplaintDiverted?.user_email || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Jenis Media Sosial</strong></td>
                <td>{{ detailComplaintDiverted?.social_media?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Link Akun Media Sosial</strong></td>
                <td>{{ detailComplaintDiverted?.social_media_link || '-' }}</td>
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
                <td>{{ detailComplaintDiverted?.complaint_category?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Sub Kategori Aduan</strong></td>
                <td>{{ detailComplaintDiverted?.complaint_subcategory?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Judul Aduan</strong></td>
                <td>{{ detailComplaintDiverted?.title || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Detail Aduan</strong></td>
                <td>{{ detailComplaintDiverted?.description || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Lokasi Kejadian</strong></td>
              </tr>
              <tr>
                <td>Kabupaten / Kota </td>
                <td>{{ detailComplaintDiverted?.city?.name || '-' }}</td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>{{ detailComplaintDiverted?.district?.name || '-' }}</td>
              </tr>
              <tr>
                <td>Kelurahan</td>
                <td>{{ detailComplaintDiverted?.subdistrict?.name || '-' }}</td>
              </tr>
              <tr colspan="2">
                <td>Detail Lokasi Kejadian</td>
                <td>{{ detailComplaintDiverted?.address_detail || '-' }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <strong>Titik Lokasi Kejadian</strong>
                </td>
              </tr>
              <tr>
                <td>Latitude</td>
                <td>{{ detailComplaintDiverted?.latitude || '-' }}</td>
              </tr>
              <tr>
                <td>Longitude</td>
                <td>{{ detailComplaintDiverted?.longitude || '-' }}</td>
              </tr>
              <tr>
                <td class="align-top">
                  Map
                </td>
                <td>
                  <iframe
                    v-if="detailComplaintDiverted?.latitude && detailComplaintDiverted?.longitude"
                    class="rounded-lg"
                    width="389"
                    height="245"
                    frameborder="0"
                    style="border:0"
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="`https://www.google.com/maps/embed/v1/place?key=${$config.googleMapsApiKey}&q=${detailComplaintDiverted?.latitude},${detailComplaintDiverted?.longitude}`"
                  />
                  <div v-else>
                    -
                  </div>
                </td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Bukti Foto">
              <tr>
                <td class="px-2 w-[180px]">
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
  name: 'DetailAduanDialihkanKeSpan',
  components: { ArrowLeft, DialogViewImage, TabBarDetail },
  mixins: [popupAduanMasuk],
  data () {
    return {
      listTab: [{
        name: 'Detail Aduan',
        icon: '/icon/icon-aduan/complaint-detail.svg'
      }],
      selectedTabIndex: 0,
      detailComplaintDiverted: {},
      complaintStatus,
      listPhoto: []
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(`/warga/complaints/${this.$route.params.id}`)
      this.detailComplaintDiverted = response.data.data
      this.detailComplaintDiverted.created_at = formatDate(this.detailComplaintDiverted?.created_at, 'dd/MM/yyyy - HH:mm')
      this.detailComplaintDiverted.diverted_to_span_at = formatDate(this.detailComplaintDiverted?.diverted_to_span_at, 'dd/MM/yyyy - HH:mm')
      this.detailComplaintDiverted.complaint_status = this.complaintStatus[this.detailComplaintDiverted.complaint_status_id]
      this.listPhoto = this.detailComplaintDiverted.photos
    } catch {
      this.detailComplaintDiverted = {}
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
      this.$router.push('/aduan/dialihkan-ke-span-lapor')
    },
    getStatusHandle (id) {
      const result = this.complaintStatus.find(item => item.id === id)
      return result
    },
    getCoordinatHandle () {
      if (this.detailComplaintDiverted?.longitude && this.detailComplaintDiverted?.latitude) {
        return `${this.detailComplaintDiverted.latitude}, ${this.detailComplaintDiverted.longitude}`
      } else {
        return '-'
      }
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
