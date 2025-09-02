<template>
    <Cover />
    <main id="main">
        <AboutBoxes />
        <div id="project-container">
            <h1 ref="elementRef" id="galery-header"
                :class="`${hasFaded ? 'typing-fade-visible' : 'typing-fade-invisible'}`">
                {{ $t('featured_projects') }}</h1>
            <LazyProject hydrate-on-visible v-for="project in projects" :key="project.id" :projectId="project.id"
                :projectLabel="project.label" :projectName="project.name" :projectDescription="project.description"
                :projectHasPage="project.hasPage" :projectLink="project.link" :projectThumbnail="project.thumbnail"
                :projectThumbnailMobile="project.thumbnailMobile" :projectImages="project.images" />
            <LazyAllProjectsButton hydrate-on-visible />
        </div>
        <LazyContactForm hydrate-on-visible />
    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n'

    import Cover from '~/components/Cover.vue';
    import AboutBoxes from '~/components/AboutBoxes.vue'

    const { locale } = useI18n();

    const { getAllProjectsByLang } = useDatabaseOperations();
    const { projects, refreshProjects } = getAllProjectsByLang(locale.value);

    const hasFaded = ref(false);
    const elementRef = ref<HTMLElement | null>(null);

    useFadeInOnScroll(hasFaded, elementRef);

    onMounted(() => {
        refreshProjects();
        setTimeout(() => {
            projects.value = projects.value.filter(project => project.featured);
        }, 50);
    });

    useHead({
        title: 'Karl Kuhne | Portfolio'
    })
</script>

<style scoped>
    #main {
        padding-top: 7rem;
        padding-bottom: 7rem;
        gap: 7rem
    }

    #project-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .typing-fade-visible {
        opacity: 1;
        animation: left-to-right-fade-in 0.75s ease-in;
        -webkit-mask-repeat: no-repeat;
    }

    .typing-fade-invisible {
        opacity: 0;
    }

    @keyframes left-to-right-fade-in {
        0% {
            -webkit-mask-size: 0%;
            -webkit-mask-image: linear-gradient(to right,
                    rgba(0, 0, 0, 1) 70%,
                    rgba(0, 0, 0, 0));
        }

        100% {
            -webkit-mask-size: 100%;
            -webkit-mask-image: linear-gradient(to right,
                    rgba(0, 0, 0, 1) 70%,
                    rgba(0, 0, 0, 0));
        }
    }
</style>