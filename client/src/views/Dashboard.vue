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

        <v-dialog v-model="dialog" max-width="500px">
            <WorkoutForm :workout="w"></WorkoutForm>
        </v-dialog>

        <v-card-actions>
        <v-btn flat>Share</v-btn>
        <v-spacer></v-spacer>
        <Button :id="w.id" :dialog="dialog" @switchDialog="handleDialog"></Button>
        </v-card-actions>
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
    created() {
        this.$store.dispatch('loadWorkouts', { vm: this })
    },
    computed: {
        workouts() { return this.$store.getters.workouts }
    },
    methods: {
        normalizeDate: (d) => {
            d = new Date(d).toLocaleString('en-GB', { timeZone: 'UTC' })
            return d
        },
        duration: function (ds, de) {
            ds = new Date(`Sep 1, 2018 ${ds} GMT+00:00`)
            de = new Date(`Sep 1, 2018 ${de} GMT+00:00`)
            let res = Math.floor((de-ds) / (1000*60))
            return `${res} min.`
        },
        logout: function () {
            this.$store.commit('setAuth', false)
            this.$store.commit('clearToken')
            this.$router.push('/')
        },
        handleDialog(v) {
        this.dialog = v
        }
    },
    data() {
        return {
            dialog: false
        }
    }
}
</script>

<style scoped lang="scss">
</style>