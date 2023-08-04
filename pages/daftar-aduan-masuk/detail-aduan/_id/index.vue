<template>
  <AduanMasukDetail />
</template>

<script>

export default {
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Daftar Aduan Masuk',
          link: '/daftar-aduan-masuk'
        },
        {
          label: 'Detail Aduan',
          link: `/daftar-aduan-masuk/detail-aduan/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Lorem ipsum dolor sit amet consectetur. Quis platea malesuada tincidunt et.'
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Daftar Aduan Masuk')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
