<template>
    <!-- <header-navbar /> -->
    <main>
        <GalleryMain /> 
    </main>
   
</template>

<script>
//import HeaderNavbar from '../components/Header/HeaderNavbar.vue'
import GalleryMain from '../components/Gallery/GalleryMain.vue'
export default{
    name: "GalleryPage",
    components:{
        //HeaderNavbar,
        GalleryMain
    }
}
</script>