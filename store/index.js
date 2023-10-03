export const state = () => ({
  page: 'Klaim Akun RW',
  header: {
    navigations: [],
    descriptionPage: ''
  },
  dataImage: {},
  queryLaporanPendapatan: {}
})

export const mutations = {
  setActivePage (state, page) {
    state.page = page
  },
  setHeader (state, header) {
    state.header.navigations = header.navigations
    state.header.descriptionPage = header.descriptionPage
  },
  setDataImage (state, image) {
    state.dataImage = image
  },
  setQueryLaporanPendapatan (state, query) {
    state.queryLaporanPendapatan = query
  }
}
