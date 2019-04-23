<template>
  <div class="login">
    <h1>This is a login page</h1>
    <v-layout row wrap align-center justify-center>
    <v-flex xs3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <v-text-field
        v-model="username"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
    <v-btn outline color="indigo" @click="handleFormSubmit">Login</v-btn>
    </v-form>
    </v-flex>
    </v-layout>
  </div>
</template>
<script>

export default {
  name: 'login',
  components: {
  },
  methods: {
    handleFormSubmit: function () {
      if (this.$refs.form.validate()) { 
      this.$http.post(`/login`, { username: this.username, password: this.password })
        .then(res => {
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('setAuth', true)
          this.$router.push('dashboard')
        })
        .catch(e => {
          console.log(e)
          this.$store.commit('addAlert', e)
          setTimeout(() => this.$store.commit('clearAlerts'), 2500)
        })
    }
  }
  },
  data: () => ({
    username: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ],
  })
};
</script>
