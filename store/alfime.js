export const items = [
  {id: 1, icon: 'apps', title: 'Bienvenidos', to: '/', exact: true},
  {id: 3, icon: 'perm_identity', title: 'Usuario', to: '/usuario', exact: true},
  {
    id: 4,
    icon: 'assignment',
    title: 'Evaluacion',
    to: `/`,
    disabled: true,
    exact: false
  },
  {id: 5, icon: 'widgets', title: 'Administración', to: '/admin', exact: true},
  {id: 6, icon: 'widgets', title: 'Aula Pedagogica', to: '/aula', exact: true},
  {id: 7, icon: 'widgets', title: 'Deportes', to: '/deporte', exact: true},
  {id: 8, icon: 'widgets', title: 'Fisioterapia', to: '/fisioterapia', exact: true},
  {id: 9, icon: 'widgets', title: 'Psicologia', to: '/psicologia', exact: true}
]

export const state = () => ({
  usuario: null,

  evaluacion: null,

  items
})

export const mutations = {
  updateUsuario (state, usuario) {
    state.usuario = usuario
    state.evaluacion = null
    state.items = items.map(item => ({...item}))
  },

  updateEvaluacion (state, evaluacion) {
    const usuario = state.usuario

    if (!evaluacion || !usuario) {
      return
    }

    const subItems = [
      {id: 40, title: 'Inicio', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}`, exact: true},
      {id: 47, title: 'Contacto', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/contacto`},
      {id: 41, title: 'Familia', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/familia`},
      {id: 42, title: 'Ocupacion', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/ocupacion`},
      {id: 43, title: 'Ingresos', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/ingresos`},
      {
        id: 44,
        title: 'Securidad Social',
        to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/seguridad-social`
      },
      {id: 48, title: 'Aspecto Médico', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/medico`},
      {
        id: 46,
        title: 'Aspecto Psicologico',
        to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/aspecto-psicologico`
      }
    ]

    state.evaluacion = evaluacion

    state.items = items.map(item => item.id === 4 ? {...item, disabled: false, subItems} : {...item})
  }
}
