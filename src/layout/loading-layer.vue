<template>
    <div v-if="isLoading" class="loading-layer">
        <svg height="56" viewBox="0 0 56 56" width="72">
            <g>
                <circle cx="28" cy="28" id="spinner" r="25" />
            </g>
        </svg>
    </div>
</template>
<script>
export default {
    name: "LoadingLayer",
    computed: {
        isLoading() {
            return this.$store.state.app.isLoading;
        }
    }
};
</script>
<style scoped>
/* Absolute Center Spinner */
.loading-layer {
    position: fixed;
    z-index: 1051;
    height: 0em;
    width: 5em;
    overflow: visible;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

/* Transparent Overlay */
.loading-layer:before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

/* :not(:required) hides these rules from IE9 and below */

/* Animation */
g {
    animation: rotate 1.4s linear infinite;
    transform-origin: center;
}
circle {
    animation: spin 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
    fill: none;
    stroke: #2196f3;
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    stroke-linecap: square;
    stroke-width: 4;
    transform-origin: center;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(270deg);
    }
}
@keyframes spin {
    0% {
        stroke-dashoffset: 100;
    }
    50% {
        stroke-dashoffset: 20;
        transform: rotate(135deg);
    }
    100% {
        stroke-dashoffset: 100;
        transform: rotate(450deg);
    }
}
@keyframes colors {
    0% {
        stroke: #004fc5;
    }
    25% {
        stroke: #de3e35;
    }
    50% {
        stroke: #f7c223;
    }
    75% {
        stroke: #1b9a59;
    }
    100% {
        stroke: #4285f4;
    }
}
</style>
