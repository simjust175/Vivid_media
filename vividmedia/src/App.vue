<template>
  <v-card class="navbar">
    <v-tabs v-model="tab" align-tabs="center" color="red-lighten-2">
      <v-tab class="nav" color="red-lighten-2"><router-link to="/">Home</router-link></v-tab>
      <v-tab class="nav" color="red-lighten-2"><router-link to="/gallery">Our Projects</router-link></v-tab>
      <v-tab class="nav" color="red-lighten-2"><router-link to="/contact">Contact</router-link></v-tab>
    </v-tabs>
  </v-card>
  <router-view></router-view>
  <!-- <v-footer>
      <footer-area />
    </v-footer> -->
</template>

<script>

export default {
  data: () => ({
    tab: null,
  }),
  methods: {
    onScroll() {
      console.log("ho!");
    }
  }
}
</script>

<style>

.full-height {
  height: 100vh;
}

.xl-height {
  height: 2000px;
  width: 100%;
}

.margin-top {
  margin-top: 50px;
}

.padding-top {
  padding-top: 50px;
}

.margin-top-sm {
  margin-top: 25px;
}

.margin-left-no{
  margin-left: 0;
  width: 100%;
}

.nav a {
  text-decoration: none;
  color: #fff;
  font-size: 15px;
  font-family: "Chakra Petch", sans-serif;

}

.navbar {
  /* background-image: url(.././public/Logo/vivid.jpg); */
  background-color: #00000085;
  background-position: 180px;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;

}
</style>
