<template>
  <div>
    <div class="flex justify-between mt-4 mb-8">
      <jds-button variant="secondary" class="!w-[126px] !h-[38px] !py-1 !text-[14px] !font-bold" @click="goToBackHandle">
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div class="flex">
        <div class="mr-3">
          <jds-button label="Gagal Diverifikasi" variant="secondary" class="!h-[38px] !py-1 !text-[14px] !font-bold !text-red-400 !border-red-400" />
        </div>
        <jds-button label="Terverifikasi" variant="primary" class="!h-[38px] !py-1 !text-[14px] !font-bold" />
      </div>
    </div>
    <BaseTabGroup>
      <template #tab-list>
        <BaseTabList :list-tab="listTab" class="h-11">
          <template #default="{dataTab,indexTab}">
            <BaseTab class="h-11 !p-[6px]" :selected="(indexTab===selectedTabIndex)">
              <button class="flex items-center text-sm text-green-100">
                <component :is="dataTab.icon" class="mt-1 icon-tab-content h-7 w-7" :class="{'icon-tab-selected':(indexTab===selectedTabIndex)}" />
                <div class="ml-2 text-green-100 !font-roboto" :class="{'!text-gray-700':(indexTab===selectedTabIndex)}">
                  {{ dataTab.name }}
                </div>
              </button>
            </BaseTab>
          </template>
        </BaseTabList>
      </template>
      <template #tab-panel>
        <BaseTabPanel class="px-6 py-4 layout-content h-[calc(100vh-280px)] overflow-y-auto px-[19px]">
          <h1
            class="font-roboto text-[16px] font-bold text-blue-gray-800 my-4"
          >
            Detail Aduan Warga
          </h1>
          <div class="table-content">
            <BaseTableDetail header="Informasi Umum" class="mb-4">
              <tr>
                <td class="w-[164px] text-lato">
                  <strong class="text-[10px]">ID Aduan </strong>
                </td>
                <td>5594123812518</td>
              </tr>
              <tr>
                <td><strong>Tanggal Aduan Masuk</strong></td>
                <td>05/01/2023 - 18:00</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>
                  <div class="flex items-center">
                    <div class=" mr-2 h-2 w-2 rounded-full bg-yellow-600" />
                    Menunggu Verifikasi
                  </div>
                </td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Informasi Pelapor" class="mb-4">
              <tr>
                <td class="w-[180px]">
                  <strong class="text-[10px]">Nama Lengkap </strong>
                </td>
                <td>Asep Kumaha</td>
              </tr>
              <tr>
                <td><strong>No. Kontak</strong></td>
                <td>082210002000</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>asep.kumaha@gmail.com</td>
              </tr>
              <tr>
                <td><strong>Jenis Media Sosial</strong></td>
                <td>Instagram</td>
              </tr>
              <tr>
                <td><strong>Link Akun Media Sosial</strong></td>
                <td>https://instagram.com/asep.kumaha</td>
              </tr>
              <tr>
                <td colspan="2">
                  <strong>Titik Lokasi Pelapor</strong>
                </td>
              </tr>
              <tr>
                <td>Koordinat</td>
                <td>-6.902020, 107.61807</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Detail Aduan" class="mb-4">
              <tr>
                <td class="w-[180px]">
                  <strong class="text-[10px]">Kategori Aduan </strong>
                </td>
                <td>Kependudukan</td>
              </tr>
              <tr>
                <td><strong>Sub Kategori Aduan</strong></td>
                <td>Administrasi Kependudukan</td>
              </tr>
              <tr>
                <td><strong>Judul Aduan</strong></td>
                <td>Pungli</td>
              </tr>
              <tr>
                <td><strong>Detail Aduan</strong></td>
                <td>saya dimintai uang sama RT dengan alasan karena saya merrusak tiang listrik dan rumah nya beliau , salah saya dimana ? saya tidak terima !!!!</td>
              </tr>
              <tr>
                <td><strong>Lokasi Kejadian</strong></td>
              </tr>
              <tr>
                <td>Kabupaten</td>
                <td>Bekasi</td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>Bojongsoang</td>
              </tr>
              <tr>
                <td>Kelurahan</td>
                <td>Jangraga</td>
              </tr>
              <tr>
                <td>
                  <strong>Titik Lokasi Kejadian</strong>
                </td>
              </tr>
              <tr>
                <td>Gmaps</td>
                <td><a class="text-[#1E88E5]" href="https://gmaps.com/klasjdlkfjaslkdjf/-12000,15000">https://gmaps.com/klasjdlkfjaslkdjf/-12000,15000</a></td>
              </tr>
              <tr>
                <td>
                  Detail Lokasi
                </td>
                <td>Jl. Raya Cimahi-Cibeureum, Randusari, Kec. Cibeureum, Kabupaten Kuningan, Jawa Barat 45588, Indonesia</td>
              </tr>
            </BaseTableDetail>
            <BaseTableDetail header="Bukti Foto">
              <td class="px-2">
                <strong>IMG202305011800.jpg</strong>
              </td>
              <td class="px-2 py-[6px]">
                <jds-button variant="secondary" class="!font-medium w-[100px] !text-sm !py-[6px] !px-4 !border-green-600 !text-green-600">
                  Lihat Foto
                </jds-button>
              </td>
            </BaseTableDetail>
          </div>
        </BaseTabPanel>
      </template>
    </basetabgroup>
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import IconDetailComplaint from '~/assets/icon/complaint-detail-icon.svg?inline'
export default {
  name: 'DetailAduanMasuk',
  components: { ArrowLeft, IconDetailComplaint },
  data () {
    return {
      listTab: [{
        name: 'Detail Aduan',
        icon: 'icon-detail-complaint'
      }],
      selectedTabIndex: 0
    }
  },
  mounted () {
    this.selectedTabHandle(0)
  },
  methods: {
    selectedTabHandle (index) {
      this.selectedTabIndex = index
    },
    goToBackHandle () {
      this.$router.push('/daftar-aduan-masuk')
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
