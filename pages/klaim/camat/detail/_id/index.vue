<template>
  <KlaimRwDetail
    :typeClaimPage="typeClaim.klaimCamat"
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
          label: 'Klaim Akun Camat',
          link: '/klaim/camat',
        },
        {
          label: 'Detail Akun Camat',
          link: `/klaim/camat/detail/${this.$route.params.id}`,
        },
      ],
      typeClaim,
      listButtonDetail: [
        {
          idButton: 'button-claim-verify',
          label: 'Verifikasi Akun Camat Ini',
          variant: 'primary',
          claimStatus: ['Menunggu Verifikasi', 'Ditolak'],
        },
        {
          idButton: 'button-claim-reject',
          label: 'Tolak Akun Camat Ini',
          variant: 'secondary',
          classButton: '!border !border-red-400 !text-red-400 hover:!bg-red-50',
          claimStatus: ['Menunggu Verifikasi'],
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Klaim Akun Camat')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
