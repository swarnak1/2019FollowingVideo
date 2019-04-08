<template>
  <div class="signup">
    <h1>This is a signup page</h1>
    <v-layout pa-12 mb-12 align-center justify-center>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
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
    </v-form>
    </v-layout>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'signup',
  components: {
  },
};
</script>
