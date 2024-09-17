<template>
  <div>
    <h1 class="mb-4 font-roboto text-[16px] font-bold text-blue-gray-800">
      Detail Instruksi Aduan
    </h1>
    <div class="table-content">
      <BaseTableDetail
        v-for="keysField in Object.keys(fieldDetail)"
        :key="keysField"
        :header="fieldDetail[keysField].title"
        class="mb-4"
      >
        <tr v-for="field in fieldDetail[keysField].field" :key="field.name">
          <td
            class="text-lato text-[14px]"
            :width="
              ikpTypePage === ikpType.instruksiKewenanganNonPemprov.props ||
              ikpTypePage === ikpType.instruksiNonPemprov.props
                ? '244px'
                : '164px'
            "
          >
            <strong>{{ field.name }} </strong>
          </td>
          <td
            v-if="field.key === 'narrative'"
            v-html="formatingInstructionalNarrative()"
          />
          <td v-else-if="field.key === 'complaint_status_id'">
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
          <td
            v-else-if="
              field.key === 'created_at' || field.key === 'deadline_at'
            "
          >
            {{ formatDate(dataDetail[field.key] || '') || '-' }}
          </td>
          <td v-else>{{ dataDetail[field.key] || '' || '-' }}</td>
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
              ikpTypePage === ikpType.instruksiKewenanganNonPemprov.props ||
              ikpTypePage === ikpType.instruksiNonPemprov.props,
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
  </div>
</template>

<script>
import { ikpStatus, ikpType, detailField } from '~/constant/daftar-ikp'
import { formatDate } from '~/utils'
import detailInstruksiNonPemprov from '~/data/instruksi-non-pemprov-detail.json'

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
      ikpType,
      fieldDetail: {},
      formatDate,
    }
  },
  async fetch() {
    this.dataDetail = {}
    try {
      if (this.ikpTypePage === ikpType.instruksiNonPemprov.props) {
        this.dataDetail = detailInstruksiNonPemprov.data
      } else {
        const response = await this.$axios.get(`/warga/ikp/${this.ikpCode}`)
        this.dataDetail = response.data.data
      }
    } catch (error) {
      this.dataDetail = {}
    }
  },
  computed: {
    getDetailOtherField() {
      return detailField.others.field.filter((item) =>
        item.ikpType.includes(this.ikpTypePage)
      )
    },
  },
  mounted() {
    const dataFieldDetail = {}
    Object.keys(detailField).forEach((keyField) => {
      const isCheckColumn = this.checkDetailColumn(keyField)
      if (isCheckColumn) {
        dataFieldDetail[keyField] = detailField[keyField]
        dataFieldDetail[keyField] = {
          ...dataFieldDetail[keyField],
          field: this.filterDetailField(keyField),
        }
      }
    })

    this.fieldDetail = dataFieldDetail
  },
  methods: {
    checkDetailColumn(column) {
      return (
        detailField[column].ikpType.includes('all') ||
        detailField[column].ikpType.includes(this.ikpTypePage)
      )
    },
    filterDetailField(keyField) {
      return detailField[keyField].field.filter(
        (item) =>
          item.ikpType.includes('all') ||
          item.ikpType.includes(this.ikpTypePage)
      )
    },
    filterHeaderTableComplaint() {
      return this.headerTableComplaint.filter((item) =>
        this.ikpType.instruksiKewenanganNonPemprov.props !== this.ikpTypePage &&
        this.ikpType.instruksiNonPemprov.props !== this.ikpTypePage
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
          return this.ikpTypePage ===
            ikpType.instruksiKewenanganNonPemprov.props ||
            this.ikpTypePage === ikpType.instruksiNonPemprov.props
            ? 'Sudah Dikoordinasikan'
            : ikpStatus.coordinated.name
        case ikpStatus.not_yet_coordinated.id:
          return ikpStatus.not_yet_coordinated.name
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
