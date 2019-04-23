<template>
<v-card height="350px">
    <v-navigation-drawer
    permanent
    absolute
    >
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
        <v-list-tile avatar>
            <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/women/10.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
            <v-list-tile-title>Carry</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
        <v-divider></v-divider>

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
</v-card>
</template>

<script>
export default {
    methods: {
        logout: function () {
            this.$store.commit('setAuth', false)
            this.$store.commit('clearToken')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped lang="scss">
</style>