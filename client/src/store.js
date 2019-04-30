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
    user: {},
    token : '',
    workouts: [],
    exercises: []
  },
  getters: {
    newWorkout: state => state.workouts,
    workouts: state => state.workouts,
    exercises: state => state.exercises,
    user: state => state.user
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
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_WORKOUTS (state, workouts) {
      state.workouts = workouts
    },
    SET_EXERCISES (state, exercises) {
      state.exercises = exercises
    }
  },
  actions: {
    loadWorkouts ({ state, commit }) {
      Axios.get(`/workouts/${state.user.id}`)
      .then(response => {
        commit('SET_WORKOUTS', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    loadExercises ({ commit }) {
      Axios.get(`/exercises`)
      .then(res => {
        commit('SET_EXERCISES', res.data)
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
