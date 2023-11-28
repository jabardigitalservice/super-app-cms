<template>
  <div>
    <h1 class="my-4 font-roboto text-[16px] font-bold text-blue-gray-800">
      Detail Intruksi Khusus Pimpinan
    </h1>
    <div class="table-content">
      <BaseTableDetail header="Informasi Umum" class="mb-4">
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Narasi IKP </strong>
          </td>
          <td>
            <strong>({{ detailIKP?.id || "-" }})</strong>
            {{ detailIKP?.narrative }}
          </td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Jumlah Aduan </strong>
          </td>
          <td>{{ detailIKP?.complaint_total || "-" }}</td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Status </strong>
          </td>
          <td>
            <div class="flex items-center">
              <div
                v-if="detailIKP?.complaint_status_id"
                :class="[
                  ' mr-2 h-2 w-2 rounded-full',
                  getStatusColorHandle(detailIKP?.complaint_status_id),
                ]"
              />

              {{ getStatusText(detailIKP?.complaint_status_id) }}
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Keterangan </strong>
          </td>
          <td>{{ detailIKP?.description || "-" }}</td>
        </tr>
      </basetabledetail>
    </div>

    <BaseTableDetail header="Tanggal" class="mb-4">
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Tanggal Dibuat </strong>
        </td>
        <td>{{ detailIKP?.created_at || "-" }}</td>
      </tr>
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Tanggal Deadline </strong>
        </td>
        <td>{{ detailIKP?.deadline_at || "-" }}</td>
      </tr>
    </BaseTableDetail>

    <BaseTableDetail header="Indikator" class="mb-4">
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Indikator Nilai </strong>
        </td>
        <td>{{ detailIKP?.indicator_value || "-" }}</td>
      </tr>
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Indikator Satuan </strong>
        </td>
        <td>{{ detailIKP?.indicator_unit || "-" }}</td>
      </tr>
    </BaseTableDetail>

    <BaseTableDetail header="Lainnya" class="mb-4">
      <tr>
        <td class="text-lato w-[164px] text-[14px]">
          <strong>Perangkat Daerah </strong>
        </td>
        <td>{{ detailIKP?.opd_name || "-" }}</td>
      </tr>
    </BaseTableDetail>

    <div v-if="detailIKP?.complaints?.length > 0 && showDaftarAduan" class="rounded-lg border border-gray-200">
      <jds-simple-table>
        <thead class="h-[42px] py-[6px]">
          <tr>
            <th>
              <h1 class="font-roboto text-[10px] font-bold text-white">
                Daftar Aduan
              </h1>
            </th>
            <th>
              <h1 class="font-roboto text-[10px] font-bold text-white">
                Aksi
              </h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in detailIKP?.complaints" :key="index">
            <td class="text-lato w-[80%] text-[14px]">
              {{ item?.complaint_id }}
            </td>
            <td>
              <BaseButton
                class="w-full !py-[6px] !px-[10px]  border border-green-700 text-green-700 hover:bg-green-50"
              >
                Lihat Detail Aduan
              </BaseButton>
            </td>
          </tr>
        </tbody>
      </jds-simple-table>
    </div>
  </div>
  </div>
</template>

<script>
import { ikpStatus } from '~/constant/daftar-ikp'
export default {
  name: 'DaftarIKPTableDetail',
  props: {
    detailIKP: {
      type: Object,
      default: () => ({})
    },
    showDaftarAduan: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getStatusText (status) {
      switch (status) {
        case ikpStatus.followup.id:
          return ikpStatus.followup.name
        case ikpStatus.finished.id:
          return ikpStatus.finished.name
        default:
          return '-'
      }
    },
    getStatusColorHandle (status) {
      switch (status) {
        case ikpStatus.followup.id:
          return 'bg-[#FF7500]'
        case ikpStatus.finished.id:
          return 'bg-green-700'
        default:
          return 'bg-gray-900'
      }
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
