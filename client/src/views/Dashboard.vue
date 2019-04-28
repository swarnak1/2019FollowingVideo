<template>
<v-layout row>
<v-flex xs1>
<v-navigation-drawer
    permanent
    value="true"
>
    <v-toolbar flat class="transparent">
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-list class="pa-0">
        <v-list-tile avatar>
            <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/women/10.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
            <v-list-tile-title>Eva</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list>
    </v-toolbar>
    <v-list>
    <v-list-tile
        @click="logout"
    >
        <v-list-tile-action>
        <v-icon>fas fa-sign-out-alt</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
        <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
    </v-list>
</v-navigation-drawer>
</v-flex>
    <v-flex xs2 sm2 v-for="w in workouts" :key="w.id">
    <v-card>
    <v-card-title primary-title>
        <div>
            <div class="headline">{{w.exercise.name + ' ' + w.description}} workout</div>
            <span class="grey--text">{{'created at: ' + normalizeDate(w.createdAt)}}</span>
        </div>
        </v-card-title>
        <div>
            <div class="headline">{{'duration: ' + (duration(w.start_time, w.end_time))}}</div>
            <div class="headline">{{'goal: ' + w.exercise.goal}}</div>
            <div class="headline">{{'calories burnt: ' + w.calories_burnt}}</div>
        </div>
    </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import Button from '@/components/Button.vue'
import WorkoutForm from '@/components/WorkoutForm.vue'
export default {
    components: {
    Button,
    WorkoutForm
    },
    methods: {
        logout: function () {
            this.$store.commit('setAuth', false)
            this.$store.commit('clearToken')
            this.$router.push('/')
        },
    }
}
</script>

<style scoped lang="scss">
</style>