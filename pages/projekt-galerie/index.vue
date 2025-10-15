<template>
    <main id="main">
        <h1>{{ $t('project-galery') }}</h1>
        <div class='button-container'>
            <button @click="setSelectedCategory('all')" :class="{ active: activeCategory === 'all' }">{{ $t('all')
                }}</button>
            <button @click="setSelectedCategory('web')" :class="{ active: activeCategory === 'web' }">{{ $t('web')
            }}</button>
            <button @click="setSelectedCategory('app')" :class="{ active: activeCategory === 'app' }">{{ $t('app')
                }}</button>
            <button @click="setSelectedCategory('game')" :class="{ active: activeCategory === 'game' }">{{ $t('game')
            }}</button>
        </div>


        <Project v-for="project in projects" :key="project.id + '-' + activeCategory" :projectId="project.id"
            :projectLabel="project.label" :projectName="project.name" :projectDescription="project.description"
            :projectHasPage="project.hasPage" :projectLink="project.link" :projectThumbnail="project.thumbnail"
            :projectThumbnailMobile="project.thumbnailMobile" :projectImages="project.images" />
    </main>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { useQuery } from '@pinia/colada';
    import Project from '~/components/Project.vue';
    import Loader from '~/components/Loader.vue';

    const { locale } = useI18n();

    const { getAllProjectsByLang } = useDatabaseOperations();
    const { projects, refreshProjects } = getAllProjectsByLang(locale.value);

    const activeCategory = ref('all');

    const setSelectedCategory = (category: string) => {
        activeCategory.value = category;
    };

    onMounted(() => {
        refreshProjects();
    });

    watch(activeCategory, (newCategory) => {
        if (newCategory === 'all') {
            refreshProjects();
        } else {
            refreshProjects();
            setTimeout(() => {
                projects.value = projects.value.filter(project => project.category === newCategory);
            }, 50);
        }
    });

    useHead({
        title: 'Karl Kuhne | Projektgalerie'
    });
</script>

<style scoped lang="scss">
    #main {
        width: $screen-xl;
        margin: 0 auto;
        padding-top: 4.5rem;
        padding-bottom: 7rem;
        gap: 1rem
    }

    @include xl {
        #main {
            width: calc(100vw - 2rem);
            margin: 0 auto;
        }
    }

    .button-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
    }

    button {
        background-color: rgb(50, 50, 50);
        border: none;
        border-radius: 0.5rem;
        font-family: Work Sans;
        font-size: 1rem;
        color: white;
        padding: 0.4rem 0.75rem 0.4rem 0.75rem;
        z-index: 12;
    }

    button:hover {
        background-color: rgb(65, 65, 65);
        cursor: pointer;
    }

    button.active {
        background-color: rgb(65, 65, 65);
    }

    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        color: white;
    }
</style>