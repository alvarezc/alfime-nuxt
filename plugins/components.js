import Vue from 'vue'

import aEvaluacion from '~/components/evaluacion'
import lookup from '~/components/lookup'
import categoria from '~/components/categoria'
import cie from '~/components/cie'
import ingresos from '~/components/ingresos'
import actions from '~/components/actions'
import item from '~/components/nav-item'
import subItem from '~/components/nav-sub-item'

import formulario from '~/components/form/formulario'
import formTexto from '~/components/form/texto'
import formLookup from '~/components/form/lookup'
import formSlider from '~/components/form/slider'

Vue.component(aEvaluacion.name, aEvaluacion)
Vue.component(lookup.name, lookup)
Vue.component(categoria.name, categoria)
Vue.component(cie.name, cie)
Vue.component(ingresos.name, ingresos)
Vue.component(actions.name, actions)
Vue.component(item.name, item)
Vue.component(subItem.name, subItem)

Vue.component(formulario.name, formulario)
Vue.component(formTexto.name, formTexto)
Vue.component(formLookup.name, formLookup)
Vue.component(formSlider.name, formSlider)
