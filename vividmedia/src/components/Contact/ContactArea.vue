<template>
    <v-card class="pa-4 fill-width full-height bg-black">
        <v-row class="full-height">
            <v-col height="100%">
                <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                    </div>
                </template>
                <!-- <img src="../../../public/vivid_bg_contact.gif" alt="vivid" width="100%" height="100%"> -->
                <v-card class="bg-black video-container" width="100%" height="100%">
                    <video autoplay loop controls="false" width="100%" height="100%">
                        <source src="../../../public/vivid_bg_vid.mp4" type="video/mp4">
                    </video>
                </v-card>
            </v-col>
            <v-col class="margin-top">
                <form @submit.prevent="submit" id="contactForm">
                    <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                        label="Name"></v-text-field>

                    <v-text-field v-model="phone.value.value" :counter="7" :error-messages="phone.errorMessage.value"
                        label="Phone Number"></v-text-field>

                    <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                        label="E-mail"></v-text-field>

                    <v-select v-model="category.value.value" :error-messages="category.errorMessage.value"
                        :items="items" label="Category"></v-select>

                    <v-textarea clear-icon="mdi-close-circle" label="Description" v-model="description.value.value"
                        :error-messages="description.errorMessage.value" rows="2" :rules="textAreaRules.value"
                        clearable></v-textarea>

                    <!-- <v-checkbox v-model="checkbox.value.value" :error-messages="checkbox.errorMessage.value"
                        label="Option" type="checkbox" value="1"></v-checkbox> -->

                    <v-btn class="me-8" type="submit">
                        submit
                    </v-btn>

                    <v-btn @click="handleReset" class="bg-red">
                        clear
                    </v-btn>
                </form>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 2) return true

            return 'Name needs to be at least 2 characters.'
        },
        phone(value) {
            if (value?.length > 9 && /[0-9-]+/.test(value)) return true

            return 'Phone number needs to be at least 9 digits.'
        },
        email(value) {
            if (/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },
        description(value) {
            if (value?.length > 10) return true
            return 'Please write a clear description of what you want us to do.'
        },
        category(value) {
            if (value) return true

            return 'Select an category.'
        },
        // checkbox(value) {
        //     if (value === '1') return true

        //     return 'Must be checked.'
        // },
    },
})
const name = useField('name')
const email = useField('email')
const phone = useField('phone')
const category = useField('category')
// const checkbox = useField('checkbox')
const description = useField('description');
const textAreaRules = [v => v.length <= 25 || 'Max 25 characters']


const items = ref([
    'Corporate',
    'Family',
    'Event',
    'Item 4',
])

const postInfo = async (values) => {
    const res = await fetch("http://localhost:3344/jobs/postjob", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })
    const data = await res.json();
    if (res.status >= 400) return null;
    console.log(data);
    return data;
}


const submit = handleSubmit(values => {
    const post = postInfo(values);
    if (post.Congratulations) return null;
    alert(JSON.stringify("Info sent successfully", null, 2))
    handleReset()
})

</script>

<style>
.video-container {
    overflow: hidden;
    padding-top: 0;
}
</style>
