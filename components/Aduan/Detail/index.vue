<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!text-[14px] !font-bold"
        @click="goToBackHandle()"
      >
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div class="flex">
        <div
          v-for="(button, index) in listButton"
          v-show="
            button?.complaintStatus === detailComplaint?.complaint_status_id
          "
          :key="index"
        >
          <div :class="{ 'mr-3': listButton.length > 1 }">
            <jds-button
              :label="button.label"
              :variant="button.variant"
              class="!font-bold"
              :class="button.classButton"
              @click="clickButtonConfirmationHandle(button.idButton)"
            />
          </div>
        </div>
      </div>
    </div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarDetail :list-tab="listTab" />
      </template>
      <template #tab-panel>
        <BaseTabPanel
          class="layout-content h-[calc(100vh-280px)] overflow-y-auto px-6 py-4 px-[19px]"
        >
          <h1 class="my-4 font-roboto text-[16px] font-bold text-blue-gray-800">
            Detail Aduan Warga
          </h1>
          <div
            v-if="typeAduan.aduanDariSpanLapor.props !== typeAduanPage"
            class="table-content"
          >
            <BaseTableDetail header="Informasi Umum" class="mb-4">
              <tr>
                <td class="text-lato w-[164px]">
                  <strong class="text-[10px]">ID Aduan </strong>
                </td>
                <td>{{ detailComplaint?.complaint_id || "-" }}</td>
              </tr>
              <tr
                v-show="
                  showIdSpanLaporHandle(detailComplaint?.complaint_status_id)
                "
              >
                <td class="text-lato">
                  <strong class="text-[10px]">ID SP4N Lapor </strong>
                </td>
                <td>
                  <div class="flex items-center">
                    <div
                      :class="{
                        ' mr-2 h-2 w-2 rounded-full bg-[#FFB900]':
                          !detailComplaint?.sp4n_id,
                      }"
                    />
                    {{ detailComplaint?.sp4n_id || "Belum ada" }}
                  </div>
                </td>
              </tr>
              <tr
                v-show="typeAduan.penentuanKewenangan.props === typeAduanPage"
              >
                <td><strong>Sumber Aduan</strong></td>
                <td>{{ detailComplaint?.complaint_source || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Aduan Masuk</strong></td>
                <td>{{ detailComplaint?.created_at_format }}</td>
              </tr>
              <tr
                v-show="
                  typeAduanPage === typeAduan.aduanDialihkanSpanLapor.props
                "
              >
                <td class="w-[175px]">
                  <strong>Tanggal Diinput ke SP4N</strong>
                </td>
                <td>
                  <div class="flex items-center">
                    <div
                      :class="{
                        ' mr-2 h-2 w-2 rounded-full bg-[#FFB900]':
                          !detailComplaint?.sp4n_created_at,
                      }"
                    />
                    {{ detailComplaint?.sp4n_created_at || "Belum ada" }}
                  </div>
                </td>
              </tr>
              <tr v-show="listTypeAduanStatusAduan.includes(typeAduanPage)">
                <td><strong>Status</strong></td>
                <td>
                  <div class="flex items-center">
                    <div
                      v-show="detailComplaint?.complaint_status_id"
                      :class="[
                        ' mr-2 h-2 w-2 rounded-full',
                        getStatusColorHandle(
                          detailComplaint?.complaint_status_id
                        ),
                      ]"
                    />
                    {{ detailComplaint?.complaint_status?.name || "-" }}
                  </div>
                </td>
              </tr>
              <tr
                v-show="
                  typeAduanPage === typeAduan.aduanMasuk.props &&
                    detailComplaint?.complaint_status_note
                "
              >
                <td><strong>Alasan</strong></td>
                <td>{{ detailComplaint?.complaint_status_note }}</td>
              </tr>
              <tr
                v-show="
                  typeAduanPage === typeAduan.penentuanKewenangan.props &&
                    detailComplaint?.complaint_status_id !==
                    complaintStatus.rejected.id
                "
              >
                <td><strong>Cakupan Urusan</strong></td>
                <td>{{ detailComplaint?.coverage_of_affairs || "-" }}</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail
              v-show="
                typeAduan.aduanDialihkanSpanLapor.props === typeAduanPage &&
                  detailComplaint?.diverted_to_span_at &&
                  detailComplaint?.sp4n_created_at
              "
              header="Status SPAN Lapor"
              class="mb-4"
            >
              <tr>
                <td class="w-[180px] px-2">
                  Data Table
                </td>
                <td class="px-2 py-[6px]">
                  <jds-button
                    variant="secondary"
                    class="!border-green-600 !text-sm !font-medium !text-green-600"
                    @click="
                      showPopupDetailStatusComplaintHandle(detailComplaint)
                    "
                  >
                    Lihat Semua Status
                  </jds-button>
                </td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail
              v-show="
                typeAduanPage === typeAduan.penentuanKewenangan.props &&
                  detailComplaint?.complaint_status_id !==
                  complaintStatus.verified.id &&
                  detailComplaint.complaint_status_id !==
                  complaintStatus.rejected.id
              "
              header="Informasi Instansi"
              class="mb-4"
            >
              <tr>
                <td class="w-[180px]">
                  <strong>Nama Instansi</strong>
                </td>
                <td>{{ detailComplaint?.opd_name || "-" }}</td>
              </tr>
              <tr
                v-show="
                  detailComplaint?.complaint_status_id ===
                    complaintStatus.coordinated.id
                "
              >
                <td><strong>Nama Kepala Perangkat Daerah</strong></td>
                <td>{{ detailComplaint?.opd_pic || "-" }}</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail
              v-show="
                typeAduanPage === typeAduan.penentuanKewenangan.props &&
                  detailComplaint?.complaint_status_id !==
                  complaintStatus.verified.id
              "
              header="Informasi Lainnya"
              class="mb-4"
            >
              <tr
                v-show="
                  detailComplaint?.complaint_status_id ===
                    complaintStatus.coordinated.id
                "
              >
                <td class="w-[180px]">
                  <strong>Tanggal Deadline</strong>
                </td>
                <td>{{ detailComplaint?.deadline_date || "-" }}</td>
              </tr>
              <tr
                v-show="
                  detailComplaint?.complaint_status_id ===
                    complaintStatus.coordinated.id
                "
              >
                <td><strong>Tingkat Urgensi</strong></td>
                <td>{{ detailComplaint?.urgency_level || "-" }}</td>
              </tr>
              <tr
                v-show="
                  detailComplaint?.status_id !== complaintStatus.verified.id
                "
              >
                <td><strong>Keterangan Status</strong></td>
                <td>{{ detailComplaint?.status_description || "-" }}</td>
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
                <td>{{ detailComplaint?.user_email || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Jenis Media Sosial</strong></td>
                <td>{{ detailComplaint?.social_media?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Link Akun Media Sosial</strong></td>
                <td>{{ detailComplaint?.social_media_link || "-" }}</td>
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
                <td>{{ detailComplaint?.complaint_category?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Sub Kategori Aduan</strong></td>
                <td>
                  {{ detailComplaint?.complaint_subcategory?.name || "-" }}
                </td>
              </tr>
              <tr>
                <td><strong>Judul Aduan</strong></td>
                <td>{{ detailComplaint?.title || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Detail Aduan</strong></td>
                <td>{{ detailComplaint?.description || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Lokasi Kejadian</strong></td>
              </tr>
              <tr>
                <td>Kabupaten / Kota</td>
                <td>{{ detailComplaint?.city_name || "-" }}</td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>{{ detailComplaint?.district_name || "-" }}</td>
              </tr>
              <tr>
                <td>Kelurahan</td>
                <td>{{ detailComplaint?.subdistrict_name || "-" }}</td>
              </tr>
              <tr colspan="2">
                <td>Detail Lokasi Kejadian</td>
                <td>{{ detailComplaint?.address_detail || "-" }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <strong>Titik Lokasi Kejadian</strong>
                </td>
              </tr>
              <tr>
                <td>Latitude</td>
                <td>{{ detailComplaint?.latitude || "-" }}</td>
              </tr>
              <tr>
                <td>Longitude</td>
                <td>{{ detailComplaint?.longitude || "-" }}</td>
              </tr>
              <tr>
                <td class="align-top">
                  Map
                </td>
                <td>
                  <iframe
                    v-if="
                      detailComplaint?.latitude && detailComplaint?.longitude
                    "
                    class="rounded-lg"
                    width="389"
                    height="245"
                    frameborder="0"
                    style="border: 0"
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="`https://www.google.com/maps/embed/v1/place?key=${$config.googleMapsApiKey}&q=${detailComplaint?.latitude},${detailComplaint?.longitude}`"
                  />
                  <div v-else>
                    -
                  </div>
                </td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail
              v-show="detailComplaint?.photos"
              header="Bukti Foto"
            >
              <tr>
                <td class="w-[180px] px-2">
                  <strong>{{ listPhoto.length }} Foto</strong>
                </td>
                <td class="px-2 py-[6px]">
                  <jds-button
                    variant="secondary"
                    class="w-[100px] !border-green-600 !text-sm !font-medium !text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="listPhoto.length === 0"
                    @click="isShowPopupViewImage = true"
                  >
                    Lihat Foto
                  </jds-button>
                </td>
              </tr>
            </BaseTableDetail>
          </div>
          <div v-else class="table-content">
            <BaseTableDetail header="Informasi Aduan" class="mb-4">
              <tr>
                <td class="w-[205px]">
                  <strong>ID Aduan Sapawarga</strong>
                </td>
                <td>{{ detailComplaint?.complaint_id || "-" }}</td>
              </tr>
              <tr>
                <td><strong>ID SP4N Lapor</strong></td>
                <td>{{ detailComplaint?.sp4n_id || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Laporan Masuk</strong></td>
                <td>{{ detailComplaint?.sp4n_added_at || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Diinput ke Sapawarga</strong></td>
                <td>{{ detailComplaint?.created_at }}</td>
              </tr>
              <tr>
                <td><strong>Nama Lengkap</strong></td>
                <td>{{ detailComplaint?.user_name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Judul Aduan</strong></td>
                <td>{{ detailComplaint?.title || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Detail Aduan</strong></td>
                <td>{{ detailComplaint?.description || "-" }}</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Lokasi Aduan" class="mb-4">
              <tr>
                <td class="w-[205px]">
                  Kabupaten / Kota
                </td>
                <td>{{ detailComplaint?.city?.name || "-" }}</td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>{{ detailComplaint?.district?.name || "-" }}</td>
              </tr>
              <tr>
                <td>Kelurahan</td>
                <td>{{ detailComplaint?.subdistrict?.name || "-" }}</td>
              </tr>
              <tr colspan="2">
                <td>Detail Lokasi Kejadian</td>
                <td>{{ detailComplaint?.address_detail || "-" }}</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Lainnya">
              <tr>
                <td class="w-[205px]">
                  <strong class="text-[10px]">Kategori Aduan </strong>
                </td>
                <td>{{ detailComplaint?.complaint_category?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Sub Kategori Aduan</strong></td>
                <td>
                  {{ detailComplaint?.complaint_subcategory?.name || "-" }}
                </td>
              </tr>
              <tr>
                <td><strong>Disposisi & Kewenangan</strong></td>
              </tr>
              <tr>
                <td><strong>Disposisi</strong></td>
                <td>{{ detailComplaint?.disposition }}</td>
              </tr>
              <tr>
                <td><strong>Kewenangan</strong></td>
                <td>{{ detailComplaint?.authority }}</td>
              </tr>
            </BaseTableDetail>
          </div>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogViewImage
      :list-photo="listPhoto"
      :show-popup="isShowPopupViewImage"
      @close="isShowPopupViewImage = false"
    />
    <DialogTrackingSpanLapor
      :show-popup="isShowPopupDetailStatusComplaint"
      :data-dialog="dataDialog"
      @close="isShowPopupDetailStatusComplaint = false"
    />
    <DialogInputText
      :data-dialog="dataDialog"
      :show-popup="isShowPopupInputIdSpan"
      @close="closePopupHandle()"
      @submit="submitInputIdSpanHandle"
    />
    <DialogConfirmation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationVerification"
      @close="closePopupHandle()"
      @submit="submitPopupComplaintHandle"
    />
    <DialogInformation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupInformation"
      :icon-popup="iconPopup"
      @close="closePopupInformationHandle()"
      @submit="submitRetryHandle"
    />
    <DialogInputTextArea
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationFailedVerification"
      @close="closePopupHandle()"
      @submit="submitPopupComplaintHandle"
    />
    <DialogLoading :show-popup="isLoading" />
    <DialogProcessComplaint
      :data-dialog="dataDialog"
      :show-popup="isShowPopupProcessComplaint"
      @close="isShowPopupProcessComplaint = false"
    />
  </div>
</template>

<script>
import {
  complaintStatus,
  typeAduan,
  complaintButtonDetail
} from '~/constant/aduan-masuk'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DialogViewImage from '~/components/Aduan/DialogViewImage'
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'
import DialogTrackingSpanLapor from '~/components/Aduan/Dialog/TrackingSpanLapor'
import { formatDate } from '~/utils'
import DialogProcessComplaint from '~/components/Aduan/Dialog/ProcessComplaint'

export default {
  name: 'DetailAduanMasuk',
  components: {
    DialogViewImage,
    TabBarDetail,
    DialogTrackingSpanLapor,
    ArrowLeft,
    DialogProcessComplaint
  },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: String,
      default: ''
    },
    listButton: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      listTab: [
        {
          name: 'Detail Aduan',
          icon: '/icon/icon-aduan/complaint-detail.svg'
        }
      ],
      detailComplaint: {},
      selectedTabIndex: 0,
      complaintStatus,
      listPhoto: [],
      complaintButtonDetail,
      typeAduan,
      isShowPopupViewImage: false,
      isShowPopupDetailStatusComplaint: false
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(
        `/warga/complaints/${this.$route.params.id}`
      )
      const dataDetailComplaint = response.data.data
      dataDetailComplaint.complaint_status =
        this.complaintStatus[dataDetailComplaint?.complaint_status_id]
      if (this.typeAduan.aduanDialihkanSpanLapor.id === this.typeAduanPage) {
        dataDetailComplaint.complaint_status_id = !dataDetailComplaint.sp4n_id
          ? 'no-id-span'
          : dataDetailComplaint.complaint_status_id
      }
      this.detailComplaint = {
        ...dataDetailComplaint,
        created_at_api: dataDetailComplaint?.created_at,
        created_at_format:
          dataDetailComplaint?.created_at &&
          formatDate(dataDetailComplaint?.created_at, 'dd/MM/yyyy - HH:mm'),
        sp4n_created_at:
          dataDetailComplaint?.sp4n_created_at &&
          formatDate(
            dataDetailComplaint?.sp4n_created_at || '',
            'dd/MM/yyyy - HH:mm'
          ),
        sp4n_added_at:
          dataDetailComplaint?.sp4n_added_at &&
          formatDate(
            dataDetailComplaint?.sp4n_added_at || '',
            'dd/MM/yyyy - HH:mm'
          ),
        complaint_source:
          dataDetailComplaint.complaint_source === 'sp4n'
            ? 'SP4N Lapor'
            : dataDetailComplaint.complaint_source
      }
      this.listPhoto = dataDetailComplaint?.photos || []
    } catch {
      this.detailComplaint = {}
      this.listPhoto = []
    }
  },
  computed: {
    // to get type aduan which will show status aduan
    listTypeAduanStatusAduan () {
      const listTypeAduanStatusAduan = []
      Object.values(this.typeAduan).forEach((item) => {
        if (
          item.props !== this.typeAduan.aduanDialihkanSpanLapor.props &&
          item.props !== this.typeAduan.aduanDariSpanLapor.props
        ) {
          listTypeAduanStatusAduan.push(item.props)
        }
      })
      return listTypeAduanStatusAduan
    }
  },
  mounted () {
    this.selectedTabHandle(0)
  },
  methods: {
    selectedTabHandle (index) {
      this.selectedTabIndex = index
    },
    getCoordinatHandle () {
      if (this.detailComplaint?.longitude && this.detailComplaint?.latitude) {
        return `${this.detailComplaint.latitude}, ${this.detailComplaint.longitude}`
      } else {
        return '-'
      }
    },
    getStatusColorHandle (statusId) {
      if (
        statusId &&
        this.listTypeAduanStatusAduan.includes(this.typeAduanPage)
      ) {
        const statusColor = this.complaintStatus[statusId].statusColor.find(
          statusColor => statusColor.typeAduan === this.typeAduanPage
        )
        switch (statusColor.color) {
          case 'yellow':
            return 'bg-[#FF7500]'
          case 'green':
            return 'bg-green-700'
          case 'red':
            return 'bg-[#DD5E5E]'
          default:
            return 'bg-gray-900'
        }
      }
    },
    clickButtonConfirmationHandle (idButton) {
      switch (idButton) {
        case this.complaintButtonDetail.verified.idButton:
          return this.showPopupConfirmationVerificationComplaintHandle(
            this.detailComplaint
          )
        case this.complaintButtonDetail.failed.idButton:
          return this.showPopupConfirmationFailedComplaintHandle(
            this.detailComplaint
          )
        case this.complaintButtonDetail.addIdSpan.idButton:
          return this.showPopupInputIdSpanHandle(this.detailComplaint)
        case this.complaintButtonDetail.complaintProcess.idButton:
          return this.showPopupProcessComplaintHandle(this.detailComplaint)
      }
    },
    showViewPhotoDialogHandle (url) {
      this.photo.showPopup = true
      this.photo.url = 'loading'
      this.photo.url = url
    },
    showPopupDetailStatusComplaintHandle (detailComplaint) {
      this.isShowPopupDetailStatusComplaint = true
      this.dataDialog = {
        subDescription: detailComplaint.complaint_id
      }
    },
    showIdSpanLaporHandle (statusId) {
      switch (this.typeAduanPage) {
        case this.typeAduan.aduanDialihkanSpanLapor.props:
          return true
        case this.typeAduan.penentuanKewenangan.props:
          if (statusId === this.complaintStatus.verified.id) {
            return true
          }
          break
        default:
          return false
      }
    },
    goToBackHandle () {
      this.$router.back()
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
