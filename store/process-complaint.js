import { complaintSource } from '~/constant/aduan-masuk'

export const state = () => ({
  payload: {
    status_description: '', // because must count of length string
    coverage_of_affairs: null,
    deadline_date: null,
    proposed_ikp_narrative: '', // because must count of length string
    urgency_level: null,
    opd_pic: null,
    opd_name: null,
    complaint_status_id: null,
  },
  dataComplaintSource: {
    id: '',
    name: '',
  },
})

export const getters = {
  getPayload: (state) => {
    return state.payload
  },
}

export const actions = {
  changeComplaintStatusId({ state, commit }) {
    if (state.dataComplaintSource?.id === complaintSource.span.id) {
      const payload = { ...state.payload, complaint_status_id: 'coordinated' }
      commit('setPayload', payload)
    }
  },
}

export const mutations = {
  setPayload(state, payload) {
    state.payload = payload
  },
  setComplaintSource(state, complaintSource) {
    state.dataComplaintSource = complaintSource
  },
}
