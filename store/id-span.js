export const state = () => ({
  payload: {
    sp4n_created_at: '',
    sp4n_id: '',
    complaint_number: '',
  },
})

export const mutations = {
  setPayload(state, payload) {
    state.payload = payload
  },
}
