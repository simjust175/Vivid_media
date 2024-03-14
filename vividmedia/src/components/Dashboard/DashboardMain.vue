<template>

    <v-container v-if="msg" class="bg-red margin-top" id="wide">
        {{ msg }}
    </v-container>

    <v-sheet class="bg-black pa-12 fill-height fill-width grad-bg margin-top-sm" rounded>
        <h1 class="text-white align-center">Vivid dashboard</h1>
        <v-row justify="flex-start">
            <v-btn icon="mdi-arrow-left" size="60" @click="$router.push('/')"></v-btn>
        </v-row>
        <v-card class=" margin-top">
        <video-table :videoProp="videoArray" @postEvent="postVideo" @refresh="fetchVideos"/>
    </v-card>
    </v-sheet>

</template>

<script>
export default {
    data: () => ({
        form: false,
        url: null,
        description: null,
        loading: false,
        msg: '',
        videoArray: [],
        isActive: false
    }),

    methods: {
        async postVideo(credentials) {
            console.log("creds", credentials);
            const response = await fetch("http://localhost:3344/videos/postvideo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            console.log("Posted video", data);
            this.onSubmit();
            return data;
        },
        onSubmit() {
            this.loading = true;
            setTimeout(() => (this.loading = false), 2000)
            this.msg = "Video successfully added"
            setTimeout(() => (this.msg = ""), 2000);
        },

        required(v) {
            return !!v || 'Field is required'
        },
        async fetchVideos() {
            const res = await fetch('http://localhost:3344/videos/', {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const { videos } = await res.json();
            this.videoArray = [...videos];
        },
        testPopUp() {
            this.isActive = true;
        },
    },
    async mounted() {
        this.fetchVideos();
    }
}
</script>

<style>
.grad-bg {
    background: linear-gradient(#864b6b, #f9ac90, #59dee5);
}

#wide {
    width: 1200px;
}

.someRoom {
    margin-bottom: 20px;
}


</style>