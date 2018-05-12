export const state = () => ({
  usuario: null,

  evaluacion: null,

  items: [
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
})

export const mutations = {
  updateUsuario (state, usuario) {
    state.usuario = usuario
    state.evaluacion = null
  },

  updateEvaluacion (state, evaluacion) {
    const subItems = []
    const usuario = state.usuario

    subItems.push(
      {id: 40, title: 'Inicio', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}`, exact: true},
      {id: 41, title: 'Familia', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/familia`},
      {id: 42, title: 'Ocupacion', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/ocupacion`},
      {id: 43, title: 'Ingresos', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/ingresos`},
      {
        id: 44,
        title: 'Securidad Social',
        to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/seguridad-social`
      },
      {
        id: 45,
        title: 'Aspecto Laboral',
        to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/aspecto-laboral`
      },
      {
        id: 46,
        title: 'Aspecto Psicologico',
        to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/aspecto-psicologico`
      },
      {id: 47, title: 'Contacto', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/contacto`},
      {id: 48, title: 'Aspecto Médico', to: `/usuario/${usuario.id}/evaluacion/${evaluacion.id}/medico`}
    )

    state.evaluacion = evaluacion
    state.items = [
      {id: 1, icon: 'apps', title: 'Bienvenidos', to: '/', exact: true},
      {id: 3, icon: 'perm_identity', title: 'Usuario', to: '/usuario', exact: true},
      {
        id: 4,
        icon: 'assignment',
        title: 'Evaluacion',
        to: `/usuario/${usuario && usuario.id}/evaluacion/${evaluacion && evaluacion.id}`,
        disabled: !evaluacion,
        exact: false,
        subItems
      },
      {id: 5, icon: 'widgets', title: 'Administración', to: '/admin', exact: true},
      {id: 6, icon: 'widgets', title: 'Aula Pedagogica', to: '/aula', exact: true},
      {id: 7, icon: 'widgets', title: 'Deportes', to: '/deporte', exact: true},
      {id: 8, icon: 'widgets', title: 'Fisioterapia', to: '/fisioterapia', exact: true},
      {id: 8, icon: 'widgets', title: 'Psicologia', to: '/psicologia', exact: true}
    ]
  }
}
