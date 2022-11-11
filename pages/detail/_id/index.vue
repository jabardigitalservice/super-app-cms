<template>
  <KlaimRwDetail />
</template>

<script>
import KlaimRwDetail from '~/components/KlaimRW/KlaimRwDetail'

export default {
  components: { KlaimRwDetail },
  layout: 'Dashboard',
  mounted () {
    this.$store.commit('setActivePage', 'Klaim Akun RW')
  }
}
</script>
