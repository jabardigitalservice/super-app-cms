<template>
  <KlaimRwDetail
    :type-claim-page="typeClaim.klaimRT"
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
          label: 'Klaim Akun RT',
          link: '/klaim/rt',
        },
        {
          label: 'Detail Akun RT',
          link: `/klaim/rt/detail/${this.$route.params.id}`,
        },
      ],
      typeClaim,
      listButtonDetail: [
        {
          idButton: 'button-claim-verify',
          label: 'Verifikasi Akun RT Ini',
          variant: 'primary',
          claimStatus: ['Menunggu Verifikasi', 'Ditolak'],
        },
        {
          idButton: 'button-claim-reject',
          label: 'Tolak Akun RT Ini',
          variant: 'secondary',
          classButton: '!border !border-red-400 !text-red-400 hover:!bg-red-50',
          claimStatus: ['Menunggu Verifikasi'],
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Klaim Akun RT')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
