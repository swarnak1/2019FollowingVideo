<template>
  <v-parallax class="main-image" height="900" :src="require(`@/assets/fit.png`)">
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-3 mb-3">Track your fitness activities easily</h1>
    </v-layout>
    </v-parallax>
</template>

<style scoped lang="scss">
.main-image {
  margin-top: -4em !important;
  padding-top: 0em !important;
}
</style>