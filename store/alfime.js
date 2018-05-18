export const state = () => ({
  usuario: null,

  evaluacion: null
})

export const mutations = {
  updateUsuario (state, usuario) {
    state.usuario = usuario
    state.evaluacion = null
  },

  updateEvaluacion (state, evaluacion) {
    const usuario = state.usuario

    if (!evaluacion || !usuario) {
      return
    }

    state.evaluacion = evaluacion
  }
}

export const getters = {
  getEvaluacion (state) {
    return state.evaluacion
  },
  getUsuario (state) {
    return state.usuario
  }
}
