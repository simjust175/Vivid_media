<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="jobs"
    item-value="description"
    :loading="loading"
    loading-text="Loading... Please wait"
    show-expand
    :sort-by="[{ key: 'name', order: 'asc' }]" 
  >
    <!-- Head{{ headers }} headers="!headers[3] ? headers : headers.key-->
    <!-- :class="item.status" -->

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title><v-icon> mdi mdi-briefcase-outline </v-icon></v-toolbar-title>

        <v-btn :disabled="loading" append-icon="mdi-refresh" text="Refresh" variant="outlined"
          @click="initialize"></v-btn>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" ref="videoDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-col>
                  <v-row cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-row>
                  <v-row cols="12" sm="6">
                    <v-text-field v-model="editedItem.url" label="Email"></v-text-field>
                  </v-row>
                  <v-row cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.name" label="Phone"></v-text-field>
                  </v-row>
                  <v-row cols="12" sm="6">
                    <v-text-field v-model="editedItem.url" label="Category"></v-text-field>
                  </v-row>
                </v-col>
                <v-btn class="bg-success">Done</v-btn>
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
      <v-icon class="me-2" size="small" @click="
    editItem(item);
  editType = 1;
  ">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="
    deleteItem(item);
  currentItem = item;
  ">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          Description: {{ item.description }}
        </td>
      </tr>
    </template>
    <template v-slot:item.calories="{ value }">
      <v-chip :color="getColor(value)">
        {{ value }}
      </v-chip>
    </template>
    <template v-slot:no-data>
      {{ initialize() }}
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    jobProp: Array,
  },
  data: () => ({
    loading: false,
    dialog: false,
    dialogDelete: false,
    editType: null,
    expanded: [],
    headers: [
      {
        title: "Id",
        sortable: false,
        key: "id",
      },
      { title: "Name", key: "name" },
      { title: "Email", key: "email" },
      { title: "Phone", key: "phone" },
      { title: "Category", key: "category" },
      { title: "Description", key: "description" },
      { title: "Status", key: "status" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    jobs: [],
    editedIndex: -1,
    currentItem: "",
    editedItem: {
      name: "",
      email: "",
      phone: "",
      category: "",
    },
    defaultItem: {
      name: "",
      email: "",
      phone: "",
      category: "",
    },
    creationDate: new Date().toLocaleDateString(),
    urlRegex:
      /^https?:\/\/(?:www\.|m\.)youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    jobProp(newjobs) {
      console.log(newjobs);
      return (this.jobs = newjobs);
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$emit("refresh");
      this.jobs = this.jobProp;
      console.log("🥴🥴🥴🥴🥴", this.jobs);
      console.log("🦃🦃🦃🦃", this.jobProp);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },

    async deleteVideo(id) {
      this.isActive = true;
      const res = await fetch(`http://localhost:3344/jobs/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("deleted state:", data);
      if (res.status > 400) return null;
      this.$emit("patchSuccess", data);
    },

    editItem(item) {
      this.editedIndex = this.jobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.jobs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.jobs.splice(this.editedIndex, 1);
      this.deleteVideo(this.currentItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.jobs[this.editedIndex], this.editedItem);
      } else {
        //this.editedItem.creationDate = (date) => new Date(date).toLocaleDateString();
        this.editType === 0
          ? this.postVideo(this.editedItem)
          : this.jobs.push(this.editedItem);
      }
      this.close();
    },
    getColor(status){
      console.log("sttststststs", status);
      return 'red';
    }
  },
  mounted() {
    this.initialize();
  },
};
</script>
