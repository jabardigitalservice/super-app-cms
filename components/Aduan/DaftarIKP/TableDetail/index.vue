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
          <td>{{ detailIKP?.complaint_status_id || "-" }}</td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Keterangan </strong>
          </td>
          <td>{{ detailIKP?.description || "-" }}</td>
        </tr>
      </BaseTableDetail>

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

      <div v-if="complaints.length > 0" class="rounded-lg border border-gray-200">
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
            <tr v-for="(item, index) in complaints" :key="index">
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
export default {
  name: 'DaftarIKPTableDetail',
  props: {
    detailIKP: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      complaints: [
        {
          id: '481e0d13-ac8d-4dc9-8791-4eb5962ddc1a',
          complaint_id: 'JBR010101010'
        },
        {
          id: '481e0d13-ac8d-4dc9-8791-12321',
          complaint_id: 'JBR01010112312'
        },
        {
          id: '481e0d13-ac8d-4dc9-8791-12321321',
          complaint_id: 'JBR55555'
        }
      ]
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
