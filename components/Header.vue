<script setup lang="ts">
    import { ref } from 'vue';

    const isMenuOpen = ref(false);
    const router = useRouter();
    const localePath = useLocalePath()

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
        isMenuOpen.value = false;
    };

    const { scrollToAnchor, scrollToTop } = useAnchorScroll({
        toTop: {
            scrollOptions: {
                behavior: 'smooth',
                offsetTop: 0,
            }
        },
    })

    const closeAndScrollToTop = () => {
        closeMenu();
        scrollToTop();
    }

    const handleAbout = () => {
        closeMenu();

        const routeOptions = { path: localePath('/') };
        router.push(routeOptions).then(() => {
            setTimeout(() => scrollToAnchor('main'), 200);
        });
    };

    const handleContact = () => {
        closeMenu();

        const routeOptions = { path: localePath('/') };
        router.push(routeOptions).then(() => {
            setTimeout(() => scrollToAnchor('contact-form'), 200);
        });
    }
</script>

<template>
    <header class="w-full bg-primary-30 fixed top-0 z-50">
        <nav class="max-w-screen-xl mx-auto flex justify-between items-center h-16">
            <NuxtLink :to="localePath('/')" class="text-5 font-semibold text-white hover:text-primary-180 ml-4 xl:ml-0 selectDisable" @click="closeAndScrollToTop">{{ $t('title') }}</NuxtLink>
            
            <div :class="isMenuOpen ? 'block lg:flex lg:flex-grow absolute lg:relative top-16 lg:top-auto w-full lg:w-auto bg-primary-30 lg:bg-transparent' : 'hidden lg:flex flex-grow'" ref="mainNav">
                <div class="flex gap-12 mx-auto items-center" :class="{ 'flex-col gap-4 lg:flex-row lg:gap-12': isMenuOpen }">
                    <NuxtLink :to="localePath('/projekt-galerie')" class="text-primary-180 hover:text-white font-medium selectDisable" @click="closeAndScrollToTop">{{ $t('project-galery') }}</NuxtLink>
                    <NuxtLink class="text-primary-180 hover:text-white font- selectDisable" @click="handleAbout">{{ $t('about-me') }}</NuxtLink>
                    <NuxtLink class="text-primary-180 hover:text-white font-medium selectDisable" @click="handleContact">{{ $t('contact') }}</NuxtLink>
                </div>
                <div class="mr-4 xl:mr-0 selectDisable" :class="{ 'pt-4 lg:pt-0 pb-6 lg:pb-0': isMenuOpen }">
                    <button class="flex gap-2 items-center bg-primary-50 hover:bg-primary-60 hover:cursor-pointer border-none rounded-lg p-2.5" :class="{ 'mx-auto': isMenuOpen }"
                        onclick="window.open('https://www.linkedin.com/in/karl-kuhne', '_blank');" @click="closeMenu">
                        <svg fill="white" width="21" preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 100 100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                            <path
                                d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z">
                            </path>
                        </svg>
                        <span class="text-5 font-semibold border-l-solid border-3 pl-1.4">{{ $t('linkedin') }}</span>
                    </button>
                </div>
            </div>

            <div id="burgerMenu" class="lg:hidden cursor-pointer pr-6 selectDisable" ref="burgerMenu" @click="toggleMenu">
                <span class="bar block w-[25px] h-[3px] mx-auto my-[5px] transition-all duration-300 ease-in-out bg-white"
                    :class="{ 'translate-y-[8px] rotate-45': isMenuOpen }"/>
                <span class="bar block w-[25px] h-[3px] mx-auto my-[5px] transition-all duration-300 ease-in-out bg-white"
                    :class="{ 'opacity-0': isMenuOpen }"/>
                <span class="bar block w-[25px] h-[3px] mx-auto my-[5px] transition-all duration-300 ease-in-out bg-white"
                    :class="{ '-translate-y-[8px] -rotate-45': isMenuOpen }"/>
            </div>
        </nav>
    </header>
</template>