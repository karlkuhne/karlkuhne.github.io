<script setup lang="ts">
    import { ref, computed } from 'vue';
    import Project from '~/components/Project.vue';
    import Loader from '~/components/Loader.vue';

    const { locale } = useI18n();

    const { getAllProjectsByLang } = useDatabaseOperations();
    const { projects, isLoading, refreshProjects } = getAllProjectsByLang(locale.value);

    const activeCategory = ref('all');

    const filteredProjects = computed(() => {
        if (activeCategory.value === 'all') return projects.value;
        return projects.value.filter(project => project.category === activeCategory.value);
    });

    const setSelectedCategory = (category: string) => {
        activeCategory.value = category;
    };

    onMounted(() => {
        refreshProjects();
    });

    useHead({
        title: 'Karl Kuhne | Projektgalerie'
    });
</script>

<template>
    <main class="pt-18 pb-28 gap-4">
        <h1>{{ $t('project-galery') }}</h1>
        <div class='flex flex-wrap gap-2 justify-center'>
            <button class="filter-btn" @click="setSelectedCategory('all')" :class="{ 'bg-primary-70': activeCategory === 'all' }"><span>{{ $t('all') }}</span></button>
            <button class="filter-btn" @click="setSelectedCategory('web')" :class="{ 'bg-primary-70': activeCategory === 'web' }"><span>{{ $t('web') }}</span></button>
            <button class="filter-btn" @click="setSelectedCategory('app')" :class="{ 'bg-primary-70': activeCategory === 'app' }"><span>{{ $t('app') }}</span></button>
            <button class="filter-btn" @click="setSelectedCategory('game')" :class="{ 'bg-primary-70': activeCategory === 'game' }"><span>{{ $t('game') }}</span></button>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center p-8">
            <Loader />
        </div>

        <template v-else>
            <Project v-for="project in filteredProjects" :key="project.id + '-' + activeCategory" :projectId="project.id"
                :projectLabel="project.label" :projectName="project.name" :projectDescription="project.description"
                :projectHasPage="project.hasPage" :projectLink="project.link" :projectThumbnail="project.thumbnail"
                :projectThumbnailMobile="project.thumbnailMobile" :projectImages="project.images" />
        </template>
    </main>
</template>