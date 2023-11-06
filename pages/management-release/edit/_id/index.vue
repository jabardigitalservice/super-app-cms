<template>
  <ManagementReleaseForm type-form="edit" :id-version="$route.params.id" :field-form="fieldForm" />
</template>

<script>
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
          label: 'Ubah Versi Rilis',
          link: `/management-release/edit/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Pengaturan versi rilis aplikasi Sapawarga.',
      dummyData: {
        majorVersion: '3',
        minorVersion: '1',
        patchNumber: '0',
        versiRilis: '3.1.0',
        status: 'deleted',
        date: '2023-05-18T13:23:15.935833Z',
        forceUpdate: 'Ya',
        content: 'adasass'
      },
      fieldForm: {
        majorVersion: '',
        minorVersion: '',
        patchNumber: '',
        forceUpdate: null,
        content: ''
      }
    }
  },
  async created () {
    try {
      const response = await this.$axios.get(
        `/management-release/detail/${this.$route.params.id}`
      )

      this.fieldForm = response.data.data
    } catch (error) {
      this.fieldForm = this.dummyData
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Manajemen Rilis')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  }
}
</script>
