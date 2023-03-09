<template>
  <div class="container mx-auto">
    <MessageNotif />
  </div>
</template>

<script>

export default {
  layout: 'Dashboard',
  mounted () {
    this.$store.commit('setActivePage', 'Pesan')
  }
}
</script>
