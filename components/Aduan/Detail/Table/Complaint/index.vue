<template>
  <div>
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
        <tr v-if="showIdSpanLaporHandle(detailComplaint?.complaint_status_id)">
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
        <tr v-if="typeAduan.penentuanKewenangan.props === typeAduanPage">
          <td><strong>Sumber Aduan</strong></td>
          <td>{{ detailComplaint?.complaint_source || "-" }}</td>
        </tr>
        <tr>
          <td><strong>Tanggal Aduan Masuk</strong></td>
          <td>{{ detailComplaint?.created_at_format }}</td>
        </tr>
        <tr v-if="typeAduanPage === typeAduan.aduanDialihkanSpanLapor.props">
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
              {{ detailComplaint?.complaint_status?.name || "-" }}
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
          v-if="
            showDataByComplaintTypeStatus([
              complaintStatus.rejected,
              complaintStatus.verified,
            ])
          "
        >
          <td><strong>Cakupan Urusan</strong></td>
          <td>{{ detailComplaint?.coverage_of_affairs || "-" }}</td>
        </tr>
        <tr
          v-if="
            detailComplaint?.complaint_status_id ===
              complaintStatus.postponed.id ||
              detailComplaint?.complaint_status_id === complaintStatus.review.id
          "
        >
          <td><strong>Perubahan Deadline</strong></td>
          <td>-</td>
        </tr>
        <tr
          v-if="
            detailComplaint?.complaint_status_id ===
              complaintStatus.postponed.id ||
              detailComplaint?.complaint_status_id === complaintStatus.review.id
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
              @click="showPopupDetailStatusComplaintHandle(detailComplaint)"
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
          <td>{{ detailComplaint?.opd_name || "-" }}</td>
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
          <td>{{ detailComplaint?.opd_pic || "-" }}</td>
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
          <td>{{ detailComplaint?.deadline_date || "-" }}</td>
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
          <td>{{ detailComplaint?.urgency_level || "-" }}</td>
        </tr>
        <tr v-if="showDataByComplaintTypeStatus([complaintStatus.verified])">
          <td class="w-[180px]">
            <strong>Keterangan Status</strong>
          </td>
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
          <td>
            {{ getSubCategoryName(dataCategory) }}
          </td>
        </tr>
        <tr v-if="detailComplaint?.complaint_category?.id !== 'lainnya'">
          <td><strong>Sub Kategori Aduan</strong></td>
          <td>
            {{ getSubCategoryName(dataSubCategory) }}
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
              v-if="detailComplaint?.latitude && detailComplaint?.longitude"
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
      </BaseTableDetail>
      <BaseTableDetail header="Lainnya">
        <tr>
          <td class="w-[205px]">
            <strong class="text-[10px]">Kategori Aduan </strong>
          </td>
          <td>
            {{ getSubCategoryName(dataCategory) }}
          </td>
        </tr>
        <tr v-if="detailComplaint?.complaint_category?.id !== 'lainnya'">
          <td><strong>Sub Kategori Aduan</strong></td>
          <td>
            {{ getSubCategoryName(dataSubCategory) }}
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
    <DialogViewDocument
      :show-popup="isShowPopupViewDocument"
      :list-file-document="listFileDocument"
      :list-file-image="listFileImage"
      @close="isShowPopupViewDocument = false"
    />
  </div>
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'
import DialogViewDocument from '~/components/Aduan/Dialog/ViewDocument'

export default {
  name: 'DetailAduanMasuk',
  components: { DialogViewDocument },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: String,
      default: ''
    },
    detailComplaint: {
      type: Object,
      default: () => ({})
    },
    listPhoto: {
      type: Array,
      default: () => ([])
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
      selectedTabIndex: 0,
      dataCategory: {
        key: 'complaint_category',
        subKey: 'complaint_subcategory',
        valueSearch: 'lainnya'
      },
      dataSubCategory: {
        key: 'complaint_subcategory',
        subKey: 'complaint_subcategory_child',
        valueSearch: 'lainnya-terkait'
      },
      typeAduan,
      listUrlFile: [
        'http://101.50.0.202:12002/trk/img/lim/Screenshot 20231009 100616.png',
        'http://101.50.0.202:12002/trk/img/lim/Kanomodeltemplate.pdf'
      ],
      listAllFile: [],
      listFileDocument: [],
      listFileImage: [],
      isShowPopupViewDocument: false
    }
  },
  computed: {
    // to get type aduan which will show status aduan
    listTypeAduanByStatusAduan () {
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
  methods: {
    findComplaintStatus (listComplaintStatus) {
      return listComplaintStatus.find(
        item => item.id === this.detailComplaint?.complaint_status_id
      )
    },
    getCoordinatHandle () {
      if (this.detailComplaint?.longitude && this.detailComplaint?.latitude) {
        return `${this.detailComplaint.latitude}, ${this.detailComplaint.longitude}`
      } else {
        return '-'
      }
    },

    getSubCategoryName (dataSubcategory) {
      // check if detail complaint by key has property object
      const hasSubcategory =
        Object.keys(this.detailComplaint) ||
        Object.keys[this.detailComplaint[dataSubcategory.key]]

      // guard clauses if don't have sub category
      if (!hasSubcategory) {
        return '-'
      }

      if (
        this.detailComplaint[dataSubcategory.key]?.id.includes(
          dataSubcategory.valueSearch
        ) &&
        this.detailComplaint[dataSubcategory.subKey]
      ) {
        return `${this.detailComplaint[dataSubcategory.key]?.name} - ${
          this.detailComplaint[dataSubcategory.subKey]?.name
        }`
      }

      return this.detailComplaint[dataSubcategory.key]?.name
    },
    getStatusColorHandle (statusId) {
      if (
        statusId &&
        this.listTypeAduanByStatusAduan.includes(this.typeAduanPage)
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
    getDataFile (dataUrl) {
      const file = dataUrl.split('/').pop()
      const fileType = file.split('.')[1]
      return { name: file, type: fileType, url: dataUrl }
    },
    showPopupViewDocument () {
      this.listAllFile = this.listUrlFile.map(item => this.getDataFile(item))
      const listTypeDocument = ['doc', 'docx', 'xls', 'xlsx', 'pdf']
      const listTypeImage = ['png', 'jpg']
      this.listFileDocument = this.listAllFile.filter(dataDocument =>
        listTypeDocument.includes(dataDocument.type)
      )
      this.listFileImage = this.listAllFile.filter(dataImage =>
        listTypeImage.includes(dataImage.type)
      )
      this.isShowPopupViewDocument = true
    },
    showDataByComplaintTypeStatus (listFilter) {
      const listComplaintType = [
        typeAduan.penentuanKewenangan.props,
        typeAduan.penginputanIkp.props
      ]
      return (
        listComplaintType.includes(this.typeAduanPage) &&
        this.findComplaintStatus(this.filterComplaintStatus(listFilter))
      )
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
