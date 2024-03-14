<template>
    <v-container class="pt-12 margin-top" height="auto" fluid>
        <v-responsive>
            <v-row class="fill-height overflow-y-auto">
                <!-- <v-lazy :min-height="1800" :options="{ 'threshold': 0.5 }" transition="fade-transition"> -->

                    <v-col v-for="(video, index) in parsedVideos" :key="index" :cols="video.cols">
                        <gallery-card :video="video" />
                    </v-col>
                <!-- </v-lazy> -->
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted, defineComponent } from 'vue';
const videoArray = ref([]);

defineComponent(['GalleryCard'])

const fetchVideos = async () => {
    const res = await fetch('http://localhost:3344/videos/', {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const { videos } = await res.json();
    videoArray.value = videos;
    console.log("📃", videoArray.value);
}

onMounted(() => fetchVideos());

const colsArray = ref([3, 6, 3, 4, 4, 4]);

const parsedVideos = computed(() =>
    videoArray.value.map((video, index) => ({
        cols: colsArray.value[index % colsArray.value.length],
        youtubeURL: video.url,
    }))
);

</script>
