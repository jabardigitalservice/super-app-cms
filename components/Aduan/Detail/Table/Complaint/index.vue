<template>
  <div>
    <h1 class="mb-4 font-roboto text-[16px] font-bold text-blue-gray-800">
      Detail Aduan Warga
    </h1>

    <BaseLoading v-if="isLoading" />

    <template v-else>
      <div
        v-if="typeAduan.aduanDariSpanLapor.props !== typeAduanPage"
        class="table-content"
      >
        <BaseTableDetail header="Informasi Umum" class="mb-4">
          <tr>
            <td class="text-lato w-[164px]">
              <strong class="text-[10px]">ID Aduan </strong>
            </td>
            <td>{{ detailComplaint?.complaint_id || '-' }}</td>
          </tr>
          <tr
            v-if="showIdSpanLaporHandle(detailComplaint?.complaint_status_id)"
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
                {{ detailComplaint?.sp4n_id || 'Belum ada' }}
              </div>
            </td>
          </tr>
          <tr v-if="typeAduan.penentuanKewenangan.props === typeAduanPage">
            <td><strong>Sumber Aduan</strong></td>
            <td>{{ detailComplaint?.complaint_source?.name || '-' }}</td>
          </tr>
          <tr>
            <td><strong>Tanggal Aduan Masuk</strong></td>
            <td>{{ detailComplaint?.created_at_format }}</td>
          </tr>
          <tr
            v-if="typeAduan.aduanDialihkanHotlineJabar.props === typeAduanPage"
          >
            <td><strong>Tanggal Deadline</strong></td>
            <td>{{ detailComplaint?.deadline_at_format }}</td>
          </tr>
          <tr
            v-if="
              typeAduanPage === typeAduan.aduanDialihkanSpanLapor.props ||
              typeAduanPage === typeAduan.instruksiKewenanganNonPemprov.props
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
                      !detailComplaint?.sp4n_created_at &&
                      !detailComplaint?.sp4n_added_at,
                  }"
                />
                {{
                  detailComplaint?.sp4n_created_at_format ||
                  detailComplaint?.sp4n_added_at_format ||
                  'Belum ada'
                }}
              </div>
            </td>
          </tr>
          <tr v-if="listTypeAduanByStatusAduan.includes(typeAduanPage)">
            <td><strong>Status</strong></td>
            <td>
              <div class="flex items-center">
                <div
                  v-if="detailComplaint?.complaint_status_id"
                  :class="[
                    ' mr-2 h-2 w-2 rounded-full',
                    getStatusColorHandle(detailComplaint?.complaint_status_id),
                  ]"
                />
                {{ getStatusText(detailComplaint?.complaint_status_id) || '-' }}
              </div>
            </td>
          </tr>
          <tr
            v-if="
              typeAduanPage === typeAduan.aduanMasuk.props &&
              detailComplaint?.complaint_status_note
            "
          >
            <td><strong>Alasan</strong></td>
            <td>{{ detailComplaint?.complaint_status_note }}</td>
          </tr>
          <tr
            v-if="typeAduanPage === typeAduan.aduanDialihkanHotlineJabar.props"
          >
            <td width="240px">
              <strong>Alasan Dialihkan ke Hotline Jabar</strong>
            </td>
            <td>
              {{ detailComplaint?.directed_to_hotline_jabar_note || '-' }}
            </td>
          </tr>
          <tr
            v-if="
              showDataByComplaintTypeStatus([
                complaintStatus.rejected,
                complaintStatus.verified,
              ])
            "
          >
            <td><strong>Cakupan Urusan</strong></td>
            <td>{{ detailComplaint?.coverage_of_affairs || '-' }}</td>
          </tr>
          <tr
            v-if="
              detailComplaint?.complaint_status_id ===
                complaintStatus.postponed.id ||
              detailComplaint?.complaint_status_id === complaintStatus.review.id
            "
          >
            <td><strong>Perubahan Deadline</strong></td>
            <td>{{ detailComplaint?.ikp_deadline_at_format || '-' }}</td>
          </tr>
          <tr
            v-if="
              (detailComplaint?.complaint_status_id ===
                complaintStatus.postponed.id ||
                detailComplaint?.complaint_status_id ===
                  complaintStatus.review.id ||
                detailComplaint?.complaint_status_id ===
                  complaintStatus.finished.id) &&
              listEvidenceDocument
            "
          >
            <td><strong>Dokumen Bukti</strong></td>
            <td>
              <jds-button
                variant="secondary"
                class="!border-green-600 !text-sm !font-medium !text-green-600"
                @click="showPopupViewDocument()"
              >
                Lihat Dokumen Bukti
              </jds-button>
            </td>
          </tr>
        </BaseTableDetail>
        <BaseTableDetail
          v-if="
            typeAduan.aduanDialihkanSpanLapor.props === typeAduanPage &&
            detailComplaint?.sp4n_id
          "
          header="Status SPAN Lapor"
          class="mb-4"
        >
          <tr>
            <td class="w-[180px] px-2">Status SP4N Lapor</td>
            <td class="px-2 py-[6px]">
              <jds-button
                variant="secondary"
                class="!border-green-600 !text-sm !font-medium !text-green-600"
                @click="showPopupTrackingSpan(detailComplaint)"
              >
                Lihat Semua Status
              </jds-button>
            </td>
          </tr>
        </BaseTableDetail>
        <BaseTableDetail
          v-if="
            showDataByComplaintTypeStatus([
              complaintStatus.rejected,
              complaintStatus.verified,
            ])
          "
          header="Informasi Instansi"
          class="mb-4"
        >
          <tr>
            <td class="w-[180px]">
              <strong>Nama Instansi</strong>
            </td>
            <td>{{ detailComplaint?.opd_name || '-' }}</td>
          </tr>
          <tr
            v-if="
              showDataByComplaintTypeStatus([
                complaintStatus.rejected,
                complaintStatus.diverted_to_span,
              ])
            "
          >
            <td><strong>Nama Kepala Perangkat Daerah</strong></td>
            <td>{{ detailComplaint?.opd_pic || '-' }}</td>
          </tr>
        </BaseTableDetail>
        <BaseTableDetail
          v-if="showDataByComplaintTypeStatus([complaintStatus.verified])"
          header="Informasi Lainnya"
          class="mb-4"
        >
          <tr
            v-if="
              showDataByComplaintTypeStatus([
                complaintStatus.rejected,
                complaintStatus.diverted_to_span,
              ])
            "
          >
            <td class="w-[180px]">
              <strong>Tanggal Deadline</strong>
            </td>
            <td>{{ detailComplaint?.deadline_at_format || '-' }}</td>
          </tr>
          <tr
            v-if="
              showDataByComplaintTypeStatus([
                complaintStatus.rejected,
                complaintStatus.diverted_to_span,
              ])
            "
          >
            <td><strong>Tingkat Urgensi</strong></td>
            <td>{{ detailComplaint?.urgency_level || '-' }}</td>
          </tr>
          <tr v-if="showDataByComplaintTypeStatus([complaintStatus.verified])">
            <td class="w-[180px]">
              <strong>Keterangan Status</strong>
            </td>
            <td>{{ detailComplaint?.status_description || '-' }}</td>
          </tr>
        </BaseTableDetail>
        <BaseTableDetail header="Informasi Pelapor" class="mb-4">
          <tr>
            <td
              :width="
                typeAduanPage === typeAduan.aduanDialihkanHotlineJabar.props
                  ? '240px'
                  : '180px'
              "
            >
              <strong class="text-[10px]">Nama Lengkap </strong>
            </td>
            <td>{{ detailComplaint?.user_name || '-' }}</td>
          </tr>
          <tr>
            <td><strong>No. Kontak</strong></td>
            <td>{{ detailComplaint?.user_phone || '-' }}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>{{ detailComplaint?.user_email || '-' }}</td>
          </tr>
          <tr>
            <td><strong>Jenis Aduan</strong></td>
            <td>{{ showComplaintType()}}</td>
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
            <td
              :width="
                typeAduanPage === typeAduan.aduanDialihkanHotlineJabar.props
                  ? '240px'
                  : '180px'
              "
            >
              <strong class="text-[10px]">Kategori Aduan </strong>
            </td>
            <td>
              {{ getCategoryName() }}
            </td>
          </tr>
          <tr>
            <td><strong>Sub Kategori Aduan</strong></td>
            <td>
              {{ getSubCategoryName() }}
            </td>
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
            <td colspan="2"><strong>Lokasi Kejadian</strong></td>
          </tr>
          <tr>
            <td>Kabupaten / Kota</td>
            <td>{{ detailComplaint?.city_name || '-' }}</td>
          </tr>
          <tr>
            <td>Kecamatan</td>
            <td>{{ detailComplaint?.district_name || '-' }}</td>
          </tr>
          <tr>
            <td>Kelurahan</td>
            <td>{{ detailComplaint?.subdistrict_name || '-' }}</td>
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
            <td class="align-top">Map</td>
            <td>
              <iframe
                v-if="detailComplaint?.latitude && detailComplaint?.longitude"
                class="rounded-lg"
                width="389"
                height="245"
                frameborder="0"
                style="border: 0"
                referrerpolicy="no-referrer-when-downgrade"
                :src="`https://www.google.com/maps/embed/v1/place?key=${$config.googleMapsApiKey}&q=${detailComplaint?.latitude},${detailComplaint?.longitude}`"
              />
              <div v-else>-</div>
            </td>
          </tr>
        </BaseTableDetail>
        <BaseTableDetail v-if="detailComplaint?.photos" header="Bukti Foto">
          <tr>
            <td class="w-[180px] px-2">
              <strong>{{ listPhoto.length }} Foto</strong>
            </td>
            <td class="px-2 py-[6px]">
              <jds-button
                variant="secondary"
                class="w-[100px] !border-green-600 !text-sm !font-medium !text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="listPhoto.length === 0"
                @click="$emit('button-image')"
              >
                Lihat Foto
              </jds-button>
            </td>
          </tr>
        </BaseTableDetail>
      </div>
      <!-- DETAIL COMPLAINT FROM SPAN LAPOR -->
      <div v-else class="table-content">
        <BaseTableDetail header="Informasi Aduan" class="mb-4">
          <tr>
            <td class="w-[205px]">
              <strong>ID Aduan Sapawarga</strong>
            </td>
            <td>{{ detailComplaint?.complaint_id || '-' }}</td>
          </tr>
          <tr>
            <td><strong>ID SP4N Lapor</strong></td>
            <td>{{ detailComplaint?.sp4n_id || '-' }}</td>
          </tr>
          <tr>
            <td><strong>Tanggal Laporan Masuk</strong></td>
            <td>{{ detailComplaint?.sp4n_created_at_format || '-' }}</td>
          </tr>
          <tr>
            <td><strong>Tanggal Diinput ke Sapawarga</strong></td>
            <td>{{ detailComplaint?.created_at_format }}</td>
          </tr>
          <tr>
            <td><strong>Nama Lengkap</strong></td>
            <td>{{ detailComplaint?.user_name || '-' }}</td>
          </tr>
          <tr>
            <td><strong>Judul Aduan</strong></td>
            <td>{{ detailComplaint?.title || '-' }}</td>
          </tr>
          <tr>
            <td><strong>Detail Aduan</strong></td>
            <td>{{ detailComplaint?.description || '-' }}</td>
          </tr>
        </BaseTableDetail>
        <BaseTableDetail header="Lokasi Aduan" class="mb-4">
          <tr>
            <td class="w-[205px]">Kabupaten / Kota</td>
            <td>{{ detailComplaint?.city_name || '-' }}</td>
          </tr>
          <tr>
            <td>Kecamatan</td>
            <td>{{ detailComplaint?.district_name || '-' }}</td>
          </tr>
          <tr>
            <td>Kelurahan</td>
            <td>{{ detailComplaint?.subdistrict_name || '-' }}</td>
          </tr>
          <tr colspan="2">
            <td>Detail Lokasi Kejadian</td>
            <td>{{ detailComplaint?.address_detail || '-' }}</td>
          </tr>
        </BaseTableDetail>
        <BaseTableDetail header="Lainnya">
          <tr>
            <td class="w-[205px]">
              <strong class="text-[10px]">Kategori Aduan </strong>
            </td>
            <td>
              {{ getCategoryName() }}
            </td>
          </tr>
          <tr v-if="detailComplaint?.complaint_category?.id !== 'lainnya'">
            <td><strong>Sub Kategori Aduan</strong></td>
            <td>
              {{ getSubCategoryName() }}
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
    </template>

    <DialogViewDocument
      v-if="isShowPopupViewDocument"
      :show-popup="isShowPopupViewDocument"
      :list-file-document="listFileDocument"
      :list-file-image="listFileImage"
      @close="isShowPopupViewDocument = false"
    />
    <DialogTrackingSpanLapor
      v-if="isShowPopupTrackingSpan"
      :show-popup="isShowPopupTrackingSpan"
      :data-dialog="dataDialog"
      @close="isShowPopupTrackingSpan = false"
    />
  </div>
