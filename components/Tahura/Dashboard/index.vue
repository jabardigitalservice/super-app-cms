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
      url: this.$config.linkTableau,
      viewsTableu: this.$config.linkDashboardTableau,
      tokenLinkTableu: '',
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
      const viz = new tableau.Viz(
        this.$refs.tableau,
        `${this.url}${this.tokenLinkTableu}/${this.viewsTableu}`,
        this.options
      )
      console.log(viz)
    },
    async getToken () {
      try {
        const response = await this.$axios.get(
          `${this.$config.linkTokenTableau}${this.$config.usernameTableau}`
        )
        this.tokenLinkTableu = response.data.data.token
        this.initViz()
      } catch (error) {
        console.log('failed get token')
      }
    }
  }
}
</script>
