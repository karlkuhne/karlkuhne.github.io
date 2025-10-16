<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';

    const parallaxLettersRef = ref<HTMLElement | null>(null);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        parallaxLettersRef.value!.style.backgroundPositionY = `${scrollPosition * 0.15}px`;
        const langSwitcher = parallaxLettersRef.value?.querySelector('#languageSwitcher') as HTMLElement | null;
        langSwitcher!.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<template>
    <div id="cover">
        <NuxtImg src="img/CoverDesktop.svg" id="cover-desktop" />
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
