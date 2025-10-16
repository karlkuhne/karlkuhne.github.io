<script setup lang="ts">
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const name = route.params.name

    const { getPageIdByLangAndName, getPageContentByIdAndLang } = useDatabaseOperations();
    const { locale } = useI18n();

    const pageId = await getPageIdByLangAndName(locale.value, name);
    const content = await getPageContentByIdAndLang(pageId, locale.value);

    function formatNewlines(text: string): string {
        return text.replace(/(\r\n|\r|\n)/g, '<br>');
    }

    useHead({
        title: `Karl Kuhne | Projekt ${name}`
    })
</script>

<template>
    <main>
        <ContentWrap>
            <h1>{{ name }}</h1>
            <p v-html="formatNewlines(content)" />
        </ContentWrap>
    </main>
</template>