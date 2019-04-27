import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const Axios = axios.create({
  baseURL: `http://127.0.0.1:3000/api/v1`,
})


const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true
})

export default new Vuex.Store({
  state: {
    auth: false,
    alerts : [],
    uuid: '',
    token : '',
    workouts: []
  },
  getters: {
    newWorkout: state => state.workouts,
    workouts: state => state.workouts
  },
  mutations: {
    setAuth (state, payload) {
      state.auth = payload
    },
    addAlert (state, payload) {
      state.alerts.splice(0, 1, payload)
    },
    clearAlerts (state) {
      state.alerts = []
    },
    setToken (state, payload) {
      state.token = payload
    },
    clearToken (state) {
      state.token = ''
    },
    SET_USER_UUID (state, id) {
      state.uuid = id
    },
    SET_WORKOUTS (state, workouts) {
      state.workouts = workouts
    },
  },
  actions: {
    loadWorkouts ({ state, commit }) {
      Axios.get(`/workouts/${state.uuid}`)
      .then(response => {
        commit('SET_WORKOUTS', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    removeWorkout ({ dispatch }, id) {
      Axios.delete(`/workouts/${id}`)
      .then(() => {
        dispatch('loadWorkouts')
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  plugins: [vuexLocal.plugin]
});
