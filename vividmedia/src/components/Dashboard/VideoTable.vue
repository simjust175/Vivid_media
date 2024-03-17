<template>
    <v-data-table :headers="headers" :items="videos" :loading="loading"  loading-text="Loading... Please wait" :sort-by="[{ key: 'date', order: 'asc' }]">
        <!-- Head{{ headers }} headers="!headers[3] ? headers : headers.key-->
        <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Vivid dashboard</v-toolbar-title>

                <v-btn :disabled="loading" append-icon="mdi-refresh" text="Refresh" variant="outlined"
                    @click="initialize"></v-btn>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" ref="videoDialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn class="mb-2" color="primary" dark v-bind="props" append-icon="mdi-plus" @click="editType = 0">
                            Add video
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-col>
                                    <v-row cols="24" md="4" sm="6">
                                        <v-text-field v-model="editedItem.description"
                                            label="Video description"></v-text-field>
                                    </v-row>
                                    <v-row cols="24" sm="6">
                                        <v-text-field v-model="editedItem.url" label="Youtube url"></v-text-field>
                                    </v-row>
                                </v-col>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save(dialogType)">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item); editType = 1">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item); currentItem = item">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            {{ initialize() }}
        </template>
    </v-data-table>
</template>
<script>
export default {
    props: {
        videoProp: Array
    },
    data: () => ({
        loading: false,
        dialog: false,
        dialogDelete: false,
        editType: null,
        headers: [
            {
                title: 'id',
                align: 'start',
                sortable: false,
                key: 'id',
            },
            { title: 'Description', key: 'description' },
            { title: 'Url', key: 'url' },
            { title: 'creation date', key: 'updated_on' },
            { title: 'Ratings', key: 'loved' },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        videos: [],
        editedIndex: -1,
        currentItem: '',
        editedItem: {
            description: '',
            url: '',
        },
        defaultItem: {
            description: '',
            url: '',
        },
        creationDate: new Date().toLocaleDateString(),
        urlRegex: /^https?:\/\/(?:www\.|m\.)youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        videoProp(newVideos){
            return this.videos = newVideos;
        }
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.$emit("refresh");
            //this.videos = [...this.videoProp];
            this.videos = [...this.videoProp].map((item)=> item.updated_on = new Date(item.updated_on).toLocaleDateString())
            this.loading = true;
            setTimeout(() => {
                this.loading = false
            }, 2000)

        },
        postVideo({url, description}) {
            console.log("🥳🥳🥳🥳🥳🥳🥳", url, description);
            if (!description || !url || !this.urlRegex.test(url)) return console.log("Upload failed");
            this.$emit("postEvent", {description:description, url: url})
        },
        async deleteVideo(id) {
            this.isActive = true;
            const res = await fetch(`http://localhost:3344/videos/delete/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log("deleted state:", data);
            if(res.status > 400) return null;
            this.$emit("patchSuccess", data)
        },
        editItem(item) {
            this.editedIndex = this.videos.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.videos.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.videos.splice(this.editedIndex, 1)
            this.deleteVideo(this.currentItem.id)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.videos[this.editedIndex], this.editedItem)
            } else {
                //this.editedItem.creationDate = (date) => new Date(date).toLocaleDateString();
                this.editType === 0 ? this.postVideo(this.editedItem) :
                this.videos.push(this.editedItem)
            }
            this.close()
        },
        saveNew() {
            if (this.editedIndex > -1) {
                Object.assign(this.videos[this.editedIndex], this.editedItem)
            } else {
                this.postVideo();
            }
            this.close()

        }
    },
    mounted() {
        this.initialize()
    }
}
</script>