import Strapi from 'strapi-sdk-javascript';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

export const state = () => ({
  list: [],
  event: {}
});

export const mutations = {
  set(state, events) {
    state.list = events;
  }
};

export const getters = {
  getById: state => (id) => {
    return state.list.find(event => event._id === id);
  }
};

export const actions = {
  async get({commit}) {

    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            events {
              _id
              name
              headline
              contests {
                _id
                name
              }
            }
          }
          `
      }
    });
    commit('set', response.data.events);
    console.log('events loaded', response.data.events.length);
  },
};
