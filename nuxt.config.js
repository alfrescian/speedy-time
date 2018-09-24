const pkg = require('./package');
const Strapi = require('strapi-sdk-javascript').default;
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#FFFFFF'},

  /*
  ** pre-generate dynamic routes for existing events
  */
  generate: {
    routes: function () {
      return strapi.request('post', '/graphql', {
        data: {
          query: `query {
            events {
              _id
            }
          }
          `
        }
      }).then((response) => {
        return response.data.events.map((event) => {
          return '/events/' + event._id
        })
      });
    }
  },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    '@digibytes/markdownit',
    ['nuxt-validate', {
      lang: 'de',
    }]
  ],
  markdownit: {
    injected: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
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
};
