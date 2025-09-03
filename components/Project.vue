<template>
    <div class="project" :class="{ 'fadeInUp': isVisible, 'shrink': isClosed }"
        :style="{ width: isMobile ? 'calc(100vw - 1rem)' : '', height: isMinimized ? '3.2rem' : `${projectHeight}px` }">
        <div class="label" :style="{ borderBottom: isMinimized ? 'none' : '0.15rem solid rgb(70, 70, 70)' }">
            <p>{{ projectLabel }}</p>

            <div>
                <svg class="icon" @click="handleMinimize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2.67 8c0-.37.3-.67.66-.67h9.34a.67.67 0 1 1 0 1.34H3.33A.67.67 0 0 1 2.67 8"
                        style="touch-action: none;" stroke-width="1.55"></path>
                </svg>

                <svg class="icon"
                    @click="openLightbox(projectName, projectDescription, images, projectHasPage, projectLink || '')"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M8.2 4c-1.12 0-1.82-.05-2.56.33a3 3 0 0 0-1.31 1.3C3.95 6.39 4 7.09 4 8.2v7.6c0 1.12-.05 1.82.33 2.56a3 3 0 0 0 1.3 1.31c.75.38 1.45.33 2.57.33h7.6c1.12 0 1.82.05 2.56-.33a3 3 0 0 0 1.31-1.3c.38-.75.33-1.45.33-2.57V8.2c0-1.12.05-1.82-.33-2.56a3 3 0 0 0-1.3-1.31C17.61 3.95 16.91 4 15.8 4Zm0 2h7.6c1.12 0 1.54.05 1.65.1a1 1 0 0 1 .44.45c.06.11.11.53.11 1.65v7.6c0 1.12-.05 1.54-.1 1.65a1 1 0 0 1-.45.44c-.11.06-.53.11-1.65.11H8.2a6 6 0 0 1-1.65-.1 1 1 0 0 1-.44-.45A6 6 0 0 1 6 15.8V8.2c0-1.12.05-1.54.1-1.65a1 1 0 0 1 .45-.44C6.66 6.05 7.08 6 8.2 6"
                        style="touch-action: none;" stroke-width="1.55"></path>
                </svg>

                <svg class="icon" @click="handleClose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path
                        d="M3.53 3.53a.67.67 0 0 1 .94 0L8 7.06l3.53-3.53a.67.67 0 1 1 .94.94L8.94 8l3.53 3.53a.67.67 0 1 1-.94.94L8 8.94l-3.53 3.53a.67.67 0 1 1-.94-.94L7.06 8 3.53 4.47a.67.67 0 0 1 0-.94"
                        style="touch-action: none;" stroke-width="1.55"></path>
                </svg>
            </div>
        </div>
        <div id="thumbnail-container" v-show="!isMinimized" :style="`height: ${thumbnailContainerHeight}px`">
            <NuxtImg id="thumbnail-img" class="selectDisable" :src="isMobile ? thumbnailMobile : thumbnail"
                @error="handleThumbnailError" draggable="false" oncontextmenu="return false"
                @click="openLightbox(projectName, projectDescription, images, projectHasPage, projectLink)" />
        </div>
    </div>
</template>

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
    const isVisible = ref(false);
    const isMinimized = ref(false);
    const isClosed = ref(false)
    const isMobile = ref(false);
    const projectWidth = ref(0);
    const projectHeight = ref(0);
    const thumbnailContainerHeight = ref(0);

    let observer: IntersectionObserver | null = null;

    // methods
    const handleResize = () => {
        isMobile.value = window.innerWidth <= projectWidth.value;
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
        projectWidth.value = document.querySelector('.project').clientWidth;
        projectHeight.value = projectWidth.value * 0.39;
        thumbnailContainerHeight.value = projectHeight.value - document.querySelector('.label').clientHeight;

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

<style scoped>
    .project {
        width: var(--main-width);
        max-width: 80rem;

        background-color: rgb(30, 30, 30);
        border: var(--border);
        border-radius: 0.7rem;
        align-self: center;

        opacity: 0;
        transform: translateY(75px);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;

        overflow: hidden;
    }

    #thumbnail-container {
        overflow: hidden;
    }

    .label {
        padding-left: 0.6rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .icon {
        fill: rgb(82, 82, 82);
        stroke: rgb(82, 82, 82);

        margin-right: 0.5rem;

        width: 1.1rem;
        height: 1.1rem;
    }

    .icon:hover {
        fill: rgb(142, 142, 142);
        stroke: rgb(142, 142, 142);
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-bottom-left-radius: 0.7rem;
        border-bottom-right-radius: 0.7rem;
        transition: transform 0.4s ease;
    }

    img:hover {
        cursor: pointer;
        transform: scale(1.025);
    }

    .fadeInUp {
        opacity: 1;
        transform: translateY(0);
    }

    .shrink {
        transform: scale(0.5);
        opacity: 0;
    }
</style>