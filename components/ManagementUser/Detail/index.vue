<template>
  <div>
    <jds-button variant="secondary" class="!w-[126px] !h-[38px] !py-1 !text-[14px] !font-bold" @click="goToBackHandle">
      <div class="flex items-center">
        <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
        Kembali
      </div>
    </jds-button>
    <div
      class="relative h-[calc(100vh-220px)] rounded-lg bg-white py-[16px] px-[5px] font-lato text-gray-800 mt-8"
    >
      <div
        class="layout-content h-[calc(100vh-250px)] overflow-y-auto px-[19px]"
      >
        <h1 class="mb-4 font-roboto text-[16px] font-bold text-blue-gray-800">
          Detail Pengguna
        </h1>
        <div class="mb-4 table-content">
          <BaseTableDetail header="Informasi Umum" class="mb-4">
            <tr>
              <td class="w-[164px]">
                <strong>Nama</strong>
              </td>
              <td colspan="2">
                {{ detailPengguna?.name || '-' }}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Email</strong>
              </td>
              <td colspan="2">
                {{ detailPengguna?.email || '-' }}
              </td>
            </tr>
            <tr>
              <td>
                <strong>No.Tlp</strong>
              </td>
              <td>{{ detailPengguna?.handphone || '-' }}</td>
              <td><jds-button label="Edit No.HP" variant="secondary" class="!h-[30px] !py-1 !text-[14px] !border-green-600 !text-green-600" @click="showPopup=true" /></td>
            </tr>
            <tr>
              <td>
                <strong>Tanggal Registrasi</strong>
              </td>
              <td colspan="2">
                {{ detailPengguna?.createdAt || '-' }}
              </td>
            </tr>
          </BaseTableDetail>
          <BaseTableDetail header="Alamat Sesuai KTP" class="mb-4">
            <tr>
              <td class="w-[164px]">
                <strong>Kota/Kabupaten</strong>
              </td>
              <td colspan="2">
                {{ detailPengguna?.city || '-' }}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Kecamatan</strong>
              </td>
              <td colspan="2">
                {{ detailPengguna?.district || '-' }}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Kelurahan/Desa</strong>
              </td>
              <td>{{ detailPengguna?.village || '-' }}</td>
            </tr>
            <tr>
              <td>
                <strong>Dusun</strong>
              </td>
              <td>{{ detailPengguna?.subVillage || '-' }}</td>
            </tr>
            <tr>
              <td>
                <strong>RT/RW</strong>
              </td>
              <td>{{ detailPengguna?.rtRw || '-' }}</td>
            </tr>
            <tr>
              <td>
                <strong>Alamat Lengkap</strong>
              </td>
              <td>{{ detailPengguna?.subVillage || '-' }}</td>
            </tr>
          </BaseTableDetail>
          <BaseTableDetail header="Alamat Sesuai Domisili" class="mb-4">
            <tr>
              <td class="w-[164px]">
                <strong>Kota/Kabupaten</strong>
              </td>
              <td colspan="2">
                {{ detailPengguna?.city || '-' }}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Kecamatan</strong>
              </td>
              <td colspan="2">
                {{ detailPengguna?.district || '-' }}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Kelurahan/Desa</strong>
              </td>
              <td>{{ detailPengguna?.village || '-' }}</td>
            </tr>
            <tr>
              <td>
                <strong>Dusun</strong>
              </td>
              <td>{{ detailPengguna?.subVillage || '-' }}</td>
            </tr>
            <tr>
              <td>
                <strong>RT/RW</strong>
              </td>
              <td>{{ detailPengguna?.rtRw || '-' }}</td>
            </tr>
            <tr>
              <td>
                <strong>Alamat Lengkap</strong>
              </td>
              <td>{{ detailPengguna?.subVillage || '-' }}</td>
            </tr>
          </BaseTableDetail>
        </div>
      </div>
    </div>
    <BasePopupInputText
      :show-popup="showPopup"
      account-name="Asep Kumaha"
      title="Edit No.HP"
      :required="true"
      input-type="text"
      placeholder="Masukkan No.HP"
      label-input="No. Handphone <em>(No. sebelumnya 0822 1000 2000)</em>"
      @close="showPopup=false"
    />
  </div>
</template>
<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
export default {
  name: 'ManagementUserDetail',
  components: {
    ArrowLeft
  },
  data () {
    return {
      showPopup: false,
      detailPengguna: {}
    }
  },
  methods: {
    goToBackHandle () {
      return this.$router.push('/management-user')
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
