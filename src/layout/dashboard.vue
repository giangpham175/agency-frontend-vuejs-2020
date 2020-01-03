<template>
    <!-- nếu mobile thì minisibare luôn true, toggle show-sidebar -->
    <!-- nếu notmobile thì toggle minisibare , show-sidebar false -->
    <div :class="[themeSkin, 'fixed-layout', isMobile ? { 'mini-sidebar': true, 'show-sidebar': isMiniSidebar } : { 'mini-sidebar': isMiniSidebar, 'show-sidebar': false }]" id="main-wrapper">
        <top-bar></top-bar>
        <left-sidebar></left-sidebar>
        <div class="page-wrapper">
            <div v-show="isMobile && isMiniSidebar" @click="toggleSideBar" class="overlay"></div>
            <div class="container-fluid">
                <maintenance v-if="(isMaintenance || isTurnOff) && !isDev"></maintenance>
                <router-view v-if="(!isMaintenance && !isTurnOff) || isDev"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from "./top-sidebar";
import LeftSidebar from "./left-sidebar";
import maintenance from "./maintenance";
import { APP_IS_MIMI_SIDEBAR } from "@/store/types";
export default {
    components: {
        TopBar,
        LeftSidebar,
        maintenance
    },
    data() {
        return {};
    },
    computed: {
        isMiniSidebar() {
            return this.$store.state.app.isMiniSidebar;
        },
        isMobile() {
            return this.$store.state.app.isMobile;
        },
        themeSkin() {
            return "skin-yellow";
        },
        site() {
            return this.$store.state.site;
        },
        isDungQb() {
            return this.$store.state.isDungQb;
        },
        isAdmin() {
            return this.$store.state.isAdmin;
        },
        isDev() {
            return this.$store.state.isDev;
        },
        isMaintenance() {
            return false;
        },
        isTurnOff() {
            return false;
        }
        // navHeight(){
        //     let nav = document.querySelector('.left-sidebar')
        //     console.log(nav)
        //     return nav
        // }
    },
    methods: {
        toggleSideBar: function() {
            if (this.isMobile && this.isMiniSidebar) {
                this.$store.commit(APP_IS_MIMI_SIDEBAR);
            }
        }
    }
};
</script>

<style scoped>
.footer {
    position: fixed;
}
.page-wrapper {
    margin-bottom: 56px;
}
.overlay {
    position: fixed; /* Sit on top of the page content */
    display: block; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
}
</style>
