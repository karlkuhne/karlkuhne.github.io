<script setup lang="ts">
    import { onMounted, onBeforeUnmount, ref } from 'vue';

    const coverDesktopRef = ref<HTMLObjectElement | null>(null);
    let letters: SVGElement | null = null;

    const handleResize = () => {
        if (!letters) return;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const rawXPosition = (windowWidth / 2) - 644.67;
        const xPosition = Math.round(rawXPosition / 22.23) * 22.23;

        const rawYPosition = (windowHeight / 2) - 377.91;
        const yPosition = Math.round(rawYPosition / 22.23) * 22.23;

        letters.setAttribute('transform', `translate(${xPosition}, ${yPosition})`);
    };

    onMounted(() => {
        const objectEl = coverDesktopRef.value;
        if (!objectEl) return;

        objectEl.addEventListener('load', () => {
            const svgDoc = objectEl.contentDocument;
            letters = svgDoc?.querySelector<SVGElement>('#letters') || null;

            handleResize();
            window.addEventListener('resize', handleResize);
        });
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
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
