<template>
  <div>
    <div class="flex justify-between pt-[16px] pb-[32px]">
      <BaseButton
        class="w-[126px] border border-green-700 text-green-700 hover:bg-green-50"
        @click="goBackHandle"
      >
        <template #icon-left>
          <div class="flex items-center">
            <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
            Kembali
          </div>
        </template>
      </BaseButton>
      <div class="flex">
        <BaseButton
          v-show="detail.rtStatus == userStatus.waiting"
          class="mr-[12px] w-fit border border-red-400 text-red-400 hover:bg-red-50"
          @click="confirmationDialog.showReject = true"
        >
          Tolak Akun RT Ini
        </BaseButton>
        <BaseButton
          v-show="
            detail.rtStatus == userStatus.waiting ||
              detail.rtStatus == userStatus.rejected
          "
          class="w-fit bg-green-700 text-white hover:bg-green-600"
          @click="showVerifyPopupHandle(detail)"
        >
          Verifikasi Akun RT Ini
        </BaseButton>
      </div>
    </div>
    <div
      class="container relative mx-auto h-[calc(100vh-220px)] rounded-lg bg-white py-[16px] px-[5px] font-lato text-gray-800"
    >
      <div
        class="layout-content h-[calc(100vh-250px)] overflow-y-auto px-[19px]"
      >
        <h1
          class="mb-[16px] font-roboto text-[16px] font-bold text-blue-gray-800"
        >
          Detail Akun RT
        </h1>
        <div class="table-content">
          <div class="mb-[16px] font-lato">
            <DetailTableComponent header="Informasi Umum">
              <tr>
                <td class="w-[164px]">
                  <strong>Nama</strong>
                </td>
                <td colspan="2">
                  {{ detail?.name || "-" }}
                </td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td colspan="2">
                  {{ detail?.email || "-" }}
                </td>
              </tr>
              <tr>
                <td><strong>No.Tlp</strong></td>
                <td colspan="2">
                  {{ detail?.phone || "-" }}
                </td>
              </tr>
              <tr>
                <td><strong>Tanggal Registrasi</strong></td>
                <td colspan="2">
                  {{ detail?.date || "-" }}
                </td>
              </tr>
              <tr>
                <td class="w-[164px]">
                  <strong>Status</strong>
                </td>
                <td class="w-[214px]">
                  <div class="flex items-center">
                    <div
                      v-show="detail?.rtStatus"
                      :class="{
                        'mr-2 h-2 w-2 rounded-full': true,
                        'bg-green-600': detail.rtStatus == userStatus.verified,
                        'bg-yellow-600': detail.rtStatus == userStatus.waiting,
                        'bg-red-600': detail.rtStatus == userStatus.rejected,
                      }"
                    />
                    {{ detail.rtStatus || "-" }}
                  </div>
                </td>
                <td>
                  <span class="text-sm text-gray-500">(Status mock data)</span>
                </td>
              </tr>
            </DetailTableComponent>
          </div>
          <div class="mb-[16px]">
            <DetailTableComponent header="Dokumen SK RT">
              <tr>
                <td class="w-[376px]">
                  <strong>{{ detail.fileName || "-" }}</strong>
                </td>
                <td>
                  <BaseButton
                    class="w-fit border border-green-600 bg-green-600 py-[6px] font-medium text-white"
                    @click="documentHandle"
                  >
                    Lihat Dokumen
                  </BaseButton>
                </td>
              </tr>
            </DetailTableComponent>
          </div>
          <div class="mb-[16px]">
            <DetailTableComponent header="Alamat Sesuai KTP" class="table-">
              <tr>
                <td class="w-[164px]">
                  <strong>Kota/kabupaten</strong>
                </td>
                <td>{{ detail?.dataKtp?.city || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>{{ detail?.dataKtp?.district || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>{{ detail?.dataKtp?.village || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>{{ detail?.dataKtp?.subVillage || "-" }}</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>{{ detail?.dataKtp?.rtRw || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>{{ detail?.dataKtp?.address || "-" }}</td>
              </tr>
            </DetailTableComponent>
          </div>
          <div>
            <DetailTableComponent header="Alamat Sesuai Domisili">
              <tr>
                <td class="w-[164px]">
                  <strong>Kota/kabupaten</strong>
                </td>
                <td>{{ detail?.city?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>{{ detail?.district?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>{{ detail?.village?.name || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>{{ detail?.subVillage || "-" }}</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>{{ detail?.rtRw || "-" }}</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>{{ detail?.address || "-" }}</td>
              </tr>
            </DetailTableComponent>
          </div>
        </div>
      </div>
    </div>
    <BaseViewFile
      title="Dokumen SK RT"
      :show="documentDialog.showDialog"
      :file="documentDialog.fileId"
      :mime-type="documentDialog.mimeType"
      @close="documentDialog.showDialog = false"
    />
    <RejectConfirmation
      :show-popup="confirmationDialog.showReject"
      :account-name="detail?.name || '-'"
      :account-email="detail?.email || '-'"
      @submit="actionRejectUser"
      @close="confirmationDialog.showReject = false"
    />
    <VerifyConfirmation
      :show-popup="showPopupVerifyConfirmation"
      :account-name="detail?.name || '-'"
      @submit="actionVerifyUser"
      @close="showPopupVerifyConfirmation = false"
    />
    <InformationPopup
      :show-popup="informationDialog.show"
      :account-name="detail?.name || '-'"
      :title="informationDialog.title"
      :description-text="informationDialog.info"
      :message="informationDialog.message"
      @close="closeInformationDialogHandle"
    />
  </div>
</template>

<script>
import RejectConfirmation from '~/components/KlaimRT/Popup/RejectConfirmation.vue'
import VerifyConfirmation from '~/components/KlaimRT/Popup/VerifyConfirmation.vue'
import InformationPopup from '~/components/KlaimRT/Popup/Information.vue'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DetailTableComponent from '~/components/KlaimRT/KlaimRtDetail/DetailTableComponent'
import { formatDate } from '~/utils'
import { userStatus } from '~/constant/klaim-rt'

export default {
  name: 'KlaimRtDetail',
  components: {
    ArrowLeft,
    DetailTableComponent,
    RejectConfirmation,
    VerifyConfirmation,
    InformationPopup
  },
  data () {
    return {
      confirmationDialog: {
        showReject: false
      },
      documentDialog: {
        showDialog: false,
        fileId: '',
        mimeType: ''
      },
      showPopupVerifyConfirmation: false,
      informationDialog: {
        show: false,
        title: '',
        info: '',
        message: ''
      },
      detail: {},
      userStatus,
      // Mock data
      mockData: [
        {
          id: 1,
          name: 'Isah',
          email: 'isah@example.com',
          phone: '081234567890',
          createdAt: '2025-01-15T10:30:00Z',
          rtStatus: 'Menunggu Verifikasi',
          rtDecree: 'doc-1',
          fileName: 'SK_RT_Isah.pdf',
          address: 'Jl. Raya No. 123',
          city: { name: 'Bandung' },
          district: { name: 'Cibiru' },
          village: { name: 'Cibiru Wetan' },
          subVillage: 'Margasari',
          rtRw: 'RT 001/RW 005',
          dataKtp: {
            nik: '3201234567890001',
            name: 'Isah',
            address: 'Jl. Raya No. 123',
            city: 'Bandung',
            district: 'Cibiru',
            village: 'Cibiru Wetan',
            subVillage: 'Margasari',
            rtRw: 'RT 001/RW 005'
          }
        },
        {
          id: 2,
          name: 'Ian Setiawan',
          email: 'ian.setiawan@example.com',
          phone: '081234567891',
          createdAt: '2025-01-14T14:20:00Z',
          rtStatus: 'Terverifikasi',
          rtDecree: 'doc-2',
          fileName: 'SK_RT_Ian.pdf',
          address: 'Jl. Merdeka No. 45',
          city: { name: 'Bandung' },
          district: { name: 'Ujung Berung' },
          village: { name: 'Pasir Endah' },
          subVillage: 'Cipamokolan',
          rtRw: 'RT 003/RW 007',
          dataKtp: {
            nik: '3201234567890002',
            name: 'Ian Setiawan',
            address: 'Jl. Merdeka No. 45',
            city: 'Bandung',
            district: 'Ujung Berung',
            village: 'Pasir Endah',
            subVillage: 'Cipamokolan',
            rtRw: 'RT 003/RW 007'
          }
        },
        {
          id: 3,
          name: 'Nono Mulyana',
          email: 'nono.mulyana@example.com',
          phone: '081234567892',
          createdAt: '2025-01-13T09:15:00Z',
          rtStatus: 'Menunggu Verifikasi',
          rtDecree: 'doc-3',
          fileName: 'SK_RT_Nono.pdf',
          address: 'Jl. Sudirman No. 78',
          city: { name: 'Bandung' },
          district: { name: 'Antapani' },
          village: { name: 'Antapani Kidul' },
          subVillage: 'Sindangjaya',
          rtRw: 'RT 002/RW 004',
          dataKtp: {
            nik: '3201234567890003',
            name: 'Nono Mulyana',
            address: 'Jl. Sudirman No. 78',
            city: 'Bandung',
            district: 'Antapani',
            village: 'Antapani Kidul',
            subVillage: 'Sindangjaya',
            rtRw: 'RT 002/RW 004'
          }
        },
        {
          id: 4,
          name: 'Ahmed Yusep',
          email: 'ahmed.yusep@example.com',
          phone: '081234567893',
          createdAt: '2025-01-12T16:45:00Z',
          rtStatus: 'Terverifikasi',
          rtDecree: 'doc-4',
          fileName: 'SK_RT_Ahmed.pdf',
          address: 'Jl. Ahmad Yani No. 90',
          city: { name: 'Bandung' },
          district: { name: 'Cicadas' },
          village: { name: 'Cicadas' },
          subVillage: 'Mekar Jaya',
          rtRw: 'RT 004/RW 008',
          dataKtp: {
            nik: '3201234567890004',
            name: 'Ahmed Yusep',
            address: 'Jl. Ahmad Yani No. 90',
            city: 'Bandung',
            district: 'Cicadas',
            village: 'Cicadas',
            subVillage: 'Mekar Jaya',
            rtRw: 'RT 004/RW 008'
          }
        },
        {
          id: 5,
          name: 'Indra Martin',
          email: 'indra.martin@example.com',
          phone: '081234567894',
          createdAt: '2025-01-11T11:30:00Z',
          rtStatus: 'Menunggu Verifikasi',
          rtDecree: 'doc-5',
          fileName: 'SK_RT_Indra.pdf',
          address: 'Jl. Gatot Subroto No. 12',
          city: { name: 'Bandung' },
          district: { name: 'Rancasari' },
          village: { name: 'Derwati' },
          subVillage: 'Derwati Indah',
          rtRw: 'RT 005/RW 010',
          dataKtp: {
            nik: '3201234567890005',
            name: 'Indra Martin',
            address: 'Jl. Gatot Subroto No. 12',
            city: 'Bandung',
            district: 'Rancasari',
            village: 'Derwati',
            subVillage: 'Derwati Indah',
            rtRw: 'RT 005/RW 010'
          }
        }
      ]
    }
  },
  mounted() {
    // Load mock data based on route ID
    const id = parseInt(this.$route.params.id)
    const mockDetail = this.mockData.find(item => item.id === id)

    if (mockDetail) {
      this.detail = {
        ...mockDetail,
        date: formatDate(mockDetail.createdAt)
      }
    } else {
      this.detail = {}
    }
  },
  methods: {
    goBackHandle () {
      this.$router.push({
        path: '/klaim-rt',
        query: this.$route.query
      })
    },
    showVerifyPopupHandle () {
      this.showPopupVerifyConfirmation = true
    },
    actionVerifyUser () {
      this.showPopupVerifyConfirmation = false

      // Simulate API call
      setTimeout(() => {
        this.detail.rtStatus = 'Terverifikasi'

        this.informationDialog = {
          show: true,
          title: 'Verifikasi Akun RT',
          info: 'Verifikasi akun RT telah berhasil dilakukan.',
          message: 'Email terkait informasi verifikasi telah dikirimkan ke email akun RT bersangkutan.'
        }
      }, 500)
    },
    actionRejectUser () {
      this.confirmationDialog.showReject = false

      // Simulate API call
      setTimeout(() => {
        this.detail.rtStatus = 'Ditolak'

        this.informationDialog = {
          show: true,
          title: 'Penolakan Akun RT',
          info: 'Penolakan akun RT telah berhasil dilakukan.',
          message: 'Email terkait informasi penolakan telah dikirimkan ke email akun RT bersangkutan.'
        }
      }, 500)
    },
    onClosePopupInfo () {
      this.showPopupVerifyConfirmation = false
    },
    closeInformationDialogHandle () {
      this.informationDialog.show = false
    },
    documentHandle () {
      this.documentDialog.showDialog = true
      this.documentDialog.fileId = 'loading'

      // Simulate document loading
      setTimeout(() => {
        this.documentDialog.fileId = 'https://via.placeholder.com/600x800/CCCCCC/000000?text=SK+RT+Document'
        this.documentDialog.mimeType = 'image/png'
      }, 500)
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
