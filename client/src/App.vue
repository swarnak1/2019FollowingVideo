<template>
<v-app>
  <v-toolbar app>
    <router-link to="/"><v-icon color="blue darken-2">fas fa-home</v-icon></router-link>
    <v-spacer></v-spacer>
    <router-link v-if="!auth" to="login"><v-btn outline color="indigo">Login<v-icon class="nav-auth-btn" small>fas fa-key</v-icon></v-btn></router-link>
    <router-link v-if="!auth" to="signup"><v-btn outline color="indigo">Signup<v-icon class="nav-auth-btn" small>fas fa-user-plus</v-icon></v-btn></router-link>
    <router-link v-if="auth" to="dashboard"><v-btn outline color="indigo">Dashboard</v-btn></router-link>
  </v-toolbar>
  <v-content>
    <v-container fluid>
      <v-layout row wrap align-center justify-center>
      <v-flex xs6 v-if="alerts.length">
      <v-alert v-for="a in alerts" :key="a.index"
        :value="true"
        color="warning"
        icon="priority_high"
        outline
      >
        {{a}}
      </v-alert>
      </v-flex>
      </v-layout>
    </v-container>
    <router-view></router-view>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>

<script>
export default {
  computed: {
    alerts() {
      return this.$store.state.alerts
    },
    auth() {
      return this.$store.state.auth
    }
  },
  data () {
  return {
  }
}
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.nav-auth-btn {
  margin-left: 1em !important;
}
</style>
