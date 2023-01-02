import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default function ({ $config, app }) {
/*
    try using vue-gtag
    https://stackoverflow.com/questions/64612031/setup-google-analytics-4-in-nuxt-js/64613134#64613134
    auto tracking page
    https://github.com/MatteoGabriele/vue-gtag/issues/249
    I try using Universal Analytics(code:UA-XXXXX-X), but the tracking page in google analytics was updated.
*/
  Vue.use(VueGtag, {
    config: { id: $config.googleAnalytics.id }
  }, app.router)
}
