<template>
  <KlaimRwDetail />
</template>

<script>
import KlaimRwDetail from '~/components/KlaimRW/KlaimRwDetail'

export default {
  components: { KlaimRwDetail },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Klaim Akun RW',
          link: '/'
        },
        {
          label: 'Detail Akun RW',
          link: `/detail/${this.$route.params.id}`
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Klaim Akun RW')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
