<template>
  <div class="signup">
    <h1>This is a signup page</h1>
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
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
    <v-btn outline color="indigo" @click="handleFormSubmit">Signup</v-btn>
    </v-form>
    </v-flex>
    </v-layout>
  </div>
</template>
<script>

export default {
  name: 'signup',
  components: {
  },
  methods: {
    handleFormSubmit: function () {
    if (this.$refs.form.validate()) {
        
      this.$http.post(`/signup`, { username: this.username, email: this.email, password: this.password })
      .then(res => {
        this.$store.commit('setToken', res.data.token)
        this.$router.push('dashboard')
      })
      .catch(e => {
        console.log(e.response)
        this.$store.commit('addAlert', e.response.data)
        setTimeout(() => this.$store.commit('clearAlerts'), 2500)
      })
    }
  }
  },
  data: () => ({
    username: '',
    email: '',
    password: '',
    valid: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ],
  })
};
</script>
