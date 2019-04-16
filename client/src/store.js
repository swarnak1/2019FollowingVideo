import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true
})

export default new Vuex.Store({
  state: {
    alerts : [],
    token : '',
  },
  mutations: {
    addAlert (state, payload) {
      state.alerts.splice(0, 1, payload)
    },
    clearAlerts (state) {
      state.alerts = []
    },
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {

  },
  plugins: [vuexLocal.plugin]
});
