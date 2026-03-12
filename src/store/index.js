import { createStore } from 'vuex';
import { loginRequest, signupRequest, logoutRequest } from '@/utils/api';


export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
    LOGOUT: (state) => {
      state.token = '';
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject();
          });
      });
    },
    SIGNUP_REQUEST: (context, user) => {
      return new Promise((resolve, reject) => {
        signupRequest(user)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    LOGOUT_REQUEST: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        logoutRequest(state.token)
          .then(() => {
            commit('LOGOUT');
            localStorage.removeItem('myAppToken');
            resolve();
          })
          .catch(() => {
            commit('LOGOUT');
            localStorage.removeItem('myAppToken');
            reject();
          });
      });
    },
  },
  modules: {
  }
})