</template>

<script>
import DialogTrackingSpanLapor from '~/components/Aduan/Dialog/TrackingSpanLapor'
import DialogViewDocument from '~/components/Aduan/Dialog/ViewDocument'
import { complaintStatus, typeAduan } from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'DetailAduanMasuk',
  components: { DialogViewDocument, DialogTrackingSpanLapor },
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
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listTab: [
        {
          name: 'Detail Aduan',
          icon: '/icon/icon-aduan/complaint-detail.svg',
        },
      ],
      selectedTabIndex: 0,
      dataCategory: {
        key: 'complaint_category',
        subKey: 'complaint_subcategory',
        valueSearch: 'lainnya',
      },
      dataSubCategory: {
        key: 'complaint_subcategory',
        subKey: 'complaint_subcategory_child',
        valueSearch: 'lainnya-terkait',
      },
      typeAduan,
      listAllFile: [],
      listFileDocument: [],
      listFileImage: [],
      isShowPopupViewDocument: false,
      isShowPopupTrackingSpan: false,
    }
  },
  computed: {
    // to get type aduan which will show status aduan
    listTypeAduanByStatusAduan() {
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
    },
    listEvidenceDocument() {
      return this.detailComplaint.ikp?.evidence
    },
  },
  methods: {
    findComplaintStatus(listComplaintStatus) {
      return listComplaintStatus.find(
        (item) => item.id === this.detailComplaint?.complaint_status_id
      )
    },
    getCoordinatHandle() {
      if (this.detailComplaint?.longitude && this.detailComplaint?.latitude) {
        return `${this.detailComplaint.latitude}, ${this.detailComplaint.longitude}`
      } else {
        return '-'
      }
    },
    getCategoryName() {
      const category = this.detailComplaint?.complaint_category?.name || '-'
      if (this.detailComplaint?.complaint_category_child_id) {
        return `${category} - ${this.detailComplaint?.complaint_category_child?.name}`
      }
      return category
    },
    getSubCategoryName() {
      let subCategory = '-'
      if (this.detailComplaint?.complaint_subcategory?.name) {
        subCategory = this.detailComplaint?.complaint_subcategory?.name
        subCategory = subCategory
          .replace(this.detailComplaint?.complaint_category?.name, ' ')
          .trim()
      }

      if (this.detailComplaint?.complaint_subcategory_child_id) {
        return `${subCategory} - ${this.detailComplaint?.complaint_subcategory_child?.name}`
      }
      return subCategory
    },
    getStatusText(statusId) {
      if (
        this.typeAduanPage === typeAduan.instruksiKewenanganNonPemprov.props &&
        statusId === 'coordinated'
      ) {
        return 'Sudah Dikoordinasikan'
      }
      return complaintStatus[statusId]?.name
    },
    getStatusColorHandle(statusId) {
      if (
        statusId &&
        this.listTypeAduanByStatusAduan.includes(this.typeAduanPage)
      ) {
        const statusColor = this.complaintStatus[statusId].statusColor.find(
          (statusColor) => statusColor.typeAduan.includes(this.typeAduanPage)
        )
        switch (statusColor?.color) {
          case 'yellow':
            return 'bg-[#FF7500]'
          case 'green':
            return 'bg-green-700'
          case 'red':
            return 'bg-[#DD5E5E]'
          case 'light-blue':
            return 'bg-[#1E88E5]'
          case 'dark-blue':
            return 'bg-blue-gray-500'
          case 'purple':
            return 'bg-purple-600'
          default:
            return 'bg-gray-900'
        }
      }
    },
    showIdSpanLaporHandle(statusId) {
      switch (this.typeAduanPage) {
        case this.typeAduan.aduanDialihkanSpanLapor.props:
        case this.typeAduan.instruksiKewenanganNonPemprov.props:
        case this.typeAduan.instruksiNonPemprov.props:
          return true
        case this.typeAduan.penentuanKewenangan.props:
          {
            const complaintSource =
              this.detailComplaint?.complaint_source === 'SP4N Lapor'
            const complaintStatus =
              statusId === this.complaintStatus.coordinated.id ||
              statusId === this.complaintStatus.verified.id
            if (complaintSource && complaintStatus) {
              return true
            }
          }

          break
        default:
          return false
      }
    },
    showComplaintType(){
      let complaintType = ''
      if(this.detailComplaint?.type){
        complaintType = this.detailComplaint?.type==='public' ? 'publik' : 'rahasia'
      }

      if(this.detailComplaint.is_anonymous && this.detailComplaint?.type==='public'){
        return `${complaintType} - anomin`
      }

      return complaintType || '-'
    },
    getDataFile(dataUrl) {
      const file = dataUrl.split('/').pop()
      const fileType = file.split('.')[1]
      return { name: file, type: fileType, url: dataUrl }
    },
    showPopupViewDocument() {
      this.listAllFile = this.listEvidenceDocument.map((item) =>
        this.getDataFile(item)
      )
      const listTypeDocument = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'pdf',
        'ppt',
        'pptx',
      ]
      const listTypeImage = ['png', 'jpg', 'jpeg']
      this.listFileDocument = this.listAllFile.filter((dataDocument) =>
        listTypeDocument.includes(dataDocument.type)
      )
      this.listFileImage = this.listAllFile.filter((dataImage) =>
        listTypeImage.includes(dataImage.type)
      )
      this.isShowPopupViewDocument = true
    },
    showDataByComplaintTypeStatus(listFilter) {
      const listComplaintType = [
        typeAduan.penentuanKewenangan.props,
        typeAduan.instruksiKewenanganPemprov.props,
      ]
      return (
        listComplaintType.includes(this.typeAduanPage) &&
        this.findComplaintStatus(this.filterComplaintStatus(listFilter))
      )
    },
    showPopupTrackingSpan(detailComplaint) {
      this.isShowPopupTrackingSpan = true
      this.dataDialog = {
        subDescription: detailComplaint.complaint_id,
      }
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
</style>
