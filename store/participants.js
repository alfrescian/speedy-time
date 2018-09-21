import Strapi from 'strapi-sdk-javascript';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

export const state = () => ({
  list: [],
});

export const mutations = {
  add(state, participant) {
    state.list.push(participant);
  }
};

export const actions = {
  async create({commit}, participant) {

    return strapi.createEntry('participant', participant)
      .then((createdParticipant) => {
        console.log('participant created', createdParticipant);
        commit('add', createdParticipant);
      })
      .catch(error => console.log(error.config));
  },
};
