<template>
  <div>
    <h1 class="mb-4 font-roboto text-[16px] font-bold text-blue-gray-800">
      Detail Aduan Warga
    </h1>

    <BaseLoading v-if="isLoad" />

    <template v-else-if="typeAduan.aduanDariSpanLapor.props !== typeAduanPage">
      <BaseTableDetail
        v-for="keysField in Object.keys(fieldDetail)"
        :key="keysField"
        :header="fieldDetail[keysField].title"
        class="table-content mb-4"
      >
        <tr v-for="field in fieldDetail[keysField].field" :key="field.name">
          <!-- START LABEL FIELD -->
          <td
            v-if="checkChildParentField(field.key, 'child')"
            :class="{
              'align-top': field.key === 'map',
              'w-[180px]':
                typeAduanPage === typeAduan.aduanDialihkanSpanLapor.props,
            }"
          >
            {{ field.name }}
          </td>
          <td
            v-else
            class="text-lato w-[164px] text-[14px]"
            :class="{
              'w-[180px]':
                detailComplaint?.coverage_of_affairs ===
                  'Pemerintah Kabupaten/Kota' ||
                fieldWidth180.includes(typeAduanPage),
              'w-60':
                typeAduanPage === typeAduan.aduanDialihkanHotlineJabar.props,
            }"
          >
            <strong>{{ field.name }} </strong>
          </td>
          <!-- END LABEL FIELD -->
          <td v-if="field.key === 'complaint_status_id'">
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
          <td v-else-if="field.key === 'complaint_type'">
            {{ showComplaintType() }}
          </td>
          <td v-else-if="field.key === 'complaint_source'">
            {{ detailComplaint[field.key]?.name }}
          </td>
          <td
            v-else-if="
              field.key === 'sp4n_id' || field.key === 'sp4n_created_at_format'
            "
          >
            <div class="flex items-center">
              <div
                :class="{
                  ' mr-2 h-2 w-2 rounded-full bg-[#FFB900]':
                    !detailComplaint[field.key],
                }"
              />
              {{ detailComplaint[field.key] || 'Belum ada' }}
            </div>
          </td>
          <td v-else-if="field.key === 'tracking_span'">
            <div>
              <jds-button
                variant="secondary"
                class="!border-green-600 !text-sm !font-medium !text-green-600"
                @click="showPopupTrackingSpan(detailComplaint)"
              >
                Lihat Semua Status
              </jds-button>
            </div>
          </td>
          <td v-else-if="field.key === 'document_evidence'">
            <jds-button
              variant="secondary"
              class="!border-green-600 !text-sm !font-medium !text-green-600"
              @click="showPopupViewDocument()"
            >
              Lihat Dokumen Bukti
            </jds-button>
          </td>
          <td v-else-if="field.key === 'coordinate'">
            {{ getCoordinatHandle() }}
          </td>
          <td v-else-if="field.key === 'complaint_category'">
            {{ getCategoryName() }}
          </td>
          <td v-else-if="field.key === 'complaint_sub_category'">
            {{ getSubCategoryName() }}
          </td>
          <td v-else-if="field.key === 'map'">
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
          <td v-else>{{ showDetailField(field.key) }}</td>
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
    </template>

    <!-- DETAIL COMPLAINT FROM SPAN LAPOR -->
    <template v-else>
      <div class="table-content">
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
    isLoad: {
      type: Boolean,
      default: false,
    },
    fieldDetail: {
      type: Object,
      default: () => ({}),
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
      fieldWidth180: [
        // for field detail page want width 180px
        typeAduan.aduanDialihkanSpanLapor.props,
        typeAduan.instruksiKewenanganPemprov.props,
        typeAduan.penentuanKewenangan.props,
      ],
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
    checkChildParentField(fieldKey, levelKey) {
      // for label not bold
      const listChildKey = [
        'coordinate',
        'city_name',
        'district_name',
        'subdistrict_name',
        'address_detail',
        'latitude',
        'longitude',
        'tracking_span',
        'map',
      ]

      // for label bold, but not field
      const listParentKey = [
        'incident_location',
        'incident_location_point',
        'report_location_point',
      ]
      return levelKey === 'parent'
        ? listParentKey.includes(fieldKey)
        : listChildKey.includes(fieldKey)
    },
    showDetailField(fieldKey) {
      if (this.checkChildParentField(fieldKey, 'parent')) {
        return ''
      }
      return this.detailComplaint[fieldKey] || '-'
    },
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
        typeAduan.aduanDialihkanSpanLapor.props,
        typeAduan.instruksiKewenanganNonPemprov.props,
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
    showComplaintType() {
      // show complaint type : public, public-anonim or private
      let complaintType = ''
      if (this.detailComplaint?.type) {
        complaintType =
          this.detailComplaint?.type === 'public' ? 'publik' : 'rahasia'
      }
      if (
        this.detailComplaint.is_anonymous &&
        this.detailComplaint?.type === 'public'
      ) {
        return `${complaintType} - anonim`
      }
      return complaintType || '-'
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
