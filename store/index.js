export const state = () => ({
  page: 'Klaim Akun RW',
  header: {
    navigations: [],
    descriptionPage: ''
  },
  dataImage: {},
  dataTabAduanStatus: '',
  dataTabAduanLimit: 5,
  dataTabAduanPage: 1
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
  setDataTabAduanStatus (state, status) {
    state.dataTabAduanStatus = status
  },
  setDataTabAduanLimit (state, limit) {
    state.dataTabAduanLimit = limit
  },
  setDataTabAduanPage (state, page) {
    state.dataTabAduanPage = page
  }
}
