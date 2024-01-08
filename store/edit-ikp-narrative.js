export const state = () => ({
  fieldEditIkpNarrative: ''
})

export const getters = {
  getFieldEditIkpNarrative: (state) => {
    return state.fieldEditIkpNarrative
  }
}

export const mutations = {
  setFieldEditIkpNarrative (state, fieldEditIkpNarrative) {
    state.fieldEditIkpNarrative = fieldEditIkpNarrative
  }
}
