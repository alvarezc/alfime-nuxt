export const state = () => ({
  sidebar: false,
  user: {}
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
