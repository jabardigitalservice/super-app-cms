<template>
  <KlaimRwDetail
    :typeClaimPage="typeClaim.klaimKepalaDesa"
    :list-button="listButtonDetail"
  />
</template>

<script>
import KlaimRwDetail from '~/components/KlaimRW/KlaimRwDetail'
import { typeClaim } from '~/constant/klaim-rw'

export default {
  components: { KlaimRwDetail },
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: 'Klaim Akun Kepala Desa',
          link: '/',
        },
        {
          label: 'Detail Akun Kepala Desa',
          link: `/detail/${this.$route.params.id}`,
        },
      ],
      typeClaim,
      listButtonDetail: [
        {
          idButton: 'button-claim-verify',
          label: 'Verifikasi Akun Kepala Desa Ini',
          variant: 'primary',
          claimStatus: ['Menunggu Verifikasi', 'Ditolak'],
        },
        {
          idButton: 'button-claim-reject',
          label: 'Tolak Akun Kepala Desa Ini',
          variant: 'secondary',
          classButton: '!border !border-red-400 !text-red-400 hover:!bg-red-50',
          claimStatus: ['Menunggu Verifikasi'],
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Klaim Akun Kepala Desa')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
