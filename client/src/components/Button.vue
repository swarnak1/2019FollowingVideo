<template>
<v-speed-dial>
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
          small
        >
          <v-icon>edit</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="change"
      >
        <v-icon>edit</v-icon>
        <v-dialog v-model="dialog" max-width="500px">
            <WorkoutForm :workout="w"></WorkoutForm>
        </v-dialog>
      </v-btn>
      <v-btn @click="handleDelete(id)"
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
</template>
<script>
export default {
  name: 'Button',
  props: ['id', 'dialog'],
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