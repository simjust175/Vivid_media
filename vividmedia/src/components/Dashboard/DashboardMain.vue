<template>

    <v-container v-if="msg" class="bg-white text-black padding-top" id="wide">
        {{ msg }}
    </v-container>


    <v-sheet class="pa-12 fill-height fill-width" rounded>
        <!-- <v-img src="../../../public/newDesigns/9.svg"> -->
        <h1 class="text-white display-flex align-center">Vivid dashboard</h1>
        <v-row justify="flex-start">
            <v-btn icon="mdi-arrow-left" size="60" @click="$router.push('/')"></v-btn>
        </v-row>

        <v-tabs  align-tabs="center" class="bg-black" v-model="tab">
            <v-tab :value="1" :class="{'bg-white': tab === 1}">
                <v-icon left> mdi mdi-briefcase-outline </v-icon>
                Jobs
            </v-tab>
            <v-tab :value="2" :class="{'bg-white': tab === 2}">
                <v-icon left> mdi mdi-movie-open-outline </v-icon>
                Videos
            </v-tab>
        </v-tabs>

        <v-window v-model="tab" id="grad=bg">
            <v-window-item :value="1" :key="1">
                <v-card class="margin-top">
                    <h1>Jobs</h1>
                    <jobs-table :jobProp="jobsArray" @refresh="fetchJobs" />
                </v-card>
            </v-window-item>
            <v-window-item :value="2" :key="2">
                <v-card class=" margin-top">
                    <h1>Videos</h1>
                    <video-table :videoProp="videoArray" @postEvent="postVideo" @refresh="fetchVideos"
                        @patchSuccess="msg" />
                </v-card>
            </v-window-item>
        </v-window>
        <!-- </v-img> -->
    </v-sheet>

</template>

<script>
export default {
    data: () => ({
        tab: null,
        form: false,
        url: null,
        description: null,
        loading: false,
        msg: '',
        videoArray: [],
        jobsArray: [],
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
            this.msg = data.Congratulations;
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
        async fetchJobs() {
            const res = await fetch('http://localhost:3344/jobs/', {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const { jobs } = await res.json();
            this.jobsArray = [...jobs];
        },
    },
    async mounted() {
        this.fetchVideos();
        this.fetchJobs();
    },
    watch: {
        msg(newMsg) {
            this.msg = newMsg;
            setTimeout(() => {
                this.msg = '';
            }, 3000);
        }
    }
}
</script>

<style>
#grad-bg {
    background: url(../../../public/newDesigns/9.svg);
}

#wide {
    width: 1200px;
}

.someRoom {
    margin-bottom: 20px;
}
</style>