<template>
  <ManagementReleaseDetail :data-detail-management="dataDetail" @close="closeHandle" />
</template>

<script>
import { formatDate } from '~/utils'
export default {
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Manajemen Rilis',
          link: '/management-release'
        },
        {
          label: 'Detail Versi Rilis',
          link: `/management-release/detail/${this.$route.params.id}`
        }
      ],
      dataDetail: {},
      descriptionPage: '',
      dummyData: {
        majorVersion: '3',
        minorVersion: '1',
        patchNumber: '0',
        versiRilis: '3.1.0',
        status: 'deleted',
        date: '2023-05-18T13:23:15.935833Z',
        forceUpdate: 'Ya',
        content: 'adasass'
      }
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get(
        `/management-release/detail/${this.$route.params.id}`
      )
      this.dataDetail = response.data.data
      this.descriptionPage = `Detail dari pesan “${this.dataDetail.versiRilis}”`
      this.dataDetail.date =
        formatDate(
          this.dataDetail.date || '',
          'dd/MM/yyyy HH:mm'
        ) || '-'
    } catch (error) {
      this.dataDetail = {}
      this.dataDetail = this.dummyData
      this.dataDetail.date =
      formatDate(
        this.dataDetail.date || '',
        'dd/MM/yyyy HH:mm'
      ) || '-'
      this.descriptionPage = `Detail dari versi rilis “${this.dataDetail.versiRilis}”`
    }
  },
  updated () {
    this.$store.commit('setActivePage', 'Manajemen Rilis')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  },
  methods: {
    closeHandle (value) {
      this.$store.commit('dialog/clearState')
      this.$fetch()
    }
  }
}
</script>
