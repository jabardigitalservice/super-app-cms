<template>
  <div>
    <h1 class="mb-4 font-roboto text-[16px] font-bold text-blue-gray-800">
      Detail Instruksi Aduan
    </h1>
    <div class="table-content">
      <BaseTableDetail header="Informasi Umum" class="mb-4">
        <tr>
          <td
            class="text-lato text-[14px]"
            :width="
              typeAduan.instruksiKewenanganNonPemprov.props === ikpTypePage
                ? '244px'
                : '164px'
            "
          >
            <strong>Narasi Instruksi </strong>
          </td>
          <td v-html="formatingInstructionalNarrative()" />
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Jumlah Aduan </strong>
          </td>
          <td>{{ dataDetail?.complaints_count }}</td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Status </strong>
          </td>
          <td>
            <div class="flex items-center">
              <div
                v-if="dataDetail?.complaint_status_id"
                :class="[
                  ' mr-2 h-2 w-2 rounded-full',
                  getStatusColorHandle(dataDetail?.complaint_status_id),
                ]"
              />

              {{ getStatusText(dataDetail?.complaint_status_id) }}
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Keterangan </strong>
          </td>
          <td>{{ dataDetail?.description || '-' }}</td>
        </tr>
      </BaseTableDetail>
    </div>

    <BaseTableDetail header="Tanggal" class="mb-4">
      <tr>
        <td
          class="text-lato text-[14px]"
          :width="
            typeAduan.instruksiKewenanganNonPemprov.props === ikpTypePage
              ? '244px'
              : '164px'
          "
        >
          <strong>Tanggal Dibuat </strong>
        </td>
        <td>{{ dataDetail?.created_at || '-' }}</td>
      </tr>
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Tanggal Deadline </strong>
        </td>
        <td>{{ dataDetail?.deadline_at || '-' }}</td>
      </tr>
    </BaseTableDetail>

    <BaseTableDetail
      v-if="ikpTypePage !== typeAduan.instruksiKewenanganNonPemprov.props"
      header="Indikator"
      class="mb-4"
    >
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Indikator Nilai </strong>
        </td>
        <td>{{ dataDetail?.indicator_value || '-' }}</td>
      </tr>
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Indikator Satuan </strong>
        </td>
        <td>{{ dataDetail?.indicator_unit || '-' }}</td>
      </tr>
    </BaseTableDetail>

    <BaseTableDetail
      v-if="ikpTypePage === typeAduan.instruksiKewenanganNonPemprov.props"
      header="Lainnya"
      class="mb-4"
    >
      <tr>
        <td class="text-lato text-[14px]" width="244px">
          <strong>Cakupan urusan </strong>
        </td>
        <td>{{ dataDetail?.scope_of_affairs || '-' }}</td>
      </tr>
      <tr>
        <td class="text-lato text-[14px]" width="244px">
          <strong>Instansi Penanggung Jawab </strong>
        </td>
        <td>{{ dataDetail?.responsible_agency || '-' }}</td>
      </tr>
      <tr>
        <td class="text-lato text-[14px]" width="244px">
          <strong>OPD Pemprov Penanggung Jawab </strong>
        </td>
        <td>{{ dataDetail?.responsible_provincial_government_opd || '-' }}</td>
      </tr>
    </BaseTableDetail>
    <div
      v-if="dataDetail?.complaints?.length > 0 && showDaftarAduan"
      class="rounded-lg border border-gray-200"
    >
      <jds-data-table
        :headers="filterHeaderTableComplaint()"
        :items="dataDetail?.complaints"
        class="default-table"
        :class="{
          'non-government-table':
            ikpTypePage === typeAduan.instruksiKewenanganNonPemprov.props,
        }"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <BaseButton
            class="w-full border border-green-700 !py-[6px] !px-[10px] text-green-700 hover:bg-green-50"
            @click="goToDetailComplaint(item.id, item.ikp_code)"
          >
            Lihat Detail Aduan
          </BaseButton>
        </template>
      </jds-data-table>
    </div>
  </div>
</template>

<script>
import { ikpStatus } from '~/constant/daftar-ikp'
import { typeAduan } from '~/constant/aduan-masuk'
import { formatDate } from '~/utils'
export default {
  name: 'DaftarIKPTableDetail',
  props: {
    showDaftarAduan: {
      type: Boolean,
      default: false,
    },
    ikpCode: {
      type: String,
      default: '',
    },
    ikpTypePage: {
      type: String,
      default: '',
    },
    detailComplaintLink: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataDetail: {},
      headerTableComplaint: [
        { key: 'complaint_id', text: 'Daftar Aduan' },
        { key: 'sp4n_id', text: 'ID SP4N Lapor' },
        { key: 'action', text: 'Aksi' },
      ],
      typeAduan,
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get(`/warga/ikp/${this.ikpCode}`)
      this.dataDetail = response.data.data
      this.dataDetail.created_at =
        formatDate(this.dataDetail.created_at || '', 'dd/MM/yyyy HH:mm') || '-'

      this.dataDetail.deadline_at =
        formatDate(this.dataDetail.deadline_at || '', 'dd/MM/yyyy HH:mm') || '-'
    } catch (error) {
      this.dataDetail = {}
    }
  },
  methods: {
    filterHeaderTableComplaint() {
      return this.headerTableComplaint.filter((item) =>
        this.typeAduan.instruksiKewenanganNonPemprov.props !== this.ikpTypePage
          ? item.key !== 'sp4n_id'
          : item
      )
    },
    formatingInstructionalNarrative() {
      let result = '-'
      if (this.dataDetail?.ikp_code) {
        result = `<strong>(${this.dataDetail?.ikp_code})</strong> ${this.dataDetail?.narrative}`
      }
      return result
    },
    getStatusText(status) {
      switch (status) {
        case ikpStatus.coordinated.id:
          return ikpStatus.coordinated.name
        case ikpStatus.followup.id:
          return ikpStatus.followup.name
        case ikpStatus.postponed.id:
          return ikpStatus.postponed.name
        case ikpStatus.review.id:
          return ikpStatus.review.name
        case ikpStatus.finished.id:
          return ikpStatus.finished.name
        default:
          return '-'
      }
    },
    getStatusColorHandle(status) {
      const ikpStatusColor = ikpStatus[status].statusColor
      let statusColor = {}
      if (Array.isArray(ikpStatusColor)) {
        statusColor = ikpStatusColor.find((statusColor) =>
          statusColor.ikpType.includes(this.ikpTypePage)
        )
      }

      const colorBackground = statusColor?.color || ikpStatusColor
      switch (colorBackground) {
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
          return 'bg-[#691B9A]'
        default:
          return 'bg-gray-900'
      }
    },
    goToDetailComplaint(idComplaint, ikpCode) {
      this.$router.push({
        path: `${this.detailComplaintLink}/${idComplaint}`,
        query: { ...this.$route.query, fromInstructionPage: true, ikpCode },
      })
      if (this.$route.params.id === idComplaint) {
        this.$emit('select-tab', 'all')
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

.non-government-table::v-deep td:nth-child(1) {
  @apply !w-[280px];
}

.default-table::v-deep td:nth-last-child(1),
.non-government-table::v-deep td:nth-last-child(1) {
  @apply !w-[162px];
}
</style>
