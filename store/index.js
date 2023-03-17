export const state = () => ({
  page: 'Klaim Akun RW',
  header: {
    navigations: [],
    descriptionPage: ''
  }
})

export const mutations = {
  setActivePage (state, page) {
    state.page = page
  },
  setHeader (state, header) {
    state.header.navigations = header.navigations
    state.header.descriptionPage = header.descriptionPage
  }
}
