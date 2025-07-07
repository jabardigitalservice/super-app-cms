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

      <jds-button
        v-if="showButtonChangeDetailInstruction()"
        variant="primary"
        class="!text-[14px] !font-bold"
      >
        Ubah Detail Instruksi
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
            detail-complaint-link="/aduan/instruksi-kewenangan-pemprov/detail"
            :detail-instruction="detailInstruction"
            :ikp-type-page="ikpType.instruksiKewenanganPemprov.props"
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
import { ikpType, ikpStatus } from '~/constant/daftar-ikp'

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
          label: 'Instruksi Kewenangan Pemprov',
          link: '/aduan/instruksi-kewenangan-pemprov',
        },
        {
          label: 'Detail Instruksi',
          link: `/aduan/instruksi-kewenangan-pemprov/detail-ikp/${this.$route.params.id}`,
          disabled: true,
        },
      ],
      descriptionPage: 'Berisi detail Intruksi Khusus Pimpinan.',
      listDataTab: [
        {
          id: 'input-ikp',
          name: 'Instruksi Khusus Pimpinan',
          icon: '/icon/icon-aduan/complaint-detail.svg',
        },
      ],
      ikpType,
    }
  },
  computed: {
    detailInstruction() {
      return this.$store.state['create-ikp'].detailInstruction
    },
  },
  mounted() {
    this.$store.commit('setActivePage', 'Daftar Penginputan IKP')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage,
    })
    this.$store.dispatch(
      'create-ikp/getDetailInstruction',
      this.$route.params.id
    )
  },
  methods: {
    goToBackHandle() {
      this.$router.push({
        path: '/aduan/instruksi-kewenangan-pemprov',
        query: this.$route.query,
      })
    },
    showButtonChangeDetailInstruction() {
      const listComplaint = [
        ikpStatus.followup.id,
        ikpStatus.postponed.id,
        ikpStatus.review.id,
        ikpStatus.not_yet_coordinated.id,
      ]
      return listComplaint.includes(this.detailInstruction.complaint_status_id)
    },
  },
}
</script>
