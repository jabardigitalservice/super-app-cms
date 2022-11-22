<template>
  <div class="container mx-auto">
    <BaseHeader :navigations="navigations" description-page="Berisi semua daftar terkait klaim yang dilakukan oleh RW di aplikasi Sapawarga." />
    <div class="flex justify-between pt-[16px] pb-[32px]">
      <BaseButton
        class="w-[126px] border border-green-700 text-green-700 hover:bg-green-50"
        @click="goBackHandle"
      >
        <template #icon-left>
          <div class="flex items-center">
            <ArrowLeft class="w-[14px] h-[12px] mr-[10px]" />
            Kembali
          </div>
        </template>
      </BaseButton>
      <div class="flex">
        <BaseButton
          class="w-fit border border-red-400 text-red-400 mr-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{'hover:bg-red-50':detail.rwStatus==userStatus.waiting}"
          :disabled="detail.rwStatus==userStatus.verified || detail.rwStatus==userStatus.rejected"
          @click="rejectConfirmationHandle"
        >
          Tolak Akun RW Ini
        </BaseButton>
        <BaseButton
          class="w-fit bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{'hover:bg-green-600':detail.rwStatus==userStatus.waiting}"
          :disabled="detail.rwStatus==userStatus.verified || detail.rwStatus==userStatus.rejected"
          @click="verifyConfirmationHandle"
        >
          Verifikasi Akun RW Ini
        </BaseButton>
      </div>
    </div>
    <div class="h-[calc(100vh-220px)] bg-white container mx-auto py-[16px] px-[5px] rounded-lg text-gray-800 font-lato relative">
      <div class="h-[calc(100vh-250px)] px-[19px] layout-content overflow-y-auto">
        <h1 class="text-[16px] text-blue-gray-800 font-roboto font-bold mb-[16px]">
          Detail Akun RW
        </h1>
        <div class="table-content">
          <div class="mb-[16px] font-lato">
            <DetailTableComponent header="Informasi Umum">
              <tr>
                <td class="w-[164px]">
                  <strong>Nama</strong>
                </td>
                <td>{{ detail?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{{ detail?.email || '-' }}</td>
              </tr>
              <tr>
                <td><strong>No.Tlp</strong></td>
                <td>{{ detail?.phone||'-' }}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Registrasi</strong></td>
                <td>{{ detail?.date||'-' }}</td>
              </tr>
              <tr>
                <td>
                  <strong>Status</strong>
                </td>
                <td>
                  <div class="flex items-center">
                    <div
                      v-show="detail?.rwStatus"
                      :class="{
                        'rounded-full h-2 w-2 mr-2':true,
                        'bg-green-600':detail.rwStatus==userStatus.verified,
                        'bg-yellow-600':detail.rwStatus==userStatus.waiting,
                        'bg-red-600':detail.rwStatus==userStatus.rejected
                      }"
                    />{{ detail.rwStatus || '-' }}
                  </div>
                </td>
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
                <td>{{ detail?.dataKtp?.city || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>{{ detail?.dataKtp?.district || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>{{ detail?.dataKtp?.village || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>{{ detail?.dataKtp?.subVillage || '-' }}</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>{{ detail?.dataKtp?.rtRw||'-' }}</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>{{ detail?.dataKtp?.address||'-' }}</td>
              </tr>
            </DetailTableComponent>
          </div>
          <div>
            <DetailTableComponent header="Alamat Sesuai Domisili">
              <tr>
                <td class="w-[164px]">
                  <strong>Kota/kabupaten</strong>
                </td>
                <td>{{ detail?.cty?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kecamatan</strong></td>
                <td>{{ detail?.district?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Kelurahan/Desa</strong></td>
                <td>{{ detail?.village?.name || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Dusun</strong></td>
                <td>{{ detail?.subVillage || '-' }}</td>
              </tr>
              <tr>
                <td><strong>RT/RW</strong></td>
                <td>{{ detail?.rtRw || '-' }}</td>
              </tr>
              <tr>
                <td><strong>Alamat Lengkap</strong></td>
                <td>{{ detail?.address || '-' }}</td>
              </tr>
            </DetailTableComponent>
          </div>
        </div>
      </div>
    </div>
    <RejectConfirmation
      :show-popup="confirmationDialog.showReject"
      dialog-type="confirmation"
      :account-name="detail?.name || '-'"
      :account-email="detail?.email || '-'"
      @submit="actionRejectUser"
      @close="confirmationDialog.showReject=false"
    />
    <VerifyConfirmation
      :show-popup="confirmationDialog.showVerify"
      dialog-type="confirmation"
      :account-name="detail?.name || '-'"
      @submit="actionVerifyUser"
      @close="confirmationDialog.showVerify=false"
    />
    <InformationPopup
      :show-popup="informationDialog.showDialog"
      :account-name="detail?.name || '-'"
      :title="informationDialog.title"
      :description-text="informationDialog.info"
      :message="informationDialog.message"
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
import { formatDate } from '~/utils'
import { userStatus } from '~/constant/klaim-rw'

export default {
  name: 'KlaimRwDetail',
  components: {
    ArrowLeft, DetailTableComponent, RejectConfirmation, VerifyConfirmation, InformationPopup
  },
  data () {
    return {
      confirmationDialog: {
        showReject: false,
        showVerify: false
      },
      informationDialog: {
        title: '',
        showDialog: false,
        info: '',
        message: ''
      },
      navigations: [
        {
          label: 'Klaim Akun RW',
          link: '/'
        },
        {
          label: 'Detail Akun RW',
          link: `/detail/${this.$route.params.id}`
        }
      ],
      detail: {},
      userStatus
    }
  },
  async fetch () {
    try {
      const detailAccount = await this.$api.get(`/user/rw/${this.$route.params.id}`)
      this.detail = detailAccount.data.data
      this.detail.date = detailAccount.data.data ? formatDate(detailAccount.data.data.createdAt) : ''
    } catch {
      this.detail = {}
    }
  },
  methods: {
    goBackHandle () {
      this.$router.push('/')
    },
    rejectConfirmationHandle () {
      this.confirmationDialog.showReject = true
      this.confirmationDialog.name = this.detail?.name || ''
      this.confirmationDialog.email = this.detail?.email || ''
      this.confirmationDialog.id = this.detail?.id || ''
    },
    verifyConfirmationHandle () {
      this.confirmationDialog.showVerify = true
      this.confirmationDialog.name = this.detail?.name || ''
      this.confirmationDialog.id = this.detail?.id || ''
    },
    async actionRejectUser () {
      this.confirmationDialog.showReject = false
      this.informationDialog.title = 'Penolakan Akun RW'
      try {
        await this.$api.post('/user/role/reject-rw', { userId: this.detail?.id })
        this.informationDialog.showDialog = true
        this.informationDialog.info = 'Penolakan akun RW telah berhasil dilakukan.'
        this.informationDialog.message = 'Email terkait informasi penolakan telah dikirimkan ke email akun RW bersangkutan.'
      } catch (error) {
        this.informationDialog.showDialog = true
        this.informationDialog.info = 'Penolakan akun RW gagal dilakukan'
        this.informationDialog.message = ''
      }
    },
    async actionVerifyUser () {
      this.informationDialog.title = 'Verifikasi Akun RW'
      try {
        await this.$api.post('/user/role/verify-rw', { userId: this.detail?.id })
        this.confirmationDialog.showVerify = false
        this.informationDialog.showDialog = true
        this.informationDialog.info = 'Verifikasi akun RW telah berhasil dilakukan.'
        this.informationDialog.message = 'Email terkait informasi verifikasi telah dikirimkan ke email akun RW bersangkutan.'
      } catch (error) {
        this.informationDialog.showDialog = true
        this.confirmationDialog.showVerify = false
        this.informationDialog.info = 'Verifikasi akun RW gagal dilakukan.'
        this.informationDialog.message = ''
      }
    },
    closeInformationDialogHandle () {
      this.informationDialog.showDialog = false
      this.$fetch()
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
