export const state = () => ({
  page: 'Klaim Akun RW',
  header: {
    navigations: [],
    descriptionPage: ''
  },
  dataImage: {}
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
  }
}
