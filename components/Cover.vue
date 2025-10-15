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

<template>
    <div id="parallax" ref="parallaxRef">
        <LanguageSwitcher id="languageSwitcher" />
    </div>
</template>

<style scoped lang="scss">
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

    @include xl {
        #parallax {
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
