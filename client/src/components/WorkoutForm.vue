<template>
<v-card>
  <h3>{{workout.description}}</h3>
  <v-card-text>
    <v-text-field :value="workout.description" label="workout name"></v-text-field>
    <v-text-field :value="workout.start_time" label="start time"></v-text-field>
    <v-text-field :value="workout.end_time"></v-text-field>
    <v-text-field :value="workout.calories_burnt" label="calories burnt"></v-text-field>
    <v-text-field  label="select exercise"></v-text-field>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn flat color="primary">Submit</v-btn>
  </v-card-actions>
</v-card>
</template>
<script>
export default {
  name: 'WorkoutForm',
  props: ['workout'],
  methods: {
    change() {
      this.$emit('switchDialog', !this.dialog)
    },
    handleDelete: function (id) {
      this.$store.dispatch('removeWorkout', id)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>