<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!text-[14px] !font-bold"
        @click="goToBackHandle()"
      >
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
    </div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarDetail :list-tab="listDataTab" />
      </template>
      <template #tab-panel>
        <BaseTabPanel
          class="layout-content h-[calc(100vh-280px)] overflow-y-auto py-4 px-[19px]"
        >
          <AduanDaftarIKPTableDetail
            :show-daftar-aduan="true"
            :ikp-code="$route.params.id"
            :ikp-type-page="ikpType.instruksiAduanWarga.props"
            detail-complaint-link="/aduan/instruksi-aduan-warga/detail-aduan"
          />
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
  </div>
</template>

<script>
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import { ikpType } from '~/constant/daftar-ikp'

export default {
  name: 'PageDetailIKP',
  components: {
    TabBarDetail,
    ArrowLeft,
  },
  layout: 'Dashboard',
  data() {
    return {
      navigations: [
        {
          label: 'Daftar Instruksi Aduan Warga',
          link: '/aduan/instruksi-aduan-warga',
          disabled: true,
        },
        {
          label: 'Detail Instruksi',
          link: this.$route.fullPath,
        },
      ],
      descriptionPage: 'Berisi detail Intruksi Aduan Warga.',
      listDataTab: [
        {
          id: 'instruksi-aduan-warga',
          name: 'Detail Instruksi Aduan',
          icon: '/icon/icon-aduan/complaint-detail.svg',
        },
      ],
      ikpType,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Instruksi Aduan Warga')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },

  methods: {
    goToBackHandle() {
      this.$router.push({
        path: '/aduan/instruksi-aduan-warga',
        query: this.$route.query,
      })
    },
  },
}
</script>
