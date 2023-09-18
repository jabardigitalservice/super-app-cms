<template>
  <div class="flex h-fit w-full items-center rounded-lg bg-green-600 p-[2px]">
    <div class="rounded-lg bg-white w-full">
      <div ref="tableau" />
    </div>
  </div>
</template>

<script>
/* global tableau */
export default {
  name: 'DashboardTahura',
  data () {
    return {
      url: this.$config.linkTableu,
      options: {
        hideTabs: true,
        width: '100%',
        height: '559px'
      }
    }
  },
  mounted () {
    this.initViz()
  },
  methods: {
    initViz () {
      const viz = new tableau.Viz(this.$refs.tableau, this.url, this.options)
      console.log(viz)
    }
  }
}
</script>
