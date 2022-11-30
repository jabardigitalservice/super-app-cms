<template>
  <div>
    <div v-if="isDataAvailable" class="rounded-lg overflow-x-scroll font-roboto table-content">
      <jds-simple-table>
        <thead class="border">
          <tr>
            <th>Kota/Kabupaten</th>
            <th>Kecamatan</th>
            <th>Kelurahan/Desa</th>
            <th>Dusun</th>
            <th>RT/RW</th>
            <th>Alamat Lengkap</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-gray-800">
            <td>{{ dataTable.city || '-' }}</td>
            <td>{{ dataTable.district || '-' }}</td>
            <td>{{ dataTable.village || '-' }}</td>
            <td>{{ dataTable.subVillage || '-' }}</td>
            <td>{{ dataTable.rtRw || '-' }}</td>
            <td>{{ dataTable.address || '-' }}</td>
          </tr>
        </tbody>
      </jds-simple-table>
    </div>
    <div v-else>
      Tidak ada data
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentAddressTable',
  props: {
    /**
     * data table
     */
    dataTable: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isDataAvailable () {
      return !!((
        this.dataTable.address ||
        this.dataTable.city ||
        this.dataTable.district ||
        this.dataTable.village ||
        this.dataTable.subVillage ||
        this.dataTable.rtRw
      ))
    }
  }
}
</script>

<style scoped>
  .jds-simple-table::v-deep {
    border-spacing: 1px !important;
    @apply !bg-[#EDEFF3];
  }

  .jds-simple-table::v-deep tr th {
    @apply min-w-[189px] border-r border-white;
  }

  .jds-simple-table::v-deep tr td {
    @apply min-w-[189px] border-r border-gray-200;
  }

  .table-content{
    scrollbar-color: #E0E0E0 transparent;
    scrollbar-width: thin;
    scrollbar-track-color: #FAFAFA;
  }

  .table-content::-webkit-scrollbar{
    @apply w-5 h-5;
  }

  .table-content::-webkit-scrollbar-track {
    @apply bg-gray-50 rounded-b-lg;
  }

  .table-content::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-xl border-solid border-[6px] border-transparent bg-clip-content;
  }

</style>
