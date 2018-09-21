export const actions = {
  nuxtServerInit({dispatch}, context) {
    return dispatch('events/get', context);
  }
};

