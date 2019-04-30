<template>
<v-card>
  <h3>{{workout.description}}</h3>
  <v-card-text>
    <v-text-field label="workout name" v-model="description"></v-text-field>
    <!-- <v-text-field :value="workout.start_time" label="start time"></v-text-field>
    <v-text-field :value="workout.end_time"></v-text-field> -->
    <v-text-field label="steps taken" v-model="steps"></v-text-field>

  <v-flex xs11 sm5>
      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeStart"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="timeStart"
            label="Start time"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="timeStart"
          full-width
          @click:minute="$refs.menu.save(timeStart)"
        ></v-time-picker>
      </v-menu>
    </v-flex>

    <v-text-field label="calories burnt" v-model="burnt"></v-text-field>
    <v-select
      v-model="select"
      :items="exercises"
      :error-messages="selectErrors"
      label="select exercise"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn v-if='!newItem' flat color="primary" @click="handleUpdate(workout.id)">Submit</v-btn>
    <v-btn v-if='newItem' flat color="primary" @click="handleCreate(workout.id)">Submit</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'WorkoutForm',
  props: ['workout', 'newItem'],
  created() {
    this.$store.dispatch('loadExercises', { vm: this })
  },
  computed: {
      exercises() {
        let res = []
        this.$store.getters.exercises.forEach(element => {
          res.push(element.name)
        })
        return res
        }
  },
  methods: {
    handleUpdate(id) {
      this.$http.put(`/workouts/${id}`, { description : this.description, calories_burnt: this.burnt, start_time: this.timeStart, steps_taken: this.steps })
        .then(res => {
            this.$store.dispatch('loadWorkouts')
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCreate() {
      this.$http.post(`/workouts`, { description : this.description, calories_burnt: this.burnt, start_time: moment(new Date()).format('HH:mm'), end_time: moment(new Date()).format('HH:mm') , steps_taken: this.steps, eid: 1, uid: this.$store.state.user.id })
        .then(res => {
            this.$store.dispatch('loadWorkouts')
        })
        .catch(error => {
          console.log(error)
        })       
    }
  },
  data () {
    return {
    menu2: false,
    menu3: false,
    timeStart: this.$props.workout.start_time,
    timeEnd: this.$props.workout.end_time,
    burnt: this.$props.workout.calories_burnt,
    description: this.$props.workout.description,
    steps: this.$props.workout.steps_taken
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>