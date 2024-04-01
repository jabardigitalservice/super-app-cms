<template>
  <SribadugaKalenderReservasi />
</template>

<script>
export default {
  name: 'PageKalenderReservasi',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: 'Kalender Reservasi',
          link: '/sribaduga/kalender-reservasi',
        },
      ],
    }
  },

  mounted() {
    this.$store.commit('setActivePage', 'Kalender Reservasi')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage:
        'Berisikan informasi reservasi dari Aplikasi Sapawarga dan reservasi manual.',
    })
  },
}
</script>
