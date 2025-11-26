<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import markdownit from 'markdown-it'
    
    const route = useRoute()
    const name = route.params.name
    const md = markdownit()

    const { getPageIdByLangAndName, getPageContentByIdAndLang } = useDatabaseOperations();
    const { locale } = useI18n();

    const pageId = await getPageIdByLangAndName(locale.value, name);
    const content = await md.render(await getPageContentByIdAndLang(pageId, locale.value));

    useHead({
        title: `Karl Kuhne | Projekt ${name}`
    })
</script>

<template>
    <main>
        <ContentWrap>
            <h1>{{ name }}</h1>
            <p v-html="content" />
        </ContentWrap>
    </main>
</template>