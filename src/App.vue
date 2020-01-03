<template>
    <div id="app">
        <!-- <notifications group="app" /> -->
        <loading-layer></loading-layer>
        <router-view />
    </div>
</template>
<script>
import LoadingLayer from "./layout/loading-layer";
import { APP_LOADING } from "@/store/types";
export default {
    name: "App",
    components: {
        LoadingLayer
    },
    created() {
        this.$store.commit(APP_LOADING, false);
    }
};
</script>
