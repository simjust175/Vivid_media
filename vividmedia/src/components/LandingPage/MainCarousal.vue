<template>
  <v-parallax>
    <v-carousel
      height="100vh"
      show-arrows="hover"
      cycle
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">
              {{ slide }} Slide
              <img :src="slide" :alt="slide" v-if="slide[0] === '.'">
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-parallax>
  </template>
  <script>
    export default {
      data () {
        return {
          colors: [
            'indigo',
            'warning',
            'pink darken-2',
            'red lighten-1',
            'deep-purple accent-4',
          ],
          slides: [
            'First',
            'Second',
            'Third',
            'Fourth',
            'Fifth',
          ],
        }
      },
    }
  </script>

  <style>
  img{
    height: 100%;
  }
</style>