<template>
  <KlaimRwDetail
    :type-claim-page="typeClaim.klaimPosyandu"
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
          label: 'Klaim Akun Posyandu',
          link: '/klaim/posyandu',
        },
        {
          label: 'Detail Akun Posyandu',
          link: `/klaim/posyandu/detail/${this.$route.params.id}`,
        },
      ],
      typeClaim,
      listButtonDetail: [
        {
          idButton: 'button-claim-verify',
          label: 'Verifikasi Akun Posyandu Ini',
          variant: 'primary',
          claimStatus: ['Menunggu Verifikasi', 'Ditolak'],
        },
        {
          idButton: 'button-claim-reject',
          label: 'Tolak Akun Posyandu Ini',
          variant: 'secondary',
          classButton: '!border !border-red-400 !text-red-400 hover:!bg-red-50',
          claimStatus: ['Menunggu Verifikasi'],
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Klaim Akun Posyandu')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
