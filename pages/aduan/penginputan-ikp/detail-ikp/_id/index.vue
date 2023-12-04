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
          <AduanDaftarIKPTableDetail :show-daftar-aduan="true" :ikp-code="$route.params.id" />
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
  </div>
</template>

<script>
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'

export default {
  name: 'PageDetailIKP',
  components: {
    TabBarDetail,
    ArrowLeft
  },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Daftar Penginputan IKP',
          link: '/aduan/penginputan-ikp'
        },
        {
          label: 'Detail IKP',
          link: `/aduan/penginputan-ikp/detail-ikp/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Berisi detail Intruksi Khusus Pimpinan.',
      listDataTab: [
        {
          id: 'input-ikp',
          name: 'Instruksi Khusus Pimpinan',
          icon: '/icon/icon-aduan/complaint-detail.svg'
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Daftar Penginputan IKP')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  },

  methods: {
    goToBackHandle () {
      this.$router.back()
    }
  }
}
</script>
