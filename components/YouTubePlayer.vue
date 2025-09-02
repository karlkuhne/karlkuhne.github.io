<template>
    <div id="wrapper">
        <iframe class="iframe" :src="ytUrl" allowfullscreen></iframe>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        ytUrl: { type: String, required: true }
    })
</script>

<style scoped>
    #wrapper {
        width: 74.7rem;
        aspect-ratio: 16 / 9;
        margin: 0 auto;
    }

    @media (max-width: 75rem) {
        #wrapper {
            width: calc(100vw);
            margin-top: 0;
        }
    }

    iframe {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0.5rem
    }

    @media (max-width: 76.7rem) {
        iframe {
            border-radius: 0
        }
    }
</style>