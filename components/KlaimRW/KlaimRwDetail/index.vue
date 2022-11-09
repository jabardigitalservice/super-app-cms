<template>
  <div class="container mx-auto">
    <div class="flex justify-between pt-[8px] pb-[32px]">
      <BaseButton class="w-[126px] border border-green-700 text-green-700 hover:bg-green-50" @click="goBackHandle">
        <template #icon-left>
          <div class="flex items-center">
            <ArrowLeft class="w-[14px] h-[12px] mr-[10px]" />
            Kembali
          </div>
        </template>
      </BaseButton>
      <div class="flex">
        <BaseButton class="w-fit border border-red-400 text-red-400 mr-[12px] hover:bg-red-50" @click="isShowRejectConfirmationDialog=true">
          Tolak Akun RW Ini
        </BaseButton>
        <BaseButton class="w-fit bg-green-700 text-white hover:bg-green-600" @click="isShowVerifyConfirmationDialog=true">
          Verifikasi Akun RW Ini
        </BaseButton>
      </div>
    </div>
    <div class="h-[calc(100vh-130px)] bg-white container mx-auto py-[16px] px-[5px] rounded-lg text-gray-800 font-lato relative">
      <div class="h-[calc(100vh-160px)] px-[19px] layout-content overflow-y-auto">
        <h1 class="text-[16px] text-blue-gray-800 font-lato font-bold mb-[16px]">
          Detail Akun RW
        </h1>
        <div class="table-content">
          <div class="mb-[16px] font-lato">
            <DetailTableComponent header="Informasi Umum">
              <tr>
                <td class="w-[164px]">
                  <strong>Nama</strong>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>No.Tlp</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Tanggal Registrasi</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td>
                  <strong>Status</strong>
                </td>
                <td>-</td>
              </tr>
            </DetailTableComponent>
          </div>
          <div class="mb-[16px]">
            <DetailTableComponent header="Dokumen SK RW">
              <tr>
                <td><strong>dokumen_sk_rw_asep.pdf</strong></td>
                <td>
                  <BaseButton class="w-fit border border-green-600 text-green-600 font-medium py-[6px]">
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
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>-</td>
              </tr>
            </DetailTableComponent>
          </div>
          <div>
            <DetailTableComponent header="Alamat Sesuai Domisili">
              <tr>
                <td class="w-[164px]">
                  <strong>Kota/kabupaten</strong>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>-</td>
              </tr>
            </DetailTableComponent>
          </div>
        </div>
      </div>
    </div>
    <RejectConfirmation
      :show-popup="isShowRejectConfirmationDialog"
      dialog-type="confirmation"
      account-name="Asep Kumaha"
      account-email="asep.kumaha@gmail.com"
      @submit="showInformationRejectDialogHandle"
      @close="isShowRejectConfirmationDialog=false"
    />
    <VerifyConfirmation
      :show-popup="isShowVerifyConfirmationDialog"
      dialog-type="confirmation"
      account-name="Asep Kumaha"
      @submit="showInformationVerifyDialogHandle"
      @close="isShowVerifyConfirmationDialog=false"
    />
    <InformationPopup
      :show-popup="isShowVerifyInformationDialog"
      account-name="Asep Kumaha"
      title="Verifikasi Akun RW"
      description-text="Verifikasi akun RW telah berhasil dilakukan."
      message="Email terkait informasi verifikasi telah dikirimkan ke email akun RW bersangkutan."
      @close="closeInformationDialogHandle"
    />
    <InformationPopup
      :show-popup="isShowRejectInformationDialog"
      account-name="Asep Kumaha"
      title="Penolakan Akun RW"
      description-text="Penolakan akun RW telah berhasil dilakukan."
      message="Email terkait informasi penolakan telah dikirimkan ke email akun RW bersangkutan."
      @close="closeInformationDialogHandle"
    />
  </div>
</template>

<script>
import RejectConfirmation from '~/components/KlaimRW/Popup/RejectConfirmation.vue'
import VerifyConfirmation from '~/components/KlaimRW/Popup/VerifyConfirmation.vue'
import InformationPopup from '~/components/KlaimRW/Popup/Information.vue'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DetailTableComponent from '~/components/KlaimRW/KlaimRwDetail/DetailTableComponent'

export default {
  name: 'KlaimRwDetail',
  components: {
    ArrowLeft, DetailTableComponent, RejectConfirmation, VerifyConfirmation, InformationPopup
  },
  data () {
    return {
      isShowVerifyConfirmationDialog: false,
      isShowRejectConfirmationDialog: false,
      isShowVerifyInformationDialog: false,
      isShowRejectInformationDialog: false
    }
  },
  methods: {
    goBackHandle () {
      this.$router.push('/')
    },
    showInformationVerifyDialogHandle () {
      this.isShowVerifyConfirmationDialog = !this.isShowVerifyConfirmationDialog
      this.isShowVerifyInformationDialog = true
    },
    showInformationRejectDialogHandle () {
      this.isShowRejectConfirmationDialog = !this.isShowRejectConfirmationDialog
      this.isShowRejectInformationDialog = true
    },
    closeInformationDialogHandle () {
      this.isShowRejectInformationDialog = false
      this.isShowVerifyInformationDialog = false
    }
  }
}
</script>

<style scoped>
  .layout-content{
    scrollbar-color: #e0e0e0 white;
    scrollbar-width: thin;
    scroll-margin-right: 10px;
  }
  .layout-content::-webkit-scrollbar{
    @apply w-5 h-5;
  }

  .layout-content::-webkit-scrollbar-track {
    @apply bg-transparent;
  }

  .layout-content::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-xl border-solid border-[6px] border-transparent bg-clip-content;
  }
  .table-content tr td{
    @apply pt-[10px] pb-[9px] px-[8px] !important;
  }
</style>
