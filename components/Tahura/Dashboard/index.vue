<template>
  <div class="flex h-fit rounded-lg bg-green-600 p-[2px]">
    <div class="w-full rounded-lg bg-white">
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
      url: this.$config.urlTableauJabarProv,
      viewsTableu: this.$config.urlDashboardTahura,
      tokenurlTableauJabarProv: '',
      options: {
        hideTabs: true,
        width: '100%',
        height: '750px'
      }
    }
  },
  mounted () {
    this.getToken()
  },
  methods: {
    initViz () {
      return new tableau.Viz(
        this.$refs.tableau,
        `${this.url}/trusted/${this.tokenurlTableauJabarProv}/${this.viewsTableu}`,
        this.options
      )
    },
    async getToken () {
      try {
        const response = await this.$axios.get(
          `${this.$config.urlGetTokenTableau}${this.$config.usernameTableau}`
        )
        this.tokenurlTableauJabarProv = response.data.data.token
        this.initViz()
      } catch (error) {
        console.error('failed get token')
      }
    }
  }
}
</script>
