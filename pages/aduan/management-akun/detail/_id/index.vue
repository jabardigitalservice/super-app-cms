<template>
  <AccountManagementDetail />
</template>

<script>
import AccountManagementDetail from '~/components/Aduan/AccountManagement/Detail'

export default {
  name: 'PageDetailManagementAccount',
  components: { AccountManagementDetail },
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: 'Management Akun',
          link: '/aduan/instruksi-aduan-warga',
          disabled: true,
        },
        {
          label: 'Detail Akun',
          link: this.$route.fullPath,
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Management Akun')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: '',
    })
  },
  methods: {
    goToBackHandle() {
      this.$router.push({
        path: '/aduan/management-akun',
        query: this.$route.query,
      })
    },
  },
}
</script>
