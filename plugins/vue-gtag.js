import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default function ({ $config, app }) {
  Vue.use(VueGtag, {
    config: { id: $config.googleAnalyticsId }
  }, app.router)
}
