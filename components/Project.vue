<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useLightboxStore } from '~/stores/lightboxStore';

    // props
    const props = defineProps({
        projectId: { type: Number, required: true },
        projectLabel: { type: String, required: true },
        projectName: { type: String, required: true },
        projectDescription: { type: String, required: true },
        projectHasPage: { type: Boolean, required: false },
        projectLink: { type: String, required: false },
        projectThumbnail: { type: String, required: true },
        projectThumbnailMobile: { type: String, required: true },
        projectImages: { type: Array, required: true },
    });

    const thumbnail = `https://admin.karlkuhne.me/images/projects/${props.projectThumbnail}`;
    const thumbnailMobile = ref(`https://admin.karlkuhne.me/images/projects/${props.projectThumbnailMobile}`);
    const images = props.projectImages?.map(image => `https://admin.karlkuhne.me/images/projects/${image}`) || [];

    const handleThumbnailError = () => {
        thumbnailMobile.value = thumbnail;
    }

    const lightbox = useLightboxStore();
    const openLightbox = (
        name: string,
        description: string,
        images: string[] | undefined,
        page: string | undefined,
        link: string | undefined
    ) => {
        lightbox.open(name, description, images, page, link);
    };

    // reactive states
    const windowWidth = ref(0);
    const isVisible = ref(false);
    const isMinimized = ref(false);
    const isClosed = ref(false)
    const isMobile = ref(false);

    let observer: IntersectionObserver | null = null;

    // methods
    const handleResize = () => {
        windowWidth.value = window.innerWidth;
        isMobile.value = window.innerWidth <= 1225
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isVisible.value = true;
                if (observer) {
                    observer.unobserve(entry.target);
                }
            }
        });
    };

    const handleMinimize = () => {
        isMinimized.value = !isMinimized.value;
    };

    const handleClose = () => {
        isClosed.value = true;
        setTimeout(() => {
            isClosed.value = false
        }, 500)
    }

    // lifecycle hooks
    onMounted(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        const options = {
            root: null, // observes viewport
            rootMargin: '0px',
            threshold: 0.05
        };

        observer = new IntersectionObserver(handleIntersect, options);
        const instance = getCurrentInstance();
        if (instance && instance.proxy && instance.proxy.$el) {
            const el = instance.proxy.$el;
            observer.observe(el);
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);

        if (observer) {
            observer.disconnect();
        }
    });
</script>

<template>
    <div class="project w-full border-solid border-2 border-primary-70 bg-primary-30 rounded-xl align-self-center overflow-hidden opacity-0 translate-y-[75px] transition-[opacity,transform] duration-500 ease-out"
        :class="{ 'fadeInUp': isVisible, 'shrink': isClosed }">
        <div class="pl-2.4 flex items-center justify-between" :style="{ borderBottom: isMinimized ? 'none' : '0.15rem solid rgb(70, 70, 70)' }">
            <p>{{ projectLabel }}</p>

            <div>
                <svg class="project-icon"
                    @click="handleMinimize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2.67 8c0-.37.3-.67.66-.67h9.34a.67.67 0 1 1 0 1.34H3.33A.67.67 0 0 1 2.67 8"
                        style="touch-action: none;" stroke-width="1.55"></path>
                </svg>

                <svg class="project-icon"
                    @click="openLightbox(projectName, projectDescription, images, projectHasPage, projectLink || '')"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M8.2 4c-1.12 0-1.82-.05-2.56.33a3 3 0 0 0-1.31 1.3C3.95 6.39 4 7.09 4 8.2v7.6c0 1.12-.05 1.82.33 2.56a3 3 0 0 0 1.3 1.31c.75.38 1.45.33 2.57.33h7.6c1.12 0 1.82.05 2.56-.33a3 3 0 0 0 1.31-1.3c.38-.75.33-1.45.33-2.57V8.2c0-1.12.05-1.82-.33-2.56a3 3 0 0 0-1.3-1.31C17.61 3.95 16.91 4 15.8 4Zm0 2h7.6c1.12 0 1.54.05 1.65.1a1 1 0 0 1 .44.45c.06.11.11.53.11 1.65v7.6c0 1.12-.05 1.54-.1 1.65a1 1 0 0 1-.45.44c-.11.06-.53.11-1.65.11H8.2a6 6 0 0 1-1.65-.1 1 1 0 0 1-.44-.45A6 6 0 0 1 6 15.8V8.2c0-1.12.05-1.54.1-1.65a1 1 0 0 1 .45-.44C6.66 6.05 7.08 6 8.2 6"
                        style="touch-action: none;" stroke-width="1.55"></path>
                </svg>

                <svg class="project-icon"
                    @click="handleClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path
                        d="M3.53 3.53a.67.67 0 0 1 .94 0L8 7.06l3.53-3.53a.67.67 0 1 1 .94.94L8.94 8l3.53 3.53a.67.67 0 1 1-.94.94L8 8.94l-3.53 3.53a.67.67 0 1 1-.94-.94L7.06 8 3.53 4.47a.67.67 0 0 1 0-.94"
                        style="touch-action: none;" stroke-width="1.55"></path>
                </svg>
            </div>
        </div>
        <div class="aspect-square sm:aspect-auto sm:h-[26rem] overflow-hidden" v-show="!isMinimized">
            <NuxtImg id="thumbnail-img" class="w-full h-full object-cover object-center transition-transform duration-400 ease cursor-pointer hover:scale-102.5 selectDisable" :src="isMobile ? thumbnailMobile : thumbnail"
                @error="handleThumbnailError" draggable="false" oncontextmenu="return false"
                @click="openLightbox(projectName, projectDescription, images, projectHasPage, projectLink)" />
        </div>
    </div>
</template>

<style scoped>
    .fadeInUp {
        opacity: 1;
        transform: translateY(0);
    }

    .shrink {
        transform: scale(0.5);
        opacity: 0;
    }
</style>