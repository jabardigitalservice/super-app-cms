<template>
  <KlaimRtDetail />
</template>

<script>
import KlaimRtDetail from '~/components/KlaimRT/KlaimRtDetail'

export default {
  components: { KlaimRtDetail },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Klaim Akun RT',
          link: '/klaim-rt'
        },
        {
          label: 'Detail Akun RT',
          link: `/klaim-rt/detail/${this.$route.params.id}`
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Klaim Akun RT')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
