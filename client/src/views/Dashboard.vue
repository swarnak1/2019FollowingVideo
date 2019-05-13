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
            <v-icon>account_circle</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
            <v-list-tile-title>{{user.username}}</v-list-tile-title>
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
<!-- search -->
<v-card>
    <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    cache-items
    class="mx-3"
    flat
    hide-no-data
    hide-details
    label="exercises you are looking for?"
    solo-inverted
    ></v-autocomplete>
</v-card>

<!-- workouts -->
  
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
            <WorkoutForm :workout="w" :newItem="false"></WorkoutForm>
        </v-dialog>

        <v-card-actions>
        <v-btn flat>Share</v-btn>
        <v-spacer></v-spacer>
        <Button :id="w.id" :dialog="dialog" @switchDialog="handleDialog"></Button>
        </v-card-actions>
    </v-card>
    </v-flex>
    <v-fab-transition>
    <v-btn @click="handleDialogCreate"
        color="indigo"
        dark
        absolute
        bottom
        right
        fab
    >
        <v-icon>add</v-icon>
    </v-btn>
    </v-fab-transition>
    <v-dialog v-model="dialogCreate" max-width="500px">
    <WorkoutForm :workout="[]" :newItem="true"></WorkoutForm>
    </v-dialog>
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
        workouts() { return this.$store.getters.workouts },
        user() {return this.$store.getters.user}
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
        },
        handleDialogCreate(v) {
        this.dialogCreate = v
        },
        querySelections (v) {
            this.loading = true
            // Simulated ajax query
            this.$http.get(`/exercises/`)
                    .then( response => {
                    let wrks = response.data
                    for ( let i of wrks) {
                        this.items.push(i.name)
                    }
                    this.items = wrks.filter(e => {
                        return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                })
                    })
    }
    },
    watch: {
    search (val) {
        val && val !== this.select && this.querySelections(val)
    }
    },
    data() {
        return {           
            model: null,
            dialog: false,
            dialogCreate: false,
            items: [],
            search: null,
            select: null,
            states: []
        }
    }
}
</script>

<style scoped lang="scss">
</style>