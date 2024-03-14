<template>
    <div>{{ loading }}</div>
    <v-card>
        <v-skeleton-loader v-if="loading" class="mx-auto border" max-width="100%"
            type="image, article"></v-skeleton-loader>
        <!-- <template > -->
        <iframe  @load="onIframeLoad"  width="100%" height="240" :src="getEmbedUrl(video.youtubeURL)" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-else>
        </iframe>
        <!-- </template> -->


        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="surface-variant" icon="mdi-share-variant" size="25" variant="text"></v-btn>
            <v-btn color="surface-variant" icon="mdi-bookmark" size="25" variant="text"></v-btn>
            <v-badge color="error" size="small" content="2"><v-icon icon="mdi-heart" size="25"></v-icon> </v-badge>

        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "GalleryCard",
    data() { return { loading: true } },
    props: {
        video: Object
    },
    methods: {
        // A function to extract the YouTube ID from a given URL
        extractYouTubeID(url) {
            const regex = /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/;
            const results = url.split(regex);
            return results[2] !== undefined ? results[2].split(/[^0-9a-z_-]/i)[0] : url[0];
        },
        getEmbedUrl(youtubeURL) {
            const YId = this.extractYouTubeID(youtubeURL);
            return `https://www.youtube.com/embed/${YId}`;
        },
        onIframeLoad() {
            console.log("✈️✈️✈️✈️✈️✈️✈️");
            this.loading = false;
            // setTimeout(() => {
            //     this.loading = false;
            // }, 3000);

        },
        // mounted() {
        //     this.$refs.videoFrame.onload = this.onIframeLoad;
        // },
        //computed: {
            // loading(){
            //     return true;
            // }
        //}
    }
}
</script>