<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';

    const parallaxBackgroundRef = ref<HTMLElement | null>(null);
    const parallaxLettersRef = ref<HTMLElement | null>(null);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        parallaxBackgroundRef.value!.style.backgroundPositionY = `${scrollPosition * 0.15}px`;
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
    <div id="parallax-container">
        <div id="parallax-background" ref="parallaxBackgroundRef"></div>
        <div id="parallax-letters" ref="parallaxLettersRef">
            <LanguageSwitcher id="languageSwitcher" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    #parallax-container {
        position: relative;
        width: $screen-xl;
        margin: 0 auto;
        height: calc(100vh - 4rem);
        overflow: hidden;
    }

    #parallax-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('~/assets/svg/CoverDesktopBackground.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        will-change: background-position;
    }

    #parallax-letters {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('~/assets/svg/CoverDesktopLetters.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        will-change: background-position;
    }

    @include xl {
        #parallax-background,
        #parallax-letters {
            background-image: url('~/assets/svg/CoverMobile.svg');
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
