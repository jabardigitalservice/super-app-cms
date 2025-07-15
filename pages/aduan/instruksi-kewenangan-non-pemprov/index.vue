<template>
  <div>
    <TabBarMenu
      :list-tab="listTab"
      class="mb-[18px]"
      :id-tab="idTab"
      @button-tab="clickTab"
    />
    <Aduan
      v-if="idTab === listTab[0].id"
      :type-aduan-page="typeAduan.instruksiKewenanganNonPemprov"
      link-page-detail="/aduan/instruksi-kewenangan-pemprov/detail"
    />
    <AduanDaftarIKP
      v-if="idTab === listTab[1].id"
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
  computed: {
    listTab() {
      return this.$store.state.listTab
    },
    idTab() {
      return this.$store.state.idTab
    },
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler(newQuery) {
        if (Object.keys(newQuery).length > 0) {
          this.$store.commit('setIdTab', null)
          const { idTab } = newQuery
          this.$tore.commit('setIdTab', idTab)
        }
      },
    },
  },
  created() {
    this.$store.commit('setIdTab', this.listTab[0].id)
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
