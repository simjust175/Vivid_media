<template>
  <!-- <v-sheet class="main-container"> -->
  <ToTheTop fixed bottom right :window="window"/>
  <v-card class="margin-top">
    <div class="root">

      <img class="background" ref="background" src="../../../public/newDesigns/11.svg" />

      <div class="section section-1" ref="first" height="150vh">
        <div>
          <h1 class="h1-text grow-on-scroll font-weight-thick text-gradient" ref="firstH1">
            Unleash the power of A.I.
          </h1>

        </div>
      </div>
      <div class="section section-2" ref="second">
        <div class="font-weight-thick mb-5 text-gradient grow-on-scroll">
          <h2>Using the top in the field</h2>
        </div>
      </div>
      <div class="section section-3" ref="third" height="100vh" width="100vw">
        <a class="button button-wiggle align-center" @click="$router.push('/contact')">GET YOUR MEDIA NOW!</a>
      </div>
    </div>

    <v-parallax>
      <main-carousal class="carousal  margin-left-no" />
    </v-parallax>
    <contact-area class="full-vh padding-top margin-left-no" />
  </v-card>
  <!-- </v-sheet> -->
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';


const background = ref(null)
const first = ref(null)
const second = ref(null)
const third = ref(null)
const firstH1 = ref(null);

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const scrollY = window.scrollY;

  const scrollPercentage = (scrollY / window.innerHeight) * 100;

  console.log("%", scrollPercentage)
  if (scrollPercentage >= 0) {
    let currentSize = parseFloat(fontSize.value);
    firstH1.value.style.fontSize = `${currentSize + 15}px`;
  } else {
    first.value.querySelector('.text-h1-first').classList.remove('grow');
  }

  first.value.style.opacity =
    (100 - ((scrollY - 100) + window.innerHeight - first.value.offsetHeight)) / 100

  // increases as user scrolls
  second.value.style.opacity =
    (scrollY + window.innerHeight - second.value.offsetTop) / 100
  console.log("vvvvv", scrollY, "WWWWW", window.innerHeight);



  if (scrollY >= 767) {
    second.value.style.opacity =
      (100 - (scrollY + window.innerHeight - second.value.offsetTop)) / 100

  }
  third.value.style.opacity =
    (scrollY + window.innerHeight - third.value.offsetTop) / 100

  const maxBackgroundSize = 120
  const backgroundSize = scrollY / (maxBackgroundSize - 100) // increases as user scrolls

  // zoom the background at a slower rate
  background.value.style.transform =
    'scale(' + (100 + backgroundSize * 0.4) / 100 + ')'

}

const fontSize = computed(() => {
  if (firstH1.value) {
    const computedStyle = window.getComputedStyle(firstH1.value);
    console.log("🦜", computedStyle.fontSize);
    return computedStyle.fontSize;
  }
  return null;
});



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

.grow-on-scroll {
  transition: font-size 0.5s ease-in-out;
}

/* Adjust the font size based on scroll position */
.section-1 .text-h1 {
  font-size: 4rem;
}

.grow {
  font-size: 6rem;
}

.text-gradient {
  color: #fff;
  background: -webkit-linear-gradient(left, rgb(84, 171, 232), white);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Chakra Petch", sans-serif;
  font-weight: 700;
  font-style: normal;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-radius: 200px;
  padding: 20px 30px;
  margin: 40px;
  box-shadow: 0 2px 5px 0 rgba(3, 6, 26, 0.15);
  transition: 0.5s all ease-in-out;
}

.button:hover {
  cursor: pointer;
  color: #1262B7;
  animation: none;
  background: #fff;
  /* background: linear-gradient(to right, rgb(113, 0, 0), rgb(184, 144, 144), rgb(134, 1, 1)); */
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
