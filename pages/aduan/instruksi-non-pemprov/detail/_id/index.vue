<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!text-[14px] !font-bold"
        @click="goToBackHandle()"
      >
        <div class="flex items-center text-sm">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <jds-button variant="primary" @click="goToAppTrk()">
        <div class="flex items-center text-sm font-bold">
          Link Instruksi di Aplikasi TRK
          <BaseIconSvg
            :icon="`/icon/link-external.svg`"
            :size="20"
            fill-color="#FFFFFF"
            class="ml-2 flex-shrink-0"
          />
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
            detail-complaint-link="/aduan/instruksi-non-pemprov/detail-aduan"
            :ikp-type-page="ikpType.instruksiNonPemprov.props"
            :ikp-code="$route.params.id"
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
          label: 'Instruksi Aduan Non-Pemprov',
          link: '/aduan/instruksi-non-pemprov',
          disabled: true,
        },
        {
          label: 'Detail Instruksi Aduan',
          link: `/aduan/instruksi-non-pemprov/detail/${this.$route.params.id}`,
        },
      ],
      descriptionPage: 'Berisi detail Intruksi Aduan Non-Pemprov.',
      listDataTab: [
        {
          id: 'ikp-non-pemprov',
          name: 'Instruksi Aduan',
          icon: '/icon/icon-aduan/complaint-detail.svg',
        },
      ],
      ikpType,
    }
  },
  mounted() {
    this.$store.commit('setActivePage', ikpType.instruksiNonPemprov.label)
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
  },

  methods: {
    goToBackHandle() {
      this.$router.push({
        path: '/aduan/instruksi-non-pemprov',
        query: this.$route.query,
      })
    },
    goToAppTrk() {
      window.open(
        'https://kinerja.jabarprov.go.id/lim/bukan-urusan-pemprov',
        '_blank'
      )
    },
  },
}
</script>
