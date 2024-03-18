<template>
    <v-card>


        <v-badge v-if="video.rating > 0" color="error" size="small" :content="video.rating" class="heart"><v-icon
                icon="mdi-heart" size="25"></v-icon> </v-badge>
        <div v-else class="heart heart-broken"><v-icon icon="mdi mdi-heart-broken" size="25"></v-icon></div>

        <!-- <v-skeleton-loader v-if="loading" class="mx-auto border" max-width="100%"
            type="image, article"></v-skeleton-loader> -->
        <!-- <template > -->
        <iframe @load="onIframeLoad" width="100%" height="240" :lazy-src="getEmbedUrl(video.youtubeURL)"
            :src="getEmbedUrl(video.youtubeURL)" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
        <!-- </template> -->


        <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn color="surface-variant" icon="mdi-share-variant" size="25" variant="text"></v-btn>

            <v-btn color="surface-variant" icon="mdi-bookmark" size="25" variant="text"></v-btn>
            <v-btn color="surface-variant" icon="mdi mdi-thumb-up" size="25" variant="text"></v-btn>
            <v-btn color="surface-variant" icon="mdi mdi-thumb-down-outline" size="25" variant="text"></v-btn>

            <v-speed-dial v-model="dialShare" absolute left bottom direction="left" open-on-hover>
                <template v-slot:activator>
                    <v-btn fab bottom small color="primary">
                        <v-icon v-if="dialShare">mdi-close</v-icon>
                        <v-icon v-else>mdi-share-variant</v-icon>
                    </v-btn>
                </template>
                <v-btn dark fab bottom color="blue darken-7" small
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`" target="_blank">
                    <v-icon>mdi-linkedin</v-icon>
                </v-btn>
                <v-btn dark fab bottom color="blue" small
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`" target="_blank">
                    <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn dark fab bottom color="green" small
                    :href="`https://wa.me/?text=Checkout%20this%20page.%20${pageUrl}`" target="_blank">
                    <v-icon>mdi-whatsapp</v-icon>
                </v-btn>
                <v-btn dark fab bottom color="tertiary" small
                    :href="`mailto:?subject=Awesomeness!&amp;body=Checkout this page!<a href='${pageUrl}'>${pageUrl}</a>`"
                    target="_blank">
                    <v-icon>mdi-email</v-icon>
                </v-btn>
            </v-speed-dial>

        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "GalleryCard",
    data() {
        return {
            loading: true, 
            dialShare: false,
            pageUrl: "https://techformist.com"
        }
    },
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
            console.log(YId);
            return `https://www.youtube.com/embed/${YId}`;
        },
        onIframeLoad() {
            console.log("✈️✈️✈️✈️✈️✈️✈️");
            // this.loading = false;
            setTimeout(() => {
                this.loading = false;
            }, 3000);

        },
        watch: {
            video: {
                handler() {
                    console.log("idhfwiuefgieurgfvbrr igiuo")
                    this.onIframeLoad();
                },
                deep: true,
            }
        },

        // computed: {
        //         loading(){
        //             return true;
        //         }
        //     }
    }
}
</script>

<style>
.heart {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: rgb(255, 255, 254);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>