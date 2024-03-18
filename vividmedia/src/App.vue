<template>
  <v-card class="navbar">
    <v-tabs v-model="tab" align-tabs="center" color="blue-lighten-1">
      <v-tab class="nav" color="blue-lighten-1" @click="$router.push('/')">Home</v-tab>
      <v-tab class="nav" color="blue-lighten-1" @click="$router.push('/gallery')">Our Projects</v-tab>
      <v-tab class="nav" color="blue-lighten-1" @click="$router.push('/contact')">Contact</v-tab>
      <!--<router-link to="/">Home</router-link>
      <router-link to="/gallery">Our Projects</router-link>
    <router-link to="/contact">Contact</router-link>-->
    </v-tabs>
  </v-card>
  <router-view></router-view>

  <!-- <FooterArea class="footer"/>
     -->
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

.margin-left-no {
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

.input-group>.intl-tel-input.allow-dropdown {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
}

.input-group>.intl-tel-input.allow-dropdown>.flag-container {
  z-index: 4;
}

.iti-flag {
  background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/img/flags.png");
}

@media only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and (min--moz-device-pixel-ratio: 2),
only screen and (-o-min-device-pixel-ratio: 2 / 1),
only screen and (min-device-pixel-ratio: 2),
only screen and (min-resolution: 192dpi),
only screen and (min-resolution: 2dppx) {
  .iti-flag {
    background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/img/flags@2x.png");
  }
}

.footer {
  z-index: 5;
}
</style>
