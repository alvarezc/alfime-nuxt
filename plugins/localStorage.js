import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'alfime',
    paths: ['alfime'],
    storage: sessionStorage
  })(store)
}
