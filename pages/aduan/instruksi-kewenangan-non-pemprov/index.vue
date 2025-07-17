<template>
  <div>
    <TabBarMenu
      :list-tab="$store.state.listTab"
      class="mb-[18px]"
      :id-tab="$store.state.idTab"
      @button-tab="clickTab"
    />
    <Aduan
      v-if="$store.state.idTab === $store.state.listTab[0].id"
      :type-aduan-page="typeAduan.instruksiKewenanganNonPemprov"
      link-page-detail="/aduan/instruksi-kewenangan-non-pemprov/detail"
    />
    <AduanDaftarIKP
      v-if="$store.state.idTab === $store.state.listTab[1].id"
      :ikp-type-page="ikpType.instruksiKewenanganNonPemprov.props"
      detail-page="/aduan/instruksi-kewenangan-non-pemprov/detail-ikp"
    />
  </div>
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
import { ikpType } from '~/constant/daftar-ikp'

export default {
  name: 'PageInstruksiKewenanganNonPemprov',
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: typeAduan.instruksiKewenanganNonPemprov.label,
          link: typeAduan.instruksiKewenanganNonPemprov.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar aduan dari masyarakat Jabar yang perlu untuk dikoordinasikan.',
      typeAduan,
      ikpType,
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler(newQuery) {
        if (Object.keys(newQuery).length > 0) {
          const { idTab } = newQuery
          this.$store.commit('setIdTab', idTab)
        }
      },
    },
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      this.$store.commit('setIdTab', this.$store.state.listTab[0].id)
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Instruksi Kewenangan Non Pemprov')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
  methods: {
    clickTab(idTab) {
      this.$store.dispatch('clickTab', idTab)
    },
  },
}
</script>
