<template>
  <div>
    <TabBarMenu
      :list-tab="listTab"
      class="mb-[18px]"
      :id-tab="nameTabId"
      @button-tab="clickTab"
    />
    <Aduan
      v-if="nameTabId === listTab.complaintTab.id"
      :type-aduan-page="typeAduan.instruksiKewenanganPemprov"
      link-page-detail="/aduan/instruksi-kewenangan-pemprov/detail"
    />
    <AduanDaftarIKP
      v-if="nameTabId === listTab.ikpTab.id"
      :ikp-type-page="ikpType.instruksiKewenanganPemprov.props"
      detail-page="/aduan/instruksi-kewenangan-pemprov/detail-ikp"
    />
  </div>
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'
import { ikpType } from '~/constant/daftar-ikp'

export default {
  name: 'PageInstruksiKewenanganPemprov',
  layout: 'Dashboard',
  data() {
    const listTab = {
      complaintTab: { id: 'complaint', name: 'Semua Aduan' },
      ikpTab: { id: 'ikp', name: 'Daftar Instruksi Khusus Pimpinan' },
    }
    return {
      navigations: [
        {
          label: typeAduan.instruksiKewenanganPemprov.label,
          link: typeAduan.instruksiKewenanganPemprov.link,
        },
      ],
      descriptionPage:
        'Berisi semua daftar aduan dari masyarakat Jabar yang perlu untuk dikoordinasikan.',
      typeAduan,
      listTab: {
        complaintTab: { id: 'complaint', name: 'Semua Aduan' },
        ikpTab: { id: 'ikp', name: 'Daftar Instruksi Khusus Pimpinan' },
      },
      nameTabId: listTab.complaintTab.id,
      ikpType,
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler(newQuery) {
        if (Object.keys(newQuery).length > 0) {
          this.nameTabId = ''
          const { idTab } = newQuery
          this.nameTabId = idTab
        }
      },
    },
  },
  mounted() {
    this.$store.commit('setActivePage', 'Instruksi Kewenangan Pemprov')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },
  methods: {
    clickTab(idTab) {
      this.nameTabId = idTab
    },
  },
}
</script>
