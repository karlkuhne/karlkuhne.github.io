<template>
    <header>
        <nav>
            <NuxtLink :to="localePath('/')" class="selectDisable" @click="closeAndScrollToTop">{{ $t('title') }}
            </NuxtLink>
            <div id="main-nav" ref="mainNav">
                <div id="nav-buttons">
                    <NuxtLink :to="localePath('/projekt-galerie')" class="main-nav-item selectDisable"
                        @click="closeAndScrollToTop">{{ $t('project-galery') }}</NuxtLink>
                    <NuxtLink class="main-nav-item selectDisable" @click="handleAbout">{{ $t('about-me') }}</NuxtLink>
                    <NuxtLink class="main-nav-item selectDisable" @click="handleContact">{{ $t('contact') }}
                    </NuxtLink>
                </div>
                <div id="linkedIn-button" class="selectDisable">
                    <button onclick="window.open('https://www.linkedin.com/in/karl-kuhne', '_blank');"
                        @click="closeMenu">
                        <svg fill="white" class="button-icon" width="21" preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 100 100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                            <path
                                d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z">
                            </path>
                        </svg>
                        <span>{{ $t('linkedin') }}</span>
                    </button>
                </div>
            </div>

            <div id="burgerMenu" class="selectDisable" ref="burgerMenu" @click="toggleMenu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const burgerMenu = ref<HTMLElement | null>(null);
    const mainNav = ref<HTMLElement | null>(null);

    const router = useRouter();
    const localePath = useLocalePath()

    const toggleMenu = () => {
        burgerMenu.value!.classList.toggle('active');
        mainNav.value!.classList.toggle('active');
    };

    const closeMenu = () => {
        burgerMenu.value!.classList.remove('active');
        mainNav.value!.classList.remove('active');
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



<style scoped>
    header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
        background-color: rgb(30, 30, 30, 1);
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
    }

    nav a {
        color: white;
        font-family: Work Sans;
        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        margin-left: 1rem;
    }

    nav a:hover {
        color: rgb(181, 181, 181);
    }

    #main-nav {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
    }

    /* Nav Buttons */
    #nav-buttons {
        display: flex;
        gap: 3rem;
        margin: 0 auto;
        align-items: center;
    }

    .main-nav-item {
        font-family: Work Sans;
        font-size: 1rem;
        font-weight: 500;
        color: rgb(181, 181, 181);
    }

    .main-nav-item:hover {
        color: white;
    }

    /* LinkedIn Button */
    #linkedIn-button {
        margin-right: 0.65rem;
    }

    #linkedIn-button button {
        background-color: rgb(50, 50, 50);
        border-radius: 0.5rem;
        padding: 0.7rem;
        display: flex;
        justify-content: flex-start;
        gap: 0.5rem;
        align-items: center;
        position: relative;
        border: none;
        font-family: "SF Pro Text", Helvetica, sans-serif;
    }

    #linkedIn-button button:hover {
        background-color: rgb(65, 65, 65);
        cursor: pointer;
    }

    #linkedIn-button span {
        margin-top: 0;
        margin-bottom: 0;
        border-left: 0.18rem solid white;
        padding-left: 0.35rem;
        color: white;
        font-size: 1.1rem;
        font-weight: 600;
    }

    #burgerMenu {
        display: none;
        cursor: pointer;
        margin-right: 1.55rem;
    }

    .bar {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px auto;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        background-color: white;
    }

    #burgerMenu.active .bar:nth-child(2) {
        opacity: 0;
    }

    #burgerMenu.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    #burgerMenu.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    /* responsive */
    @media (max-width: 60rem) {
        #main-nav {
            display: none;
        }

        #main-nav.active {
            display: block;
            position: absolute;
            top: 4rem;
            width: 100%;
            background-color: rgb(30, 30, 30);

            transition: opacity 1s ease-in-out;
        }

        #main-nav.active #nav-buttons {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem
        }

        #main-nav.active #linkedIn-button {
            padding-top: 0.5rem;
            padding-bottom: 1rem;
        }

        #main-nav.active #linkedIn-button button {
            margin: 0 auto;
        }

        #burgerMenu {
            display: block;
        }
    }
</style>
```