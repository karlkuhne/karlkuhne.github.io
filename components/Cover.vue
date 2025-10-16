<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    const coverDesktopRef = ref<HTMLObjectElement | null>(null);

    onMounted(() => {
        coverDesktopRef.value?.addEventListener('load', () => {
            const svgDoc = coverDesktopRef.value?.contentDocument;
            const letters = svgDoc?.querySelector<SVGElement>('#letters');

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const rawXPosition = (windowWidth / 2) - 644.67;
            const xPosition = Math.round(rawXPosition / 22.23) * 22.23;
            const rawYPosition = (windowHeight / 2) - 377.91;
            const yPosition = Math.round(rawYPosition / 22.23) * 22.23;
            letters?.setAttribute('transform', `translate(${xPosition}, ${yPosition})`);
        });
    });
</script>

<template>
    <div id="cover">
        <object :data="'/img/CoverDesktop.svg'" type="image/svg+xml" id="cover-desktop" ref="coverDesktopRef"></object>
        <NuxtImg src="img/CoverMobile.svg" id="cover-mobile" />
        <LanguageSwitcher id="languageSwitcher" />
    </div>
</template>

<style scoped lang="scss">
    #cover {
        width: 100%;
        height: calc(100vh - 4rem);
    }

    #cover-desktop {
        width: 100%;
        height: 100%;
        display: block;
    }

    #cover-mobile {
        width: 100%;
        height: 100%;
        display: none;
    }

    @include xl {
        #cover-desktop {
            display: none;
        }
        #cover-mobile {
            display: block;
        }
    }

    #languageSwitcher {
        position: absolute;
        right: calc(50% - 640px);
        bottom: 1rem;
        will-change: transform;
        transition: transform 0.001s;
    }

    @include xl {
        #languageSwitcher {
            right: 1rem;
        }
    }
</style>
