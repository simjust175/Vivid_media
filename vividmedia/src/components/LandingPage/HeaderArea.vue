<template>
  <!-- <v-sheet class="main-container"> -->
  <v-card class="margin-top">
    <div class="root">
      <img class="background" ref="background" src="../../../public/vivid_bg_blk.svg" />

      <div class="section section-1" ref="first">
        <div>
          <h1 class="text-h1 font-weight-thick mb-5 text-gradient">
            Unleash the the power of A.I.
          </h1>
          <!-- <h2 class="text-h2 font-weight-thick mb-5 text-gradient" align="center">
            WITH VIVID MEDIA
          </h2> -->
        </div>
      </div>
      <div class="section section-2" ref="second">
        <div>
          <!-- <h2 class="text-h2 font-weight-extrathick mb-2 text-blue-lighten-4 text-gradient">Call us NOW!!</h2> -->
          <a class="button button-wiggle" @click="$router.push('/contact')">GET YOUR MEDIA NOW!</a>
        </div>
      </div>
      <div class="section section-3" ref="third" height="80vh">
        <!-- <v-card class="transparent" height="80vh" width="80vw"></v-card> -->
      </div>
    </div>

    <main-carousal class="carousal  margin-left-no" />
    <contact-area class="full-vh padding-top margin-left-no" />
  </v-card>
  <!-- </v-sheet> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


const background = ref(null)
const first = ref(null)
const second = ref(null)
const third = ref(null)

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const scrollY = window.scrollY
  // decreases as user scrolls
  first.value.style.opacity =
    (100 - (scrollY + window.innerHeight - first.value.offsetHeight)) / 100
    
  // increases as user scrolls
  second.value.style.opacity =
    (scrollY + window.innerHeight - second.value.offsetTop) / 100

  // second.value.style.opacity =
  //   (100 - (scrollY + window.innerHeight - second.value.offsetTop)) / 100

  third.value.style.opacity =
    (scrollY + window.innerHeight - third.value.offsetTop) / 100

  const maxBackgroundSize = 120
  const backgroundSize = scrollY / (maxBackgroundSize - 100) // increases as user scrolls

  // zoom the background at a slower rate
  background.value.style.transform =
    'scale(' + (100 + backgroundSize * 0.4) / 100 + ')'

}

</script>




<style>
.main-container {
  padding: 0;
  margin: 0;
  scroll-snap-type: y mandatory;
  /* 'y' for vertical snapping, 'mandatory' for strict snapping */
  overflow-y: scroll;
}

/* Set the scroll container */
.root {
  scroll-snap-type: y mandatory;
  /* 'y' for vertical snapping, 'mandatory' for strict snapping */
  overflow-y: scroll;
  /* Make sure this container can scroll */
  height: auto;
  /* Give it a fixed height, or make sure it's the height you want */
}

.text-gradient {
  /* background: linear-gradient(45deg, lightblue, rgb(78, 119, 196), lightblue, rgb(71, 129, 238));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  color: #fff;
  text-shadow: 1px 1px 5px red;
}

/* copy */
img.background,
img.foreground {
  /* Fill background */
  min-height: 100%;
  min-width: 1024px;

  /* Scale proportionately */
  width: 100%;
  height: auto;
}

img.background {
  /* Positioning */
  position: fixed;
  top: 0;
  left: 0;
}

.section,
.carousal {
  min-height: 100vh;
  position: relative;
  scroll-snap-align: center;
}

.section>div {
  position: fixed;
  /* color: white; */
  /* centers this div */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.section-1 {
  margin-bottom: 500px;
  white-space: nowrap;
  /* determines the gap between our two sections */
}

.section-2 {
  opacity: 0;
  height: 120vh;
  /* defaults to 0 because it's not visible */
}

.section-3 {
  opacity: 0;
  /* defaults to 0 because it's not visible */
}

.section-2 div {
  /* background-color: rgba(255, 255, 255, 0.7); */
  color: black;
  text-align: center;
  padding: 50px;
}

.section-2 h2 {
  font-size: 2em;
  margin-bottom: 40px;
}

.section-2 p {
  line-height: 150%;
}


/* copy */
.main-img {
  height: 2900px;
}

.full-vh {
  height: 100vh;
}

.button {
  position: relative;
  color: white;
  backdrop-filter: blur(10px);
  font-size: 25px;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid white;
  border-radius: 1000px;
  padding: 20px 30px;
  margin: 40px;
  box-shadow: 0 2px 5px 0 rgba(3, 6, 26, 0.15);
  transition: 0.5s all ease-in-out;
}

.button:hover {
  cursor: pointer;
  /* color: #1F4141; */
  /* color: transparent; */
  animation: none;
  background: linear-gradient(to right, rgb(113, 0, 0), rgb(184, 144, 144),  rgb(134, 1, 1));
  /* -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
}

.button-wiggle {
  animation: wiggle 4s 2s infinite;
}

@keyframes wiggle {

  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.9);
  }

  15% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1.15) rotate(-5deg);
  }

  25% {
    transform: scale(1.15) rotate(5deg);
  }

  30% {
    transform: scale(1.15) rotate(-3deg);
  }

  35% {
    transform: scale(1.15) rotate(2deg);
  }

  40% {
    transform: scale(1.15) rotate(0);
  }
}

.button {
  overflow: hidden;
}
</style>
