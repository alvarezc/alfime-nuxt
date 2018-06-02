module.exports = {
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    proxy: {
      xfwd: true
    } // Can be also an object with default options
  },

  proxy: {
    '/api/': 'http://localhost:8090'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'ALFIME - Gestión de Atención',
    htmlAttrs: {
      lang: 'es-co'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Gestión de atención a usuarios de ALFIME'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
    ]
  },

  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/validate.js',
    '~/plugins/components.js',
    {src: '~/plugins/localStorage.js', ssr: false}
  ],

  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
      'bluebird',
      'moment',
      'traverson',
      '~/plugins/vuetify.js',
      '~/services/lookup.js',
      '~/services/evaluacion.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
