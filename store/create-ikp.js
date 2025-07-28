import { ENDPOINT_IKP } from '~/constant/endpoint-api'

export const state = () => ({
  isShowPopup: false,
  isTruncate: false,
  ikpNarrative: '',
  dataComplaint: {},
  payload: {
    narrative: '',
    deadline_at: '',
    description: '',
    indicator_value: '',
    indicator_unit: '',
    opd_id: '',
    opd_name: '',
    coverage_of_affairs: '',
    opd_pemprov_id: '',
  },
  dataDialog: {
    title: '',
    nameModal: '',
    button: {
      submit: '',
      cancel: '',
    },
  },
  dialogConfirmation: {
    title: '',
    nameModal: '',
    descriptionText: '',
    buttonSubmit: {
      label: '',
      dataCy: '',
    },
  },
  detailInstruction: {},
  instructionNote: '',
  indicatorValue: '',
  isLoading: false,
})

export const getters = {
  getIsShowPopup: (state) => {
    return state.isShowPopup
  },
  getIkpNarrative: (state) => {
    return state.ikpNarrative
  },
  getIsTruncate: (state) => {
    return state.isTruncate
  },
  getPayload: (state) => {
    return state.payload
  },
  getDetailInstruction: (state) => {
    return state.detailInstruction
  },
  getDataComplaint: (state) => {
    return state.dataComplaint
  },
  getDataDialog: (state) => {
    return state.dataDialog
  },
}

export const actions = {
  async getDetailInstruction({ state, commit }, ikpCode) {
    commit('setIsLoading', true)
    try {
      const response = await this.$axios.get(`${ENDPOINT_IKP}/${ikpCode}`, {
        params: { complaint_id: state.dataComplaint.complaint_id },
      })
      commit('setDetailInstructon', response.data.data)
    } catch (error) {
      commit('setDetailInstructon', {})
    } finally {
      commit('setIsLoading', false)
    }
  },
  checkTruncate({ state, commit }) {
    if (state.ikpNarrative.length >= 125) {
      commit('setIsTruncate', true)
    } else {
      commit('setIsTruncate', false)
    }
  },
  showPopupInstruction({ state, commit }, nameModal) {
    commit('setDataDialog', {
      title: 'Buat Instruksi Aduan Baru',
      nameModal,
      informationMessage: 'Pembuatan Instruksi Aduan baru.',
      button: {
        submit: 'Lanjutkan',
        cancel: 'Kembali',
      },
    })

    if (nameModal === 'update-ikp') {
      commit('setDataDialog', {
        title: 'Instruksi Aduan',
        nameModal,
        informationMessage: 'Perubahan Instruksi Aduan',
        button: {
          submit: 'Ubah Instruksi',
          cancel: 'Batalkan',
        },
      })
    }
    commit('setIsShowPopup', true)
    commit('modals/OPEN', nameModal, { root: true })
  },
  clearPayload({ commit }) {
    commit('setPayload', {
      narrative: '',
      deadline_at: '',
      description: '',
      indicator_value: '',
      indicator_unit: '',
      opd_id: '',
      opd_name: '',
      coverage_of_affairs: '',
      opd_pemprov_id: '',
    })
    commit('setInstructionNote', '')
    commit('setIndicatorValue', '')
  },
}

export const mutations = {
  setIsShowPopup(state, isShowPopup) {
    state.isShowPopup = isShowPopup
  },
  setIkpNarrative(state, ikpNarrative) {
    state.ikpNarrative = ikpNarrative
  },
  setIsTruncate(state, isTruncate) {
    state.isTruncate = isTruncate
  },
  setPayload(state, payload) {
    state.payload = payload
  },
  setDataComplaint(state, dataComplaint) {
    state.dataComplaint = dataComplaint
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setDetailInstructon(state, detailInstruction) {
    state.detailInstruction = detailInstruction
  },
  setDataDialog(state, dataDialog) {
    state.dataDialog = dataDialog
  },
  setInstructionNote(state, instructionNote) {
    state.instructionNote = instructionNote
  },
  setIndicatorValue(state, indicatorValue) {
    state.indicatorValue = indicatorValue
  },
  setDialogConfirmation(state, dialogConfirmation) {
    state.dialogConfirmation = dialogConfirmation
  },
}
