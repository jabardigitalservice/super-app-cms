<template>
  <AduanAccountManagement />
</template>

<script>
export default {
  name: 'PageAduanMasuk',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: 'Management Akun',
          link: '/aduan/management-akun',
        },
      ],
      descriptionPage: 'Berisi semua daftar management akun',
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Management Akun')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
}
</script>
