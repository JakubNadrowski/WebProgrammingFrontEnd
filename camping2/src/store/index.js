// store/index.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

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
    async login({ commit }, loginData) {
      try {
        const response = await axios.post('http://localhost:5151/api/Users/Login', loginData);
        if (response.data.success) {
          commit('setUser', response.data.user);
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  plugins: [createPersistedState()],
});

export default store;