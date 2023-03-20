export const state = () => ({
  icon: {
    name: '',
    fill: ''
  },
  buttonLeft: {
    label: '',
    variant: ''
  },
  buttonRight: {
    label: '',
    variant: ''
  },
  message: {
    title: '',
    detail: ''
  },
  dialogType: '',
  title: ''
})

const defautState = {
  icon: {
    name: '',
    fill: ''
  },
  buttonLeft: {
    label: '',
    variant: ''
  },
  buttonRight: {
    label: '',
    variant: ''
  },
  message: {
    title: '',
    detail: ''
  },
  dialogType: '',
  title: ''
}

export const getters = {
  getIcon (state) {
    return state.icon
  },
  getButtonLeft (state) {
    return state.buttonLeft
  },
  getButtonRight (state) {
    return state.buttonRight
  },
  getMessage (state) {
    return state.message
  },
  getDialogType (state) {
    return state.dialogType
  },
  getTitle (state) {
    return state.title
  }
}

export const actions = {
  showHandle ({ state, commit }, payload) {
    commit('setButtonLeft', payload.buttonLeft)
    commit('setButtonRight', payload.buttonRight)
    commit('setTitle', payload.title)
    commit('setDialogType', payload.dialogType)
    commit('setIcon', state.icon)
    commit('setMessage', state.message)
  }
}

export const mutations = {
  setIcon (state, icon) {
    state.icon = icon
  },
  setButtonLeft (state, button) {
    state.buttonLeft = button
  },
  setButtonRight (state, button) {
    state.buttonRight = button
  },
  setDialogType (state, dialogType) {
    state.dialogType = dialogType
  },
  setTitle (state, title) {
    state.title = title
  },
  setMessage (state, message) {
    state.message = message
  },
  clearState (state) {
    state.buttonLeft = defautState.buttonLeft
    state.buttonRight = defautState.buttonRight
    state.dialogType = defautState.dialogType
    state.title = defautState.title
    state.message = defautState.message
    state.icon = defautState.icon
  }
}
