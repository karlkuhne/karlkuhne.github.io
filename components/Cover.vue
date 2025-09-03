<template>
    <div id="parallax" ref="parallaxRef">
        <LanguageSwitcher id="languageSwitcher" />
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';

    const parallaxRef = ref<HTMLElement | null>(null);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        parallaxRef.value!.style.backgroundPositionY = `${scrollPosition * 0.15}px`;

        const langSwitcher = parallaxRef.value!.querySelector('#languageSwitcher') as HTMLElement | null;
        langSwitcher!.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<style scoped>
    #parallax {
        position: relative;
        height: calc(100vh - 4rem);
        width: auto;
        background-image: url('~/assets/svg/CoverDesktop.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
    }

    @media (max-width: 89rem) {
        #parallax {
            background-image: url('~/assets/svg/CoverMobile.svg');
        }
    }

    #languageSwitcher {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        will-change: transform;
        transition: transform 0.001s;
    }
</style>
