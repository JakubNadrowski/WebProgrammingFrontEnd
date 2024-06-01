// store/index.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  plugins: [createPersistedState()],
});

export default store;