<template>
  <div>
    <TabBarMenu :list-tab="listTab" class="mb-[18px]" @button-tab="clickTab" />
    <Aduan
      v-if="idTab === 'complaint'"
      :type-aduan-page="typeAduan.penginputanIkp.props"
      link-page-detail="/aduan/penginputan-ikp/detail"
    />
    <AduanDaftarIKP v-else />
  </div>
</template>

<script>
import { typeAduan } from '~/constant/aduan-masuk'

export default {
  name: 'PagePenginputanIkp',
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: typeAduan.penginputanIkp.label,
          link: typeAduan.penginputanIkp.link
        }
      ],
      descriptionPage:
        'Berisi semua daftar aduan dari masyarakat Jabar yang perlu untuk dikoordinasikan.',
      typeAduan,
      listTab: [
        { id: 'complaint', name: 'Semua Aduan' },
        { id: 'ikp', name: 'Daftar Instruksi Khusus Pimpinan' }
      ],
      idTab: ''
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Daftar Penginputan IKP')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
    this.clickTab('complaint')
  },
  methods: {
    clickTab (idTab) {
      this.idTab = idTab
    }
  }
}
</script>
