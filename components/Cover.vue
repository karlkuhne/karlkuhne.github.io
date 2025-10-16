<script setup lang="ts">
    import { onMounted, onBeforeUnmount, ref } from 'vue';

    const coverDesktopRef = ref<HTMLObjectElement | null>(null);
    const coverMobileRef = ref<HTMLObjectElement | null>(null);

    let letters: SVGElement | null = null;
    let logo: SVGElement | null = null;

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const rawXPositionDesktop = (windowWidth / 2) - 644.67;
        const xPositionDesktop = Math.round(rawXPositionDesktop / 22.23) * 22.23;

        const rawXPositionMobile = (windowWidth / 2) - 144.5;
        const xPositionMobile = Math.round(rawXPositionMobile / 22.23) * 22.23;

        const rawYPositionDesktop = (windowHeight / 2) - 377.91;
        const yPositionDesktop = Math.round(rawYPositionDesktop / 22.23) * 22.23;

        const rawYPositionMobile = (windowHeight / 2) - 377.91;
        const yPositionMobile = Math.round(rawYPositionMobile / 22.23) * 22.23;

        letters?.setAttribute('transform', `translate(${xPositionDesktop}, ${yPositionDesktop})`);
        logo?.setAttribute('transform', `translate(${xPositionMobile}, ${yPositionMobile})`);
    };

    onMounted(() => {
        const objectElDesktop = coverDesktopRef.value;
        const objectElMobile = coverMobileRef.value;

        objectElDesktop?.addEventListener('load', () => {
            const svgDoc = objectElDesktop.contentDocument;
            letters = svgDoc?.querySelector<SVGElement>('#letters') || null;

            handleResize();
            window.addEventListener('resize', handleResize);
        });

        objectElMobile?.addEventListener('load', () => {
            const svgDoc = objectElMobile.contentDocument;
            logo = svgDoc?.querySelector<SVGElement>('#logo') || null;

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
        <object :data="'/img/CoverMobile.svg'" type="image/svg+xml" id="cover-mobile" ref="coverMobileRef"></object>
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
