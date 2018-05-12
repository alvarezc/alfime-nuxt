import Vue from 'vue'
import aEvaluacion from '~/components/evaluacion'
import lookup from '~/components/lookup'
import categoria from '~/components/categoria'
import cie from '~/components/cie'
import ingresos from '~/components/ingresos'
import actions from '~/components/actions'

Vue.component(aEvaluacion.name, aEvaluacion)
Vue.component(lookup.name, lookup)
Vue.component(categoria.name, categoria)
Vue.component(cie.name, cie)
Vue.component(ingresos.name, ingresos)
Vue.component(actions.name, actions)
