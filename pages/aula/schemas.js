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
      id: 4,
      etiqueta: 'Metodología',
      tipo: 'etiqueta'
    },
    {
      id: 5,
      etiqueta: 'Escuela de Padres',
      nombre: 'padres',
      tipo: 'check'
    },
    {
      id: 6,
      etiqueta: 'Visita Domiciliaria',
      nombre: 'visita',
      tipo: 'check'
    },
    {
      id: 7,
      etiqueta: 'Método',
      tipo: 'etiqueta'
    },
    {
      id: 8,
      etiqueta: 'Conversatorio',
      nombre: 'conversatorio',
      tipo: 'check'
    },
    {
      id: 9,
      etiqueta: 'Lecturas',
      nombre: 'lecturas',
      tipo: 'check'
    },
    {
      id: 10,
      etiqueta: 'Música',
      nombre: 'musica',
      tipo: 'check'
    },
    {
      id: 11,
      etiqueta: 'Películas',
      nombre: 'peliculas',
      tipo: 'check'
    },
    {
      id: 12,
      etiqueta: 'Manualidades',
      nombre: 'manualidades',
      tipo: 'check'
    },
    {
      id: 13,
      etiqueta: 'Salida Pedagógica',
      nombre: 'salida',
      tipo: 'check'
    },
    {
      id: 14,
      etiqueta: 'Uso de Medios',
      nombre: 'medios',
      tipo: 'check'
    },
    {
      id: 15,
      etiqueta: 'Creación de Inventos',
      nombre: 'inventos',
      tipo: 'check'
    },
    {
      id: 16,
      etiqueta: 'Contexto',
      tipo: 'etiqueta'
    },
    {
      id: 17,
      etiqueta: 'Hogar',
      nombre: 'hogar',
      tipo: 'check'
    },
    {
      id: 18,
      etiqueta: 'Aire Libre',
      nombre: 'aireLibre',
      tipo: 'check'
    },
    {
      id: 19,
      etiqueta: 'Aula',
      nombre: 'aula',
      tipo: 'check'
    },
    {
      id: 20,
      etiqueta: 'Comedor',
      nombre: 'comedor',
      tipo: 'check'
    }
  ],
  model: {
    generales: null,
    especificos: null,
    padres: false,
    visita: false,
    conversatorio: false,
    lecturas: false,
    musica: false,
    peliculas: false,
    manualidades: false,
    salida: false,
    medios: false,
    inventos: false,
    hogar: false,
    aireLibre: false,
    aula: false,
    comedor: false
  }
}

export const informe = {
  schema: [
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
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    }
  ],
  model: {
    logros: null,
    dificultades: null,
    observaciones: null
  }
}

export const seguimiento = {
  schema: [
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
      tipo: 'texto',
      opciones: {
        max: 500,
        multi: true
      }
    }
  ],
  model: {
    logros: null,
    dificultades: null,
    observaciones: null
  }
}
