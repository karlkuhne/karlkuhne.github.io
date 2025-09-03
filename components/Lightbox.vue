<template>
    <div class="lightbox" @click="lightbox.close()">
        <div @click.stop>
            <div class="embla">
                <div class="embla__viewport" ref="emblaRef">
                    <div class="embla__container">
                        <div class="embla__slide" v-for="(image, index) in lightbox.projectImages" :key="index">
                            <NuxtImg :src="image" :alt="`Slide ${index + 1}`" />
                        </div>
                    </div>
                </div>

                <div id="nav_container" v-if="(lightbox.projectImages ?? []).length > 1">
                    <button v-if="emblaApi?.canScrollPrev()" class="embla__prev" @click="scrollPrev">
                        <ArrowLeft class="arrow-icon" />
                    </button>
                    <div class="embla__dots">
                        <button v-for="(image, index) in lightbox.projectImages" :key="index"
                            :class="['embla__dot', { 'is-selected': selectedIndex === index }]"
                            @click="scrollTo(index)" />
                    </div>
                    <button v-if="emblaApi?.canScrollNext()" class="embla__next" @click="scrollNext">
                        <ArrowLeft class="arrow-icon" style="transform: rotate(180deg);" />
                    </button>
                </div>
            </div>

            <div id="text-container">
                <h3>{{ lightbox.projectName }}</h3>
                <p>{{ lightbox.projectDescription }}</p>

                <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem">
                    <a v-if="lightbox.projectLink" :href="`${lightbox.projectLink}`" target="_blank"
                        class="blue-button">
                        {{ $t('open') }}
                    </a>
                    <NuxtLink v-if="lightbox.projectHasPage"
                        :to="localePath(`/projekt-galerie/${lightbox.projectName}`)" class="blue-button"
                        @click="lightbox.close">
                        {{ $t('project-page') }}
                    </NuxtLink>
                </div>
            </div>

            <svg class="icon" @click="lightbox.close" id="close-button" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16">
                <path
                    d="M3.53 3.53a.67.67 0 0 1 .94 0L8 7.06l3.53-3.53a.67.67 0 1 1 .94.94L8.94 8l3.53 3.53a.67.67 0 1 1-.94.94L8 8.94l-3.53 3.53a.67.67 0 1 1-.94-.94L7.06 8 3.53 4.47a.67.67 0 0 1 0-.94"
                    style="touch-action: none;" stroke-width="1.55"></path>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import emblaCarouselVue from 'embla-carousel-vue';
    import { useLightboxStore } from '~/stores/lightboxStore';
    import ArrowLeft from '~/assets/svg/ArrowLeft.svg';

    const localePath = useLocalePath()

    const lightbox = useLightboxStore();
    const [emblaRef, emblaApi] = emblaCarouselVue({ loop: false });
    const selectedIndex = ref(0);

    function handleEscape(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            lightbox.close()
        }
    }

    onMounted(() => {
        if (!emblaApi.value) return;

        const onSelect = () => {
            selectedIndex.value = emblaApi.value?.selectedScrollSnap() ?? 0;
        };

        emblaApi.value.on('select', onSelect);
        emblaApi.value.on('init', onSelect);
        emblaApi.value.on('reInit', onSelect);

        window.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
    })

    function scrollNext() {
        emblaApi.value?.scrollNext();
    }

    function scrollPrev() {
        emblaApi.value?.scrollPrev();
    }

    function scrollTo(index: number) {
        emblaApi.value?.scrollTo(index);
    }
</script>

<style scoped>
    .lightbox {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.92);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    /* responsive width */

    .embla {
        position: relative;
        overflow: hidden;
        width: var(--main-width);
        max-width: 90rem;
        border-radius: 0.5rem;
    }

    #text-container {
        width: var(--main-width);
        max-width: 90rem;
    }

    @media (max-width: 134vh) {
        .embla {
            width: 100vw;
        }

        #text-container {
            width: 100vw;
        }
    }

    .embla__container {
        display: flex;
    }

    .embla__slide {
        flex: 0 0 100%;
        min-width: 0;
    }

    .embla__slide img {
        width: 100%;
        height: auto;
        display: block;
    }

    /* NAVIGATION */
    #nav_container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .embla__prev,
    .embla__next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        border: none;
        cursor: pointer;
        pointer-events: auto;
        background: transparent;
    }

    .embla__prev {
        left: 10px;
    }

    .embla__next {
        right: 10px;
    }

    .embla__prev::before,
    .embla__next::before {
        content: '';
        position: absolute;
        transform: translate(-7.5%, -7.5%);
        width: 29px;
        height: 29px;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 50%;
        filter: blur(3px);
        z-index: -1;
        pointer-events: none;
    }

    .arrow-icon {
        width: 24px;
        height: 24px;
    }

    /* Dots */
    .embla__dots {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 9px;
        justify-content: center;
        pointer-events: auto;
    }

    .embla__dot {
        width: 10px;
        height: 12px;
        border-radius: 50%;
        background-color: rgb(225, 225, 225);
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .embla__dot::before {
        content: '';
        position: absolute;
        transform: translate(-50%, -50%);
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.25);
        filter: blur(3px);
        z-index: -1;
    }

    .embla__dot.is-selected {
        background-color: white;
    }

    /* close button  */
    #close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        fill: white;
    }

    #close-button:hover {
        fill: rgb(185, 185, 185);
    }
</style>
