export const plan = {
  schema: [
    {
      id: 1,
      etiqueta: 'Objetivos Generales',
      nombre: 'generales',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 2,
      etiqueta: 'Objetivos Especificos',
      nombre: 'especificos',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 3,
      etiqueta: 'Plan de Atención',
      nombre: 'plan',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 4,
      etiqueta: 'Metodología',
      tipo: 'etiqueta'
    },
    {
      id: 5,
      etiqueta: 'Salida pedagógica',
      nombre: 'salidaP',
      tipo: 'check'
    },
    {
      id: 6,
      etiqueta: 'Orientación',
      nombre: 'orientacion',
      tipo: 'check'
    },
    {
      id: 7,
      etiqueta: 'Consulta',
      nombre: 'consulta',
      tipo: 'check'
    },
    {
      id: 8,
      etiqueta: ' Taller',
      nombre: 'taller',
      tipo: 'check'
    }
  ],
  model: {
    generales: null,
    especificos: null,
    plan: null,
    salidaP: false,
    orientacion: false,
    consulta: false,
    taller: false
  }
}

export const informe = {
  schema: [
    {
      id: 9,
      etiqueta: 'Motivo de consulta',
      nombre: 'motivo',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 10,
      etiqueta: 'Logros',
      nombre: 'logros',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 11,
      etiqueta: 'Dificultades',
      nombre: 'dificultades',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 12,
      etiqueta: 'Observaciones',
      nombre: 'observaciones',
      tipo: 'texto'
    },
    {
      id: 13,
      etiqueta: 'Actividad',
      nombre: 'actividad',
      tipo: 'etiqueta'
    },
    {
      id: 14,
      etiqueta: 'Cine Foro',
      nombre: 'cine',
      tipo: 'check'
    },
    {
      id: 15,
      etiqueta: 'Recreación',
      nombre: 'recreacion',
      tipo: 'check'
    },
    {
      id: 16,
      etiqueta: 'Exposición ',
      nombre: 'exposicion',
      tipo: 'check'
    },
    {
      id: 17,
      etiqueta: ' Trabajo en equipo',
      nombre: 'trabajo',
      tipo: 'check'
    },
    {
      id: 18,
      etiqueta: 'Otro',
      nombre: 'otro',
      tipo: 'texto'
    }
  ],
  model: {
    motivo: null,
    logros: null,
    dificultades: null,
    observaciones: null,
    cine: false,
    recreacion: false,
    exposicion: false,
    trabajo: false,
    otro: null
  }
}

export const seguimiento = {
  schema: [
    {
      id: 9,
      etiqueta: 'Motivo de consulta',
      nombre: 'motivo',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 10,
      etiqueta: 'Logros',
      nombre: 'logros',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 11,
      etiqueta: 'Dificultades',
      nombre: 'dificultades',
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    },
    {
      id: 12,
      etiqueta: 'Observaciones',
      nombre: 'observaciones',
      tipo: 'texto'
    }
  ],
  model: {
    motivo: null,
    logros: null,
    dificultades: null,
    observaciones: null
  }
}
