export const state = () => ({
  page: 'Klaim Akun RW',
  header: {
    navigations: [],
    descriptionPage: '',
  },
  dataImage: {},
  responseFile: {},
  backPage: false, // for control old query on page list
})

export const actions = {
  updateNavInstruction({ state, commit }, dataHeader) {
    const navigations = dataHeader.navigations.filter((item) => {
      return !dataHeader.fromInstructionPage
        ? item.label !== 'Detail Instruksi'
        : item
    })
    commit('setHeader', {
      ...state.header,
      navigations,
      descriptionPage: dataHeader.descriptionPage,
    })
    commit('setActivePage', dataHeader.label)
  },
}

export const mutations = {
  setActivePage(state, page) {
    state.page = page
  },

  setHeader(state, header) {
    state.header.navigations = header.navigations
    state.header.descriptionPage = header.descriptionPage
  },
  setDataImage(state, image) {
    state.dataImage = image
  },
  setResponseFile(state, responseFile) {
    state.responseFile = responseFile
  },
  setBackPage(state, backPage) {
    state.backPage = backPage
  },
}
