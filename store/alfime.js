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
    state.evaluacion = evaluacion
  }
}
