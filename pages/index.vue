<template>
  <KlaimRW />
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'Dashboard',
  mounted () {
    this.$store.commit('setActivePage', 'Klaim Akun RW')
  }
}
</script>
