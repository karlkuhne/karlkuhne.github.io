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

<template>
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-93 z-1000 overflow-auto flex flex-col items-center justify-center" @click="lightbox.close()">
        <div class="w-[calc(100vw-1rem)] xl:w-[135vh] max-w-screen-xl" @click.stop>
            <div class="overflow-hidden relative rounded-xl">
                <div class="embla__viewport" ref="emblaRef">
                    <div class="flex">
                        <div class="embla__slide" v-for="(image, index) in lightbox.projectImages" :key="index">
                            <NuxtImg class="w-full h-auto block rounded-xl" :src="image" :alt="`Slide ${index + 1}`" />
                        </div>
                    </div>
                </div>

                <div id="absolute top-0 left-0 w-full h-full pointer-events-none" v-if="(lightbox.projectImages ?? []).length > 1">
                    <button v-if="emblaApi?.canScrollPrev()" class="embla-arrows left-2.5 embla__prev" @click="scrollPrev">
                        <ArrowLeft class="w-6 h-6" />
                    </button>
                    <div class="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 flex gap-2.5 justify-center pointer-events-auto">
                        <button v-for="(image, index) in lightbox.projectImages" :key="index"
                            class="embla__dot w-[10px] h-[12px] rounded-full border-none bg-primary-230 cursor-pointer transition-colors duration-300"
                            :class="{ 'bg-white': selectedIndex === index }"
                            @click="scrollTo(index)" />
                    </div>
                    <button v-if="emblaApi?.canScrollNext()" class="embla-arrows right-2.5 embla__next" @click="scrollNext">
                        <ArrowLeft class="w-6 h-6" style="transform: rotate(180deg);" />
                    </button>
                </div>
            </div>

            <div>
                <h3>{{ lightbox.projectName }}</h3>
                <p>{{ lightbox.projectDescription }}</p>

                <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem">
                    <a v-if="lightbox.projectLink" :href="`${lightbox.projectLink}`" target="_blank" class="primary-btn">
                        {{ $t('open') }}
                    </a>
                    <NuxtLink v-if="lightbox.projectHasPage"
                        :to="localePath(`/projekt-galerie/${lightbox.projectName}`)" class="primary-btn"
                        @click="lightbox.close">
                        {{ $t('project-page') }}
                    </NuxtLink>
                </div>
            </div>

            <svg class="absolute top-5 right-5 w-8 h-8 cursor-pointer fill-white hover:fill-primary-180" @click="lightbox.close" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16">
                <path
                    d="M3.53 3.53a.67.67 0 0 1 .94 0L8 7.06l3.53-3.53a.67.67 0 1 1 .94.94L8.94 8l3.53 3.53a.67.67 0 1 1-.94.94L8 8.94l-3.53 3.53a.67.67 0 1 1-.94-.94L7.06 8 3.53 4.47a.67.67 0 0 1 0-.94"
                    style="touch-action: none;" stroke-width="1.55"></path>
            </svg>
        </div>
    </div>
</template>

<style scoped>
    .embla__slide {
        flex: 0 0 100%;
        min-width: 0;
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
</style>
